import json
import string
from datetime import datetime
from typing import List, Dict, Optional, Union, Any
import os
import random
import csv
import pandas as pd
from jobspy import scrape_jobs
from fastapi import WebSocket, Request
import requests
import asyncio
from collections import defaultdict

from fastapi import FastAPI, File, UploadFile, HTTPException, Form, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import uvicorn
import google.generativeai as genai

import boto3
from botocore.exceptions import ClientError

boto3.setup_default_session(
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
    region_name=os.getenv('AWS_REGION')  # Default to 'ap-south-1' if not set
)
# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb')
ats_table = dynamodb.Table('Resume-Response')
jobs_table = dynamodb.Table('JobData')

# === Added ===
# Initialize SharableResumes DynamoDB Table
sharable_resumes_table = dynamodb.Table('SharableResumes')
# === End Added ===

# === Configure GenAI Client ===
GENAI_API_KEY = os.getenv('GENAI_API_KEY')
genai.configure(api_key=GENAI_API_KEY)

# === Initialize FastAPI App ===
app = FastAPI(
    title="Resume ATS Analyzer",
    description="Upload your resume and get an ATS score along with optimization feedback for your desired role.",
    version="1.0.0"
)


# === CORS Configuration ===
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Enhanced Pydantic Models ===
class MetricDistribution(BaseModel):
    metric_name: str
    score: float
    category: str
    importance: int

class RoleComparison(BaseModel):
    compared_role: str
    similarity_index: float
    key_matches: List[str]
    skill_gaps: List[str]

class InfographicData(BaseModel):
    metric_distribution: List[MetricDistribution]
    role_comparison: List[RoleComparison]
    skill_radar: Dict[str, float]
    experience_timeline: Dict[str, Any]
    keyword_cloud: Dict[str, int]
    industry_alignment: Dict[str, float]

class DetailedReport(BaseModel):
    sections: Dict[str, float]
    overall_recommendation: float
    section_improvements: Dict[str, List[str]]
    priority_actions: List[str]

class RoleSpecificMetrics(BaseModel):
    technical_skills: float
    soft_skills: float
    experience_match: float
    education_match: float
    industry_knowledge: float
    leadership_potential: float
    innovation_score: float
    communication_skills: float
    project_execution: float
    domain_expertise: float

class ATSScore(BaseModel):
    overall: float
    by_role_specific_metrics: RoleSpecificMetrics

class RoleFeedback(BaseModel):
    ats_score: ATSScore
    strengths: List[str]
    weaknesses: List[str]
    optimization_tips: List[str]
    detailed_report: DetailedReport
    top_keywords: List[str]
    suitable_roles: List[str]
    enhancement_tips: List[str]
    highlighted_companies: List[str]
    infographic_data: InfographicData
    market_insights: Dict[str, Any]

class ATSFeedback(BaseModel):
    name: str
    email: EmailStr
    roles: Dict[str, RoleFeedback]

class PredictionResponse(BaseModel):
    random_id: str
    datetime: str
    ats_feedback: ATSFeedback
    # === Added ===
    shareable_resume_link: Optional[str] = None
    # === End Added ===

class ATSResponseGet(BaseModel):
    userId: str
    response_data: dict

class JobDataGet(BaseModel):
    userId: str
    response_data: List[dict]

# === Added ===
# Pydantic Models for Sharable Resume

class SharableResume(BaseModel):
    resume_id: str
    user_id: str
    name: str
    email: EmailStr
    contact_information: Dict[str, Any]
    summary: str
    skills: List[str]
    experience: List[Dict[str, Any]]
    education: List[Dict[str, Any]]
    certifications: List[str]
    projects: List[Dict[str, Any]]
    additional_sections: Dict[str, Any]
    created_at: str

class CreateSharableResumeRequest(BaseModel):
    user_id: str

class CreateSharableResumeResponse(BaseModel):
    resume_id: str
    shareable_link: str
    message: str

class GetSharableResumeResponse(BaseModel):
    sharable_resume: SharableResume
# === End Added ===

# === Utility Functions ===

def store_ats_response(user_id: str, response_data: list) -> None:
    try:
        ats_table.put_item(
            Item={
                'userId': user_id,
                'response-data': response_data
            },
            ConditionExpression='attribute_not_exists(userId)'
        )
    except ClientError as e:
        if e.response['Error']['Code'] == 'ConditionalCheckFailedException':
            # Update existing record
            ats_table.update_item(
                Key={'userId': user_id},
                UpdateExpression='SET #rd = :rd',
                ExpressionAttributeNames={'#rd': 'response-data'},
                ExpressionAttributeValues={':rd': response_data}
            )
        else:
            raise e

def store_job_data(user_id: str, jobs_data: list) -> None:
    try:
        jobs_table.put_item(
            Item={
                'userId': user_id,
                'response-data': jobs_data
            },
            ConditionExpression='attribute_not_exists(userId)'
        )
    except ClientError as e:
        if e.response['Error']['Code'] == 'ConditionalCheckFailedException':
            # Update existing record
            jobs_table.update_item(
                Key={'userId': user_id},
                UpdateExpression='SET #rd = :rd',
                ExpressionAttributeNames={'#rd': 'response-data'},
                ExpressionAttributeValues={':rd': jobs_data}
            )
        else:
            raise e

def upload_pdf_file(file_path: str) -> dict:
    try:
        uploaded_file = genai.upload_file(file_path, mime_type='application/pdf')
        return uploaded_file
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to upload file: {e}")

def upload_to_genai(prompt: str, upload_file) -> str:
    try:
        model = genai.GenerativeModel(model_name="gemini-2.0-flash-exp")
        response = model.generate_content([prompt, upload_file])
        return response.text
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Content generation failed: {e}")

def generate_detailed_prompt(roles: List[str]) -> str:
    roles_formatted = ', '.join(roles)
    return f"""
    As an advanced ATS analyzer, analyze the resume which is attached and strictly follow the instructions and stick to the attached one and do not deviate and use that as your data-set and analyze for roles: {roles_formatted}.
    Calculate the ATS score for each role and provide detailed feedback including strengths, weaknesses, optimization tips, suitable roles, enhancement tips, highlighted companies, detailed report, infographic data, and market insights.
    The ATS Score Should be accurate and detailed, and the feedback should be actionable and role-specific.
    Provide a detailed JSON response including ALL of the following required fields:

    {{
        "ats_feedback": {{
            "name": "<user_name>",
            "email": "<user_email>",
            "<role_name>": {{
                "ats_score": {{
                    "overall": <0-100>,
                    "by_role_specific_metrics": {{
                        "technical_skills": <0-10>,
                        "soft_skills": <0-10>,
                        "experience_match": <0-10>,
                        "education_match": <0-10>,
                        "industry_knowledge": <0-10>,
                        "leadership_potential": <0-10>,
                        "innovation_score": <0-10>,
                        "communication_skills": <0-10>,
                        "project_execution": <0-10>,
                        "domain_expertise": <0-10>
                    }}
                }},
                "strengths": ["list at least 5 detailed strengths"],
                "weaknesses": ["list at least 7 specific weaknesses"],
                "optimization_tips": ["provide at least 7 actionable tips"],
                "top_keywords": ["list top 10 most relevant keywords found"],
                "suitable_roles": [
                    "must include minimum 3 relevant roles",
                    "based on skills and experience",
                    "in order of best match"
                ],
                "enhancement_tips": [
                    "provide atleast 5 specific career growth tips",
                    "include timeline and actionable steps",
                    "focus on role-specific improvements"
                ],
                "highlighted_companies": [
                    "list notable companies from experience",
                    "include industry leaders mentioned",
                    "minimum 3 companies"
                ],
                "detailed_report": {{
                    "sections": {{
                        "summary": <0-10>,
                        "skills": <0-10>,
                        "experience": <0-10>,
                        "education": <0-10>,
                        "certifications": <0-10>,
                        "projects": <0-10>
                    }},
                    "overall_recommendation": <0-100>,
                    "section_improvements": {{
                        "section_name": ["specific improvements"]
                    }},
                    "priority_actions": ["list 5 prioritized actions"]
                }},
                "infographic_data": {{
                    "metric_distribution": [
                        {{
                            "metric_name": "string",
                            "score": <0-100>,
                            "category": "string",
                            "importance": <1-5>
                        }}
                    ],
                    "role_comparison": [
                        {{
                            "compared_role": "string",
                            "similarity_index": <0-100>,
                            "key_matches": ["matching skills"],
                            "skill_gaps": ["missing skills"]
                        }}
                    ],
                    "skill_radar": {{
                        "skill_name": <0-100>
                    }},
                    "experience_timeline": {{
                        "year": ["achievements"]
                    }},
                    "keyword_cloud": {{
                        "keyword": <frequency>
                    }},
                    "industry_alignment": {{
                        "industry": <0-100>
                    }}
                }},
                "market_insights": {{
                    "demand_score": <0-100>,
                    "salary_range": {{
                        "min": <value>,
                        "max": <value>,
                        "currency": "string"
                    }},
                    "growth_potential": <0-100>,
                    "required_certifications": ["certification names"],
                    "emerging_skills": ["skill names"]
                }}
            }}
        }}
    }}
    """

def remove_markdown_backticks(response_text: str) -> str:
    """
    Removes starting and ending triple backticks (), including json variants.
    """
    # Strip leading/trailing whitespace
    new_text = response_text.strip()
    
    # Remove opening triple backticks (including "json").
    if new_text.startswith("```"):
        # Find first newline or whitespace after triple backticks
        first_newline = new_text.find('\n')
        if (first_newline != -1):
            new_text = new_text[first_newline:].strip()
        else:
            # Edge case: entire string is on one line
            new_text = new_text[3:].trip()
    
    # Remove closing triple backticks
    if new_text.endswith("```"):
        new_text = new_text[:-3].strip()
    
    return new_text

def parse_genai_response(response_text: str) -> ATSFeedback:
    try:
        # Clean the text by removing backticks
        cleaned_text = remove_markdown_backticks(response_text)
        # Parse JSON from cleaned text
        parsed_json = json.loads(cleaned_text)

        # Extract 'ats_feedback' field
        ats_feedback_data = parsed_json.get("ats_feedback", {})

        name = ats_feedback_data.get("name", "N/A")
        email = ats_feedback_data.get("email", "N/A")
        roles = {role: RoleFeedback(**role_data) for role, role_data in ats_feedback_data.items() if role not in {"name", "email"}}
        ats_feedback_data["roles"] = roles

        # Validate and return the populated ATSFeedback object
        return ATSFeedback(name=name, email=email, roles=roles)

    except json.JSONDecodeError as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Failed to parse GenAI response: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing response: {str(e)}"
        )

def generate_unique_id() -> str:
    return ''.join(random.choices(string.ascii_letters + string.digits, k=8))

job_status = defaultdict(lambda: {"status": "pending", "message": ""})

def format_job_data(csv_filename: str) -> List[Dict]:
    try:
        df = pd.read_csv(csv_filename)
        # Select only required columns
        required_columns = [
            "job_url", "title", "company", "location", 
            "date_posted", "is_remote", "company_url", "company_logo"
        ]
        # Filter columns
        filtered_df = df[required_columns]
        
        # Replace NaN with None
        filtered_df = filtered_df.replace({pd.NA: None, pd.NaT: None, float('nan'): None})
        
        # Convert to list of dictionaries and clean None values
        jobs_list = filtered_df.to_dict('records')
        
        # Clean dictionary by removing None values
        cleaned_jobs = []
        for job in jobs_list:
            cleaned_job = {k: v for k, v in job.items() if v is not None}
            cleaned_jobs.append(cleaned_job)
            
        return cleaned_jobs
    except Exception as e:
        print(f"Error formatting job data: {e}")
        return []

# === Added ===
# Utility Functions for Sharable Resumes

def generate_resume_id() -> str:
    """Generates a unique resume ID."""
    return ''.join(random.choices(string.ascii_letters + string.digits, k=12))

def generate_sharable_resume_prompt() -> str:
    """Generates the prompt for GenAI to create a sharable resume."""
    return """
    You are an AI assistant specialized in creating detailed, in-depth, and sharable online resumes from PDF files. 
    Extract all relevant information from the attached resume and organize it into a structured JSON format with the following fields:
    
    {
        "name": "Full Name",
        "email": "Email Address",
        "contact_information": {
            "phone": "Phone Number",
            "linkedin": "LinkedIn Profile",
            "github": "GitHub Profile",
            "address": "Physical Address"
        },
        "summary": "Create a compelling professional summary that highlights the individual's strengths and makes their profile stand out it's a mandatory field.",
        "skills": ["List", "Of", "Skills"],
        "experience": [
            {
                "company": "Company Name",
                "role": "Job Title",
                "duration": "Start Date - End Date",
                "responsibilities": ["Responsibility 1", "Responsibility 2"],
                "achievements": ["Achievement 1", "Achievement 2"],
                "technologies_used": ["Technology 1", "Technology 2"]
            }
        ],
        "education": [
            {
                "institution": "University Name",
                "degree": "Degree Earned",
                "year": "Year of Graduation",
                "gpa": "GPA",
                "relevant_courses": ["Course 1", "Course 2"]
            }
        ],
        "certifications": ["Certification 1", "Certification 2"],
        "projects": [
            {
                "name": "Project Name",
                "description": "Project Description",
                "technologies": ["Tech1", "Tech2"],
                "role": "Your Role in the Project",
                "outcome": "Project Outcome"
            }
        ],
        "additional_sections": {
            "languages": ["Language 1", "Language 2"],
            "interests": ["Interest 1", "Interest 2"],
            "volunteer_experience": [
                {
                    "organization": "Organization Name",
                    "role": "Volunteer Role",
                    "duration": "Start Date - End Date",
                    "responsibilities": ["Responsibility 1", "Responsibility 2"]
                }
            ],
            "publications": [
                {
                    "title": "Publication Title",
                    "journal": "Journal Name",
                    "year": "Year of Publication",
                    "authors": ["Author 1", "Author 2"]
                }
            ],
            "awards": [
                {
                    "title": "Award Title",
                    "year": "Year Awarded",
                    "description": "Award Description"
                }
            ]
        }
    }
    Ensure that all fields are accurately filled based on the content of the resume. The JSON should be well-formatted and adhere strictly to the structure provided.
    """

def parse_sharable_genai_response(response_text: str) -> Dict[str, Any]:
    """
    Parses the GenAI response to extract sharable resume data.
    
    Args:
        response_text (str): The raw text response from GenAI.
    
    Returns:
        Dict[str, Any]: The structured resume data.
    """
    try:
        # Clean the text by removing backticks and any markdown formatting
        cleaned_text = remove_markdown_backticks(response_text)
        
        # Parse JSON from cleaned text
        parsed_json = json.loads(cleaned_text)
        
        # Validate and return the parsed JSON
        return parsed_json
    
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse GenAI response: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing GenAI response: {str(e)}")

def clean_resume_data(resume_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Cleans the resume data by ensuring all fields are valid strings or appropriate types.
    """
    def clean_field(value, default="N/A"):
        if value is None:
            return default
        if isinstance(value, str) and not value.strip():
            return default
        return value

    cleaned_data = {}
    for key, value in resume_data.items():
        if isinstance(value, dict):
            cleaned_data[key] = {k: clean_field(v) for k, v in value.items()}
        elif isinstance(value, list):
            cleaned_data[key] = [clean_field(v) if isinstance(v, str) else v for v in value]
        else:
            cleaned_data[key] = clean_field(value)
    return cleaned_data

def store_sharable_resume(sharable_resume: SharableResume) -> None:
    try:
        sharable_resumes_table.put_item(
            Item={
                'userId': sharable_resume.user_id,
                'response-data': sharable_resume.model_dump_json()
            },
            ConditionExpression='attribute_not_exists(userId)'
        )
    except ClientError as e:
        if e.response['Error']['Code'] == 'ConditionalCheckFailedException':
            # Update existing record
            sharable_resumes_table.update_item(
                Key={'userId': sharable_resume.user_id},
                UpdateExpression='SET #data = :data',
                ExpressionAttributeNames={'#data': 'response-data'},
                ExpressionAttributeValues={':data': sharable_resume.model_dump_json()}
            )
        else:
            raise e

def create_sharable_resume(user_id: str, resume_file_path: str) -> SharableResume:
    """Creates a sharable resume based on the uploaded resume file."""
    try:
        # Upload the resume file to GenAI
        uploaded_file = upload_pdf_file(resume_file_path)
        
        # Generate a prompt to extract resume details
        prompt = generate_sharable_resume_prompt()
        genai_response = upload_to_genai(prompt, uploaded_file)
        resume_data = parse_sharable_genai_response(genai_response)
        
        # Clean the resume data
        resume_data = clean_resume_data(resume_data)

        # Generate a unique resume ID
        resume_id = generate_resume_id()
        
        # Create the SharableResume object
        sharable_resume = SharableResume(
            resume_id=resume_id,
            user_id=user_id,
            name=resume_data.get('name', 'N/A'),
            email=resume_data.get('email', 'N/A'),
            contact_information=resume_data.get('contact_information', {}),
            summary=resume_data.get('summary', ''),
            skills=resume_data.get('skills', []),
            experience=resume_data.get('experience', []),
            education=resume_data.get('education', []),
            certifications=resume_data.get('certifications', []),
            projects=resume_data.get('projects', []),
            additional_sections=resume_data.get('additional_sections', {}),
            created_at=datetime.utcnow().isoformat()
        )
        
        # Store the sharable resume in DynamoDB
        store_sharable_resume(sharable_resume)
        
        # Cleanup: Remove the uploaded file from GenAI
        genai.delete_file(uploaded_file.name)
        os.remove(resume_file_path)

        return sharable_resume
        
    except ClientError as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating sharable resume: {str(e)}")

def get_sharable_resume(userId: str) -> SharableResume:
    """Retrieves a sharable resume by its resume ID."""
    try:
        response = sharable_resumes_table.get_item(Key={'userId': userId})
        if 'Item' not in response:
            raise HTTPException(status_code=404, detail=f"No sharable resume found for ID: {resume_id}")
        sharable_resume_data = response['Item'].get('response-data')
        sharable_resume_dict = json.loads(sharable_resume_data)
        return SharableResume(**sharable_resume_dict)
        
    except ClientError as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving sharable resume: {str(e)}")
# === End Added ===

# Add WebSocket endpoint
@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await websocket.accept()
    try:
        while True:
            if job_status[client_id]["status"] == "completed":
                # Get filtered job data
                jobs_data = format_job_data("combined_suitable_roles.csv")
                await websocket.send_json({
                    "status": "completed",
                    "message": "Job search completed!",
                    "jobs": jobs_data
                })
                try:
                    if os.path.exists("combined_suitable_roles.csv"):
                        os.remove("combined_suitable_roles.csv")
                except Exception as e:
                    print(f"Error deleting CSV file: {e}")                   
                break
            elif job_status[client_id]["status"] == "failed":
                await websocket.send_json({
                    "status": "failed",
                    "message": job_status[client_id]["message"],
                    "jobs": []
                })
                break
            await asyncio.sleep(2)
    except Exception as e:
        print(f"WebSocket error: {e}")
        await websocket.send_json({
            "status": "error",
            "message": str(e),
            "jobs": []
        })
    finally:
        await websocket.close()

def do_job_search(suitable_roles: List[str], client_id: str, user_id: str, location: str):
    try:
        all_jobs = []
        for s_role in suitable_roles:
            jobs_df = scrape_jobs(
                site_name=["glassdoor","google","indeed"],
                search_term=s_role,
                location=location,
                results_wanted=20,
                hours_old=72,
                country_indeed=location,
                linkedin_fetch_description=True,
            )
            all_jobs.append(jobs_df)
        
        if all_jobs:
            combined_df = pd.concat(all_jobs, ignore_index=True)
            combined_filename = "combined_suitable_roles.csv"
            combined_df.to_csv(combined_filename, quoting=csv.QUOTE_NONNUMERIC, escapechar="\\", index=False)
            
            # Format and store job data in DynamoDB
            jobs_data = format_job_data(combined_filename)
            store_job_data(user_id, jobs_data)
            
            job_status[client_id] = {"status": "completed", "message": "CSV generation complete"}
    except Exception as e:
        job_status[client_id] = {"status": "failed", "message": str(e)}

def get_location_from_ip(ip: str) -> str:
    try:
        response = requests.get(f"http://ip-api.com/json/{ip}")
        data = response.json()
        print(data)
        return data.get("country", "India")  # Default to "India" if country is not found
    except Exception as e:
        print(f"Error getting location from IP: {e}")
        return "India"  # Default to "India" in case of error

# === API Endpoints ===

# Initialize user_id counter
user_id_counter = 1

@app.post("/analyze-resume", response_model=PredictionResponse)
async def analyze_resume(
    request: Request,
    roles: List[str] = Form(..., description="List of roles the applicant is applying for."),
    resume: UploadFile = File(..., description="Resume file in PDF format."),
    user_id: Optional[str] = Form(None, description="User ID for storing responses"),
    background_tasks: BackgroundTasks = None
):
    print("=== Request Headers ===")
    for header_name, header_value in request.headers.items():
        print(f"{header_name}: {header_value}")
    print("=====================")
    
    global user_id_counter
    if user_id is None:
        user_id = f"testaccount-{user_id_counter:02d}"
        user_id_counter += 1

    client_id = generate_unique_id()
    if resume.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Resume must be a PDF file.")

    temp_file_path = f"temp_resume_{generate_unique_id()}.pdf"
    try:
        with open(temp_file_path, 'wb') as f:
            f.write(await resume.read())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"File save error: {e}")

    uploaded_file = upload_pdf_file(temp_file_path)
    prompt = generate_detailed_prompt(roles)
    genai_response = upload_to_genai(prompt, uploaded_file)
    ats_feedback = parse_genai_response(genai_response)

    # Store ATS analysis in DynamoDB
    genai.delete_file(uploaded_file.name)

    response_data = PredictionResponse(
        random_id=generate_unique_id(),
        datetime=datetime.utcnow().isoformat(),
        ats_feedback=ats_feedback
    )
    
    response_json = json.dumps(response_data.model_dump())

    if background_tasks and not user_id.startswith("testaccount-"):
        job_status[client_id] = {"status": "pending", "message": "Job search started"}
        
        # Get client IP and location
        client_ip = get_client_ip(request)
        user_location = get_location_from_ip(client_ip)
        
        background_tasks.add_task(do_job_search, list(ats_feedback.roles.keys()), client_id, user_id, user_location)
        # === Added ===
        background_tasks.add_task(create_sharable_resume, user_id, temp_file_path)
        # === End Added ===

    response_data.random_id = client_id
    store_ats_response(user_id, response_json)
    
    return response_data

@app.get("/ats-response/{user_id}", response_model=ATSResponseGet)
async def get_ats_response(user_id: str):
    try:
        response = ats_table.get_item(
            Key={
                'userId': user_id
            }
        )
        
        if 'Item' not in response:
            raise HTTPException(
                status_code=404,
                detail=f"No ATS response found for user ID: {user_id}"
            )
        
        # Deserialize the stored response data
        try:
            response_data = json.loads(response['Item'].get('response-data'))
        except json.JSONDecodeError as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error decoding stored response data: {str(e)}"
            )
        
        return ATSResponseGet(
            userId=user_id,
            response_data=response_data
        )
        
    except ClientError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Database error: {str(e)}"
        )
def get_client_ip(request: Request) -> str:
    """
    Gets the real client IP address from X-Forwarded-For header.
    """
    forwarded_for = request.headers.get('x-forwarded-for')
    if forwarded_for:
        # X-Forwarded-For can contain multiple IPs - take the first one
        client_ip = forwarded_for.split(',')[0].strip()
        print(f"Client IP from X-Forwarded-For: {client_ip}")
        return client_ip
    
    # Fallback to direct client IP if header not present
    return request.client.host

@app.get("/job-data/{user_id}", response_model=JobDataGet)
async def get_job_data(user_id: str):
    try:
        response = jobs_table.get_item(
            Key={
                'userId': user_id
            }
        )
        
        if 'Item' not in response:
            raise HTTPException(
                status_code=404,
                detail=f"No job data found for user ID: {user_id}"
            )
        
        try:
            response_data = response['Item'].get('response-data')
        except json.JSONDecodeError as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error decoding stored response data: {str(e)}"
            )
            
        return JobDataGet(
            userId=user_id,
            response_data=response_data
        )        
    except ClientError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Database error: {str(e)}"
        )

# === Added ===
# API Endpoints for Sharable Resume


@app.get("/sharable-resume/{resume_id}", response_model=GetSharableResumeResponse)
async def get_sharable_resume_endpoint(resume_id: str):
    """
    Retrieves the sharable resume by its resume ID.
    """
    sharable_resume = get_sharable_resume(resume_id)

    return GetSharableResumeResponse(sharable_resume=sharable_resume)
# === End Added ===

# === Run the Application ===
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

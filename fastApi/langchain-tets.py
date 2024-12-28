import json
import string
from datetime import datetime
from typing import List, Dict, Optional, Union, Any
import os
import random
import csv
import pandas as pd
from jobspy import scrape_jobs
from fastapi import WebSocket
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
    email: str
    roles: Dict[str, RoleFeedback]

class PredictionResponse(BaseModel):
    random_id: str
    datetime: str
    ats_feedback: ATSFeedback


class ATSResponseGet(BaseModel):
    userId: str
    response_data: dict

class JobDataGet(BaseModel):
    userId: str
    response_data: List[dict]


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

def upload_to_genai(prompt: str, uplodad_file) -> str:
    try:
        model = genai.GenerativeModel(model_name="gemini-2.0-flash-exp")
        response = model.generate_content([prompt, uplodad_file])
        return response.text
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Content generation failed: {e}")

def generate_detailed_prompt(roles: List[str]) -> str:
    roles_formatted = ', '.join(roles)
    return f"""
    As an advanced ATS analyzer, analyze the resume which is attached and strictly follow the instructions and stick to the attached one and do not deviate and use that as ur rag and analyze for roles: {roles_formatted}.
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
    if new_text.startswith(""):
        # Find first newline or whitespace after triple backticks
        first_newline = new_text.find('\n')
        if (first_newline != -1):
            new_text = new_text[first_newline:].strip()
        else:
            # Edge case: entire string is on one line
            new_text = new_text[3:].strip()
    
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

        roles = {role: RoleFeedback(**role_data) for role, role_data in ats_feedback_data.items() if role not in {"name", "email"}}
        ats_feedback_data["roles"] = roles

        # Validate and return the populated ATSFeedback object
        return ATSFeedback(**ats_feedback_data)

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

def do_job_search(suitable_roles: List[str], client_id: str, user_id: str):
    try:
        all_jobs = []
        for s_role in suitable_roles:
            jobs_df = scrape_jobs(
                site_name=["glassdoor","google","indeed"],
                search_term=s_role,
                location="India",
                results_wanted=20,
                hours_old=72,
                country_indeed="India",
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
# === API Endpoints ===

# Initialize user_id counter
user_id_counter = 1

@app.post("/analyze-resume", response_model=PredictionResponse)
async def analyze_resume(
    roles: List[str] = Form(..., description="List of roles the applicant is applying for."),
    resume: UploadFile = File(..., description="Resume file in PDF format."),
    user_id: Optional[str] = Form(None, description="User ID for storing responses"),
    background_tasks: BackgroundTasks = None
):
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

    os.remove(temp_file_path)
    genai.delete_file(uploaded_file.name)

    response_data = PredictionResponse(
        random_id=generate_unique_id(),
        datetime=datetime.utcnow().isoformat(),
        ats_feedback=ats_feedback
    )
    
    response_json = json.dumps(response_data.model_dump())

    if background_tasks and not user_id.startswith("testaccount-"):
        job_status[client_id] = {"status": "pending", "message": "Job search started"}
        background_tasks.add_task(do_job_search, ats_feedback.roles.keys(), client_id, user_id)

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
# === Run the Application ===
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

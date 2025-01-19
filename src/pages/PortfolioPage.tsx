import React from 'react';
import { SharableResume } from '../components/portfolio/SharableResume';

const mockData = {
    "sharable_resume": {
        "resume_id": "qtFFosyG4D88",
        "user_id": "Creator-Acc",
        "name": "Chandana Vemula",
        "email": "vemulachandanareddy@gmail.com",
        "contact_information": {
            "phone": "+1 (940) 629 4170",
            "linkedin": "N/A",
            "github": "N/A",
            "address": "425 Bernard St Apt 714, Denton, TX 76201"
        },
        "summary": "A highly motivated and results-driven programmer analyst with a strong background in full-stack development, cloud technologies, and data engineering. Proven ability to design, develop, and deploy scalable systems and optimize processes for enhanced performance and efficiency. Eager to leverage expertise in cutting-edge technologies to contribute to innovative projects.",
        "skills": [
            "C",
            "C++",
            "Java",
            "Python",
            "HTML",
            "CSS",
            "JavaScript",
            "Angular JS",
            "Data Structures",
            "SQL",
            "MongoDB",
            "PostgreSQL",
            "DynamoDB",
            "Oracle",
            "SQL Server",
            "AWS",
            "PyTorch",
            "OpenCV",
            "NumPy",
            "Pandas",
            "Spark",
            "Kafka",
            "Docker",
            "Kubernetes",
            "Tableau",
            "Power BI",
            "Matplotlib",
            "Seaborn",
            "Excel",
            "Windows",
            "Linux",
            "UNIX",
            "Mac OS",
            "Git",
            "BitBucket",
            "MS Office",
            "Agile",
            "Scrum Methodologies",
            "software development life cycles",
            "DevOps"
        ],
        "experience": [
            {
                "company": "COGNIZANT, India",
                "role": "Programmer Analyst",
                "duration": "August 2021 – July 2023",
                "responsibilities": [
                    "Designed and developed highly scalable and available systems using AWS services like EC2, S3, Lambda, Auto Scaling, DynamoDB, Glue Jobs, and RDS.",
                    "Automated ETL processes using AWS, reducing manual data handling by 30 hours per week, which allowed teams to focus on strategic analytics initiatives.",
                    "Managed AWS operations, including launching, maintaining, and troubleshooting EC2 instances, S3 buckets, and creating CloudWatch monitors, alarms, and notifications",
                    "Streamlined CI/CD processes using Jenkins, improving deployment efficiency by 40%, reducing downtime during deployments.",
                    "Optimized PostgreSQL database schema, improving query performance by 20%, leading to faster data retrieval and more efficient data storage operations.",
                    "Architected microservice frameworks with Spring MVC integrated with Angular, improving system modularity and maintainability."
                ],
                "achievements": [
                    "Improved deployment efficiency by 40% through CI/CD streamlining.",
                    "Reduced manual data handling by 30 hours per week via ETL automation.",
                    "Optimized PostgreSQL query performance by 20%."
                ],
                "technologies_used": [
                    "AWS",
                    "EC2",
                    "S3",
                    "Lambda",
                    "Auto Scaling",
                    "DynamoDB",
                    "Glue Jobs",
                    "RDS",
                    "Jenkins",
                    "PostgreSQL",
                    "Spring MVC",
                    "Angular"
                ]
            },
            {
                "company": "COGNIZANT, India",
                "role": "Programmer Analyst Trainee (Internship)",
                "duration": "March 2021 – July 2021",
                "responsibilities": [
                    "Gained practical experience in end-to-end development by contributing to multiple projects involving Java-based RESTful APIs for backend microservices, enhancing system scalability and performance using multi-tier architecture.",
                    "Integrated APIs with an Angular frontend, managing seamless data population and ensuring smooth interaction between backend services and the user interface, significantly improving user experience and application responsiveness."
                ],
                "achievements": [
                    "Contributed to enhanced system scalability and performance using multi-tier architecture.",
                    "Improved user experience and application responsiveness by integrating APIs with Angular frontend."
                ],
                "technologies_used": [
                    "Java",
                    "RESTful APIs",
                    "Angular"
                ]
            }
        ],
        "education": [
            {
                "institution": "University of North Texas",
                "degree": "Masters in Data Science",
                "year": "2025",
                "gpa": "3.714/4.0",
                "relevant_courses": []
            },
            {
                "institution": "Anurag Group of Institutions (CVSR)",
                "degree": "Bachelor of Technology (B.Tech): Electronics and Communication",
                "year": null,
                "gpa": "9.88/10",
                "relevant_courses": []
            }
        ],
        "certifications": [
            "AWS Certified Developer – Associate"
        ],
        "projects": [
            {
                "name": "Crop Statistics Analysis",
                "description": "Designed and implemented a comprehensive DBMS for managing agricultural data across diverse regions, ensuring data accuracy and performance optimization. Cleaned and validated large datasets using Excel, reducing errors by 15% and enabling more accurate decision-making. Developed visualized features for data analysis, allowing stakeholders to efficiently interpret trends and statistics, improving decision speed by 20%.",
                "technologies": [
                    "MySQL",
                    "MySQL Workbench",
                    "SQL",
                    "Windows",
                    "Excel"
                ],
                "role": "Developer",
                "outcome": "Improved data accuracy by 15% and decision speed by 20%"
            },
            {
                "name": "Healthcare Data Processing",
                "description": "Developed an ETL pipeline using AWS Glue and Python to process healthcare data from multiple sources. Raw data was stored in S3 before being transformed and loaded into PostgreSQL for analytics. Optimized the process, improving data processing times by 40%, leading to faster and more accurate insights.",
                "technologies": [
                    "AWS Glue",
                    "Python",
                    "SQL",
                    "S3",
                    "PostgreSQL"
                ],
                "role": "Developer",
                "outcome": "Improved data processing time by 40%"
            },
            {
                "name": "Full Stack Tweet Application Development",
                "description": "Developed and deployed a full-stack tweet application with Spring Boot and Angular on AWS, achieving high uptime and 40% improved scalability. Optimized MongoDB queries, reducing response times by 25% and enhancing user experience. Integrated Kafka for high-volume message processing, increasing throughput by 30% and ensuring seamless real-time interaction.",
                "technologies": [
                    "Spring Boot",
                    "MongoDB",
                    "Kafka",
                    "Angular",
                    "AWS"
                ],
                "role": "Developer",
                "outcome": "Achieved 40% improved scalability, Reduced MongoDB query response time by 25%, Increased throughput by 30%"
            }
        ],
        "additional_sections": {
            "languages": [],
            "interests": [],
            "volunteer_experience": [],
            "publications": [],
            "awards": [
                {
                    "title": "Academic Excellence Award",
                    "year": null,
                    "description": "Awarded $1,000 annually for outstanding academic performance."
                },
                {
                    "title": "Top Performer",
                    "year": null,
                    "description": "Recognized as the top performer in the Electronics and Communication branch."
                }
            ]
        },
        "created_at": "2025-01-18T17:29:35.265690"
    }
};

export function PortfolioPage() {
  return <SharableResume data={mockData} />;
}
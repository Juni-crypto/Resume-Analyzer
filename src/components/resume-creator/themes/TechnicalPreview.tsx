import React from 'react';

// Extended ResumeData interface with technical focus
interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
  technicalSkills: {
    languages?: string[];
    frameworks?: string[];
    tools?: string[];
    databases?: string[];
    platforms?: string[];
  };
  experience: Array<{
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
    technologies?: string[];
    achievements?: string[];
  }>;
  projects?: Array<{
    name: string;
    description: string;
    technologies: string[];
    link?: string;
    achievements?: string[];
  }>;
  education: Array<{
    degree: string;
    school: string;
    location: string;
    graduationDate: string;
    gpa?: string;
    relevantCourses?: string[];
  }>;
  certifications?: Array<{
    name: string;
    issuer: string;
    date: string;
    link?: string;
  }>;
}

interface TechnicalPreviewProps {
  data: ResumeData;
}

export const TechnicalPreview: React.FC<TechnicalPreviewProps> = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto p-8 text-[#1a202c] font-['Inter'] bg-white">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#2d3748] mb-1">
          {data.personalInfo.name}
        </h1>
        <div className="text-base text-[#4a5568] mb-2">
          {data.personalInfo.title}
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-[#4a5568]">
          <span>{data.personalInfo.email}</span>
          <span>{data.personalInfo.phone}</span>
          <span>{data.personalInfo.location}</span>
          {data.personalInfo.github && <span>{data.personalInfo.github}</span>}
          {data.personalInfo.linkedin && (
            <span>{data.personalInfo.linkedin}</span>
          )}
        </div>
        {data.personalInfo.summary && (
          <p className="text-sm text-[#4a5568] mt-3">
            {data.personalInfo.summary}
          </p>
        )}
      </div>

      {/* Technical Skills Section */}
      {data.technicalSkills && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-[#2d3748] bg-[#f7fafc] px-2 py-1 mb-3">
            Technical Skills
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {data.technicalSkills.languages && (
              <div>
                <h3 className="text-xs font-semibold text-[#4a5568] mb-2">
                  Programming Languages
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {data.technicalSkills.languages.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-[#edf2f7] px-2 py-0.5 rounded text-xs text-[#4a5568]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {data.technicalSkills.frameworks && (
              <div>
                <h3 className="text-xs font-semibold text-[#4a5568] mb-2">
                  Frameworks & Libraries
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {data.technicalSkills.frameworks.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-[#edf2f7] px-2 py-0.5 rounded text-xs text-[#4a5568]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {data.technicalSkills.databases && (
              <div>
                <h3 className="text-xs font-semibold text-[#4a5568] mb-2">
                  Databases
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {data.technicalSkills.databases.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-[#edf2f7] px-2 py-0.5 rounded text-xs text-[#4a5568]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {data.technicalSkills.tools && (
              <div>
                <h3 className="text-xs font-semibold text-[#4a5568] mb-2">
                  Tools & Technologies
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {data.technicalSkills.tools.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-[#edf2f7] px-2 py-0.5 rounded text-xs text-[#4a5568]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Experience Section */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-[#2d3748] bg-[#f7fafc] px-2 py-1 mb-3">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <div>
                    <div className="text-sm font-semibold text-[#2d3748]">
                      {exp.title}
                    </div>
                    <div className="text-xs text-[#4a5568]">
                      {exp.company} • {exp.location}
                    </div>
                  </div>
                  <div className="text-xs text-[#718096]">
                    {exp.startDate} - {exp.endDate}
                  </div>
                </div>
                {exp.technologies && (
                  <div className="flex flex-wrap gap-1.5 my-1">
                    {exp.technologies.map((tech, j) => (
                      <span
                        key={j}
                        className="text-[#2b6cb0] bg-[#ebf8ff] px-2 py-0.5 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-xs text-[#4a5568] mt-1">{exp.description}</p>
                {exp.achievements && (
                  <ul className="mt-2 space-y-1 ml-2">
                    {exp.achievements.map((achievement, j) => (
                      <li
                        key={j}
                        className="flex items-start text-xs text-[#4a5568]"
                      >
                        <span className="mr-2">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      {data.projects && data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-[#2d3748] bg-[#f7fafc] px-2 py-1 mb-3">
            Technical Projects
          </h2>
          <div className="space-y-4">
            {data.projects.map((project, i) => (
              <div key={i}>
                <div className="text-sm font-semibold text-[#2d3748] mb-1">
                  {project.name}
                </div>
                <div className="flex flex-wrap gap-1.5 mb-1">
                  {project.technologies.map((tech, j) => (
                    <span
                      key={j}
                      className="text-[#2b6cb0] bg-[#ebf8ff] px-2 py-0.5 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-[#4a5568]">{project.description}</p>
                {project.achievements && (
                  <ul className="mt-2 space-y-1 ml-2">
                    {project.achievements.map((achievement, j) => (
                      <li
                        key={j}
                        className="flex items-start text-xs text-[#4a5568]"
                      >
                        <span className="mr-2">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Section */}
      {data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-[#2d3748] bg-[#f7fafc] px-2 py-1 mb-3">
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <div>
                    <div className="text-sm font-semibold text-[#2d3748]">
                      {edu.degree}
                    </div>
                    <div className="text-xs text-[#4a5568]">
                      {edu.school} • {edu.location}
                    </div>
                  </div>
                  <div className="text-xs text-[#718096]">
                    {edu.graduationDate}
                  </div>
                </div>
                {edu.relevantCourses && (
                  <div className="text-xs text-[#4a5568] mt-1">
                    Relevant Coursework: {edu.relevantCourses.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications Section */}
      {data.certifications && data.certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-[#2d3748] bg-[#f7fafc] px-2 py-1 mb-3">
            Certifications
          </h2>
          <div className="space-y-2">
            {data.certifications.map((cert, i) => (
              <div key={i}>
                <div className="flex justify-between">
                  <div>
                    <div className="text-sm font-semibold text-[#2d3748]">
                      {cert.name}
                    </div>
                    <div className="text-xs text-[#4a5568]">{cert.issuer}</div>
                  </div>
                  <div className="text-xs text-[#718096]">{cert.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

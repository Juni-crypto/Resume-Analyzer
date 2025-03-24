import React from 'react';

interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    linkedin?: string;
    portfolio?: string;
  };
  experience: Array<{
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
    achievements?: string[];
  }>;
  education: Array<{
    degree: string;
    school: string;
    location: string;
    graduationDate: string;
    gpa?: string;
    achievements?: string[];
  }>;
  skills: {
    technical?: string[];
    soft?: string[];
    languages?: string[];
  };
  certifications?: Array<{
    name: string;
    issuer: string;
    date: string;
  }>;
}

interface ModernPreviewProps {
  data: ResumeData;
}

export const ModernPreview: React.FC<ModernPreviewProps> = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto p-8 text-[#2d3748] font-['Nunito'] bg-white">
      {/* Header Section */}
      <div className="mb-8 border-b-2 border-[#667eea] pb-6">
        <div className="flex justify-between items-start">
          <div className="flex-grow">
            <h1 className="text-2xl font-semibold text-[#1a202c] tracking-wide">
              {data.personalInfo.name}
            </h1>
            <div className="text-base text-[#667eea] mt-1">
              {data.personalInfo.title}
            </div>
          </div>
          <div className="ml-8 text-right text-sm text-[#4a5568] space-y-1">
            <div>{data.personalInfo.email}</div>
            <div>{data.personalInfo.phone}</div>
            <div>{data.personalInfo.location}</div>
            {data.personalInfo.linkedin && (
              <div>{data.personalInfo.linkedin}</div>
            )}
            {data.personalInfo.portfolio && (
              <div>{data.personalInfo.portfolio}</div>
            )}
          </div>
        </div>
        {data.personalInfo.summary && (
          <p className="mt-4 text-base text-[#4a5568] leading-relaxed max-w-3xl">
            {data.personalInfo.summary}
          </p>
        )}
      </div>

      {/* Experience Section */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[#1a202c] mb-4 pl-3 border-l-4 border-[#667eea]">
            Professional Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp, i) => (
              <div key={i} className="mb-6">
                <div className="flex justify-between mb-2">
                  <div>
                    <div className="text-base font-semibold text-[#2d3748]">
                      {exp.title}
                    </div>
                    <div className="text-base text-[#667eea]">
                      {exp.company} • {exp.location}
                    </div>
                  </div>
                  <div className="text-sm text-[#718096]">
                    {exp.startDate} - {exp.endDate}
                  </div>
                </div>
                <p className="text-base text-[#4a5568] leading-relaxed mt-2">
                  {exp.description}
                </p>
                {exp.achievements && (
                  <ul className="mt-3 pl-4 space-y-1">
                    {exp.achievements.map((achievement, j) => (
                      <li
                        key={j}
                        className="text-base text-[#4a5568] flex items-start"
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

      {/* Skills Section */}
      {(data.skills.technical || data.skills.soft || data.skills.languages) && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[#1a202c] mb-4 pl-3 border-l-4 border-[#667eea]">
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-2 gap-8">
            {data.skills.technical && (
              <div>
                <h3 className="text-lg font-semibold text-[#4a5568] mb-3">
                  Technical Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.technical.map((skill, i) => (
                    <span
                      key={i}
                      className="text-sm text-[#667eea] bg-[#ebf4ff] px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {data.skills.soft && (
              <div>
                <h3 className="text-lg font-semibold text-[#4a5568] mb-3">
                  Soft Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.soft.map((skill, i) => (
                    <span
                      key={i}
                      className="text-sm text-[#667eea] bg-[#ebf4ff] px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {data.skills.languages && (
              <div>
                <h3 className="text-lg font-semibold text-[#4a5568] mb-3">
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.languages.map((skill, i) => (
                    <span
                      key={i}
                      className="text-sm text-[#667eea] bg-[#ebf4ff] px-3 py-1 rounded-full"
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

      {/* Education Section */}
      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[#1a202c] mb-4 pl-3 border-l-4 border-[#667eea]">
            Education
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {data.education.map((edu, i) => (
              <div key={i} className="bg-[#f7fafc] p-4 rounded-lg shadow-sm">
                <div className="text-base font-semibold text-[#2d3748]">
                  {edu.degree}
                </div>
                <div className="text-base text-[#667eea]">{edu.school}</div>
                <div className="text-sm text-[#718096]">{edu.location}</div>
                <div className="text-sm text-[#718096]">
                  {edu.graduationDate}
                </div>
                {edu.gpa && (
                  <div className="text-sm text-[#4a5568] mt-1">
                    GPA: {edu.gpa}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications Section */}
      {data.certifications && data.certifications.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[#1a202c] mb-4 pl-3 border-l-4 border-[#667eea]">
            Certifications
          </h2>
          <div className="grid gap-4">
            {data.certifications.map((cert, i) => (
              <div key={i} className="flex justify-between items-center">
                <div>
                  <div className="text-base font-semibold text-[#2d3748]">
                    {cert.name}
                  </div>
                  <div className="text-base text-[#667eea]">{cert.issuer}</div>
                </div>
                <div className="text-sm text-[#718096]">{cert.date}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

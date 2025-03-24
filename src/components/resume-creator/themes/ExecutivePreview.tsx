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

interface ExecutivePreviewProps {
  data: ResumeData;
}

export const ExecutivePreview: React.FC<ExecutivePreviewProps> = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto p-8 text-[#1a202c] font-['EB_Garamond'] bg-white leading-relaxed">
      {/* Header */}
      <div className="border-b-2 border-[#2d3748] pb-6 mb-6">
        <div className="flex justify-between mb-3">
          <div>
            <h1 className="text-3xl tracking-wide uppercase">
              {data.personalInfo.name}
            </h1>
            <div className="text-lg text-[#4a5568]">
              {data.personalInfo.title}
            </div>
          </div>
          <div className="text-right text-[#4a5568] space-y-0.5">
            <div>{data.personalInfo.email}</div>
            <div>{data.personalInfo.phone}</div>
            <div>{data.personalInfo.location}</div>
            {data.personalInfo.linkedin && (
              <div>{data.personalInfo.linkedin}</div>
            )}
          </div>
        </div>
        {data.personalInfo.summary && (
          <p className="text-[#4a5568] leading-relaxed mt-4">
            {data.personalInfo.summary}
          </p>
        )}
      </div>

      {/* Experience Section */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg tracking-wide text-[#2d3748] border-b border-[#e2e8f0] pb-1 mb-4 uppercase">
            Professional Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <div>
                    <div className="font-semibold text-[#2d3748]">
                      {exp.title}
                    </div>
                    <div className="text-[#4a5568]">
                      {exp.company} | {exp.location}
                    </div>
                  </div>
                  <div className="text-[#718096] italic">
                    {exp.startDate} - {exp.endDate}
                  </div>
                </div>
                <p className="text-[#4a5568] mt-2">{exp.description}</p>
                {exp.achievements && (
                  <ul className="mt-2 space-y-1 pl-4">
                    {exp.achievements.map((achievement, j) => (
                      <li key={j} className="text-[#4a5568] flex items-start">
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
          <h2 className="text-lg tracking-wide text-[#2d3748] border-b border-[#e2e8f0] pb-1 mb-4 uppercase">
            Expertise
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {data.skills.technical && (
              <div>
                <h3 className="font-semibold text-[#2d3748] mb-2">
                  Technical Proficiencies
                </h3>
                <p className="text-[#4a5568]">
                  {data.skills.technical.join(' • ')}
                </p>
              </div>
            )}
            {data.skills.soft && (
              <div>
                <h3 className="font-semibold text-[#2d3748] mb-2">
                  Leadership Competencies
                </h3>
                <p className="text-[#4a5568]">{data.skills.soft.join(' • ')}</p>
              </div>
            )}
            {data.skills.languages && (
              <div>
                <h3 className="font-semibold text-[#2d3748] mb-2">Languages</h3>
                <p className="text-[#4a5568]">
                  {data.skills.languages.join(' • ')}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Education Section */}
      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg tracking-wide text-[#2d3748] border-b border-[#e2e8f0] pb-1 mb-4 uppercase">
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <div>
                    <div className="font-semibold text-[#2d3748]">
                      {edu.degree}
                    </div>
                    <div className="text-[#4a5568]">
                      {edu.school} | {edu.location}
                    </div>
                  </div>
                  <div className="text-[#718096] italic">
                    {edu.graduationDate}
                  </div>
                </div>
                {edu.achievements && (
                  <ul className="mt-2 space-y-1 pl-4">
                    {edu.achievements.map((achievement, j) => (
                      <li key={j} className="text-[#4a5568] flex items-start">
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

      {/* Certifications Section */}
      {data.certifications && data.certifications.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg tracking-wide text-[#2d3748] border-b border-[#e2e8f0] pb-1 mb-4 uppercase">
            Certifications
          </h2>
          <div className="space-y-3">
            {data.certifications.map((cert, i) => (
              <div key={i}>
                <div className="flex justify-between">
                  <div className="font-semibold text-[#2d3748]">
                    {cert.name}
                  </div>
                  <div className="text-[#718096] italic">{cert.date}</div>
                </div>
                <div className="text-[#4a5568]">{cert.issuer}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

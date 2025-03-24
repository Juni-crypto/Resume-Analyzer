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

interface CompactPreviewProps {
  data: ResumeData;
}

export const CompactPreview: React.FC<CompactPreviewProps> = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-[#2d3748] font-['Source Sans Pro'] bg-white">
      {/* Header */}
      <div className="flex justify-between items-start mb-4 pb-2 border-b border-[#e2e8f0]">
        <div className="flex-grow">
          <h1 className="text-2xl font-semibold text-[#1a202c]">
            {data.personalInfo.name}
          </h1>
          <div className="text-sm text-[#4a5568] mt-1">
            {data.personalInfo.title}
          </div>
        </div>
        <div className="text-right space-y-0.5 text-xs text-[#4a5568]">
          <div>{data.personalInfo.email}</div>
          <div>{data.personalInfo.phone}</div>
          <div>{data.personalInfo.location}</div>
          {data.personalInfo.linkedin && (
            <div>{data.personalInfo.linkedin}</div>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <p className="text-sm text-[#4a5568] leading-relaxed mb-4">
          {data.personalInfo.summary}
        </p>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          {/* Experience Section */}
          {data.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-[#1a202c] bg-[#f7fafc] px-2 py-1 mb-3">
                Professional Experience
              </h2>
              <div className="space-y-4">
                {data.experience.map((exp, i) => (
                  <div key={i} className="text-sm">
                    <div className="flex justify-between mb-1">
                      <div>
                        <div className="font-semibold text-[#2d3748]">
                          {exp.title}
                        </div>
                        <div className="text-[#4a5568]">
                          {exp.company} • {exp.location}
                        </div>
                      </div>
                      <div className="text-xs text-[#718096]">
                        {exp.startDate} - {exp.endDate}
                      </div>
                    </div>
                    <p className="text-[#4a5568] mt-1 text-xs leading-relaxed">
                      {exp.description}
                    </p>
                    {exp.achievements && (
                      <ul className="mt-2 space-y-1">
                        {exp.achievements.map((achievement, j) => (
                          <li
                            key={j}
                            className="text-xs text-[#4a5568] flex items-start"
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
        </div>

        {/* Right Column */}
        <div>
          {/* Skills Section */}
          {(data.skills.technical ||
            data.skills.soft ||
            data.skills.languages) && (
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-[#1a202c] bg-[#f7fafc] px-2 py-1 mb-3">
                Skills
              </h2>
              {data.skills.technical && (
                <div className="mb-3">
                  <h3 className="text-xs font-semibold text-[#4a5568] mb-1">
                    Technical
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {data.skills.technical.map((skill, i) => (
                      <span key={i} className="text-xs text-[#4a5568]">
                        {skill}
                        {i < data.skills.technical!.length - 1 ? ' •' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {data.skills.soft && (
                <div className="mb-3">
                  <h3 className="text-xs font-semibold text-[#4a5568] mb-1">
                    Soft Skills
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {data.skills.soft.map((skill, i) => (
                      <span key={i} className="text-xs text-[#4a5568]">
                        {skill}
                        {i < data.skills.soft!.length - 1 ? ' •' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {data.skills.languages && (
                <div className="mb-3">
                  <h3 className="text-xs font-semibold text-[#4a5568] mb-1">
                    Languages
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {data.skills.languages.map((skill, i) => (
                      <span key={i} className="text-xs text-[#4a5568]">
                        {skill}
                        {i < data.skills.languages!.length - 1 ? ' •' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Education Section */}
          {data.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-[#1a202c] bg-[#f7fafc] px-2 py-1 mb-3">
                Education
              </h2>
              <div className="space-y-3">
                {data.education.map((edu, i) => (
                  <div key={i} className="text-sm">
                    <div className="flex justify-between mb-1">
                      <div>
                        <div className="font-semibold text-[#2d3748]">
                          {edu.degree}
                        </div>
                        <div className="text-[#4a5568]">
                          {edu.school} • {edu.location}
                        </div>
                      </div>
                      <div className="text-xs text-[#718096]">
                        {edu.graduationDate}
                      </div>
                    </div>
                    {edu.gpa && (
                      <div className="text-xs text-[#4a5568] mt-1">
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
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-[#1a202c] bg-[#f7fafc] px-2 py-1 mb-3">
                Certifications
              </h2>
              <div className="space-y-2">
                {data.certifications.map((cert, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center text-sm"
                  >
                    <div>
                      <div className="font-semibold text-[#2d3748]">
                        {cert.name}
                      </div>
                      <div className="text-[#4a5568]">{cert.issuer}</div>
                    </div>
                    <div className="text-xs text-[#718096]">{cert.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

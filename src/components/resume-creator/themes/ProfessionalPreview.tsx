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

interface ProfessionalPreviewProps {
  data: ResumeData;
}

export const ProfessionalPreview: React.FC<ProfessionalPreviewProps> = ({
  data,
}) => {
  return (
    <div className="max-w-4xl mx-auto p-8 text-[#2d3748] font-['Open_Sans'] bg-white leading-relaxed">
      {/* Header Section */}
      <div className="border-b-2 border-[#e2e8f0] pb-4 mb-6">
        <h1 className="text-3xl font-semibold text-[#1a202c] mb-2">
          {data.personalInfo.name}
        </h1>
        <div className="text-base text-[#4a5568] mb-3">
          {data.personalInfo.title}
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-[#4a5568]">
          <span>{data.personalInfo.email}</span>
          <span>•</span>
          <span>{data.personalInfo.phone}</span>
          <span>•</span>
          <span>{data.personalInfo.location}</span>
          {data.personalInfo.linkedin && (
            <>
              <span>•</span>
              <span>{data.personalInfo.linkedin}</span>
            </>
          )}
        </div>
      </div>

      {/* Summary Section */}
      {data.personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-base font-semibold text-[#1a202c] uppercase border-b border-[#e2e8f0] pb-2 mb-3">
            Professional Summary
          </h2>
          <p className="text-[#4a5568] leading-relaxed">
            {data.personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience Section */}
      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-semibold text-[#1a202c] uppercase border-b border-[#e2e8f0] pb-2 mb-3">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <div>
                    <div className="font-semibold text-[#2d3748]">
                      {exp.title}
                    </div>
                    <div className="text-[#4a5568]">
                      {exp.company} • {exp.location}
                    </div>
                  </div>
                  <div className="text-sm text-[#718096]">
                    {exp.startDate} - {exp.endDate}
                  </div>
                </div>
                <p className="text-[#4a5568] mt-2">{exp.description}</p>
                {exp.achievements && (
                  <ul className="mt-2 space-y-1">
                    {exp.achievements.map((achievement, j) => (
                      <li key={j} className="flex items-center text-[#4a5568]">
                        <div className="w-1 h-1 bg-[#718096] rounded-full mr-2"></div>
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
        <div className="mb-6">
          <h2 className="text-base font-semibold text-[#1a202c] uppercase border-b border-[#e2e8f0] pb-2 mb-3">
            Skills
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {data.skills.technical && (
              <div>
                <h3 className="text-[#4a5568] mb-2">Technical</h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.technical.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-[#f7fafc] px-3 py-1 rounded text-sm text-[#4a5568]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {data.skills.soft && (
              <div>
                <h3 className="text-[#4a5568] mb-2">Soft Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.soft.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-[#f7fafc] px-3 py-1 rounded text-sm text-[#4a5568]"
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
        <div className="mb-6">
          <h2 className="text-base font-semibold text-[#1a202c] uppercase border-b border-[#e2e8f0] pb-2 mb-3">
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
                      {edu.school} • {edu.location}
                    </div>
                  </div>
                  <div className="text-sm text-[#718096]">
                    {edu.graduationDate}
                  </div>
                </div>
                {edu.gpa && (
                  <div className="text-[#4a5568] mt-1">GPA: {edu.gpa}</div>
                )}
                {edu.achievements && (
                  <ul className="mt-2 space-y-1">
                    {edu.achievements.map((achievement, j) => (
                      <li key={j} className="flex items-center text-[#4a5568]">
                        <div className="w-1 h-1 bg-[#718096] rounded-full mr-2"></div>
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
        <div className="mb-6">
          <h2 className="text-base font-semibold text-[#1a202c] uppercase border-b border-[#e2e8f0] pb-2 mb-3">
            Certifications
          </h2>
          <div className="space-y-3">
            {data.certifications.map((cert, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <div className="font-semibold text-[#2d3748]">
                    {cert.name}
                  </div>
                  <div className="text-sm text-[#718096]">{cert.date}</div>
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

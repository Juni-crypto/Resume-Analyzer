import React from 'react';

interface MinimalPreviewProps {
  data: any;
}

export const MinimalPreview: React.FC<MinimalPreviewProps> = ({ data }) => {
  return (
    <div className="max-w-4xl mx-auto p-8 text-[#2d3748] font-['Inter'] bg-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#1a202c]">
          {data.personalInfo.name}
        </h1>
        <div className="text-base text-[#4a5568] mb-2">
          {data.personalInfo.title}
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm text-[#4a5568]">
          <span>{data.personalInfo.email}</span>
          <span>•</span>
          <span>{data.personalInfo.phone}</span>
          <span>•</span>
          <span>{data.personalInfo.location}</span>
        </div>
        {data.personalInfo.summary && (
          <p className="mt-4 text-[#4a5568]">{data.personalInfo.summary}</p>
        )}
      </div>

      {/* Skills */}
      {(data.skills.technical?.length > 0 || data.skills.soft?.length > 0) && (
        <div className="mb-8">
          <h2 className="text-base font-semibold text-[#1a202c] border-b border-[#e2e8f0] pb-2 mb-4">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.technical?.map((skill: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-[#f7fafc] text-[#4a5568] rounded text-sm"
              >
                {skill}
              </span>
            ))}
            {data.skills.soft?.map((skill: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-[#f7fafc] text-[#4a5568] rounded text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-base font-semibold text-[#1a202c] border-b border-[#e2e8f0] pb-2 mb-4">
            Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp: any, index: number) => (
              <div key={index}>
                <div className="font-semibold text-[#2d3748]">{exp.title}</div>
                <div className="text-[#4a5568]">
                  {exp.company} • {exp.location}
                </div>
                <div className="text-sm text-[#718096]">
                  {exp.startDate} - {exp.endDate}
                </div>
                <p className="mt-2 text-[#4a5568]">{exp.description}</p>
                {exp.achievements?.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {exp.achievements.map((achievement: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#718096] mt-2" />
                        <span className="text-[#4a5568]">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-base font-semibold text-[#1a202c] border-b border-[#e2e8f0] pb-2 mb-4">
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu: any, index: number) => (
              <div key={index}>
                <div className="font-semibold text-[#2d3748]">{edu.degree}</div>
                <div className="text-[#4a5568]">
                  {edu.school} • {edu.location}
                </div>
                <div className="text-sm text-[#718096]">
                  {edu.graduationDate}
                </div>
                {edu.gpa && (
                  <div className="text-[#4a5568] mt-1">GPA: {edu.gpa}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {data.certifications?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-base font-semibold text-[#1a202c] border-b border-[#e2e8f0] pb-2 mb-4">
            Certifications
          </h2>
          <div className="space-y-4">
            {data.certifications.map((cert: any, index: number) => (
              <div key={index}>
                <div className="font-semibold text-[#2d3748]">{cert.name}</div>
                <div className="text-[#4a5568]">{cert.issuer}</div>
                <div className="text-sm text-[#718096]">{cert.date}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
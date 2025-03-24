import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

// Register fonts - Using a modern, tech-friendly font
Font.register({
  family: 'Inter',
  fonts: [
    {
      src: 'https://fonts.cdnfonts.com/s/19795/Inter-Regular.woff',
      fontWeight: 400,
    },
    {
      src: 'https://fonts.cdnfonts.com/s/19795/Inter-SemiBold.woff',
      fontWeight: 600,
    },
  ],
});

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

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: 'Inter',
    fontSize: 10,
    color: '#1a202c',
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 600,
    color: '#2d3748',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    color: '#4a5568',
    marginBottom: 8,
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 4,
  },
  contactItem: {
    fontSize: 10,
    color: '#4a5568',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: '#2d3748',
    backgroundColor: '#f7fafc',
    padding: '4 8',
    marginBottom: 8,
  },
  skillGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  skillCategory: {
    flex: 1,
    minWidth: '45%',
  },
  skillTitle: {
    fontSize: 11,
    fontWeight: 600,
    color: '#4a5568',
    marginBottom: 4,
  },
  skillList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  skill: {
    fontSize: 9,
    backgroundColor: '#edf2f7',
    padding: '2 6',
    borderRadius: 4,
    color: '#4a5568',
  },
  experienceItem: {
    marginBottom: 12,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  companyInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 600,
    color: '#2d3748',
  },
  company: {
    fontSize: 11,
    color: '#4a5568',
  },
  dates: {
    fontSize: 10,
    color: '#718096',
    textAlign: 'right',
  },
  description: {
    fontSize: 10,
    color: '#4a5568',
    marginTop: 2,
    marginBottom: 4,
  },
  techStack: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 4,
  },
  techItem: {
    fontSize: 9,
    color: '#2b6cb0',
    backgroundColor: '#ebf8ff',
    padding: '2 6',
    borderRadius: 4,
  },
  bulletList: {
    marginLeft: 8,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bullet: {
    width: 8,
    fontSize: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    color: '#4a5568',
  },
  projectItem: {
    marginBottom: 10,
  },
  projectTitle: {
    fontSize: 11,
    fontWeight: 600,
    color: '#2d3748',
    marginBottom: 2,
  },
  educationItem: {
    marginBottom: 8,
  },
});

export function Technical({ data }: { data: ResumeData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.name}</Text>
          <Text style={styles.title}>{data.personalInfo.title}</Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
            <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>
            <Text style={styles.contactItem}>{data.personalInfo.location}</Text>
            {data.personalInfo.github && (
              <Text style={styles.contactItem}>{data.personalInfo.github}</Text>
            )}
            {data.personalInfo.linkedin && (
              <Text style={styles.contactItem}>
                {data.personalInfo.linkedin}
              </Text>
            )}
          </View>
          {data.personalInfo.summary && (
            <Text style={styles.description}>{data.personalInfo.summary}</Text>
          )}
        </View>

        {/* Technical Skills */}
        {data.technicalSkills && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technical Skills</Text>
            <View style={styles.skillGrid}>
              {data.technicalSkills.languages && (
                <View style={styles.skillCategory}>
                  <Text style={styles.skillTitle}>Programming Languages</Text>
                  <View style={styles.skillList}>
                    {data.technicalSkills.languages.map((skill, index) => (
                      <Text key={index} style={styles.skill}>
                        {skill}
                      </Text>
                    ))}
                  </View>
                </View>
              )}
              {data.technicalSkills.frameworks && (
                <View style={styles.skillCategory}>
                  <Text style={styles.skillTitle}>Frameworks & Libraries</Text>
                  <View style={styles.skillList}>
                    {data.technicalSkills.frameworks.map((skill, index) => (
                      <Text key={index} style={styles.skill}>
                        {skill}
                      </Text>
                    ))}
                  </View>
                </View>
              )}
              {data.technicalSkills.databases && (
                <View style={styles.skillCategory}>
                  <Text style={styles.skillTitle}>Databases</Text>
                  <View style={styles.skillList}>
                    {data.technicalSkills.databases.map((skill, index) => (
                      <Text key={index} style={styles.skill}>
                        {skill}
                      </Text>
                    ))}
                  </View>
                </View>
              )}
              {data.technicalSkills.tools && (
                <View style={styles.skillCategory}>
                  <Text style={styles.skillTitle}>Tools & Technologies</Text>
                  <View style={styles.skillList}>
                    {data.technicalSkills.tools.map((skill, index) => (
                      <Text key={index} style={styles.skill}>
                        {skill}
                      </Text>
                    ))}
                  </View>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {data.experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <View style={styles.companyInfo}>
                    <Text style={styles.jobTitle}>{exp.title}</Text>
                    <Text style={styles.company}>
                      {exp.company} • {exp.location}
                    </Text>
                  </View>
                  <Text style={styles.dates}>
                    {exp.startDate} - {exp.endDate}
                  </Text>
                </View>
                {exp.technologies && (
                  <View style={styles.techStack}>
                    {exp.technologies.map((tech, i) => (
                      <Text key={i} style={styles.techItem}>
                        {tech}
                      </Text>
                    ))}
                  </View>
                )}
                <Text style={styles.description}>{exp.description}</Text>
                {exp.achievements && (
                  <View style={styles.bulletList}>
                    {exp.achievements.map((achievement, i) => (
                      <View key={i} style={styles.bulletPoint}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>{achievement}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technical Projects</Text>
            {data.projects.map((project, index) => (
              <View key={index} style={styles.projectItem}>
                <Text style={styles.projectTitle}>{project.name}</Text>
                <View style={styles.techStack}>
                  {project.technologies.map((tech, i) => (
                    <Text key={i} style={styles.techItem}>
                      {tech}
                    </Text>
                  ))}
                </View>
                <Text style={styles.description}>{project.description}</Text>
                {project.achievements && (
                  <View style={styles.bulletList}>
                    {project.achievements.map((achievement, i) => (
                      <View key={i} style={styles.bulletPoint}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>{achievement}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <View style={styles.experienceHeader}>
                  <View style={styles.companyInfo}>
                    <Text style={styles.jobTitle}>{edu.degree}</Text>
                    <Text style={styles.company}>
                      {edu.school} • {edu.location}
                    </Text>
                  </View>
                  <Text style={styles.dates}>{edu.graduationDate}</Text>
                </View>
                {edu.relevantCourses && (
                  <Text style={[styles.description, { marginTop: 2 }]}>
                    Relevant Coursework: {edu.relevantCourses.join(', ')}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {data.certifications.map((cert, index) => (
              <View key={index} style={styles.educationItem}>
                <View style={styles.experienceHeader}>
                  <View style={styles.companyInfo}>
                    <Text style={styles.jobTitle}>{cert.name}</Text>
                    <Text style={styles.company}>{cert.issuer}</Text>
                  </View>
                  <Text style={styles.dates}>{cert.date}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}

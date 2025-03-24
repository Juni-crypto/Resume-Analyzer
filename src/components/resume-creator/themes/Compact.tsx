import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

// Register fonts - Using a condensed font for better space utilization
Font.register({
  family: 'Source Sans Pro',
  fonts: [
    {
      src: 'https://fonts.cdnfonts.com/s/12183/SourceSansPro-Regular.woff',
      fontWeight: 400,
    },
    {
      src: 'https://fonts.cdnfonts.com/s/12183/SourceSansPro-Semibold.woff',
      fontWeight: 600,
    },
  ],
});

// Using consistent ResumeData interface
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

const styles = StyleSheet.create({
  page: {
    padding: '40 50',
    fontFamily: 'Source Sans Pro',
    fontSize: 9,
    lineHeight: 1.3,
    color: '#2d3748',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 8,
  },
  headerLeft: {
    flex: 2,
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  name: {
    fontSize: 18,
    fontWeight: 600,
    color: '#1a202c',
  },
  title: {
    fontSize: 11,
    color: '#4a5568',
    marginTop: 2,
  },
  contactText: {
    fontSize: 9,
    color: '#4a5568',
    marginBottom: 1,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 600,
    color: '#1a202c',
    backgroundColor: '#f7fafc',
    padding: '2 4',
    marginBottom: 6,
  },
  twoColumnLayout: {
    flexDirection: 'row',
    gap: 16,
  },
  column: {
    flex: 1,
  },
  skillCategory: {
    marginBottom: 6,
  },
  skillCategoryTitle: {
    fontSize: 9,
    fontWeight: 600,
    color: '#4a5568',
    marginBottom: 2,
  },
  skillList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skill: {
    marginRight: 12,
    marginBottom: 2,
    color: '#4a5568',
  },
  experienceItem: {
    marginBottom: 8,
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
    fontSize: 10,
    fontWeight: 600,
    color: '#2d3748',
  },
  company: {
    color: '#4a5568',
  },
  dates: {
    color: '#718096',
    fontSize: 9,
  },
  description: {
    marginTop: 2,
    color: '#4a5568',
  },
  bulletList: {
    marginLeft: 8,
    marginTop: 2,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 1,
  },
  bullet: {
    width: 8,
  },
  bulletText: {
    flex: 1,
  },
  educationItem: {
    marginBottom: 6,
  },
  summary: {
    marginBottom: 10,
    fontSize: 9,
    color: '#4a5568',
    lineHeight: 1.4,
  },
});

export function Compact({ data }: { data: ResumeData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>{data.personalInfo.name}</Text>
            <Text style={styles.title}>{data.personalInfo.title}</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.contactText}>{data.personalInfo.email}</Text>
            <Text style={styles.contactText}>{data.personalInfo.phone}</Text>
            <Text style={styles.contactText}>{data.personalInfo.location}</Text>
            {data.personalInfo.linkedin && (
              <Text style={styles.contactText}>
                {data.personalInfo.linkedin}
              </Text>
            )}
          </View>
        </View>

        {/* Summary */}
        {data.personalInfo.summary && (
          <Text style={styles.summary}>{data.personalInfo.summary}</Text>
        )}

        {/* Two Column Layout */}
        <View style={styles.twoColumnLayout}>
          {/* Left Column */}
          <View style={styles.column}>
            {/* Experience Section */}
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
          </View>

          {/* Right Column */}
          <View style={styles.column}>
            {/* Skills Section */}
            {(data.skills.technical ||
              data.skills.soft ||
              data.skills.languages) && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Skills</Text>
                {data.skills.technical && (
                  <View style={styles.skillCategory}>
                    <Text style={styles.skillCategoryTitle}>Technical</Text>
                    <View style={styles.skillList}>
                      {data.skills.technical.map((skill, index) => (
                        <Text key={index} style={styles.skill}>
                          {skill}
                        </Text>
                      ))}
                    </View>
                  </View>
                )}
                {data.skills.soft && (
                  <View style={styles.skillCategory}>
                    <Text style={styles.skillCategoryTitle}>Soft Skills</Text>
                    <View style={styles.skillList}>
                      {data.skills.soft.map((skill, index) => (
                        <Text key={index} style={styles.skill}>
                          {skill}
                        </Text>
                      ))}
                    </View>
                  </View>
                )}
                {data.skills.languages && (
                  <View style={styles.skillCategory}>
                    <Text style={styles.skillCategoryTitle}>Languages</Text>
                    <View style={styles.skillList}>
                      {data.skills.languages.map((skill, index) => (
                        <Text key={index} style={styles.skill}>
                          {skill}
                        </Text>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            )}

            {/* Education Section */}
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
                    {edu.gpa && (
                      <Text style={styles.description}>GPA: {edu.gpa}</Text>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Certifications Section */}
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
          </View>
        </View>
      </Page>
    </Document>
  );
}

import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

// Register fonts
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
    padding: 40,
    fontFamily: 'Inter',
    fontSize: 10,
    lineHeight: 1.6,
    color: '#2d3748',
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 25,
    borderBottomWidth: 2,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 15,
  },
  name: {
    fontSize: 26,
    fontWeight: 600,
    marginBottom: 6,
    color: '#1a202c',
  },
  title: {
    fontSize: 14,
    color: '#4a5568',
    marginBottom: 12,
  },
  contactInfo: {
    flexDirection: 'row',
    gap: 20,
    fontSize: 10,
    color: '#4a5568',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: '#1a202c',
    marginBottom: 12,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    textTransform: 'uppercase',
  },
  experienceItem: {
    marginBottom: 16,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    alignItems: 'flex-start',
  },
  jobTitle: {
    fontWeight: 600,
    color: '#2d3748',
    fontSize: 11,
  },
  company: {
    color: '#4a5568',
    marginTop: 2,
  },
  dates: {
    color: '#718096',
    fontSize: 9,
  },
  description: {
    marginTop: 6,
    color: '#4a5568',
    paddingRight: 10,
    lineHeight: 1.6,
  },
  bulletPoint: {
    marginLeft: 12,
    flexDirection: 'row',
    marginTop: 4,
    alignItems: 'center',
  },
  bullet: {
    width: 3,
    height: 3,
    marginRight: 8,
    backgroundColor: '#718096',
    borderRadius: 2,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    marginTop: 4,
  },
  skillCategory: {
    flex: 1,
    minWidth: '45%',
  },
  skillList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 6,
  },
  skillItem: {
    backgroundColor: '#f7fafc',
    padding: '4 10',
    borderRadius: 4,
    color: '#4a5568',
    fontSize: 9,
  },
  education: {
    marginBottom: 12,
  },
  certification: {
    marginBottom: 10,
  },
});

export function Professional({ data }: { data: ResumeData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.name}</Text>
          <Text style={styles.title}>{data.personalInfo.title}</Text>
          <View style={styles.contactInfo}>
            <Text>{data.personalInfo.email}</Text>
            <Text>•</Text>
            <Text>{data.personalInfo.phone}</Text>
            <Text>•</Text>
            <Text>{data.personalInfo.location}</Text>
            {data.personalInfo.linkedin && (
              <>
                <Text>•</Text>
                <Text>{data.personalInfo.linkedin}</Text>
              </>
            )}
          </View>
        </View>

        {/* Summary Section */}
        {data.personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.description}>{data.personalInfo.summary}</Text>
          </View>
        )}

        {/* Experience Section */}
        {data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {data.experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <View>
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
                {exp.achievements?.map((achievement, i) => (
                  <View key={i} style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.description}>{achievement}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Skills Section */}
        {(data.skills.technical ||
          data.skills.soft ||
          data.skills.languages) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skills}>
              {data.skills.technical && (
                <View style={styles.skillCategory}>
                  <Text style={[styles.company, { marginBottom: 4 }]}>
                    Technical
                  </Text>
                  <View style={styles.skillList}>
                    {data.skills.technical.map((skill, index) => (
                      <Text key={index} style={styles.skillItem}>
                        {skill}
                      </Text>
                    ))}
                  </View>
                </View>
              )}
              {data.skills.soft && (
                <View style={styles.skillCategory}>
                  <Text style={[styles.company, { marginBottom: 4 }]}>
                    Soft Skills
                  </Text>
                  <View style={styles.skillList}>
                    {data.skills.soft.map((skill, index) => (
                      <Text key={index} style={styles.skillItem}>
                        {skill}
                      </Text>
                    ))}
                  </View>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Education Section */}
        {data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={styles.education}>
                <View style={styles.experienceHeader}>
                  <View>
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
                {edu.achievements?.map((achievement, i) => (
                  <View key={i} style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.description}>{achievement}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Certifications Section */}
        {data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {data.certifications.map((cert, index) => (
              <View key={index} style={styles.certification}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.jobTitle}>{cert.name}</Text>
                  <Text style={styles.dates}>{cert.date}</Text>
                </View>
                <Text style={styles.company}>{cert.issuer}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}

import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

// Register fonts - Using a modern geometric sans-serif
Font.register({
  family: 'Nunito',
  fonts: [
    {
      src: 'https://fonts.cdnfonts.com/s/15604/Nunito-Regular.woff',
      fontWeight: 400,
    },
    {
      src: 'https://fonts.cdnfonts.com/s/15604/Nunito-ExtraBold.woff',
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
    padding: 50,
    fontFamily: 'Nunito',
    fontSize: 10,
    color: '#2d3748',
  },
  header: {
    marginBottom: 25,
    borderBottomWidth: 3,
    borderBottomColor: '#667eea',
    paddingBottom: 15,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flex: 2,
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  name: {
    fontSize: 26,
    fontWeight: 600,
    color: '#1a202c',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 14,
    color: '#667eea',
    marginTop: 2,
  },
  contactText: {
    fontSize: 9,
    color: '#4a5568',
    marginBottom: 2,
    textAlign: 'right',
  },
  summary: {
    marginTop: 12,
    fontSize: 10,
    color: '#4a5568',
    lineHeight: 1.5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: '#1a202c',
    marginBottom: 12,
    paddingLeft: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#667eea',
  },
  experienceItem: {
    marginBottom: 15,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 600,
    color: '#2d3748',
  },
  company: {
    fontSize: 11,
    color: '#667eea',
  },
  locationDate: {
    fontSize: 10,
    color: '#718096',
  },
  description: {
    fontSize: 10,
    color: '#4a5568',
    lineHeight: 1.5,
    marginTop: 4,
  },
  achievementList: {
    marginTop: 6,
    paddingLeft: 12,
  },
  achievementItem: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bullet: {
    width: 10,
    fontSize: 10,
  },
  achievementText: {
    flex: 1,
    fontSize: 10,
    color: '#4a5568',
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    marginTop: 8,
  },
  skillCategory: {
    flex: 1,
    minWidth: '45%',
  },
  skillCategoryTitle: {
    fontSize: 11,
    fontWeight: 600,
    color: '#4a5568',
    marginBottom: 6,
  },
  skillList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skill: {
    fontSize: 10,
    color: '#667eea',
    backgroundColor: '#ebf4ff',
    padding: '3 8',
    borderRadius: 12,
    marginBottom: 4,
  },
  educationGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  educationItem: {
    width: '45%',
    backgroundColor: '#f7fafc',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  certificationItem: {
    marginBottom: 8,
  },
});

export function Modern({ data }: { data: ResumeData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <Text style={styles.name}>{data.personalInfo.name}</Text>
              <Text style={styles.title}>{data.personalInfo.title}</Text>
            </View>
            <View style={styles.headerRight}>
              <Text style={styles.contactText}>{data.personalInfo.email}</Text>
              <Text style={styles.contactText}>{data.personalInfo.phone}</Text>
              <Text style={styles.contactText}>
                {data.personalInfo.location}
              </Text>
              {data.personalInfo.linkedin && (
                <Text style={styles.contactText}>
                  {data.personalInfo.linkedin}
                </Text>
              )}
              {data.personalInfo.portfolio && (
                <Text style={styles.contactText}>
                  {data.personalInfo.portfolio}
                </Text>
              )}
            </View>
          </View>
          {data.personalInfo.summary && (
            <Text style={styles.summary}>{data.personalInfo.summary}</Text>
          )}
        </View>

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
                  <Text style={styles.locationDate}>
                    {exp.startDate} - {exp.endDate}
                  </Text>
                </View>
                <Text style={styles.description}>{exp.description}</Text>
                {exp.achievements && (
                  <View style={styles.achievementList}>
                    {exp.achievements.map((achievement, i) => (
                      <View key={i} style={styles.achievementItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.achievementText}>
                          {achievement}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills Section */}
        {(data.skills.technical ||
          data.skills.soft ||
          data.skills.languages) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills & Expertise</Text>
            <View style={styles.skillsGrid}>
              {data.skills.technical && (
                <View style={styles.skillCategory}>
                  <Text style={styles.skillCategoryTitle}>
                    Technical Skills
                  </Text>
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
          </View>
        )}

        {/* Education Section */}
        {data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            <View style={styles.educationGrid}>
              {data.education.map((edu, index) => (
                <View key={index} style={styles.educationItem}>
                  <Text style={styles.jobTitle}>{edu.degree}</Text>
                  <Text style={styles.company}>{edu.school}</Text>
                  <Text style={styles.locationDate}>{edu.location}</Text>
                  <Text style={styles.locationDate}>{edu.graduationDate}</Text>
                  {edu.gpa && (
                    <Text style={styles.description}>GPA: {edu.gpa}</Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Certifications Section */}
        {data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {data.certifications.map((cert, index) => (
              <View key={index} style={styles.certificationItem}>
                <View style={styles.experienceHeader}>
                  <View>
                    <Text style={styles.jobTitle}>{cert.name}</Text>
                    <Text style={styles.company}>{cert.issuer}</Text>
                  </View>
                  <Text style={styles.locationDate}>{cert.date}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}

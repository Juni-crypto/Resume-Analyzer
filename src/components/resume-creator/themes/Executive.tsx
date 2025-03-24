import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

// Register fonts - Using Garamond for a more sophisticated look
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

// Using same ResumeData interface for consistency
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
    fontFamily: 'Inter',
    fontSize: 11,
    lineHeight: 1.6,
    color: '#1a202c',
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: '#2d3748',
    paddingBottom: 20,
    marginBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  nameTitle: {
    flex: 1,
  },
  name: {
    fontSize: 28,
    letterSpacing: 0.5,
    color: '#1a202c',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    color: '#4a5568',
  },
  contactDetails: {
    flex: 1,
    alignItems: 'flex-end',
  },
  contactText: {
    fontSize: 11,
    color: '#4a5568',
    marginBottom: 2,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    letterSpacing: 0.5,
    color: '#2d3748',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 4,
  },
  experienceItem: {
    marginBottom: 15,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  positionTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: '#2d3748',
  },
  company: {
    fontSize: 12,
    color: '#4a5568',
  },
  dates: {
    fontSize: 11,
    color: '#718096',
    fontStyle: 'italic',
  },
  description: {
    fontSize: 11,
    color: '#4a5568',
    marginTop: 4,
    lineHeight: 1.6,
  },
  achievementList: {
    marginTop: 6,
    paddingLeft: 12,
  },
  achievement: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  bullet: {
    width: 10,
    fontSize: 11,
  },
  achievementText: {
    flex: 1,
    fontSize: 11,
    color: '#4a5568',
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  skillCategory: {
    flex: 1,
    minWidth: '45%',
  },
  skillCategoryTitle: {
    fontSize: 12,
    color: '#2d3748',
    marginBottom: 6,
    fontWeight: 600,
  },
  skillList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skill: {
    fontSize: 11,
    color: '#4a5568',
  },
  educationItem: {
    marginBottom: 10,
  },
  certification: {
    marginBottom: 8,
  },
});

export function Executive({ data }: { data: ResumeData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.nameTitle}>
              <Text style={styles.name}>
                {data.personalInfo.name.toUpperCase()}
              </Text>
              <Text style={styles.title}>{data.personalInfo.title}</Text>
            </View>
            <View style={styles.contactDetails}>
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
            </View>
          </View>
          {data.personalInfo.summary && (
            <Text style={styles.description}>{data.personalInfo.summary}</Text>
          )}
        </View>

        {/* Experience Section */}
        {data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</Text>
            {data.experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <View>
                    <Text style={styles.positionTitle}>{exp.title}</Text>
                    <Text style={styles.company}>
                      {exp.company} | {exp.location}
                    </Text>
                  </View>
                  <Text style={styles.dates}>
                    {exp.startDate} - {exp.endDate}
                  </Text>
                </View>
                <Text style={styles.description}>{exp.description}</Text>
                {exp.achievements && (
                  <View style={styles.achievementList}>
                    {exp.achievements.map((achievement, i) => (
                      <View key={i} style={styles.achievement}>
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
            <Text style={styles.sectionTitle}>EXPERTISE</Text>
            <View style={styles.skillsGrid}>
              {data.skills.technical && (
                <View style={styles.skillCategory}>
                  <Text style={styles.skillCategoryTitle}>
                    Technical Proficiencies
                  </Text>
                  <Text style={styles.skill}>
                    {data.skills.technical.join(' • ')}
                  </Text>
                </View>
              )}
              {data.skills.soft && (
                <View style={styles.skillCategory}>
                  <Text style={styles.skillCategoryTitle}>
                    Leadership Competencies
                  </Text>
                  <Text style={styles.skill}>
                    {data.skills.soft.join(' • ')}
                  </Text>
                </View>
              )}
              {data.skills.languages && (
                <View style={styles.skillCategory}>
                  <Text style={styles.skillCategoryTitle}>Languages</Text>
                  <Text style={styles.skill}>
                    {data.skills.languages.join(' • ')}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Education Section */}
        {data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>EDUCATION</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <View style={styles.experienceHeader}>
                  <View>
                    <Text style={styles.positionTitle}>{edu.degree}</Text>
                    <Text style={styles.company}>
                      {edu.school} | {edu.location}
                    </Text>
                  </View>
                  <Text style={styles.dates}>{edu.graduationDate}</Text>
                </View>
                {edu.achievements && (
                  <View style={styles.achievementList}>
                    {edu.achievements.map((achievement, i) => (
                      <View key={i} style={styles.achievement}>
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

        {/* Certifications Section */}
        {data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
            {data.certifications.map((cert, index) => (
              <View key={index} style={styles.certification}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.positionTitle}>{cert.name}</Text>
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

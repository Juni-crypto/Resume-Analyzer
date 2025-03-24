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

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Inter',
    fontSize: 11,
    color: '#2d3748',
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 600,
    marginBottom: 4,
    color: '#1a202c',
  },
  title: {
    fontSize: 14,
    color: '#4a5568',
    marginBottom: 8,
  },
  contact: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  contactItem: {
    fontSize: 10,
    color: '#4a5568',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 8,
    color: '#1a202c',
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  experienceItem: {
    marginBottom: 12,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 600,
    color: '#2d3748',
  },
  company: {
    fontSize: 11,
    color: '#4a5568',
    marginBottom: 4,
  },
  dates: {
    fontSize: 10,
    color: '#718096',
  },
  description: {
    fontSize: 10,
    color: '#4a5568',
    marginTop: 4,
    lineHeight: 1.4,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skill: {
    fontSize: 10,
    color: '#4a5568',
    backgroundColor: '#f7fafc',
    padding: '4 8',
    borderRadius: 4,
  },
  educationItem: {
    marginBottom: 8,
  },
  bullet: {
    width: 2,
    height: 2,
    backgroundColor: '#718096',
    borderRadius: 1,
    marginRight: 6,
    marginTop: 6,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    color: '#4a5568',
  },
});

export function Minimal({ data }: { data: any }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.name}</Text>
          <Text style={styles.title}>{data.personalInfo.title}</Text>
          <View style={styles.contact}>
            <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
            <Text style={styles.contactItem}>•</Text>
            <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>
            <Text style={styles.contactItem}>•</Text>
            <Text style={styles.contactItem}>{data.personalInfo.location}</Text>
          </View>
          {data.personalInfo.summary && (
            <Text style={styles.description}>{data.personalInfo.summary}</Text>
          )}
        </View>

        {/* Skills */}
        {(data.skills.technical?.length > 0 ||
          data.skills.soft?.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsGrid}>
              {data.skills.technical?.map((skill: string, index: number) => (
                <Text key={index} style={styles.skill}>
                  {skill}
                </Text>
              ))}
              {data.skills.soft?.map((skill: string, index: number) => (
                <Text key={index} style={styles.skill}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.experience.map((exp: any, index: number) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.jobTitle}>{exp.title}</Text>
                <Text style={styles.company}>
                  {exp.company} • {exp.location}
                </Text>
                <Text style={styles.dates}>
                  {exp.startDate} - {exp.endDate}
                </Text>
                <Text style={styles.description}>{exp.description}</Text>
                {exp.achievements?.map((achievement: string, i: number) => (
                  <View key={i} style={{ flexDirection: 'row', marginTop: 4 }}>
                    <View style={styles.bullet} />
                    <Text style={styles.bulletText}>{achievement}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu: any, index: number) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.jobTitle}>{edu.degree}</Text>
                <Text style={styles.company}>
                  {edu.school} • {edu.location}
                </Text>
                <Text style={styles.dates}>{edu.graduationDate}</Text>
                {edu.gpa && (
                  <Text style={styles.description}>GPA: {edu.gpa}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {data.certifications?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {data.certifications.map((cert: any, index: number) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.jobTitle}>{cert.name}</Text>
                <Text style={styles.company}>{cert.issuer}</Text>
                <Text style={styles.dates}>{cert.date}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}

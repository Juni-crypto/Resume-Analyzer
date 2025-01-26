import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Moon,
  Sun,
  Github,
  Linkedin,
  Briefcase,
  GraduationCap,
  Award,
  Code2,
  Rocket,
  ExternalLink,
} from 'lucide-react';
import { SkillsChart } from '../SkillsChart';
import { getSocialLink, getContactLink, getWorkTogetherSection } from '../../../utils/contactHelpers';

interface ModernProps {
  data: any;
  isDarkMode?: boolean;
}

export function Modern({ data, isDarkMode = false }: ModernProps) {
  const { sharable_resume: resume } = data;

  return (
    <div className="min-h-screen transition-colors duration-300">
      <header className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">{resume.name}</h1>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {getContactLink(resume.email, Mail, 'email')}
              {getContactLink(resume.contact_information?.phone, Phone, 'phone')}
              {getContactLink(resume.contact_information?.address, MapPin, 'location')}
            </div>
            <div className="flex justify-center gap-4">
              {getSocialLink(resume.contact_information?.github, Github, 'GitHub')}
              {getSocialLink(resume.contact_information?.linkedin, Linkedin, 'LinkedIn')}
              {/* Add other social links as needed */}
            </div>
          </motion.div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Skills Section */}
        {resume.skills?.length > 0 && (
          <section className="mb-16">
            <h2 className={`text-3xl font-bold mb-8 flex items-center gap-2 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <Code2 className="w-8 h-8 text-blue-600" />
              Skills
            </h2>
            <SkillsChart skills={resume.skills} isDarkMode={isDarkMode} />
          </section>
        )}

        {/* Experience Section */}
        {resume.experience?.length > 0 && (
          <section className="mb-16">
            <h2 className={`text-3xl font-bold mb-8 flex items-center gap-2 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <Briefcase className="w-8 h-8 text-blue-600" />
              Experience
            </h2>
            <div className="space-y-12">
              {resume.experience.map((exp: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-8 rounded-2xl ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                  } shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <h3 className="text-2xl font-bold mb-2">{exp.role}</h3>
                  <p className="text-blue-600 mb-4">
                    {exp.company} • {exp.duration}
                  </p>
                  <ul className="space-y-3">
                    {exp.responsibilities?.map((resp: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className={`w-2 h-2 mt-2 rounded-full ${
                          isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
                        }`} />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                  {exp.technologies_used && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {exp.technologies_used.map((tech: string, idx: number) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 rounded-full text-sm ${
                            isDarkMode
                              ? 'bg-gray-700 text-gray-300'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {resume.projects?.length > 0 && (
          <section className="mb-16">
            <h2 className={`text-3xl font-bold mb-8 flex items-center gap-2 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <Rocket className="w-8 h-8 text-blue-600" />
              Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {resume.projects.map((project: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-8 rounded-2xl ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                  } shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">{project.name}</h3>
                    <ExternalLink className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-sm mb-4">{project.description}</p>
                  {project.technologies && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech: string, idx: number) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 rounded-full text-sm ${
                            isDarkMode
                              ? 'bg-gray-700 text-gray-300'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Education Section */}
          {resume.education?.length > 0 && (
            <section>
              <h2 className={`text-3xl font-bold mb-8 flex items-center gap-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <GraduationCap className="w-8 h-8 text-blue-600" />
                Education
              </h2>
              <div className="space-y-6">
                {resume.education.map((edu: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-6 rounded-xl ${
                      isDarkMode ? 'bg-gray-800' : 'bg-white'
                    } shadow-lg`}
                  >
                    <h3 className="text-lg font-bold">{edu.institution}</h3>
                    <p className="text-blue-600">{edu.degree}</p>
                    <p className="text-sm mt-2">{edu.year}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications Section */}
          {resume.certifications?.length > 0 && (
            <section>
              <h2 className={`text-3xl font-bold mb-8 flex items-center gap-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <Award className="w-8 h-8 text-blue-600" />
                Certifications
              </h2>
              <div className="space-y-4">
                {resume.certifications.map((cert: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl ${
                      isDarkMode ? 'bg-gray-800' : 'bg-white'
                    } shadow-lg`}
                  >
                    <p className="font-medium">{cert}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Add Work Together section */}
        <section className="mt-16">
          {getWorkTogetherSection(resume.email, resume.name, isDarkMode)}
        </section>
      </main>
    </div>
  );
}
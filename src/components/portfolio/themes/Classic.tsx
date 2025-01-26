import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Moon,
  Sun,
  Award,
  Code2,
  ExternalLink,
  Github,
  Linkedin,
} from 'lucide-react';
import { getSocialLink, getContactLink, getWorkTogetherSection } from '../../../utils/contactHelpers';

export function Classic({ data }: { data: any }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { sharable_resume: resume } = data;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Theme Toggle */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`fixed top-4 right-4 p-3 rounded-full ${
          isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-700'
        } shadow-lg z-50`}
      >
        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <div className="max-w-5xl mx-auto p-8">
        {/* Header */}
        <header className={`${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-lg shadow-lg p-8 mb-8`}>
          <h1 className="text-4xl font-bold mb-2">{resume.name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-2">
              {getContactLink(resume.email, Mail, 'email')}
            </div>
            {resume.contact_information?.phone && (
              <div className="flex items-center gap-2">
                {getContactLink(resume.contact_information?.phone, Phone, 'phone')}
              </div>
            )}
            {resume.contact_information?.address && (
              <div className="flex items-center gap-2">
                {getContactLink(resume.contact_information?.address, MapPin, 'location')}
              </div>
            )}
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {getSocialLink(resume.contact_information?.github, Github, 'GitHub')}
            {getSocialLink(resume.contact_information?.linkedin, Linkedin, 'LinkedIn')}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Summary */}
            {resume.summary && (
              <section className={`${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } rounded-lg shadow-lg p-6`}>
                <h2 className="text-2xl font-bold mb-4">Professional Summary</h2>
                <p className="leading-relaxed">{resume.summary}</p>
              </section>
            )}

            {/* Experience */}
            {resume.experience?.length > 0 && (
              <section className={`${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } rounded-lg shadow-lg p-6`}>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-blue-500" />
                  Experience
                </h2>
                <div className="space-y-6">
                  {resume.experience.map((exp: any, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-l-2 border-blue-500 pl-4"
                    >
                      <h3 className="font-bold text-xl">{exp.role}</h3>
                      <p className="text-blue-500 mb-2">{exp.company} • {exp.duration}</p>
                      <ul className="list-disc list-inside space-y-2">
                        {exp.responsibilities?.map((resp: string, idx: number) => (
                          <li key={idx} className="text-sm">{resp}</li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Skills */}
            {resume.skills?.length > 0 && (
              <section className={`${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } rounded-lg shadow-lg p-6`}>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Code2 className="w-6 h-6 text-blue-500" />
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {resume.skills.map((skill: string, index: number) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className={`px-3 py-1 rounded-full text-sm ${
                        isDarkMode
                          ? 'bg-blue-900/50 text-blue-200'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {resume.education?.length > 0 && (
              <section className={`${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } rounded-lg shadow-lg p-6`}>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-blue-500" />
                  Education
                </h2>
                <div className="space-y-4">
                  {resume.education.map((edu: any, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <h3 className="font-bold">{edu.institution}</h3>
                      <p className="text-blue-500">{edu.degree}</p>
                      <p className="text-sm">{edu.year}</p>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {resume.certifications?.length > 0 && (
              <section className={`${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } rounded-lg shadow-lg p-6`}>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Award className="w-6 h-6 text-blue-500" />
                  Certifications
                </h2>
                <ul className="space-y-2">
                  {resume.certifications.map((cert: string, index: number) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <div className={`w-2 h-2 rounded-full ${
                        isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
                      }`} />
                      <span>{cert}</span>
                    </motion.li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>

        {/* Projects */}
        {resume.projects?.length > 0 && (
          <section className={`${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } rounded-lg shadow-lg p-6 mt-8`}>
            <h2 className="text-2xl font-bold mb-6">Notable Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resume.projects.map((project: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                  } rounded-lg p-4`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold">{project.name}</h3>
                    <ExternalLink className="w-4 h-4 text-blue-500" />
                  </div>
                  <p className="text-sm mb-4">{project.description}</p>
                  {project.technologies && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech: string, idx: number) => (
                        <span
                          key={idx}
                          className={`text-xs px-2 py-1 rounded ${
                            isDarkMode
                              ? 'bg-gray-600 text-gray-200'
                              : 'bg-gray-200 text-gray-700'
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

        {/* Work Together Section */}
        <section className="mt-16">
          {getWorkTogetherSection(resume.email, resume.name, isDarkMode)}
        </section>
      </div>
    </div>
  );
}
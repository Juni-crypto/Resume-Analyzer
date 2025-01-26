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
  ArrowRight,
  User,
  Code2,
  Briefcase,
  GraduationCap,
  Award,
  Link as LinkIcon,
} from 'lucide-react';
import { getSocialLink, getContactLink, getWorkTogetherSection } from '../../../utils/contactHelpers';

export function Minimalist({ data }: { data: any }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { sharable_resume: resume } = data;

  const sectionClass = `${
    isDarkMode ? 'border-gray-800' : 'border-gray-200'
  } border-b pb-12 mb-12 last:border-0 last:pb-0 last:mb-0`;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      {/* Theme Toggle */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`fixed top-4 right-4 p-3 rounded-full ${
          isDarkMode ? 'bg-gray-900 text-yellow-400' : 'bg-gray-100 text-gray-900'
        } z-50 hover:scale-110 transition-transform`}
      >
        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <div className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <header className={sectionClass}>
          <div className="flex items-center gap-6 mb-8">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
              isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
            }`}>
              <User className={`w-10 h-10 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`} />
            </div>
            <div>
              <h1 className="text-4xl font-light mb-2">{resume.name}</h1>
              <div className="flex flex-wrap gap-4">
                {getContactLink(resume.email, Mail, 'email')}
                {getContactLink(resume.contact_information?.phone, Phone, 'phone')}
                {getContactLink(resume.contact_information?.address, MapPin, 'location')}
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            {getSocialLink(resume.contact_information?.github, Github, 'GitHub')}
            {getSocialLink(resume.contact_information?.linkedin, Linkedin, 'LinkedIn')}
          </div>
        </header>

        {/* Summary */}
        {resume.summary && (
          <section className={sectionClass}>
            <p className="text-lg leading-relaxed">{resume.summary}</p>
          </section>
        )}

        {/* Skills */}
        {resume.skills?.length > 0 && (
          <section className={sectionClass}>
            <div className="flex items-center gap-3 mb-6">
              <Code2 className="w-6 h-6 text-blue-500" />
              <h2 className="text-2xl font-light">Skills</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {resume.skills.map((skill: string, index: number) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`px-4 py-2 rounded-full text-sm ${
                    isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
                  } hover:scale-105 transition-transform`}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {resume.experience?.length > 0 && (
          <section className={sectionClass}>
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="w-6 h-6 text-blue-500" />
              <h2 className="text-2xl font-light">Experience</h2>
            </div>
            <div className="space-y-12">
              {resume.experience.map((exp: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-8"
                >
                  <div className={`absolute left-0 top-2 w-2 h-2 rounded-full ${
                    isDarkMode ? 'bg-white' : 'bg-black'
                  }`} />
                  <h3 className="text-xl font-medium">{exp.role}</h3>
                  <p className="text-blue-500 mb-4">
                    {exp.company} • {exp.duration}
                  </p>
                  <ul className="space-y-2">
                    {exp.responsibilities?.map((resp: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 mt-1 shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                  {exp.technologies_used && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {exp.technologies_used.map((tech: string, idx: number) => (
                        <span
                          key={idx}
                          className={`text-xs px-3 py-1 rounded-full ${
                            isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
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

        {/* Projects */}
        {resume.projects?.length > 0 && (
          <section className={sectionClass}>
            <h2 className="text-2xl font-light mb-6">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {resume.projects.map((project: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-xl ${
                    isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
                  } hover:scale-105 transition-transform`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-medium">{project.name}</h3>
                    <LinkIcon className="w-4 h-4 text-blue-500" />
                  </div>
                  <p className="text-sm mb-4">{project.description}</p>
                  {project.technologies && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech: string, idx: number) => (
                        <span
                          key={idx}
                          className={`text-xs px-2 py-1 rounded-full ${
                            isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
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

        {/* Education & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {resume.education?.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="w-6 h-6 text-blue-500" />
                <h2 className="text-2xl font-light">Education</h2>
              </div>
              <div className="space-y-6">
                {resume.education.map((edu: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:translate-x-2 transition-transform"
                  >
                    <h3 className="font-medium">{edu.institution}</h3>
                    <p className="text-blue-500">{edu.degree}</p>
                    <p className="text-sm">{edu.year}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {resume.certifications?.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-6 h-6 text-blue-500" />
                <h2 className="text-2xl font-light">Certifications</h2>
              </div>
              <ul className="space-y-3">
                {resume.certifications.map((cert: string, index: number) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-2 p-3 rounded-lg ${
                      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
                    } hover:scale-105 transition-transform`}
                  >
                    <div className={`w-1 h-1 rounded-full ${
                      isDarkMode ? 'bg-white' : 'bg-black'
                    }`} />
                    <span>{cert}</span>
                  </motion.li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Work Together Section */}
        <section className="mt-16">
          {getWorkTogetherSection(resume.email, resume.name, isDarkMode)}
        </section>
      </div>
    </div>
  );
}
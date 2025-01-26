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
  User,
  Link as LinkIcon,
} from 'lucide-react';
import { getSocialLink, getContactLink, getWorkTogetherSection } from '../../../utils/contactHelpers';

export function Bento({ data }: { data: any }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { sharable_resume: resume } = data;

  const bentoItemClass = `${
    isDarkMode ? 'bg-gray-800' : 'bg-white'
  } rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-lg border border-white/20`;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'
      }`}
    >
      {/* Theme Toggle */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`fixed top-4 right-4 p-3 rounded-full ${
          isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-900'
        } shadow-lg z-50`}
      >
        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <div className="max-w-7xl mx-auto p-8">
        {/* Header - Large Bento Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${bentoItemClass} mb-8`}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <User className="w-16 h-16 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold mb-4">{resume.name}</h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                {getContactLink(resume.email, Mail, 'email')}
                {getContactLink(resume.contact_information?.phone, Phone, 'phone')}
                {getContactLink(resume.contact_information?.address, MapPin, 'location')}
              </div>
              <div className="flex justify-center md:justify-start gap-4 mt-4">
                {getSocialLink(resume.contact_information?.github, Github, 'GitHub')}
                {getSocialLink(resume.contact_information?.linkedin, Linkedin, 'LinkedIn')}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Summary */}
          {resume.summary && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${bentoItemClass} lg:col-span-2`}
            >
              <h2 className="text-2xl font-bold mb-4">About Me</h2>
              <p className="leading-relaxed">{resume.summary}</p>
            </motion.div>
          )}

          {/* Skills */}
          {resume.skills?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={bentoItemClass}
            >
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="w-6 h-6 text-blue-500" />
                <h2 className="text-2xl font-bold">Skills</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {resume.skills.map((skill: string, index: number) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      isDarkMode
                        ? 'bg-gray-700 text-gray-100'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Experience */}
          {resume.experience?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${bentoItemClass} lg:col-span-2`}
            >
              <div className="flex items-center gap-2 mb-6">
                <Briefcase className="w-6 h-6 text-blue-500" />
                <h2 className="text-2xl font-bold">Experience</h2>
              </div>
              <div className="space-y-6">
                {resume.experience.map((exp: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl ${
                      isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                    }`}
                  >
                    <h3 className="text-xl font-bold">{exp.role}</h3>
                    <p className="text-blue-500 mb-2">
                      {exp.company} • {exp.duration}
                    </p>
                    <ul className="space-y-2">
                      {exp.responsibilities?.map((resp: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 mt-2 rounded-full bg-blue-500" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                    {exp.technologies_used && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {exp.technologies_used.map((tech: string, idx: number) => (
                          <span
                            key={idx}
                            className={`text-xs px-2 py-1 rounded-md ${
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
            </motion.div>
          )}

          {/* Projects */}
          {resume.projects?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${bentoItemClass} lg:col-span-3`}
            >
              <div className="flex items-center gap-2 mb-6">
                <Rocket className="w-6 h-6 text-blue-500" />
                <h2 className="text-2xl font-bold">Projects</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resume.projects.map((project: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl ${
                      isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold">{project.name}</h3>
                      <LinkIcon className="w-4 h-4 text-blue-500" />
                    </div>
                    <p className="text-sm mb-4">{project.description}</p>
                    {project.technologies && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech: string, idx: number) => (
                          <span
                            key={idx}
                            className={`text-xs px-2 py-1 rounded-md ${
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
            </motion.div>
          )}

          {/* Education */}
          {resume.education?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={bentoItemClass}
            >
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap className="w-6 h-6 text-blue-500" />
                <h2 className="text-2xl font-bold">Education</h2>
              </div>
              <div className="space-y-4">
                {resume.education.map((edu: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl ${
                      isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                    }`}
                  >
                    <h3 className="font-bold">{edu.institution}</h3>
                    <p className="text-blue-500">{edu.degree}</p>
                    <p className="text-sm mt-1">{edu.year}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Certifications */}
          {resume.certifications?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={bentoItemClass}
            >
              <div className="flex items-center gap-2 mb-6">
                <Award className="w-6 h-6 text-blue-500" />
                <h2 className="text-2xl font-bold">Certifications</h2>
              </div>
              <div className="space-y-3">
                {resume.certifications.map((cert: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-3 rounded-lg ${
                      isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                    }`}
                  >
                    {cert}
                  </motion.div>
                ))}
              </div>
            </motion.div>
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
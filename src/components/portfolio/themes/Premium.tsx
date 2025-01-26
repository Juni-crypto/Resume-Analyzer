import React from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  Briefcase,
  Code2,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Rocket,
  Zap,
  Moon,
  Sun,
  Trophy,
} from 'lucide-react';
import { getSocialLink, getContactLink, getWorkTogetherSection } from '../../../utils/contactHelpers';

export function Premium({ data, isDarkMode }: { data: any; isDarkMode: boolean }) {
  const { sharable_resume: resume } = data;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white'
          : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'
      }`}
    >
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`
            ${isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-white/20'}
            backdrop-blur-lg rounded-3xl p-8 shadow-xl border mb-6
          `}
        >
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-4xl font-bold text-white">
              {resume.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{resume.name}</h1>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Summary Section */}
          {resume.summary && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`
                lg:col-span-3
                ${isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-white/20'}
                backdrop-blur-lg rounded-3xl p-6 shadow-xl border
              `}
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Rocket className="w-5 h-5 text-purple-600" />
                Professional Summary
              </h2>
              <p className="leading-relaxed">{resume.summary}</p>
            </motion.div>
          )}

          {/* Experience Section */}
          {resume.experience?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`
                lg:col-span-2
                ${isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-white/20'}
                backdrop-blur-lg rounded-3xl p-6 shadow-xl border
              `}
            >
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-green-600" />
                Professional Experience
              </h2>
              <div className="space-y-6">
                {resume.experience.map((exp: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-6 border-l-2 border-green-500"
                  >
                    <h3 className="font-semibold">{exp.role}</h3>
                    <p className="text-sm mb-2">{exp.company} • {exp.duration}</p>
                    {exp.responsibilities?.length > 0 && (
                      <ul className="space-y-2">
                        {exp.responsibilities.map((resp: string, idx: number) => (
                          <li key={idx} className="text-sm">• {resp}</li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Skills Section */}
          {resume.skills?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`
                lg:col-span-1
                ${isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-white/20'}
                backdrop-blur-lg rounded-3xl p-6 shadow-xl border
              `}
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {resume.skills.map((skill: string, index: number) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={`
                      px-3 py-1 rounded-full text-sm
                      ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}
                    `}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Education Section */}
          {resume.education?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`
                lg:col-span-3
                ${isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-white/20'}
                backdrop-blur-lg rounded-3xl p-6 shadow-xl border
              `}
            >
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                Education
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resume.education.map((edu: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`
                      p-4 rounded-xl
                      ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}
                    `}
                  >
                    <h3 className="font-semibold">{edu.institution}</h3>
                    <p className="text-sm">{edu.degree}</p>
                    <p className="text-sm opacity-75">{edu.year}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Projects Section */}
          {resume.projects?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`
                lg:col-span-3
                ${isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-white/20'}
                backdrop-blur-lg rounded-3xl p-6 shadow-xl border
              `}
            >
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-purple-600" />
                Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resume.projects.map((project: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`
                      p-4 rounded-xl
                      ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}
                    `}
                  >
                    <h3 className="font-semibold">{project.name}</h3>
                    <p className="text-sm mt-2">{project.description}</p>
                    {project.technologies && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.technologies.map((tech: string, idx: number) => (
                          <span
                            key={idx}
                            className={`
                              text-xs px-2 py-1 rounded
                              ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}
                            `}
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
        </div>

        {/* Work Together Section */}
        <section className="mt-16">
          {getWorkTogetherSection(resume.email, resume.name, isDarkMode)}
        </section>
      </div>
    </div>
  );
}

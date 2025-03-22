import React from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Briefcase,
  GraduationCap,
  Award,
  Code2,
  Rocket,
  Link as LinkIcon,
} from 'lucide-react';
import { getSocialLink, getContactLink, getWorkTogetherSection } from '../../../utils/contactHelpers';

export function Bento({ data, isDarkMode }: { data: any; isDarkMode: boolean }) {
  const { sharable_resume: resume } = data;

  const bentoItemClass = `${
    isDarkMode ? 'bg-gray-800/90 text-gray-100' : 'bg-white/90 text-gray-900'
  } rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-lg border ${
    isDarkMode ? 'border-gray-700' : 'border-gray-200'
  } hover:scale-[1.02]`;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      } relative`}
    >
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.2]" 
           style={{
             backgroundImage: `linear-gradient(to right, ${isDarkMode ? '#ffffff10' : '#00000010'} 1px, transparent 1px),
                              linear-gradient(to bottom, ${isDarkMode ? '#ffffff10' : '#00000010'} 1px, transparent 1px)`,
             backgroundSize: '24px 24px'
           }} 
      />

      <div className="max-w-7xl mx-auto p-8 relative">
        {/* Header - Large Bento Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${bentoItemClass} mb-8 relative overflow-hidden`}
        >
          <div className="absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center transform rotate-3 hover:rotate-0 transition-all duration-300">
              <span className="text-4xl font-bold text-white">
                {resume.name.split(' ').map(n => n[0]).join('')}
              </span>
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

        {/* Grid Layout with improved gap and animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {/* Summary with decorative elements */}
          {resume.summary && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${bentoItemClass} lg:col-span-2 relative overflow-hidden group`}
            >
              <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              <h2 className="text-2xl font-bold mb-4">About Me</h2>
              <p className="leading-relaxed">{resume.summary}</p>
            </motion.div>
          )}

          {/* Skills with improved visual hierarchy */}
          {resume.skills?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${bentoItemClass} relative overflow-hidden`}
            >
              <div className="absolute -left-20 -top-20 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
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
                    className={`px-3 py-1 rounded-lg text-sm border ${
                      isDarkMode
                        ? 'bg-gray-700/50 border-gray-600 text-gray-100'
                        : 'bg-gray-50/50 border-gray-200 text-gray-800'
                    } hover:border-blue-500 transition-colors duration-300`}
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

        {/* Work Together Section with enhanced styling */}
        <section className="mt-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${bentoItemClass} text-center relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50" />
            {getWorkTogetherSection(resume.email, resume.name, isDarkMode)}
          </motion.div>
        </section>
      </div>
    </div>
  );
}
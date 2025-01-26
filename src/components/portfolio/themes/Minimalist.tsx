import React from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
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

export function Minimalist({ data, isDarkMode }: { data: any; isDarkMode: boolean }) {
  const { sharable_resume: resume } = data;

  const sectionClass = `${
    isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'
  } border-b pb-12 mb-12 last:border-0 last:pb-0 last:mb-0 relative`;

  // Floating animation variant
  const floatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100' 
          : 'bg-gradient-to-br from-white via-gray-50 to-white text-gray-900'
      }`}
    >
      {/* Background Patterns */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, ${isDarkMode ? 'white' : 'black'} 2%, transparent 0%)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="max-w-4xl mx-auto p-8 relative">
        {/* Header with enhanced animations */}
        <header className={`${sectionClass} overflow-hidden`}>
          <motion.div 
            className="flex items-center gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              variants={floatingAnimation}
              initial="initial"
              animate="animate"
              className={`w-24 h-24 rounded-full flex items-center justify-center relative ${
                isDarkMode ? 'bg-gradient-to-br from-blue-600 to-purple-600' : 'bg-gradient-to-br from-blue-500 to-purple-500'
              } shadow-2xl`}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 animate-pulse" />
              <div className="relative">
                <span className="text-3xl font-bold text-white">
                  {resume.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </motion.div>
            <div>
              <h1 className="text-4xl font-light mb-2">{resume.name}</h1>
              <div className="flex flex-wrap gap-4">
                {getContactLink(resume.email, Mail, 'email')}
                {getContactLink(resume.contact_information?.phone, Phone, 'phone')}
                {getContactLink(resume.contact_information?.address, MapPin, 'location')}
              </div>
            </div>
          </motion.div>
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

        {/* Skills with enhanced visual design */}
        {resume.skills?.length > 0 && (
          <section className={sectionClass}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-3"
            >
              {resume.skills.map((skill: string, index: number) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.05,
                    duration: 0.4,
                    type: "spring",
                    stiffness: 100 
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    color: isDarkMode ? '#60A5FA' : '#2563EB',
                    transition: { duration: 0.2 }
                  }}
                  className={`px-4 py-2 rounded-full text-sm cursor-default ${
                    isDarkMode 
                      ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' 
                      : 'bg-white/50 backdrop-blur-sm border border-gray-200/50'
                  }`}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </section>
        )}

        {/* Experience with timeline effect */}
        {resume.experience?.length > 0 && (
          <section className={sectionClass}>
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="w-6 h-6 text-blue-500" />
              <h2 className="text-2xl font-light">Experience</h2>
            </div>
            <div className="space-y-12 relative">
              <div className={`absolute left-0 top-0 bottom-0 w-px ${
                isDarkMode ? 'bg-gradient-to-b from-blue-500 via-purple-500 to-transparent' : 'bg-gradient-to-b from-blue-600 via-purple-600 to-transparent'
              }`} />
              {resume.experience.map((exp: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative pl-8 group"
                >
                  <motion.div 
                    className={`absolute left-0 top-2 w-2 h-2 rounded-full ${
                      isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
                    } group-hover:scale-150 transition-transform duration-300`}
                    whileHover={{ scale: 1.5 }}
                  />
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
                            isDarkMode 
                              ? 'bg-gray-800 text-gray-200' 
                              : 'bg-gray-100 text-gray-800'
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

        {/* Projects with enhanced cards */}
        {resume.projects?.length > 0 && (
          <section className={sectionClass}>
            <h2 className="text-2xl font-light mb-6">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {resume.projects.map((project: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-xl backdrop-blur-sm ${
                    isDarkMode 
                      ? 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50' 
                      : 'bg-white/50 hover:bg-gray-50/50 border border-gray-200/50'
                  } transition-all duration-300`}
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
                            isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-800'
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
                    className={`hover:translate-x-2 transition-transform ${
                      isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'
                    }`}
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
                      isDarkMode 
                        ? 'bg-gray-800 hover:bg-gray-700' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    } hover:scale-105 transition-all`}
                  >
                    <div className={`w-1 h-1 rounded-full ${
                      isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
                    }`} />
                    <span>{cert}</span>
                  </motion.li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Enhanced Work Together Section */}
        <motion.section 
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className={`relative overflow-hidden rounded-2xl ${
            isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'
          } backdrop-blur-sm border ${
            isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'
          }`}>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />
            <div className="relative p-8">
              {getWorkTogetherSection(resume.email, resume.name, isDarkMode)}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
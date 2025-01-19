import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  Clock,
} from 'lucide-react';
import { InitialsAvatar } from './InitialsAvatar';
import { SkillsChart } from './SkillsChart';

interface SharableResumeProps {
  data: any;
}

export function SharableResume({ data }: SharableResumeProps) {
  const { sharable_resume: resume } = data;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const createdDate = new Date(resume.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 relative ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white'
          : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'
      }`}
    >
      {/* Move Theme Toggle to top right */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleDarkMode}
          className={`p-3 rounded-full ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } shadow-lg hover:scale-110 transition-transform`}
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section with updated styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${
            isDarkMode
              ? 'bg-gray-800/80 border-gray-700'
              : 'bg-white/80 border-white/20'
          } backdrop-blur-lg rounded-3xl p-8 shadow-xl border mb-6 transition-colors duration-300`}
        >
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <InitialsAvatar name={resume.name} size="lg" />
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{resume.name}</h1>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <a
                  href={`mailto:${resume.email}`}
                  className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>{resume.email}</span>
                </a>
                <a
                  href={`tel:${resume.contact_information.phone}`}
                  className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>{resume.contact_information.phone}</span>
                </a>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    resume.contact_information.address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  <span>{resume.contact_information.address}</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bento Grid Layout with updated styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`lg:col-span-1 ${
              isDarkMode
                ? 'bg-gray-800/80 border-gray-700'
                : 'bg-white/80 border-white/20'
            } backdrop-blur-lg rounded-3xl p-6 shadow-xl border transition-colors duration-300`}
          >
            <div className="flex flex-col items-center justify-center text-center h-full py-8">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
              >
                <Mail
                  className={`w-16 h-16 mb-6 ${
                    isDarkMode ? 'text-purple-400' : 'text-purple-600'
                  }`}
                />
              </motion.div>
              <h2 className="text-2xl font-bold mb-4">Let's Work Together!</h2>
              <p className="mb-8 text-sm opacity-75">
                Ready to discuss your next project or opportunity?
              </p>
              <motion.a
                href={`mailto:${resume.email}?subject=Interested in Working Together&body=Hi ${resume.name},%0D%0A%0D%0AI came across your profile and would love to discuss potential opportunities.`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  px-8 py-4 rounded-full w-full max-w-xs
                  ${
                    isDarkMode
                      ? 'bg-purple-600 hover:bg-purple-500 text-white'
                      : 'bg-purple-100 hover:bg-purple-200 text-purple-700'
                  }
                  transition-all duration-300
                  flex items-center justify-center gap-2
                  font-medium text-lg
                  shadow-lg hover:shadow-xl
                `}
              >
                Contact Me
                <ChevronRight className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Summary Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`lg:col-span-2 ${
              isDarkMode
                ? 'bg-gray-800/80 border-gray-700'
                : 'bg-white/80 border-white/20'
            } backdrop-blur-lg rounded-3xl p-6 shadow-xl border transition-colors duration-300`}
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Rocket className="w-5 h-5 text-purple-600" />
              Professional Summary
            </h2>
            <p className="leading-relaxed">{resume.summary}</p>
          </motion.div>

          {/* Skills Chart Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className={`lg:col-span-3 ${
              // Changed to full width
              isDarkMode
                ? 'bg-gray-800/80 border-gray-700'
                : 'bg-white/80 border-white/20'
            } backdrop-blur-lg rounded-3xl p-6 shadow-xl border transition-colors duration-300`}
          >
            <h2
              className={`text-xl font-semibold mb-4 flex items-center gap-2 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}
            >
              <Zap
                className={`w-5 h-5 ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`}
              />
              Skills Overview
            </h2>
            <SkillsChart skills={resume.skills} isDarkMode={isDarkMode} />
          </motion.div>

          {/* Replace Projects Carousel with Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className={`lg:col-span-3 ${
              isDarkMode
                ? 'bg-gray-800/80 border-gray-700'
                : 'bg-white/80 border-white/20'
            } backdrop-blur-lg rounded-3xl p-6 shadow-xl border transition-colors duration-300`}
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-indigo-600" />
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resume.projects.map((project: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-gray-800 to-gray-700 hover:from-purple-900 hover:to-violet-900'
                      : 'bg-gradient-to-r from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100'
                  } rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                >
                  <h3 className="text-xl font-semibold mb-4">{project.name}</h3>
                  <p className="mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech: string, idx: number) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 ${
                          isDarkMode
                            ? 'bg-purple-900/50 text-purple-100'
                            : 'bg-indigo-100 text-indigo-700'
                        } rounded-full text-sm transition-colors duration-300`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="font-medium">Outcome: {project.outcome}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Experience Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className={`lg:col-span-2 ${
              isDarkMode
                ? 'bg-gray-800/80 border-gray-700'
                : 'bg-white/80 border-white/20'
            } backdrop-blur-lg rounded-3xl p-6 shadow-xl border transition-colors duration-300`}
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
                  className={`relative pl-6 border-l-2 ${
                    isDarkMode ? 'border-purple-500' : 'border-green-200'
                  }`}
                >
                  <div className="absolute left-[-9px] top-0 w-4 h-4 bg-green-500 rounded-full" />
                  <h3 className="font-semibold">{exp.role}</h3>
                  <p className="text-sm mb-2">
                    {exp.company} | {exp.duration}
                  </p>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((resp: string, idx: number) => (
                      <li key={idx} className="text-sm">
                        • {resp}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {exp.technologies_used.map((tech: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className={`${
              isDarkMode
                ? 'bg-gray-800/80 border-gray-700'
                : 'bg-white/80 border-white/20'
            } 
              backdrop-blur-lg rounded-3xl p-6 shadow-xl border transition-colors duration-300`}
          >
            <h2
              className={`text-xl font-semibold mb-4 flex items-center gap-2 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}
            >
              <GraduationCap
                className={`w-5 h-5 ${
                  isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
                }`}
              />
              Education
            </h2>
            <div className="space-y-4">
              {resume.education.map((edu: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-xl ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-yellow-900/20 to-orange-900/20 text-gray-100'
                      : 'bg-gradient-to-r from-yellow-50 to-orange-50 text-gray-900'
                  }`}
                >
                  <h3 className="font-semibold">{edu.institution}</h3>
                  <p className="text-sm">{edu.degree}</p>
                  {edu.gpa && (
                    <p className="text-yellow-600 text-sm font-medium">
                      GPA: {edu.gpa}
                    </p>
                  )}
                  {edu.year && <p className="text-sm">Year: {edu.year}</p>}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Awards Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className={`${
              isDarkMode
                ? 'bg-gray-800/80 border-gray-700'
                : 'bg-white/80 border-white/20'
            }
              backdrop-blur-lg rounded-3xl p-6 shadow-xl border transition-colors duration-300`}
          >
            <h2
              className={`text-xl font-semibold mb-4 flex items-center gap-2 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}
            >
              <Award
                className={`w-5 h-5 ${
                  isDarkMode ? 'text-rose-400' : 'text-rose-600'
                }`}
              />
              Awards & Achievements
            </h2>
            <div className="space-y-4">
              {resume.additional_sections.awards.map(
                (award: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl ${
                      isDarkMode
                        ? 'bg-gradient-to-r from-rose-900/20 to-pink-900/20 text-gray-100'
                        : 'bg-gradient-to-r from-rose-50 to-pink-50 text-gray-900'
                    }`}
                  >
                    <h3 className="font-semibold">{award.title}</h3>
                    <p className="text-sm">{award.description}</p>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>
        </div>

        {/* Created Date Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-8 text-center ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm">
            <Clock className="w-4 h-4" />
            Created: {createdDate}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

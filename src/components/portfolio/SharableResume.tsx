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
  ChevronRight,
  Moon,
  Sun,
  Clock,
  Share2,
  Copy,
  Check,
  X,
  Eye,
  Trophy,
  QrCode,
} from 'lucide-react';
import { InitialsAvatar } from './InitialsAvatar';
import { SkillsChart } from './SkillsChart';
import { stagger, useAnimate } from 'framer-motion';

interface SharableResumeProps {
  data: any;
}

export function SharableResume({ data }: SharableResumeProps) {
  const { sharable_resume: resume } = data;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showSharePanel, setShowSharePanel] = useState(false);
  const isResumePage = window.location.pathname.startsWith('/resume/');
  const shareableLink = `${window.location.origin}/resume/${resume.user_id}`;
  const createdDate = new Date(resume.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareableLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async (platform: 'linkedin' | 'twitter' | 'email') => {
    const shareUrls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareableLink)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareableLink)}&text=Check out my professional resume!`,
      email: `mailto:?subject=Check out my resume&body=${encodeURIComponent(shareableLink)}`
    };
    window.open(shareUrls[platform], '_blank');
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 relative ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white'
          : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'
      }`}
    >
      {/* Dark Mode Toggle */}
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

      {/* Share Button */}
      {!isResumePage && (
        <motion.button
          onClick={() => setShowSharePanel(true)}
          className="fixed top-4 right-20 z-40 flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Share2 className="w-5 h-5" />
          <span className="font-medium">Share Resume</span>
        </motion.button>
      )}

      {/* Share Panel */}
      <AnimatePresence>
        {!isResumePage && showSharePanel && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-4 z-50 bg-white rounded-lg shadow-xl p-6 w-80"
          >
            <button
              onClick={() => setShowSharePanel(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Share Your Resume</h3>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <input
                  type="text"
                  value={shareableLink}
                  readOnly
                  className="flex-1 text-sm bg-transparent outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => handleShare('linkedin')}
                  className="p-2 rounded-full bg-[#0077B5] text-white hover:opacity-90"
                >
                  {/* LinkedIn icon */}
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                  </svg>
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="p-2 rounded-full bg-[#1DA1F2] text-white hover:opacity-90"
                >
                  {/* Twitter icon */}
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
                <button
                  onClick={() => handleShare('email')}
                  className="p-2 rounded-full bg-gray-500 text-white hover:opacity-90"
                >
                  {/* Email icon */}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </button>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4 mt-4">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>128 views</span>
                </div>
                <button className="flex items-center gap-1 hover:text-gray-700">
                  <QrCode className="w-4 h-4" />
                  <span>Show QR</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`
            ${isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-white/20'}
            backdrop-blur-lg rounded-3xl p-8 shadow-xl border mb-6 transition-colors duration-300
          `}
        >
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <InitialsAvatar name={resume.name} size="lg" />
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{resume.name}</h1>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {resume.email && (
                  <a
                    href={`mailto:${resume.email}`}
                    className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{resume.email}</span>
                  </a>
                )}
                {resume.contact_information?.phone && (
                  <a
                    href={`tel:${resume.contact_information.phone}`}
                    className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{resume.contact_information.phone}</span>
                  </a>
                )}
                {resume.contact_information?.address && (
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
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`
              lg:col-span-1
              ${isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-white/20'}
              backdrop-blur-lg rounded-3xl p-6 shadow-xl border transition-colors duration-300
            `}
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
          {resume.summary?.trim().length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`
                lg:col-span-2
                ${isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-white/20'}
                backdrop-blur-lg rounded-3xl p-6 shadow-xl border transition-colors duration-300
              `}
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Rocket className="w-5 h-5 text-purple-600" />
                Professional Summary
              </h2>
              <p className="leading-relaxed">{resume.summary}</p>
            </motion.div>
          )}

          {/* Skills Chart Card */}
          {resume.skills?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className={`
                lg:col-span-3
                ${isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-white/20'}
                backdrop-blur-lg rounded-3xl p-6 shadow-xl border transition-colors duration-300
              `}
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
          )}

          {/* Projects */}
          {resume.projects?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className={`
                lg:col-span-3
                ${isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-white/20'}
                backdrop-blur-lg rounded-3xl p-6 shadow-xl border transition-colors duration-300
              `}
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
                    className={`
                      p-6
                      ${
                        isDarkMode
                          ? 'bg-gradient-to-r from-gray-800 to-gray-700 hover:from-purple-900 hover:to-violet-900'
                          : 'bg-gradient-to-r from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100'
                      }
                      rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1
                    `}
                  >
                    <h3 className="text-xl font-semibold mb-4">{project.name}</h3>
                    <p className="mb-4 line-clamp-3">{project.description}</p>
                    {project.technologies?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech: string, idx: number) => (
                          <span
                            key={idx}
                            className={`
                              px-3 py-1
                              ${isDarkMode ? 'bg-purple-900/50 text-purple-100' : 'bg-indigo-100 text-indigo-700'}
                              rounded-full text-sm transition-colors duration-300
                            `}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {project.outcome && <p className="font-medium">Outcome: {project.outcome}</p>}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Experience, Education, and Certifications Grid */}
          <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Experience Section - Spans 3 columns */}
            {resume.experience?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className={`
                  lg:col-span-3 row-span-2
                  ${isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-white/20'}
                  backdrop-blur-lg rounded-3xl p-6 shadow-xl border transition-colors duration-300
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
                      className={`
                        relative pl-6 border-l-2
                        ${isDarkMode ? 'border-purple-500' : 'border-green-200'}
                      `}
                    >
                      <div className="absolute left-[-9px] top-0 w-4 h-4 bg-green-500 rounded-full" />
                      <h3 className="font-semibold">{exp.role}</h3>
                      <p className="text-sm mb-2">{exp.company} | {exp.duration}</p>
                      {exp.responsibilities?.length > 0 && (
                        <ul className="space-y-2">
                          {exp.responsibilities.map((resp: string, idx: number) => (
                            <li key={idx} className="text-sm">
                              • {resp}
                            </li>
                          ))}
                        </ul>
                      )}
                      {exp.technologies_used?.length > 0 && (
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
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Right Column Stack - Education and Certifications/Awards */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Education Section */}
              {resume.education?.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`
                    flex-1
                    ${isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-white/20'}
                    backdrop-blur-lg rounded-3xl p-6 shadow-xl border transition-all duration-300
                    hover:shadow-2xl hover:scale-[1.02] transform
                  `}
                >
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <GraduationCap className={`w-6 h-6 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                    Education
                  </h2>
                  <div className="space-y-6">
                    {resume.education.map((edu: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className={`
                          relative overflow-hidden
                          ${
                            isDarkMode
                              ? 'bg-gradient-to-r from-yellow-900/20 to-orange-900/20'
                              : 'bg-gradient-to-r from-yellow-50 to-orange-50'
                          }
                          p-5 rounded-2xl group hover:shadow-lg transition-all duration-300
                        `}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: '100%' }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className={`
                            absolute bottom-0 left-0 h-1
                            ${isDarkMode ? 'bg-yellow-500/30' : 'bg-yellow-200'}
                          `}
                        />
                        <h3 className="font-bold text-lg group-hover:text-yellow-500 transition-colors">
                          {edu.institution}
                        </h3>
                        <p className="text-sm mt-2 font-medium">{edu.degree}</p>
                        <div className="mt-3 flex items-center gap-3">
                          {edu.gpa && (
                            <span className={`
                              px-3 py-1 rounded-full text-sm font-medium
                              ${isDarkMode ? 'bg-yellow-500/20 text-yellow-300' : 'bg-yellow-100 text-yellow-700'}
                            `}>
                              GPA: {edu.gpa}
                            </span>
                          )}
                          {edu.year && (
                            <span className={`
                              px-3 py-1 rounded-full text-sm font-medium
                              ${isDarkMode ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-100 text-orange-700'}
                            `}>
                              {edu.year}
                            </span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Conditional rendering for either Certifications or Awards */}
              {resume.certifications?.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`
                    flex-1
                    ${isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-white/20'}
                    backdrop-blur-lg rounded-3xl p-6 shadow-xl border transition-all duration-300
                    hover:shadow-2xl transform
                  `}
                >
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Award className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    Certifications
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    {resume.certifications.map((cert: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className={`
                          relative p-4 rounded-xl overflow-hidden
                          ${
                            isDarkMode
                              ? 'bg-gradient-to-r from-blue-900/20 to-indigo-900/20'
                              : 'bg-gradient-to-r from-blue-50 to-indigo-50'
                          }
                          group cursor-pointer
                        `}
                      >
                        <motion.div
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.5 }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        />
                        <div className="flex items-center gap-3">
                          <div className={`
                            p-2 rounded-lg
                            ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'}
                          `}>
                            <Code2 className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                          </div>
                          <p className="font-medium group-hover:text-blue-500 transition-colors">
                            {cert}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : resume.additional_sections?.awards?.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`
                    flex-1
                    ${isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-white/20'}
                    backdrop-blur-lg rounded-3xl p-6 shadow-xl border transition-all duration-300
                    hover:shadow-2xl transform
                  `}
                >
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Trophy className={`w-6 h-6 ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`} />
                    Awards & Achievements
                  </h2>
                  <div className="space-y-4">
                    {resume.additional_sections.awards.map((award: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        whileHover={{ scale: 1.02 }}
                        className={`
                          relative p-5 rounded-2xl overflow-hidden
                          ${
                            isDarkMode
                              ? 'bg-gradient-to-r from-rose-900/20 to-pink-900/20'
                              : 'bg-gradient-to-r from-rose-50 to-pink-50'
                          }
                          group
                        `}
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.3 }}
                          className="absolute -right-4 -top-4 w-20 h-20 opacity-10 group-hover:opacity-20 transition-opacity"
                        >
                          <Award className="w-full h-full" />
                        </motion.div>
                        <h3 className="font-bold text-lg group-hover:text-rose-500 transition-colors">
                          {award.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed opacity-80">
                          {award.description}
                        </p>
                        {award.date && (
                          <div className="mt-3">
                            <span className={`
                              px-3 py-1 rounded-full text-sm font-medium
                              ${isDarkMode ? 'bg-rose-500/20 text-rose-300' : 'bg-rose-100 text-rose-700'}
                            `}>
                              {award.date}
                            </span>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </div>
          </div>

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
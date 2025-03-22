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
} from 'lucide-react';
import { getSocialLink, getContactLink, getWorkTogetherSection } from '../../../utils/contactHelpers';

export function Creative({ data, isDarkMode }: { data: any; isDarkMode: boolean }) {
  const { sharable_resume: resume } = data;

  const gradientClasses = isDarkMode
    ? 'from-indigo-900 via-purple-900 to-blue-900 text-gray-100'
    : 'from-indigo-50 via-purple-50 to-blue-50 text-gray-900';

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Header */}
      <header className={`bg-gradient-to-r ${gradientClasses} py-20`}>
        <div className="max-w-6xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className={`text-5xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {resume.name}
            </h1>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {getContactLink(resume.email, Mail, 'email')}
              {getContactLink(resume.contact_information?.phone, Phone, 'phone')}
              {getContactLink(resume.contact_information?.address, MapPin, 'location')}
            </div>
            <div className="flex justify-center gap-4">
              {getSocialLink(resume.contact_information?.github, Github, 'GitHub')}
              {getSocialLink(resume.contact_information?.linkedin, Linkedin, 'LinkedIn')}
            </div>
          </motion.div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-16">
        {/* Summary */}
        {resume.summary && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-16 text-center max-w-3xl mx-auto"
          >
            <div className="flex justify-center mb-4">
              <Rocket className="w-8 h-8 text-purple-500" />
            </div>
            <p className="text-lg leading-relaxed">{resume.summary}</p>
          </motion.section>
        )}

        {/* Skills */}
        {resume.skills?.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-8">
              <Code2 className="w-8 h-8 text-blue-500" />
              <h2 className="text-3xl font-bold">Skills</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {resume.skills.map((skill: string, index: number) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className={`px-6 py-3 rounded-full text-sm font-medium ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-purple-900 to-blue-900 hover:from-purple-800 hover:to-blue-800'
                      : 'bg-gradient-to-r from-purple-100 to-blue-100 hover:from-purple-200 hover:to-blue-200'
                  }`}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.section>
        )}

        {/* Experience */}
        {resume.experience?.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-8">
              <Briefcase className="w-8 h-8 text-green-500" />
              <h2 className="text-3xl font-bold">Experience</h2>
            </div>
            <div className="space-y-12">
              {resume.experience.map((exp: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-8 rounded-2xl ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                  } shadow-lg hover:shadow-xl transition-shadow`}
                >
                  <h3 className="text-2xl font-bold mb-2">{exp.role}</h3>
                  <p className="text-purple-500 mb-4">
                    {exp.company} • {exp.duration}
                  </p>
                  <ul className="space-y-3">
                    {exp.responsibilities?.map((resp: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className={`w-2 h-2 mt-2 rounded-full ${
                          isDarkMode ? 'bg-purple-400' : 'bg-purple-500'
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
                          className={`text-xs px-3 py-1 rounded-full ${
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
          </motion.section>
        )}

{/* Projects */}
{resume.projects?.length > 0 && (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-16"
  >
    <div className="flex items-center justify-center gap-2 mb-8">
      <Rocket className="w-8 h-8 text-indigo-500" />
      <h2 className="text-3xl font-bold">Projects</h2>
    </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {resume.projects.map((project: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-8 rounded-2xl ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                  } shadow-lg hover:shadow-xl transition-shadow`}
                >
                  <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                  <p className="text-sm mb-4">{project.description}</p>
                  {project.technologies && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech: string, idx: number) => (
                        <span
                          key={idx}
                          className={`text-xs px-3 py-1 rounded-full ${
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
          </motion.section>
        )}

        {/* Education & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Education */}
          {resume.education?.length > 0 && (
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center justify-center gap-2 mb-8">
                <GraduationCap className="w-8 h-8 text-yellow-500" />
                <h2 className="text-3xl font-bold">Education</h2>
              </div>
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
                    <p className="text-purple-500">{edu.degree}</p>
                    <p className="text-sm mt-2">{edu.year}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Certifications */}
          {resume.certifications?.length > 0 && (
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center justify-center gap-2 mb-8">
                <Award className="w-8 h-8 text-red-500" />
                <h2 className="text-3xl font-bold">Certifications</h2>
              </div>
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
            </motion.section>
          )}
        </div>

        {/* Work Together Section */}
        <section className="mt-16">
          {getWorkTogetherSection(resume.email, resume.name, isDarkMode)}
        </section>
      </main>
    </div>
  );
}
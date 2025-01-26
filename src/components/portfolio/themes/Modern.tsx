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
  ExternalLink,
} from 'lucide-react';
import { SkillsChart } from '../SkillsChart';
import { getSocialLink, getContactLink, getWorkTogetherSection } from '../../../utils/contactHelpers';

interface ModernProps {
  data: any;
  isDarkMode: boolean;
}

export function Modern({ data, isDarkMode }: { data: any; isDarkMode: boolean }) {
  const { sharable_resume: resume } = data;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className={`h-full w-full ${
          isDarkMode 
            ? 'bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)]' 
            : 'bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)]'
        } bg-[size:4rem_4rem]`}></div>
      </div>

      <div className="relative z-10">
        <header className={`py-20 ${
          isDarkMode 
            ? 'bg-gradient-to-b from-gray-900 via-gray-900/95 to-transparent' 
            : 'bg-gradient-to-b from-gray-50 via-gray-50/95 to-transparent'
        }`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6 relative inline-block">
                <div className="w-32 h-32 rounded-full overflow-hidden relative z-10 border-4 border-blue-500 shadow-xl">
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-4xl font-bold text-white">
                    {resume.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl"></div>
              </div>
              <h1 className={`text-5xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>{resume.name}</h1>
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

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
          {/* Skills Section with enhanced visual */}
          {resume.skills?.length > 0 && (
            <motion.section 
              className="relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className={`absolute inset-0 rounded-3xl opacity-10 ${
                isDarkMode ? 'bg-blue-900' : 'bg-blue-100'
              }`}></div>
              <div className="relative p-8 rounded-3xl backdrop-blur-sm border border-blue-500/20">
                <h2 className={`text-3xl font-bold mb-8 flex items-center gap-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  <Code2 className="w-8 h-8 text-blue-600" />
                  Skills
                </h2>
                <SkillsChart skills={resume.skills} isDarkMode={isDarkMode} />
              </div>
            </motion.section>
          )}

          {/* Experience Section with timeline */}
          {resume.experience?.length > 0 && (
            <motion.section 
              className="relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className={`absolute inset-0 rounded-3xl opacity-10 ${
                isDarkMode ? 'bg-green-900' : 'bg-green-100'
              }`}></div>
              <div className="relative p-8 rounded-3xl backdrop-blur-sm border border-green-500/20">
                <h2 className={`text-3xl font-bold mb-8 flex items-center gap-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  <Briefcase className="w-8 h-8 text-green-600" />
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
              </div>
            </motion.section>
          )}

          {/* Projects Section with cards */}
          {resume.projects?.length > 0 && (
            <motion.section 
              className="relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className={`absolute inset-0 rounded-3xl opacity-10 ${
                isDarkMode ? 'bg-purple-900' : 'bg-purple-100'
              }`}></div>
              <div className="relative p-8 rounded-3xl backdrop-blur-sm border border-purple-500/20">
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
              </div>
            </motion.section>
          )}

          {/* Education and Certifications with enhanced grid */}
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

          {/* Work Together Section */}
          <motion.section 
            className="relative mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {getWorkTogetherSection(resume.email, resume.name, isDarkMode)}
          </motion.section>
        </main>
      </div>
    </div>
  );
}
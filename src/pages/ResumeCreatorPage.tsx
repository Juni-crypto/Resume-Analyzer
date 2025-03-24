import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Download,
  Maximize2,
  X,
  Layout,
  Moon,
  Sun,
  Plus,
  Trash2,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Code2,
} from 'lucide-react';
import { PDFDownloadLink, Document } from '@react-pdf/renderer';
import { MinimalResume } from '../components/resume-creator/MinimalResume';
import { resumeThemes, ThemeName } from '../components/resume-creator/themes';
import { ThemeSelector } from '../components/resume-creator/ThemeSelector';
import { useSharableResume } from '../hooks/useSharableResume';

const emptyResumeData = {
  personalInfo: {
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    linkedin: '',
    portfolio: '',
  },
  experience: [],
  education: [],
  skills: {
    technical: [],
    soft: [],
    languages: [],
  },
  certifications: [],
};

export function ResumeCreatorPage() {
  const [resumeData, setResumeData] = useState(emptyResumeData);
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('modern');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');
  const { resume } = useSharableResume();

  // Convert portfolio data to resume format
  useEffect(() => {
    if (resume?.sharable_resume) {
      const { sharable_resume: sr } = resume;

      setResumeData({
        personalInfo: {
          name: sr.name,
          title: sr.title || '',
          email: sr.email,
          phone: sr.contact_information?.phone || '',
          location: sr.contact_information?.address || '',
          summary: sr.summary,
          linkedin: sr.contact_information?.linkedin || '',
          portfolio: sr.contact_information?.github || '',
        },
        experience: sr.experience.map((exp) => ({
          title: exp.role,
          company: exp.company,
          location: '', // Add if available in your data
          startDate: exp.duration.split(' - ')[0],
          endDate: exp.duration.split(' - ')[1],
          description: exp.responsibilities.join('\n'),
          achievements: [],
        })),
        education: sr.education.map((edu) => ({
          degree: edu.degree,
          school: edu.institution,
          location: '', // Add if available in your data
          graduationDate: edu.year,
          gpa: edu.gpa || '',
        })),
        skills: {
          technical: sr.skills || [],
          soft: [],
          languages: [],
        },
        certifications:
          sr.certifications?.map((cert) => ({
            name: cert,
            issuer: '',
            date: '',
          })) || [],
      });
    }
  }, [resume]);

  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          title: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          description: '',
          achievements: [],
        },
      ],
    }));
  };

  const updateExperience = (
    index: number,
    field: string,
    value: string | string[]
  ) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const removeExperience = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          degree: '',
          school: '',
          location: '',
          graduationDate: '',
          gpa: '',
        },
      ],
    }));
  };

  const updateEducation = (index: number, field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const removeEducation = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const updateSkills = (
    category: 'technical' | 'soft' | 'languages',
    value: string
  ) => {
    setResumeData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: value.split(',').map((skill) => skill.trim()),
      },
    }));
  };

  const addCertification = () => {
    setResumeData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          name: '',
          issuer: '',
          date: '',
        },
      ],
    }));
  };

  const updateCertification = (index: number, field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) =>
        i === index ? { ...cert, [field]: value } : cert
      ),
    }));
  };

  const removeCertification = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  // Fullscreen preview component
  const FullscreenPreview = () => {
    const ThemeComponent = resumeThemes[currentTheme].previewComponent;

    return (
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-lg"
          >
            <div className="absolute top-4 right-4 flex items-center gap-4 z-50">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFullscreen(false)}
                className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="h-full overflow-auto py-8"
            >
              <div className="max-w-5xl mx-auto">
                <ThemeComponent data={resumeData} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Code2 },
    { id: 'certifications', label: 'Certifications', icon: Award },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <FullscreenPreview />

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">Resume Creator</h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              BETA
            </span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeSelector
              currentTheme={currentTheme}
              onThemeChange={setCurrentTheme}
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFullscreen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Maximize2 className="w-5 h-5" />
              Preview
            </motion.button>

            <PDFDownloadLink
              key={currentTheme} // Force re-render when theme changes
              document={React.createElement(
                resumeThemes[currentTheme].component,
                { data: resumeData }
              )}
              fileName={`resume-${currentTheme}.pdf`}
            >
              {({ loading }) => (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </motion.button>
              )}
            </PDFDownloadLink>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Section */}
          <div className="space-y-6">
            {/* Upcoming Features Card */}
            <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-blue-500/20">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-blue-600 font-semibold">
                  ✨ Upcoming Features
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="bg-white/80 rounded-lg p-3 flex-1">
                  <h3 className="font-medium text-blue-700 mb-1">
                    JD-Based Resume Generator
                  </h3>
                  <p className="text-sm text-gray-600">
                    Get a perfectly tailored resume based on your job
                    description
                  </p>
                </div>
                <div className="bg-white/80 rounded-lg p-3 flex-1">
                  <h3 className="font-medium text-blue-700 mb-1">
                    One-Click Cover Letter
                  </h3>
                  <p className="text-sm text-gray-600">
                    Automatically generate a matching cover letter
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center gap-2 mb-6">
                <FileText className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold">Resume Editor</h2>
              </div>

              {/* Section Tabs */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <section.icon className="w-4 h-4" />
                    {section.label}
                  </button>
                ))}
              </div>

              {/* Personal Info Section */}
              {activeSection === 'personal' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={resumeData.personalInfo.name}
                        onChange={(e) =>
                          updatePersonalInfo('name', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={resumeData.personalInfo.title}
                        onChange={(e) =>
                          updatePersonalInfo('title', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={resumeData.personalInfo.email}
                        onChange={(e) =>
                          updatePersonalInfo('email', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={resumeData.personalInfo.phone}
                        onChange={(e) =>
                          updatePersonalInfo('phone', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={resumeData.personalInfo.location}
                      onChange={(e) =>
                        updatePersonalInfo('location', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Professional Summary
                    </label>
                    <textarea
                      value={resumeData.personalInfo.summary}
                      onChange={(e) =>
                        updatePersonalInfo('summary', e.target.value)
                      }
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        LinkedIn URL
                      </label>
                      <input
                        type="url"
                        value={resumeData.personalInfo.linkedin}
                        onChange={(e) =>
                          updatePersonalInfo('linkedin', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Portfolio URL
                      </label>
                      <input
                        type="url"
                        value={resumeData.personalInfo.portfolio}
                        onChange={(e) =>
                          updatePersonalInfo('portfolio', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Experience Section */}
              {activeSection === 'experience' && (
                <div className="space-y-6">
                  {resumeData.experience.map((exp, index) => (
                    <div
                      key={index}
                      className="relative border border-gray-200 rounded-lg p-4"
                    >
                      <button
                        onClick={() => removeExperience(index)}
                        className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Job Title
                          </label>
                          <input
                            type="text"
                            value={exp.title}
                            onChange={(e) =>
                              updateExperience(index, 'title', e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Company
                          </label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) =>
                              updateExperience(index, 'company', e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                          </label>
                          <input
                            type="text"
                            value={exp.location}
                            onChange={(e) =>
                              updateExperience(
                                index,
                                'location',
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Start Date
                          </label>
                          <input
                            type="text"
                            value={exp.startDate}
                            onChange={(e) =>
                              updateExperience(
                                index,
                                'startDate',
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            End Date
                          </label>
                          <input
                            type="text"
                            value={exp.endDate}
                            onChange={(e) =>
                              updateExperience(index, 'endDate', e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          value={exp.description}
                          onChange={(e) =>
                            updateExperience(
                              index,
                              'description',
                              e.target.value
                            )
                          }
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Achievements (one per line)
                        </label>
                        <textarea
                          value={exp.achievements.join('\n')}
                          onChange={(e) =>
                            updateExperience(
                              index,
                              'achievements',
                              e.target.value.split('\n')
                            )
                          }
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={addExperience}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Experience
                  </button>
                </div>
              )}

              {/* Education Section */}
              {activeSection === 'education' && (
                <div className="space-y-6">
                  {resumeData.education.map((edu, index) => (
                    <div
                      key={index}
                      className="relative border border-gray-200 rounded-lg p-4"
                    >
                      <button
                        onClick={() => removeEducation(index)}
                        className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Degree
                          </label>
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) =>
                              updateEducation(index, 'degree', e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            School
                          </label>
                          <input
                            type="text"
                            value={edu.school}
                            onChange={(e) =>
                              updateEducation(index, 'school', e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Location
                          </label>
                          <input
                            type="text"
                            value={edu.location}
                            onChange={(e) =>
                              updateEducation(index, 'location', e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Graduation Date
                          </label>
                          <input
                            type="text"
                            value={edu.graduationDate}
                            onChange={(e) =>
                              updateEducation(
                                index,
                                'graduationDate',
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            GPA
                          </label>
                          <input
                            type="text"
                            value={edu.gpa}
                            onChange={(e) =>
                              updateEducation(index, 'gpa', e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={addEducation}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Education
                  </button>
                </div>
              )}

              {/* Skills Section */}
              {activeSection === 'skills' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Technical Skills (comma-separated)
                    </label>
                    <textarea
                      value={resumeData.skills.technical.join(', ')}
                      onChange={(e) =>
                        updateSkills('technical', e.target.value)
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="React, Node.js, TypeScript, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Soft Skills (comma-separated)
                    </label>
                    <textarea
                      value={resumeData.skills.soft.join(', ')}
                      onChange={(e) => updateSkills('soft', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Leadership, Communication, Problem Solving, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Languages (comma-separated)
                    </label>
                    <textarea
                      value={resumeData.skills.languages.join(', ')}
                      onChange={(e) =>
                        updateSkills('languages', e.target.value)
                      }
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="English (Native), Spanish (Intermediate), etc."
                    />
                  </div>
                </div>
              )}

              {/* Certifications Section */}
              {activeSection === 'certifications' && (
                <div className="space-y-6">
                  {resumeData.certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="relative border border-gray-200 rounded-lg p-4"
                    >
                      <button
                        onClick={() => removeCertification(index)}
                        className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Certification Name
                          </label>
                          <input
                            type="text"
                            value={cert.name}
                            onChange={(e) =>
                              updateCertification(index, 'name', e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date
                          </label>
                          <input
                            type="text"
                            value={cert.date}
                            onChange={(e) =>
                              updateCertification(index, 'date', e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Issuing Organization
                        </label>
                        <input
                          type="text"
                          value={cert.issuer}
                          onChange={(e) =>
                            updateCertification(index, 'issuer', e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={addCertification}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Certification
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center gap-2 mb-6">
              <Layout className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-semibold">Live Preview</h2>
            </div>
            <div className="overflow-auto max-h-[800px]">
              {React.createElement(
                resumeThemes[currentTheme].previewComponent,
                { data: resumeData }
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

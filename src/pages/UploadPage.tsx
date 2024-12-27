import React from 'react';
import { FileUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { ResumeUpload } from '../components/upload/ResumeUpload';
import { RoleSelect } from '../components/upload/RoleSelect';
import { useResumeUpload } from '../hooks/useResumeUpload';
import { InfiniteMarquee } from '../components/InfiniteMarquee';
import { StatisticsSection } from '../components/StatisticsSection';
import { TestimonialsMarquee } from '../components/TestimonialsMarquee';
import { Footer } from '../components/Footer';
import { LoadingExperience } from '../components/LoadingExperience';
import { LoginModal } from '../components/auth/LoginModal';
import { LoginButton } from '../components/auth/LoginButton';
import { Toast } from '../components/Toast';
import { UpgradeModal } from '../components/UpgradeModal';
import { useAuth } from '../contexts/AuthContext';

export function UploadPage() {
  const { user } = useAuth();
  const {
    handleFileUpload,
    handleRoleSelect,
    handleSubmit,
    selectedFile,
    selectedRole,
    isLoading,
    error,
    showUpgradeModal,
    setShowUpgradeModal,
  } = useResumeUpload();

  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);

  const handleUpgrade = () => {
    setShowUpgradeModal(false);
    setShowLoginModal(true);
  };

  return (
    <>
      {isLoading && <LoadingExperience />}

      <Toast
        message="Analysis complete! Scroll down to see your results."
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleSubmit}
      />

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onUpgrade={handleUpgrade}
      />

      {!user && <LoginButton onClick={() => setShowLoginModal(true)} />}

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="w-full bg-white/40 backdrop-blur-sm py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                ChumaOruWorks AI Resume Analyzer
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed">
                Analyze your resume with the power of AI to stand out in the
                competition. Find matching jobs instantly, saving hours of time
                and boosting your career transition.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20"
            >
              <ResumeUpload
                onFileUpload={handleFileUpload}
                selectedFile={selectedFile}
              />

              <div className="my-8 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white/80 px-4 text-sm text-gray-500">
                    and
                  </span>
                </div>
              </div>

              <RoleSelect
                onRoleSelect={handleRoleSelect}
                selectedRole={selectedRole}
              />

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
                  {error}
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={!selectedFile || !selectedRole || isLoading}
                className={`w-full mt-8 flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-white font-semibold transition-all text-lg
                  ${
                    !selectedFile || !selectedRole || isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
              >
                <FileUp className="w-6 h-6" />
                Analyze Resume
              </motion.button>
            </motion.div>
          </section>

          <section className="mb-32">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Why Choose Our AI Resume Analyzer?
            </h2>
            <InfiniteMarquee />
          </section>

          <section className="mb-32">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Proven Results
            </h2>
            <StatisticsSection />
          </section>

          <section className="mb-32">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              What Our Users Say
            </h2>
            <TestimonialsMarquee />
          </section>
        </div>

        <Footer />
      </div>
    </>
  );
}
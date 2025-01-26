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
import { BlogSection } from '../components/BlogSection';
import { PortfolioShowcase } from '../components/features/PortfolioShowcase';
import { JobsPreview } from '../components/features/JobsPreview';

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
    showSuccessToast,
    showErrorToast,
    setShowUpgradeModal,
    setShowSuccessToast,
    setShowErrorToast,
  } = useResumeUpload();

  const [showLoginModal, setShowLoginModal] = React.useState(false);

  const handleUpgrade = () => {
    setShowUpgradeModal(false);
    setShowLoginModal(true);
  };

  return (
    <>
      {isLoading && <LoadingExperience />}

      {user ? (
        <Toast
          message="Analysis Complete! 🎉"
          description="Your curated jobs are being prepared. You'll be redirected to view your detailed analysis shortly."
          isVisible={showSuccessToast}
          onClose={() => setShowSuccessToast(false)}
          type="success"
        />
      ) : (
        <Toast
          message="Want More Insights? 🚀"
          description="Sign in to unlock personalized job matches and detailed analysis of your resume."
          isVisible={showErrorToast}
          onClose={() => setShowErrorToast(false)}
          type="loading"
        />
      )}

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
                More Than Just Resume Analysis
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed mb-4">
                Upload your resume to unlock a complete career enhancement suite. Get AI-powered resume analysis, 
                create a stunning portfolio, and discover fresh job matches updated daily.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Latest jobs from last 3 days
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Instant portfolio creation
                </span>
              </div>
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
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
            >
              <PortfolioShowcase onSignInClick={() => setShowLoginModal(true)} />
            </motion.div>
          </section>

          <section className="mb-32">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Fresh Job Matches Daily</h2>
                <p className="text-lg text-gray-600">
                  Get personalized job recommendations based on your resume, updated every 3 days
                </p>
              </div>
              <JobsPreview onSignInClick={() => setShowLoginModal(true)} />
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

          <section className="mb-32">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Learn About ATS
            </h2>
            <BlogSection />
          </section>
        </div>

        <Footer />
      </div>
    </>
  );
}
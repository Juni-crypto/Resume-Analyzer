import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { UploadPage } from './pages/UploadPage';
import { PortfolioPage } from './pages/PortfolioPage.tsx';
import { AnalysisPage } from './pages/AnalysisPage';
import { JobsPage } from './pages/JobsPage';
import { BlogListPage } from './pages/BlogListPage';
import { PublicResumePage } from './pages/PublicResumePage';
import { BlogPage } from './pages/BlogPage';

import { Navbar } from './components/layout/Navbar';
import { useAuth } from './contexts/AuthContext';
import { useAuthData } from './hooks/useAuthData';
import { LoadingExperience } from './components/LoadingExperience';
import { SharableResume } from './components/portfolio/SharableResume';
import { useScrollToTop } from './hooks/useScrollToTop';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
}

function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { isLoading, isInitialized } = useAuthData();
  const location = useLocation();
  useScrollToTop(); // Add this line here

  // Don't show loading screen or navbar on public resume page
  const isPublicResume = location.pathname.startsWith('/resume/');
  
  if (!isPublicResume && (!isInitialized || isLoading)) {
    return <LoadingExperience />;
  }

  return (
    <div className={`${user && !isPublicResume ? 'md:pl-64' : ''} transition-all duration-300`}>
      {user && !isPublicResume && <Navbar />}
      {children}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<UploadPage />} />
            {/* Analysis page is now publicly accessible */}
            <Route path="/analysis" element={<AnalysisPage />} />
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/:slug" element={<BlogPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/resume/:userId" element={<PublicResumePage />} />
            {/* Jobs page remains protected */}
            <Route
              path="/jobs"
              element={
                <PrivateRoute>
                  <JobsPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}
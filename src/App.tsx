import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { UploadPage } from './pages/UploadPage';
import { AnalysisPage } from './pages/AnalysisPage';
import { JobsPage } from './pages/JobsPage';
import { BlogListPage } from './pages/BlogListPage';
import { BlogPage } from './pages/BlogPage';
import { Navbar } from './components/layout/Navbar';
import { useAuth } from './contexts/AuthContext';
import { useAuthData } from './hooks/useAuthData';
import { LoadingExperience } from './components/LoadingExperience';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
}

function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { isLoading, isInitialized } = useAuthData();

  if (!isInitialized || isLoading) {
    return <LoadingExperience />;
  }

  return (
    <div className={`${user ? 'md:pl-64' : ''} transition-all duration-300`}>
      {user && <Navbar />}
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
            <Route path="/analysis" element={<AnalysisPage />} />
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/:slug" element={<BlogPage />} />
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
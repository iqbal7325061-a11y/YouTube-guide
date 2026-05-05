import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Home from './pages/Home';
import Channel from './pages/Channel';
import AiPage from './pages/AiPage';
import ThumbMagic from './pages/ThumbMagic';
import VideoPage from './pages/VideoPage';
import Labs from './pages/Labs';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <div className="flex flex-col md:flex-row">
                    <Navbar />
                    <main className="flex-1 p-4 md:p-8">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/channel" element={<Channel />} />
                        <Route path="/ai" element={<AiPage />} />
                        <Route path="/thumbmagic" element={<ThumbMagic />} />
                        <Route path="/video" element={<VideoPage />} />
                        <Route path="/labs" element={<Labs />} />
                      </Routes>
                    </main>
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Auth
import { AuthProvider } from './modules/auth/context/AuthContext';
import { ProtectedRoute } from './modules/auth/components/ProtectedRoute';
import LoginPage from './modules/auth/pages/LoginPage';

// Admin
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboardPage from './modules/projects/pages/AdminDashboardPage';
import AddProjectPage from './modules/projects/pages/AddProjectPage';
import EditProjectPage from './modules/projects/pages/EditProjectPage';

// Portfolio
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contact';
import './index.css';

// ─── Portfolio Layout ─────────────────────────────────────────────────────────
const PortfolioLayout = () => (
  <div className="min-h-screen flex flex-col bg-dark-bg text-dark-text selection:bg-primary selection:text-white">
    <Navbar />
    <main className="flex-grow">
      <Hero />
      <About />
      <Projects />
      <Skills />
    </main>
    <Footer />
  </div>
);

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public portfolio */}
        <Route path="/" element={<PortfolioLayout />} />

        {/* Auth routes */}
        <Route path="/dashboard-admin-xyz/login" element={<LoginPage />} />

        {/* Protected admin dashboard */}
        <Route path="/dashboard-admin-xyz" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="projects" element={<AdminDashboardPage />} />
            <Route path="projects/new" element={<AddProjectPage />} />
            <Route path="projects/:id/edit" element={<EditProjectPage />} />
          </Route>
        </Route>

        {/* Fallback to portfolio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}



export default App;

// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RecruiterDashboard from './pages/RecruiterDashboard';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import PortfolioPage from "./pages/PortfolioPage";
import EditProfile from "./pages/EditProfile";
import ProfilePage from "./pages/ProfilePage"
import ContactPage from "./pages/ContactPage";
import DemoPage from "./pages/DemoPage";
import AboutPage from './pages/about';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home / Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth routes */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected / after signup */}
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/add-skill" element={<OnboardingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/profile/:id" element={<ProfilePage />} />  
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/demo" element={<DemoPage />} /> 
        <Route path="/about" element={<AboutPage />} />
        
        {/* 404 catch-all */}
        <Route path="*" element={
          <div className="min-h-screen bg-dark-bg flex items-center justify-center text-center px-6">
            <div>
              <h1 className="text-8xl font-bold mb-4">404</h1>
              <p className="text-2xl mb-8">Page not found</p>
              <a href="/" className="text-teal-accent hover:underline text-xl">
                ← Back to Home
              </a>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
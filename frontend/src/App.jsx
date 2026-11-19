import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Breadcrumb from './components/Breadcrumb';
import HomeView from './pages/HomeView';
import DashboardView from './pages/DashboardView';
import DocumentIntelligenceView from './pages/DocumentIntelligenceView';
import PolicyRAGView from './pages/PolicyRAGView';
import AppointmentsView from './pages/AppointmentsView';
import EvaluationView from './pages/EvaluationView';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function App() {
  // "home" is strictly the default view
  // Routing handled by react-router-dom; state for active tab removed
  const [systemStatus, setSystemStatus] = useState({
    online: true,
    mongodb: { connected: true },
    rag_stats: { total_chunks: 8 }
  });

  useEffect(() => {
    async function checkHealth() {
      const res = await api.getHealth();
      if (res.data) {
        setSystemStatus({
          online: true,
          mongodb: res.data.mongodb || { connected: true },
          rag_stats: res.data.rag_stats || { total_chunks: 8 },
        });
      }
    }
    checkHealth();
    const timer = setInterval(checkHealth, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <BrowserRouter>
      <Header status={systemStatus} />
      <Breadcrumb status={systemStatus} />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/dashboard" element={<DashboardView status={systemStatus} />} />
        <Route path="/documents" element={<DocumentIntelligenceView />} />
        <Route path="/policy-rag" element={<PolicyRAGView />} />
        <Route path="/appointments" element={<AppointmentsView />} />
        <Route path="/ai-evaluation" element={<EvaluationView />} />
      </Routes>
      {/* Footer Contact Section */}
      <footer className="mt-auto bg-[#0D4F5C] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Immediate Medical Assistance</h3>
            <p className="text-sm">We’re here 24/7 for urgent health needs.</p>
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="w-4 h-4" />
              <span>+1 (800) 555‑0199</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="w-4 h-4" />
              <span>support@aegismed.com</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="w-4 h-4" />
              <span>123 Health Ave, MedCity, TX 77001</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="w-4 h-4" />
              <span>24/7 Emergency &amp; Trauma</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/dashboard" className="hover:underline">Dashboard</Link></li>
              <li><Link to="/appointments" className="hover:underline">Book Appointment</Link></li>
              <li><Link to="/policy-rag" className="hover:underline">Policy RAG Search</Link></li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Disclaimer</h3>
            <p className="text-xs">AegisMed is a clinical decision support tool and does not replace professional medical advice. In emergencies, call your local emergency services.</p>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-white/70">
          © {new Date().getFullYear()} AegisMed • All rights reserved.
        </div>
      </footer>
    </BrowserRouter>
  );
}

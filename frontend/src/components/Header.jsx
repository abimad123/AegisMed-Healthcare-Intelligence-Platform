import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Phone,
  Clock,
  Search,
  Calendar,
  Activity,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  HeartPulse,
  Brain,
  Bone,
  Microscope,
  Baby,
  Syringe,
  Ambulance,
  Command,
  Stethoscope,
  Sparkles,
  ArrowRight,
  Flame,
  Shield
} from 'lucide-react';

export default function Header({ status }) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // Navigation & interaction states
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // 'services' | 'ai_suite' | null
  const [mobileAccordion, setMobileAccordion] = useState('ai_suite'); // 'services' | 'ai_suite' | null
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Dropdown ref for outside click
  const navContainerRef = useRef(null);
  const searchInputRef = useRef(null);

  // 1. Detect scroll position for smooth header contraction (h-20 -> h-16)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Global Keyboard Shortcuts (Ctrl+K / Cmd+K & Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle Command Palette
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
      // Escape key closes modals, drawers, and dropdowns
      if (e.key === 'Escape') {
        setSearchModalOpen(false);
        setEmergencyModalOpen(false);
        setMobileMenuOpen(false);
        setOpenDropdown(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-focus search input when search modal opens
  useEffect(() => {
    if (searchModalOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      setSearchQuery('');
    }
  }, [searchModalOpen]);

  // Prevent background scroll when mobile drawer or modal is open
  useEffect(() => {
    if (mobileMenuOpen || searchModalOpen || emergencyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen, searchModalOpen, emergencyModalOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navContainerRef.current && !navContainerRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Helper to change route and close dropdowns/drawer
  const handleNavClick = (path) => {
    navigate(path);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    setSearchModalOpen(false);
  };

  // Clinical AI Suite Items with real URL routes
  const aiSuiteItems = [
    {
      path: '/dashboard',
      title: 'Clinical Operations Dashboard',
      description: 'Real-time ward telemetry, bed census & OPD flow metrics',
      icon: Activity,
      badge: 'Live Telemetry'
    },
    {
      path: '/documents',
      title: 'Document Intelligence',
      description: 'Automated clinical extraction for lab PDFs & discharge notes',
      icon: FileText,
      badge: 'PyMuPDF'
    },
    {
      path: '/policy-rag',
      title: 'Policy RAG Search',
      description: 'Clinical compliance, HIPAA, ICU policies with source citations',
      icon: ShieldCheck,
      badge: 'ChromaDB'
    },
    {
      path: '/ai-evaluation',
      title: 'AI Model Safety & Evaluation',
      description: 'Faithfulness, relevancy scoring & hallucination audit logs',
      icon: CheckCircle2,
      badge: 'Ragas'
    }
  ];

  // Clinical Specialties for Mega Menu
  const clinicalSpecialties = [
    { name: 'Cardiology & Vascular', desc: 'Heart failure, angioplasty & rhythm care', icon: HeartPulse },
    { name: 'Neurology & Spine', desc: 'Stroke unit, epilepsy & neuro-oncology', icon: Brain },
    { name: 'Orthopedics & Joint Care', desc: 'Robotic joint replacement & sports trauma', icon: Bone },
    { name: 'Diagnostics & Pathology', desc: 'High-resolution MRI, CT & automated hematology', icon: Microscope },
    { name: 'Pediatrics & Neonatal', desc: 'Level III NICU & comprehensive child health', icon: Baby },
    { name: 'Oncology & Infusion', desc: 'Precision oncology, chemotherapy & immunology', icon: Syringe },
    { name: 'Level 1 Emergency & Trauma', desc: '24/7 dedicated resuscitation & trauma bays', icon: Ambulance },
    { name: 'Internal Medicine & OPD', desc: 'Preventive health checkups & chronic care', icon: Stethoscope }
  ];

  // Command search items database
  const searchResults = [
    { title: 'Book Doctor Appointment', category: 'Patient Care', path: '/appointments', icon: Calendar },
    { title: 'Clinical Operations Dashboard', category: 'AI Suite', path: '/dashboard', icon: Activity },
    { title: 'Upload & Parse Lab Report (PDF)', category: 'AI Suite', path: '/documents', icon: FileText },
    { title: 'Policy RAG Search (HIPAA & SOPs)', category: 'AI Suite', path: '/policy-rag', icon: ShieldCheck },
    { title: 'Diagnostic AI Evaluation Logs', category: 'AI Suite', path: '/ai-evaluation', icon: CheckCircle2 },
    { title: 'Cardiology & Vascular Institute', category: 'Specialty', path: '/appointments', icon: HeartPulse },
    { title: 'Neurology & Brain Care Center', category: 'Specialty', path: '/appointments', icon: Brain },
    { title: 'Orthopedics & Sports Medicine', category: 'Specialty', path: '/appointments', icon: Bone },
    { title: 'ICU Visiting Hours & Policy Guide', category: 'Policy', path: '/policy-rag', icon: ShieldCheck },
    { title: 'Emergency Code Blue Protocols', category: 'Emergency', modal: 'emergency', icon: AlertTriangle }
  ].filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isAISuiteActive = ['/dashboard', '/documents', '/policy-rag', '/ai-evaluation'].includes(currentPath);

  return (
    <>
      {/* ─── 1. TOP HOSPITAL UTILITY BAR ────────────────────────────────────── */}
      <div className="w-full bg-[#0D4F5C] text-white text-xs py-2 select-none border-b border-teal-800/40">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between gap-4">
          
          {/* Left: Emergency Status & OPD Timings */}
          <div className="flex items-center gap-3 sm:gap-4 overflow-hidden text-slate-100">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <a
                href="tel:18005550199"
                className="font-medium hover:text-teal-200 transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <Phone className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="font-semibold text-white">24/7 Emergency & Trauma:</span>
                <span className="text-emerald-300 font-bold">+1 (800) 555-0199</span>
              </a>
            </div>

            <span className="hidden md:inline-block text-teal-400/50">|</span>

            <div className="hidden md:flex items-center gap-1.5 text-teal-100/90 whitespace-nowrap">
              <Clock className="w-3 h-3 text-teal-300 shrink-0" />
              <span>OPD Hours: <strong className="text-white">Mon–Sat, 8:00 AM – 8:00 PM</strong></span>
            </div>
          </div>

          {/* Right: Quick Utility Links */}
          <div className="flex items-center gap-3 sm:gap-5 text-teal-100/90 shrink-0">
            <button
              onClick={() => handleNavClick('/appointments')}
              className="hidden sm:inline-flex items-center gap-1 text-xs hover:text-white transition-colors cursor-pointer"
            >
              <Stethoscope className="w-3.5 h-3.5 text-teal-300" />
              <span>Find a Doctor</span>
            </button>

            <button
              onClick={() => handleNavClick('/documents')}
              className="hidden sm:inline-flex items-center gap-1 text-xs hover:text-white transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-teal-300" />
              <span>Lab Reports</span>
            </button>

            <button
              onClick={() => setEmergencyModalOpen(true)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-amber-300 hover:text-amber-200 transition-colors cursor-pointer bg-teal-900/60 px-2.5 py-0.5 rounded-full border border-teal-700/60"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Emergency Protocols</span>
            </button>
          </div>

        </div>
      </div>

      {/* ─── 2. MAIN STICKY CLINICAL HEADER ───────────────────────────────── */}
      <header
        className={`sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all duration-300 ${
          isScrolled ? 'h-16 shadow-md' : 'h-20 shadow-xs'
        }`}
      >
        <div className="w-full h-full px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between gap-4">
          
          {/* Brand Lockup: Clean Clinical Mark + AegisMed Wordmark */}
          <Link
            to="/"
            onClick={() => {
              setOpenDropdown(null);
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 cursor-pointer select-none group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0D4F5C] flex items-center justify-center text-white shadow-md shadow-teal-900/15 group-hover:bg-[#093B45] group-hover:scale-105 transition-all">
              {/* Clinical Shield with Cross icon */}
              <div className="relative flex items-center justify-center">
                <Shield className="w-5 h-5 text-white/90" />
                <span className="absolute text-teal-200 font-black text-xs leading-none">+</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-[#0D4F5C] transition-colors">
                  AegisMed
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Accredited
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 tracking-tight -mt-0.5">
                Medical Center & Clinical Intelligence
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links & Mega Dropdowns */}
          <nav
            ref={navContainerRef}
            className="hidden lg:flex items-center gap-7 h-full text-sm font-medium text-slate-700"
          >
            {/* 1. Home Link */}
            <Link
              to="/"
              className={`h-full flex items-center border-b-2 font-medium transition-all ${
                currentPath === '/'
                  ? 'border-[#0D4F5C] text-[#0D4F5C] font-semibold'
                  : 'border-transparent text-slate-600 hover:text-[#0D4F5C]'
              }`}
            >
              Home
            </Link>

            {/* 2. Clinical Services Mega-Menu Dropdown */}
            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => setOpenDropdown('services')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'services' ? null : 'services')}
                aria-expanded={openDropdown === 'services'}
                aria-haspopup="true"
                className={`h-full flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
                  openDropdown === 'services'
                    ? 'border-[#0D4F5C] text-[#0D4F5C] font-semibold'
                    : 'border-transparent text-slate-600 hover:text-[#0D4F5C]'
                }`}
              >
                <span>Clinical Services</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    openDropdown === 'services' ? 'rotate-180 text-[#0D4F5C]' : 'text-slate-400'
                  }`}
                />
              </button>

              {/* Mega-Menu Panel */}
              {openDropdown === 'services' && (
                <div className="absolute top-full -left-20 w-[640px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-5 mt-0 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#0D4F5C]">
                        Centers of Clinical Excellence
                      </h4>
                      <p className="text-xs text-slate-500">Board-certified specialists & advanced trauma units</p>
                    </div>
                    <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      24/7 Admissions Open
                    </span>
                  </div>

                  {/* 2-Column Specialties Grid */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {clinicalSpecialties.map((dept, i) => {
                      const Icon = dept.icon;
                      return (
                        <div
                          key={i}
                          onClick={() => handleNavClick('/appointments')}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-all cursor-pointer group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#0D4F5C] flex items-center justify-center shrink-0 group-hover:bg-[#0D4F5C] group-hover:text-white transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-900 group-hover:text-[#0D4F5C] transition-colors leading-tight">
                              {dept.name}
                            </p>
                            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                              {dept.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Mega Menu Footer */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs bg-slate-50/70 -mx-5 -mb-5 px-5 py-3 rounded-b-2xl">
                    <span className="text-slate-600">Need immediate assistance with department selection?</span>
                    <button
                      onClick={() => handleNavClick('/appointments')}
                      className="font-semibold text-[#0D4F5C] hover:text-[#093B45] flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>View All Specialties & Doctors</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Clinical AI Suite Dropdown */}
            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => setOpenDropdown('ai_suite')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'ai_suite' ? null : 'ai_suite')}
                aria-expanded={openDropdown === 'ai_suite'}
                aria-haspopup="true"
                className={`h-full flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
                  isAISuiteActive || openDropdown === 'ai_suite'
                    ? 'border-[#0D4F5C] text-[#0D4F5C] font-semibold'
                    : 'border-transparent text-slate-600 hover:text-[#0D4F5C]'
                }`}
              >
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>Clinical AI Suite</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    openDropdown === 'ai_suite' ? 'rotate-180 text-[#0D4F5C]' : 'text-slate-400'
                  }`}
                />
              </button>

              {/* AI Suite Dropdown Menu */}
              {openDropdown === 'ai_suite' && (
                <div className="absolute top-full -left-12 w-[420px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-3 mt-0 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#0D4F5C]">
                        Autonomous Clinical Operations
                      </h4>
                      <p className="text-[11px] text-slate-500">FastAPI, ChromaDB & Ragas Core Engine</p>
                    </div>
                    <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      v1.0.0
                    </span>
                  </div>

                  <div className="space-y-1">
                    {aiSuiteItems.map((item) => {
                      const Icon = item.icon;
                      const isItemActive = currentPath === item.path;
                      return (
                        <div
                          key={item.path}
                          onClick={() => handleNavClick(item.path)}
                          className={`flex items-start gap-3.5 p-3 rounded-xl transition-all cursor-pointer ${
                            isItemActive
                              ? 'bg-teal-50/80 border border-teal-200/80 text-[#0D4F5C]'
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div
                            className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                              isItemActive
                                ? 'bg-[#0D4F5C] text-white shadow-xs'
                                : 'bg-slate-100 text-[#0D4F5C] group-hover:bg-[#0D4F5C] group-hover:text-white'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span
                                className={`text-xs font-bold ${
                                  isItemActive ? 'text-[#0D4F5C]' : 'text-slate-900'
                                }`}
                              >
                                {item.title}
                              </span>
                              <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                                {item.badge}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-snug mt-0.5 line-clamp-1">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 4. Appointments Link */}
            <Link
              to="/appointments"
              className={`h-full flex items-center gap-1.5 border-b-2 font-medium transition-all ${
                currentPath === '/appointments'
                  ? 'border-[#0D4F5C] text-[#0D4F5C] font-semibold'
                  : 'border-transparent text-slate-600 hover:text-[#0D4F5C]'
              }`}
            >
              <span>Appointments</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-teal-50 text-[#0D4F5C] border border-teal-200">
                Online
              </span>
            </Link>
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-3">
            {/* Quick Command Search Button (Ctrl+K) */}
            <button
              onClick={() => setSearchModalOpen(true)}
              type="button"
              className="hidden sm:flex items-center gap-2.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-600 hover:text-slate-900 text-xs font-medium border border-slate-200 transition-all cursor-pointer"
              title="Search Doctors, Protocols & Intelligence Tools (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-500">Search portal...</span>
              <kbd className="hidden md:inline-flex items-center gap-0.5 font-mono text-[10px] text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-2xs">
                <Command className="w-2.5 h-2.5" /> K
              </kbd>
            </button>

            {/* Primary CTA Button: Book Appointment */}
            <button
              onClick={() => handleNavClick('/appointments')}
              type="button"
              className="bg-[#0D4F5C] hover:bg-[#093B45] text-white px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all active:scale-[0.98] flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-teal-200" />
              <span>Book Appointment</span>
            </button>

            {/* Mobile Actions: Emergency Call + Hamburger Toggle (< 1024px) */}
            <div className="flex items-center gap-1 lg:hidden">
              <a
                href="tel:18005550199"
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Call Emergency"
              >
                <Phone className="w-5 h-5 fill-red-100" />
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* ─── 3. RESPONSIVE MOBILE SLIDE-OVER DRAWER (< 1024px) ────────────── */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-over Drawer Container */}
          <div className="relative w-80 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-250">
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0D4F5C] flex items-center justify-center text-white">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-extrabold text-slate-900 text-sm">AegisMed</span>
                  <p className="text-[10px] text-slate-500 font-medium">Hospital Portal</p>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Search Trigger */}
            <div className="p-3 border-b border-slate-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchModalOpen(true);
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-100 text-slate-500 text-xs font-medium"
              >
                <span className="flex items-center gap-2">
                  <Search className="w-3.5 h-3.5 text-slate-400" />
                  Search doctors, AI tools...
                </span>
                <kbd className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-slate-200">
                  Ctrl K
                </kbd>
              </button>
            </div>

            {/* Scrollable Accordion Navigation List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
              
              {/* Home */}
              <button
                onClick={() => handleNavClick('/')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  currentPath === '/'
                    ? 'bg-teal-50 text-[#0D4F5C] font-bold border border-teal-200'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>Home Portal</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              {/* Accordion: Clinical AI Suite */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() =>
                    setMobileAccordion(mobileAccordion === 'ai_suite' ? null : 'ai_suite')
                  }
                  className="w-full flex items-center justify-between p-3 bg-slate-50/80 text-xs font-bold text-slate-800"
                >
                  <span className="flex items-center gap-2 text-[#0D4F5C]">
                    <Sparkles className="w-4 h-4" />
                    Clinical AI Suite
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      mobileAccordion === 'ai_suite' ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {mobileAccordion === 'ai_suite' && (
                  <div className="p-2 space-y-1 bg-white border-t border-slate-100">
                    {aiSuiteItems.map((item) => {
                      const Icon = item.icon;
                      const isItemActive = currentPath === item.path;
                      return (
                        <button
                          key={item.path}
                          onClick={() => handleNavClick(item.path)}
                          className={`w-full flex items-center gap-2.5 p-2 rounded-lg text-left text-xs font-medium transition-colors ${
                            isItemActive
                              ? 'bg-teal-50 text-[#0D4F5C] font-bold'
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <Icon className="w-4 h-4 text-teal-700 shrink-0" />
                          <span className="flex-1 truncate">{item.title}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Accordion: Clinical Services */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() =>
                    setMobileAccordion(mobileAccordion === 'services' ? null : 'services')
                  }
                  className="w-full flex items-center justify-between p-3 bg-slate-50/80 text-xs font-bold text-slate-800"
                >
                  <span className="flex items-center gap-2 text-slate-800">
                    <Stethoscope className="w-4 h-4 text-[#0D4F5C]" />
                    Clinical Services
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      mobileAccordion === 'services' ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {mobileAccordion === 'services' && (
                  <div className="p-2 space-y-1 bg-white border-t border-slate-100 max-h-56 overflow-y-auto">
                    {clinicalSpecialties.map((dept, i) => (
                      <button
                        key={i}
                        onClick={() => handleNavClick('/appointments')}
                        className="w-full flex items-center gap-2 p-2 rounded-lg text-left text-xs text-slate-600 hover:bg-slate-50 hover:text-[#0D4F5C]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                        <span className="truncate">{dept.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Appointments */}
              <button
                onClick={() => handleNavClick('/appointments')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  currentPath === '/appointments'
                    ? 'bg-teal-50 text-[#0D4F5C] font-bold border border-teal-200'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#0D4F5C]" />
                  Appointments
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Open
                </span>
              </button>

            </div>

            {/* Drawer Sticky Footer with Emergency Button & Booking CTA */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2.5">
              <button
                onClick={() => handleNavClick('/appointments')}
                className="w-full bg-[#0D4F5C] hover:bg-[#093B45] text-white py-2.5 rounded-lg text-xs font-bold shadow-sm flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-teal-200" />
                <span>Book Appointment Online</span>
              </button>

              <a
                href="tel:18005550199"
                className="w-full bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-red-600" />
                <span>24/7 Helpline: +1 (800) 555-0199</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ─── 4. COMMAND PALETTE SEARCH MODAL (Ctrl+K / ⌘K) ────────────────── */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setSearchModalOpen(false)}
          />

          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 bg-slate-50/50">
              <Search className="w-5 h-5 text-[#0D4F5C]" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search doctors, departments, policies, or clinical tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              <kbd className="text-[10px] font-mono text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs">
                ESC to close
              </kbd>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 custom-scrollbar space-y-1">
              {searchResults.length > 0 ? (
                searchResults.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        if (item.modal === 'emergency') {
                          setSearchModalOpen(false);
                          setEmergencyModalOpen(true);
                        } else if (item.path) {
                          handleNavClick(item.path);
                        }
                      }}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left group cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#0D4F5C] flex items-center justify-center shrink-0 group-hover:bg-[#0D4F5C] group-hover:text-white transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-semibold text-slate-800 group-hover:text-[#0D4F5C] truncate">
                          {item.title}
                        </span>
                      </div>
                      <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full shrink-0">
                        {item.category}
                      </span>
                    </button>
                  );
                })
              ) : (
                <div className="py-8 text-center text-slate-400 text-xs">
                  No matching clinical services, doctors, or policies found.
                </div>
              )}
            </div>

            {/* Modal Quick Footer */}
            <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Quick Navigation</span>
              <div className="flex items-center gap-3">
                <span>Press <kbd className="font-mono bg-white px-1 border rounded">↵</kbd> to select</span>
                <span>Press <kbd className="font-mono bg-white px-1 border rounded">esc</kbd> to dismiss</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── 5. EMERGENCY PROTOCOL MODAL ──────────────────────────────────── */}
      {emergencyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setEmergencyModalOpen(false)}
          />

          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-red-200 overflow-hidden z-50">
            {/* Header */}
            <div className="bg-red-700 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="w-6 h-6 text-amber-300 animate-pulse" />
                <div>
                  <h3 className="font-bold text-base leading-tight">Emergency Clinical Protocols</h3>
                  <p className="text-xs text-red-100">AegisMed Trauma & Disaster Management</p>
                </div>
              </div>
              <button
                onClick={() => setEmergencyModalOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Protocol Cards */}
            <div className="p-5 space-y-3">
              <div className="p-3 bg-red-50 rounded-xl border border-red-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-red-900 flex items-center gap-1.5">
                    <HeartPulse className="w-4 h-4 text-red-700" />
                    Code Blue (Cardiac / Respiratory Arrest)
                  </span>
                  <span className="text-xs font-extrabold text-red-700">Dial Ext: 2222</span>
                </div>
                <p className="text-xs text-red-700">
                  Immediate CPR response team dispatched to patient bed within 90 seconds. Crash cart activated.
                </p>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-amber-700" />
                    Code Red (Fire / Evacuation Hazard)
                  </span>
                  <span className="text-xs font-extrabold text-amber-800">Dial Ext: 3333</span>
                </div>
                <p className="text-xs text-amber-700">
                  Execute R.A.C.E. protocol (Rescue, Alarm, Contain, Evacuate). Fire barrier doors automatically isolate wings.
                </p>
              </div>

              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                    <Ambulance className="w-4 h-4 text-blue-700" />
                    Level 1 Trauma Alert
                  </span>
                  <span className="text-xs font-extrabold text-blue-800">+1 (800) 555-0199</span>
                </div>
                <p className="text-xs text-blue-700">
                  Trauma surgeon, anesthesiologist, and blood bank cross-match team primed prior to ambulance arrival.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => {
                  setEmergencyModalOpen(false);
                  handleNavClick('/policy-rag');
                }}
                className="text-xs font-semibold text-[#0D4F5C] hover:underline cursor-pointer"
              >
                Search Full Policy Documents in RAG →
              </button>
              <button
                onClick={() => setEmergencyModalOpen(false)}
                className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

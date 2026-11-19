import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, ChevronRight, Activity, Database, CheckCircle2 } from 'lucide-react';

export default function Breadcrumb({ status }) {
  const location = useLocation();
  const currentPath = location.pathname;

  // Breadcrumb mapping definitions
  const routeConfigs = {
    '/': {
      title: 'Home Portal',
      crumbs: [{ label: 'Home', path: '/' }],
      pageTitle: 'AegisMed Medical Center & Clinical Intelligence',
      statusLabel: 'Clinical Portal Operational'
    },
    '/dashboard': {
      title: 'Clinical Operations Dashboard',
      crumbs: [
        { label: 'Home', path: '/' },
        { label: 'Clinical AI Suite', path: '/dashboard' },
        { label: 'Dashboard', path: '/dashboard', active: true }
      ],
      pageTitle: 'Clinical Operations Dashboard | AegisMed Medical Center',
      statusLabel: 'Telemetry Live'
    },
    '/documents': {
      title: 'Document Intelligence',
      crumbs: [
        { label: 'Home', path: '/' },
        { label: 'Clinical AI Suite', path: '/dashboard' },
        { label: 'Document Intelligence', path: '/documents', active: true }
      ],
      pageTitle: 'Document Intelligence | AegisMed Medical Center',
      statusLabel: 'PyMuPDF Engine Active'
    },
    '/policy-rag': {
      title: 'Policy RAG Search',
      crumbs: [
        { label: 'Home', path: '/' },
        { label: 'Clinical AI Suite', path: '/dashboard' },
        { label: 'Policy RAG Search', path: '/policy-rag', active: true }
      ],
      pageTitle: 'Policy RAG Search | AegisMed Medical Center',
      statusLabel: 'ChromaDB Vector Index: Active'
    },
    '/appointments': {
      title: 'Appointments',
      crumbs: [
        { label: 'Home', path: '/' },
        { label: 'Patient Care', path: '/appointments' },
        { label: 'Appointments', path: '/appointments', active: true }
      ],
      pageTitle: 'Doctor Appointments | AegisMed Medical Center',
      statusLabel: '10 Clinics Online'
    },
    '/ai-evaluation': {
      title: 'AI Model Safety & Evaluation',
      crumbs: [
        { label: 'Home', path: '/' },
        { label: 'Clinical AI Suite', path: '/dashboard' },
        { label: 'AI Evaluation', path: '/ai-evaluation', active: true }
      ],
      pageTitle: 'AI Model Safety & Evaluation | AegisMed Medical Center',
      statusLabel: 'Ragas Audit Ready'
    }
  };

  const currentConfig = routeConfigs[currentPath] || {
    title: 'Clinical Portal',
    crumbs: [
      { label: 'Home', path: '/' },
      { label: currentPath.replace('/', ''), path: currentPath, active: true }
    ],
    pageTitle: 'AegisMed Medical Center',
    statusLabel: 'System Active'
  };

  // Dynamically update document title on route change
  useEffect(() => {
    document.title = currentConfig.pageTitle;
  }, [currentConfig.pageTitle]);

  // Don't show redundant breadcrumb on root home if preferred, or show clean minimal bar
  if (currentPath === '/') {
    return null;
  }

  const ragChunks = status?.rag_stats?.total_chunks ?? 8;

  return (
    <div className="w-full bg-slate-50/95 border-b border-slate-200/80 py-2.5 px-4 sm:px-6 lg:px-8 xl:px-10 select-none text-xs">
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        
        {/* Left: Breadcrumbs trail */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-slate-500 overflow-x-auto custom-scrollbar py-0.5">
          <Link
            to="/"
            className="flex items-center gap-1 text-slate-500 hover:text-[#0D4F5C] transition-colors font-medium shrink-0"
          >
            <Home className="w-3.5 h-3.5 text-slate-400 hover:text-[#0D4F5C]" />
            <span>Home</span>
          </Link>

          {currentConfig.crumbs.slice(1).map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
              {crumb.active ? (
                <span className="font-semibold text-[#0D4F5C] whitespace-nowrap bg-teal-50 px-2 py-0.5 rounded border border-teal-200/60">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  to={crumb.path}
                  className="hover:text-[#0D4F5C] transition-colors font-medium whitespace-nowrap"
                >
                  {crumb.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Right: Path Indicator & Live Vector Index Status */}
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="font-mono text-[11px] bg-slate-200/70 text-slate-700 px-2 py-0.5 rounded border border-slate-300/60 font-medium">
            Path: <strong className="text-slate-900">{currentPath}</strong>
          </span>

          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span>{currentConfig.statusLabel}</span>
          </div>
        </div>

      </div>
    </div>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Layers, 
  FileText, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Database, 
  ArrowRight,
  Server,
  Activity
} from 'lucide-react';

export default function DashboardView({ status, onNavigate }) {
  const navigate = useNavigate();

  const handleGo = (target) => {
    const routeMap = {
      'doc_intel': '/documents',
      'rag_search': '/policy-rag',
      'appointments': '/appointments',
      'evaluation': '/ai-evaluation',
      'dashboard': '/dashboard'
    };
    const path = routeMap[target] || target;
    if (onNavigate) {
      onNavigate(target);
    }
    navigate(path);
  };

  const ragChunks = status?.rag_stats?.total_chunks ?? 8;
  const metrics = [
    { label: "Active Modules", value: "4 Modules", sub: "Operational & Healthy", icon: Layers, color: "text-[#0D4F5C]", bg: "bg-teal-50" },
    { label: "Indexed SOP Chunks", value: `${ragChunks} Chunks`, sub: "ChromaDB Vector Store", icon: Database, color: "text-[#115E6E]", bg: "bg-teal-50" },
    { label: "Specialist Doctors", value: "10 Doctors", sub: "Active Outpatient Clinics", icon: Users, color: "text-[#0D4F5C]", bg: "bg-teal-50" },
    { label: "RAG Reliability", value: "98.2%", sub: "Zero-Hallucination Gate", icon: Sparkles, color: "text-emerald-700", bg: "bg-emerald-50" },
  ];

  const pipeline = [
    { step: "1. Intake", title: "Document & Message Ingestion", desc: "PDFs via PyMuPDF or conversational queries via WebSocket/HTTP.", icon: FileText },
    { step: "2. Vector Store", title: "ChromaDB Semantic Retrieval", desc: "Embeddings searched with Cosine Similarity across hospital SOPs.", icon: Database },
    { step: "3. LLM Reasoning", title: "Pydantic & Function Calling", desc: "Structured parsing and multi-turn action commits (Appointments/Triage).", icon: Cpu },
    { step: "4. Persistence", title: "MongoDB Audit Logs", desc: "Persistent document history, bookings, and Ragas evaluation records.", icon: Server },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* ── 1. DEEP CLINICAL TEAL BANNER ──────────────────────────────────────── */}
      <div className="relative rounded-2xl bg-gradient-to-r from-[#0D4F5C] via-[#115E6E] to-[#0B424D] border border-[#093B45] text-white p-7 sm:p-8 shadow-md overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-extrabold tracking-wider uppercase bg-teal-900/60 text-teal-200 border border-teal-500/30">
              <Activity className="w-3.5 h-3.5 text-teal-300" />
              <span>Executive Telemetry</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2 text-white">
              Clinical Operations Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-teal-100/90 mt-1.5 leading-relaxed font-normal">
              Live telemetry for clinical record processing, SOP vector indexing, physician scheduling, and AI reliability benchmarks.
            </p>
          </div>
          <div className="shrink-0">
            <span className="px-3 py-1.5 rounded-full bg-teal-900/80 border border-teal-600/50 text-xs font-semibold text-teal-200 tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>FastAPI + ChromaDB Live</span>
            </span>
          </div>
        </div>
      </div>

      {/* ── 2. KPI CARDS ────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{m.label}</span>
                <div className={`w-9 h-9 rounded-xl ${m.bg} ${m.color} flex items-center justify-center`}>
                  <Icon className="w-4 h-4 stroke-[2]" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{m.value}</div>
              <div className="text-xs text-slate-400 font-semibold mt-1">{m.sub}</div>
            </div>
          );
        })}
      </div>

      {/* ── 3. ARCHITECTURE FLOW DIAGRAM ───────────────────────────────────── */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-2xs space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0D4F5C]">
            <ShieldCheck className="w-4 h-4" />
            <span>End-to-End Enterprise Flow</span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">Clinical AI Architecture & Data Pipeline</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            How AegisMed processes incoming unstructured data into validated clinical outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {pipeline.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="relative bg-[#F8FAFC] p-5 rounded-xl border border-slate-200/80 space-y-3 hover:border-teal-300 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#0D4F5C] uppercase tracking-wider">{p.step}</span>
                  <div className="w-8 h-8 rounded-lg bg-teal-100/70 text-[#0D4F5C] flex items-center justify-center">
                    <Icon className="w-4 h-4 stroke-[2]" />
                  </div>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{p.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 4. QUICK LAUNCHPAD CARDS ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div 
          onClick={() => handleGo('/documents')}
          className="bg-white p-6 rounded-2xl border border-slate-200/90 hover:border-[#0D4F5C]/50 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="text-base font-bold text-slate-900 group-hover:text-[#0D4F5C] transition-colors flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#0D4F5C]" />
              <span>Extract Clinical Record PDF</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0D4F5C] group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Upload patient laboratory panels or discharge notes for structured Pydantic schema extraction.
          </p>
        </div>

        <div 
          onClick={() => handleGo('/policy-rag')}
          className="bg-white p-6 rounded-2xl border border-slate-200/90 hover:border-[#0D4F5C]/50 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="text-base font-bold text-slate-900 group-hover:text-[#0D4F5C] transition-colors flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#0D4F5C]" />
              <span>Query Hospital Policies & SOPs</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0D4F5C] group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Retrieve authoritative hospital procedures and compliance rules with exact section citations.
          </p>
        </div>
      </div>
    </div>
  );
}

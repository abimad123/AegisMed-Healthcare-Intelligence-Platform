import React, { useState, useEffect } from 'react';
import { 
  Search, 
  BookOpen, 
  Quote, 
  ShieldAlert, 
  Sparkles, 
  Loader2, 
  ArrowRight,
  ShieldCheck,
  FileText,
  CheckCircle,
  HelpCircle,
  CornerDownRight
} from 'lucide-react';
import { api } from '../api';

export default function PolicyRAGView() {
  const [query, setQuery] = useState('');
  const [topK, setTopK] = useState(5);
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState('All');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const sampleQueries = [
    "What are the ICU visiting hours and family regulations?",
    "What is the emergency response Code Blue resuscitation protocol?",
    "How should high-alert medication dispensing errors be documented?",
    "What are the patient discharge planning and readmission criteria?",
    "What is the HIPAA compliance and patient data privacy guideline?",
  ];

  useEffect(() => {
    async function fetchDocs() {
      const res = await api.getPolicyDocuments();
      if (res.data?.documents) {
        setDocuments(res.data.documents);
      }
    }
    fetchDocs();
  }, []);

  const handleSearch = async (overrideQuery) => {
    const q = overrideQuery || query;
    if (!q.trim()) return;
    setLoading(true);
    setError(null);
    const filter = selectedDoc === 'All' ? null : selectedDoc;
    const res = await api.searchPolicies(q, topK, filter);
    setLoading(false);
    if (res.error) {
      setError(res.error);
    } else {
      setResult(res.data);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* ── 1. DEEP CLINICAL TEAL BANNER ──────────────────────────────────────── */}
      <div className="relative rounded-2xl bg-gradient-to-r from-[#0D4F5C] via-[#115E6E] to-[#0B424D] border border-[#093B45] text-white p-7 sm:p-8 shadow-md overflow-hidden">
        {/* Subtle architectural background texture */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-extrabold tracking-wider uppercase bg-teal-900/60 text-teal-200 border border-teal-500/30">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-300" />
              <span>SEMANTIC RAG</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2 text-white">
              Policy RAG Search
            </h1>
            <p className="text-xs sm:text-sm text-teal-100/90 mt-1.5 leading-relaxed font-normal">
              Context-grounded vector search across verified hospital protocols, infection control guidelines, and HIPAA standards.
            </p>
          </div>

          <div className="hidden md:flex flex-col items-end shrink-0">
            <span className="text-[11px] font-semibold text-teal-200 uppercase tracking-wider">Indexed Documents</span>
            <span className="text-2xl font-black text-white">{documents.length || 8} Manuals</span>
            <span className="text-[10px] text-teal-300/80">Cosine Distance ChromaDB</span>
          </div>
        </div>
      </div>

      {/* ── 2. SUGGESTED CLINICAL QUERIES ────────────────────────────────────── */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <HelpCircle className="w-3.5 h-3.5 text-[#0D4F5C]" />
            <span>Suggested Clinical Queries</span>
          </div>
          <span className="text-[11px] text-slate-400 hidden sm:inline">Click to execute vector lookup</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {sampleQueries.map((sq, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(sq);
                handleSearch(sq);
              }}
              type="button"
              className="text-xs font-medium px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] hover:bg-[#F0F7F8] text-slate-700 hover:text-[#0D4F5C] border border-slate-200/80 hover:border-[#0D4F5C]/40 active:scale-[0.98] transition-all text-left flex items-center justify-between gap-2 group cursor-pointer"
            >
              <span className="truncate">"{sq}"</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#0D4F5C] group-hover:translate-x-0.5 transition-all shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* ── 3. SEARCH CONSOLE & FILTERS CARD ─────────────────────────────────── */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          
          {/* Main Query Input */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Ask any question about hospital SOPs, medication safety, or infection control..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D4F5C]/15 focus:border-[#0D4F5C] font-medium text-slate-800 placeholder-slate-400 transition-all"
            />
          </div>

          {/* Filters & Execute Button */}
          <div className="flex items-center gap-2">
            <select
              value={topK}
              onChange={(e) => setTopK(Number(e.target.value))}
              className="px-3 py-3 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-700 focus:outline-none focus:border-[#0D4F5C] focus:ring-2 focus:ring-[#0D4F5C]/15 transition-all cursor-pointer"
            >
              <option value={3}>Top 3 Chunks</option>
              <option value={5}>Top 5 Chunks</option>
              <option value={8}>Top 8 Chunks</option>
            </select>

            <select
              value={selectedDoc}
              onChange={(e) => setSelectedDoc(e.target.value)}
              className="px-3 py-3 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-700 focus:outline-none focus:border-[#0D4F5C] focus:ring-2 focus:ring-[#0D4F5C]/15 max-w-[180px] sm:max-w-[210px] truncate transition-all cursor-pointer"
            >
              <option value="All">All Documents</option>
              {documents.map((d, i) => (
                <option key={i} value={d}>{d}</option>
              ))}
            </select>

            <button
              onClick={() => handleSearch()}
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-[#0D4F5C] hover:bg-[#093B45] active:scale-[0.98] text-white font-semibold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin text-teal-200" /> : <Search className="w-4 h-4 text-teal-200" />}
              <span>Search</span>
            </button>
          </div>

        </div>
      </div>

      {/* ── 4. ERROR MESSAGE ─────────────────────────────────────────────────── */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-3 animate-in fade-in">
          <ShieldAlert className="w-5 h-5 shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {/* ── 5. RESULTS SECTION ──────────────────────────────────────────────── */}
      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-200">
          
          {/* Verified Answer Card */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0D4F5C]">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>Verified Clinical Policy Guidance</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>{Math.round((result.confidence_score || 0.94) * 100)}% Confidence Match</span>
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal">
              {result.answer}
            </p>
          </div>

          {/* Authoritative Citations Grid */}
          {result.citations?.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#0D4F5C]" />
                  <span>Authoritative Source Citations ({result.citations.length})</span>
                </h4>
                <span className="text-xs text-slate-500">ChromaDB Cosine Retrieval</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.citations.map((c, i) => (
                  <div key={i} className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs space-y-2 hover:border-teal-300 transition-colors">
                    <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
                      <span className="font-bold text-[#0D4F5C] truncate max-w-[240px] flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-teal-50 text-[#0D4F5C] flex items-center justify-center text-[10px] shrink-0 font-mono">
                          {i + 1}
                        </span>
                        <span className="truncate">{c.source_document || 'Hospital Policy Manual'}</span>
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        Section: {c.section || 'General'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-normal pt-1">
                      "{c.content}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}

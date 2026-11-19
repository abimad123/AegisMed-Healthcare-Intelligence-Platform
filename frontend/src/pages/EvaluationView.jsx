import React, { useState } from 'react';
import { 
  CheckCircle, 
  BarChart2, 
  Sparkles, 
  Target, 
  Loader2, 
  ShieldAlert, 
  HelpCircle,
  FileCheck2
} from 'lucide-react';
import { api } from '../api';

export default function EvaluationView() {
  const [activeSubTab, setActiveSubTab] = useState('demo');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [report, setReport] = useState(null);

  // Single triplet evaluation state
  const [singleQ, setSingleQ] = useState('What are the visiting hours for the Intensive Care Unit (ICU)?');
  const [singleA, setSingleA] = useState('ICU visiting hours are strictly 10:00 AM - 1:00 PM and 5:00 PM - 8:00 PM, limited to two immediate family members.');
  const [singleCtx, setSingleCtx] = useState('Hospital ICU Visiting Policy Section 2: Visiting hours are strictly 10:00 AM - 1:00 PM and 5:00 PM - 8:00 PM. Maximum 2 immediate family members allowed per bedside.');
  const [singleResult, setSingleResult] = useState(null);
  const [singleLoading, setSingleLoading] = useState(false);

  const runBenchmark = async () => {
    setLoading(true);
    setError(null);
    const res = await api.runDemoEval();
    setLoading(false);
    if (res.error) {
      setError(res.error);
    } else {
      setReport(res.data);
    }
  };

  const runSingleEvaluation = async () => {
    if (!singleQ.trim() || !singleA.trim() || !singleCtx.trim()) return;
    setSingleLoading(true);
    setError(null);
    const payload = {
      question: singleQ,
      answer: singleA,
      contexts: singleCtx.split('\n').filter(Boolean),
    };
    const res = await api.runSingleEval(payload);
    setSingleLoading(false);
    if (res.error) {
      setError(res.error);
    } else {
      setSingleResult(res.data);
    }
  };

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
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-extrabold tracking-wider uppercase bg-teal-900/60 text-teal-200 border border-teal-500/30">
              <CheckCircle className="w-3.5 h-3.5 text-teal-300" />
              <span>RAGAS EVALUATION ENGINE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2 text-white">
              AI Evaluation Pipeline
            </h1>
            <p className="text-xs sm:text-sm text-teal-100/90 mt-1.5 max-w-2xl font-normal leading-relaxed">
              Zero-hallucination benchmark testing across clinical answers evaluating Faithfulness, Answer Relevancy, and Context Relevancy.
            </p>
          </div>
          <div className="shrink-0">
            <span className="px-3 py-1.5 rounded-full bg-teal-900/80 border border-teal-600/50 text-xs font-semibold text-teal-200 tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Faithfulness & Audit Logs</span>
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => { setActiveSubTab('demo'); setError(null); }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeSubTab === 'demo' ? 'bg-[#0D4F5C] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          📊 Automated Benchmark Demo
        </button>
        <button
          onClick={() => { setActiveSubTab('single'); setError(null); }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeSubTab === 'single' ? 'bg-[#0D4F5C] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          🧪 Custom Triplet Evaluation
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Demo Benchmark Tab */}
      {activeSubTab === 'demo' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Hospital Policy Ragas Benchmark</h3>
              <p className="text-xs text-slate-500 mt-1">
                Computes mathematical metrics over sample ground-truth policy questions and retrieved answers.
              </p>
            </div>
            <button
              onClick={runBenchmark}
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-[#0D4F5C] hover:bg-[#093B45] text-white font-semibold text-xs sm:text-sm shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50 shrink-0 transition-all"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin text-teal-200" /> : <Sparkles className="w-4 h-4 text-teal-200" />}
              <span>{loading ? 'Evaluating Samples...' : 'Run Benchmark Evaluation'}</span>
            </button>
          </div>

          {report && (
            <div className="space-y-6">
              {/* Score Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Faithfulness", score: report.avg_faithfulness, desc: "Factual alignment with context" },
                  { label: "Answer Relevancy", score: report.avg_answer_relevancy, desc: "Direct addressing of question" },
                  { label: "Context Relevancy", score: report.avg_context_relevancy, desc: "Precision of retrieved passages" },
                  { label: "Overall Score", score: report.avg_overall_score, desc: "Composite Ragas Benchmark" },
                ].map((item, idx) => {
                  const pct = Math.round((item.score || 0) * 100);
                  return (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs text-center space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">{item.label}</div>
                      <div className="text-4xl font-extrabold text-[#0D4F5C]">{pct}%</div>
                      <div className="text-xs text-slate-500 font-medium">{item.desc}</div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mt-3">
                        <div 
                          className="bg-[#0D4F5C] h-full rounded-full transition-all duration-700" 
                          style={{ width: `${pct}%` }} 
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Sample Results List */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
                  <span>Evaluated Test Samples ({report.total_samples || 0})</span>
                  <span>Execution: {(report.duration_seconds || 0).toFixed(2)}s</span>
                </div>

                <div className="space-y-4">
                  {(report.results || []).map((res, i) => (
                    <div key={i} className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-slate-900 text-sm">Q: {res.question}</div>
                        <span className="px-2 py-0.5 rounded-full bg-teal-50 text-[#0D4F5C] font-mono text-xs font-bold border border-teal-200">
                          Overall: {Math.round((res.overall_score || 0) * 100)}%
                        </span>
                      </div>
                      <div className="text-xs text-slate-600"><b>A:</b> {res.answer}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Single Triplet Tab */}
      {activeSubTab === 'single' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-2xs space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Question</label>
              <input
                type="text"
                value={singleQ}
                onChange={(e) => setSingleQ(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D4F5C]/15 focus:border-[#0D4F5C]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Answer to Evaluate</label>
              <textarea
                rows={3}
                value={singleA}
                onChange={(e) => setSingleA(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D4F5C]/15 focus:border-[#0D4F5C]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Reference Context</label>
              <textarea
                rows={3}
                value={singleCtx}
                onChange={(e) => setSingleCtx(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D4F5C]/15 focus:border-[#0D4F5C]"
              />
            </div>

            <button
              onClick={runSingleEvaluation}
              disabled={singleLoading}
              className="px-6 py-3 rounded-xl bg-[#0D4F5C] hover:bg-[#093B45] text-white font-semibold text-xs sm:text-sm shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50 transition-all"
            >
              {singleLoading ? <Loader2 className="w-4 h-4 animate-spin text-teal-200" /> : <CheckCircle className="w-4 h-4 text-teal-200" />}
              <span>{singleLoading ? 'Evaluating Triplet...' : 'Evaluate Clinical Triplet'}</span>
            </button>
          </div>

          {singleResult && (
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Evaluation Scores</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {Object.entries(singleResult.metrics || {}).map(([k, v]) => (
                  <div key={k} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                    <div className="text-xs font-bold text-slate-500 uppercase">{k.replace(/_/g, ' ')}</div>
                    <div className="text-2xl font-extrabold text-blue-700 mt-1">{Math.round((v || 0) * 100)}%</div>
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


import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Activity, 
  Pill, 
  Stethoscope, 
  ClipboardList, 
  Loader2 
} from 'lucide-react';
import { api } from '../api';

export default function DocumentIntelligenceView() {
  const [activeSubTab, setActiveSubTab] = useState('upload');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [extraction, setExtraction] = useState(null);

  const demoText = `Patient Name: Arjun Mehta
Patient ID: MRN-48291
Age: 45 Years    Gender: Male
Date: 12/10/2024
Attending Physician: Dr. Priya Sharma
Department: Cardiology
Hospital: AegisMed Memorial Hospital

Chief Complaint: Chest pain radiating to left arm and shortness of breath for 2 days.

Vital Signs:
BP: 142/90 mmHg    HR: 98 bpm    Temp: 98.6°F    SpO2: 96%    Weight: 82 kg

Laboratory Results:
Troponin I    0.18    ng/mL    (0.00-0.04)    High
CK-MB        28.5    U/L      (0-24)         High
Total Cholesterol 245    mg/dL    (<200)         High
LDL          158    mg/dL    (<130)         High
HbA1c        6.8    %        (4.0-5.6)      High
CBC WBC      11.2   K/uL     (4.5-11.0)     High

Prescribed Medications:
Aspirin 81 mg oral daily
Atorvastatin 40 mg oral at bedtime
Metoprolol 25 mg oral twice daily

Diagnosis:
Primary: Acute Coronary Syndrome (NSTEMI)
Secondary: Essential Hypertension, Dyslipidemia
ICD-10 Codes: I21.4, I10, E78.5

Clinical Recommendations & Care Plan:
- Urgent cardiac catheterization
- Continue dual antiplatelet therapy
- Low-sodium, low-fat cardiac diet
- Follow-up in Cardiology clinic in 2 weeks`;

  const [rawText, setRawText] = useState(demoText);

  const handleFileUpload = async (e) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
    }
  };

  const processUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    const res = await api.uploadDocument(file);
    setLoading(false);
    if (res.error) {
      setError(res.error);
    } else {
      setExtraction(res.data);
    }
  };

  const processTextExtraction = async () => {
    if (!rawText.trim()) return;
    setLoading(true);
    setError(null);
    const res = await api.extractText(rawText);
    setLoading(false);
    if (res.error) {
      setError(res.error);
    } else {
      setExtraction(res.data);
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
              <FileText className="w-3.5 h-3.5 text-teal-300" />
              <span>CLINICAL EXTRACTION</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2 text-white">
              Document Intelligence
            </h1>
            <p className="text-xs sm:text-sm text-teal-100/90 mt-1.5 max-w-2xl font-normal leading-relaxed">
              Automated ingestion and extraction of structured patient records, vital indicators, diagnostic codes, and lab tests.
            </p>
          </div>
          <div className="shrink-0">
            <span className="px-3 py-1.5 rounded-full bg-teal-900/80 border border-teal-600/50 text-xs font-semibold text-teal-200 tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>PyMuPDF + Pydantic v2</span>
            </span>
          </div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => { setActiveSubTab('upload'); setError(null); }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeSubTab === 'upload' ? 'bg-[#0D4F5C] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          📄 Upload Clinical PDF
        </button>
        <button
          onClick={() => { setActiveSubTab('text'); setError(null); }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeSubTab === 'text' ? 'bg-[#0D4F5C] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          ✍️ Paste Clinical Text
        </button>
      </div>

      {/* Error alert */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Upload mode */}
      {activeSubTab === 'upload' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-2xs space-y-6">
          <label className="border-2 border-dashed border-slate-300 hover:border-[#0D4F5C] bg-slate-50/50 hover:bg-teal-50/20 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors block text-center">
            <UploadCloud className="w-12 h-12 text-[#0D4F5C] mb-3" />
            <span className="text-sm font-bold text-slate-800">Drag and drop patient PDF or click to browse</span>
            <span className="text-xs text-slate-400 mt-1">Discharge Summaries, Lab Panels, Prescriptions (Max 25MB)</span>
            <input 
              type="file" 
              accept=".pdf" 
              onChange={handleFileUpload} 
              className="hidden" 
            />
          </label>

          {file && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-teal-50/70 border border-teal-200/60">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-[#0D4F5C]" />
                <div>
                  <div className="text-sm font-bold text-slate-900">{file.name}</div>
                  <div className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</div>
                </div>
              </div>
              <button
                onClick={processUpload}
                disabled={loading}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0D4F5C] hover:bg-[#093B45] active:scale-[0.98] text-white font-semibold text-xs sm:text-sm shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin text-teal-200" /> : <CheckCircle2 className="w-4 h-4 text-teal-200" />}
                <span>{loading ? 'Analyzing with PyMuPDF...' : 'Analyze Document'}</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Text paste mode */}
      {activeSubTab === 'text' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-2xs space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Unstructured Clinical Report
            </label>
            <textarea
              rows={10}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              className="w-full p-4 rounded-xl border border-slate-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#0D4F5C]/15 focus:border-[#0D4F5C] bg-slate-50/30"
              placeholder="Paste patient summary..."
            />
          </div>

          <button
            onClick={processTextExtraction}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-[#0D4F5C] hover:bg-[#093B45] active:scale-[0.98] text-white font-semibold text-xs sm:text-sm shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50 transition-all"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin text-teal-200" /> : <CheckCircle2 className="w-4 h-4 text-teal-200" />}
            <span>{loading ? 'Extracting Entities...' : 'Extract Clinical Data'}</span>
          </button>
        </div>
      )}

      {/* Extraction Results */}
      {extraction && (
        <div className="space-y-6 pt-4">
          {/* Header Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0D4F5C] uppercase tracking-wider">
                {extraction.document_type || 'Clinical Document'}
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                {extraction.patient_name || 'Patient Summary'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                MRN: {extraction.patient_id || 'N/A'} · Age: {extraction.patient_age || '—'} · Gender: {extraction.patient_gender || '—'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                {Math.round((extraction.extraction_confidence || 0.95) * 100)}% Confidence
              </span>
            </div>
          </div>

          {/* Vitals and Labs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vitals Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-base">
                <Activity className="w-5 h-5 text-blue-600" />
                <span>Vital Signs</span>
              </div>
              <div className="space-y-2 divide-y divide-slate-100 text-sm">
                {Object.entries(extraction.vital_signs || {}).map(([k, v]) => (
                  <div key={k} className="pt-2 flex justify-between items-center">
                    <span className="text-slate-500 capitalize">{k.replace(/_/g, ' ')}</span>
                    <span className="font-bold text-slate-900">{v || '—'}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Labs Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-base">
                <ClipboardList className="w-5 h-5 text-indigo-600" />
                <span>Laboratory Findings</span>
              </div>
              <div className="space-y-2.5 max-h-64 overflow-y-auto custom-scrollbar pr-1">
                {(extraction.lab_results || []).map((lab, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-slate-50/70 border border-slate-200/60 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-800">{lab.test_name}</div>
                      <div className="text-slate-400 font-medium">Ref: {lab.unit || ''}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-extrabold text-slate-900">{lab.value}</div>
                      {lab.status && (
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          ['High', 'Critical'].includes(lab.status) ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {lab.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Diagnosis and Medications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Medications */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-base">
                <Pill className="w-5 h-5 text-emerald-600" />
                <span>Prescribed Medications</span>
              </div>
              <div className="space-y-2 text-xs">
                {(extraction.medications || []).map((m, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="font-bold text-slate-900 text-sm">{m.name}</div>
                    <div className="text-slate-500 mt-0.5">{[m.dosage, m.frequency, m.route].filter(Boolean).join(' · ')}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Diagnosis */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-base">
                <Stethoscope className="w-5 h-5 text-sky-600" />
                <span>Clinical Diagnosis & Coding</span>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase">Primary Diagnosis</span>
                  <div className="font-bold text-slate-900 mt-0.5">{extraction.diagnosis?.primary || '—'}</div>
                </div>
                {extraction.diagnosis?.secondary?.length > 0 && (
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Secondary Conditions</span>
                    <div className="text-slate-700 text-xs mt-0.5">{extraction.diagnosis.secondary.join(', ')}</div>
                  </div>
                )}
                {extraction.diagnosis?.icd_codes?.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap pt-2">
                    <span className="text-xs font-bold text-slate-400">ICD-10:</span>
                    {extraction.diagnosis.icd_codes.map((c, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-mono text-xs font-bold">
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


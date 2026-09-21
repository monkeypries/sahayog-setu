'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  X, 
  Building2, 
  ShieldCheck, 
  FileCheck2, 
  Download, 
  CheckCircle2, 
  Landmark 
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  bundle: {
    title: string;
    scheduleVII: string;
    targetCount: string;
    totalBudget: number;
    description: string;
  } | null;
}

export const CSRBundleModal: React.FC<Props> = ({ isOpen, onClose, bundle }) => {
  const { addCSRAllocation } = useApp();

  const [companyName, setCompanyName] = useState('Infosys Technologies Ltd');
  const [cinNo, setCinNo] = useState('L85110KA1981PLC013115');
  const [generatedUC, setGeneratedUC] = useState<string | null>(null);

  if (!isOpen || !bundle) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!companyName.trim() || cinNo.trim().length !== 21) {
      alert('Please provide your corporate entity name and a valid 21-character Corporate Identification Number (CIN).');
      return;
    }

    const ucNo = addCSRAllocation({
      corporateName: companyName,
      cinNo: cinNo.toUpperCase(),
      amountAllocated: bundle.totalBudget,
      projectTitle: bundle.title,
      scheduleVIIItem: bundle.scheduleVII
    });

    setGeneratedUC(ucNo);
  };

  const handleClose = () => {
    setGeneratedUC(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">Statutory CSR Capital Allocation</h2>
              <p className="text-[11px] text-slate-400">Companies Act 2013 (Section 135 & Schedule VII)</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          
          {generatedUC ? (
            /* SUCCESS: Board-Ready Utilization Certificate */
            <div className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-5 sm:p-6 space-y-4 text-center">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">CSR Utilization Certificate (UC) Issued</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Valid for MCA e-filing & Form CSR-2 Statutory Disclosures
                </p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl text-left border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">UC Reference No:</span>
                  <span className="text-emerald-400 font-mono font-bold">{generatedUC}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Corporate Entity:</span>
                  <span className="text-white font-medium truncate max-w-[240px]">{companyName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Corporate CIN:</span>
                  <span className="text-white font-mono uppercase">{cinNo}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Project / Scope:</span>
                  <span className="text-slate-200">{bundle.title}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Schedule VII Category:</span>
                  <span className="text-slate-300">{bundle.scheduleVII}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Statutory Spend Amount:</span>
                  <span className="text-emerald-400 font-bold">₹{bundle.totalBudget.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between pt-0.5">
                  <span className="text-slate-400">Implementing Agency:</span>
                  <span className="text-slate-300">Sahayog Foundation (CSR-1 Reg: CSR00049281)</span>
                </div>
              </div>

              <button
                onClick={() => {
                  alert('Utilization Certificate (UC) exported as Board-ready PDF dossier.');
                  handleClose();
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Export Audited Board Dossier (PDF)</span>
              </button>
            </div>
          ) : (
            /* ALLOCATION FORM */
            <form id="csr-allocation-form" onSubmit={handleSubmit} className="space-y-4">
              
              {/* Bundle Snapshot */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {bundle.scheduleVII}
                  </span>
                  <span className="text-sm font-bold text-white">
                    ₹{bundle.totalBudget.toLocaleString('en-IN')}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-100">{bundle.title}</h4>
                <p className="text-[11px] text-slate-400">{bundle.description}</p>
              </div>

              {/* Legal Entity Inputs */}
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-300 mb-1">
                    Corporate Entity Name (As registered with MCA)
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-300 mb-1">
                    Corporate Identification Number (21-Digit CIN)
                  </label>
                  <input
                    type="text"
                    maxLength={21}
                    required
                    value={cinNo}
                    onChange={e => setCinNo(e.target.value.toUpperCase())}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white uppercase font-mono tracking-wider focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Statutory Compliance Checklist */}
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-[11px] space-y-1.5 text-slate-400">
                <div className="flex items-center gap-2 text-slate-300 font-semibold">
                  <Landmark className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Statutory Undertaking:</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Channeled via MCA-approved Section 8 entity (Form CSR-1 registered).</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Geo-tagged, milestone-based proof-of-work attached upon fulfillment.</span>
                </div>
              </div>

            </form>
          )}

        </div>

        {/* Footer */}
        {!generatedUC && (
          <div className="p-3 sm:p-4 border-t border-slate-800 bg-slate-900 flex justify-end gap-2 shrink-0">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="csr-allocation-form"
              className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition shadow-lg shadow-emerald-500/20"
            >
              Execute CSR Grant & Issue UC
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { RaiseNeedModal } from './RaiseNeedModal';
import { NeedRequest } from '@/types';

import { 
  Building, 
  PlusCircle, 
  CheckCircle2, 
  Truck, 
  FileCheck2, 
  MapPin, 
  ShieldCheck,
  X
} from 'lucide-react';

export const BeneficiaryView: React.FC = () => {
  const { requests, updateRequestStatus, t } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSignOffRequest, setActiveSignOffRequest] = useState<NeedRequest | null>(null);
  const [otpInput, setOtpInput] = useState('');
  const [podPhotoUploaded, setPodPhotoUploaded] = useState(false);

  const demoSchoolName = 'Govt. Boys Senior Secondary School';
  const myRequests = requests.filter(r => r.beneficiaryName === demoSchoolName);

  const handleSignOffDelivery = () => {
    if (otpInput.length !== 4) {
      alert('Please enter the 4-digit driver handover OTP.');
      return;
    }
    if (!podPhotoUploaded) {
      alert('Please upload/confirm the geotagged placement photo before sign-off.');
      return;
    }

    if (activeSignOffRequest) {
      updateRequestStatus(activeSignOffRequest.id, 'DELIVERED');
      setActiveSignOffRequest(null);
      setOtpInput('');
      setPodPhotoUploaded(false);
      alert('Proof of Delivery confirmed! Impact ledger updated for donors and CSR audit.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8 space-y-6 sm:space-y-8">
      
      {/* Header Profile Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-start sm:items-center gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Building className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-base sm:text-xl font-bold text-white">{demoSchoolName}</h1>
              <span className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                <ShieldCheck className="w-3 h-3" /> U-DISE Verified
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-1 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
              <span>Sarita Vihar, South East Delhi • 110076</span>
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2.5 rounded-xl font-semibold text-xs transition shadow-lg shadow-emerald-500/20 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Raise New Infrastructure Need</span>
        </button>
      </div>

      {/* Requests Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-bold text-white">Registered Needs & Fulfillment Pipeline</h2>
          <span className="text-xs text-slate-400">{myRequests.length} Postings</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {myRequests.map(req => {
            const progress = Math.min(100, Math.round((req.quantityFulfilled / req.quantityNeeded) * 100));

            return (
              <div
                key={req.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-slate-700 transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {req.category}
                    </span>
                    
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                      req.status === 'DELIVERED'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : req.status === 'IN_TRANSIT'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        : 'bg-sky-500/10 text-sky-400 border-sky-500/30'
                    }`}>
                      {req.status.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-white mb-2 leading-snug">{req.title}</h3>

                  {/* Progress Bar */}
                  <div className="space-y-1 mb-4">
                    <div className="flex justify-between text-[11px] sm:text-xs">
                      <span className="text-slate-400">Fulfilled</span>
                      <span className="text-white font-medium">
                        {req.quantityFulfilled} / {req.quantityNeeded} {req.unit} ({progress}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Specifications checklist */}
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 mb-4">
                    <p className="text-[10px] font-semibold text-slate-400 mb-1.5">Required Specifications:</p>
                    <ul className="text-[11px] space-y-1 text-slate-300">
                      {req.specifications.slice(0, 2).map((s, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 truncate">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span className="truncate">{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action / Sign-off trigger */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-mono">ID: {req.id}</span>

                  {req.status === 'DELIVERED' ? (
                    <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                      <FileCheck2 className="w-3.5 h-3.5" /> POD Confirmed
                    </span>
                  ) : (
                    <button
                      onClick={() => setActiveSignOffRequest(req)}
                      className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg font-medium transition flex items-center gap-1.5"
                    >
                      <Truck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Sign-off Handover</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Handover / Proof of Delivery (POD) Sign-off Modal */}
      {activeSignOffRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-4 sm:p-6 relative shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm sm:text-base font-bold text-white">Proof of Delivery (POD)</h3>
              <button
                onClick={() => setActiveSignOffRequest(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-xs text-slate-400 mb-4 line-clamp-1">
              Handover for: <span className="text-slate-200 font-medium">{activeSignOffRequest.title}</span>
            </p>

            <div className="space-y-4">
              {/* OTP Simulation */}
              <div className="bg-slate-950 p-3 sm:p-4 rounded-xl border border-slate-800">
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-300 mb-1">
                  Driver / Courier Handover OTP
                </label>
                <input
                  type="text"
                  maxLength={4}
                  value={otpInput}
                  onChange={e => setOtpInput(e.target.value)}
                  placeholder="Enter 4-digit OTP (e.g. 4821)"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-center text-lg tracking-widest text-white font-mono focus:outline-none focus:border-emerald-500"
                />
                <p className="text-[10px] text-slate-500 text-center mt-1">
                  (Demo: enter any 4 numbers provided by delivery driver)
                </p>
              </div>

              {/* Photo POD checklist */}
              <div className="bg-slate-950 p-3 sm:p-4 rounded-xl border border-slate-800 space-y-2">
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-300">
                  Geotagged Delivery Verification
                </label>
                <div
                  onClick={() => setPodPhotoUploaded(!podPhotoUploaded)}
                  className={`p-3 rounded-lg border-2 border-dashed cursor-pointer text-center transition ${
                    podPhotoUploaded
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
                      : 'border-slate-700 hover:border-slate-500 text-slate-400'
                  }`}
                >
                  <p className="text-xs font-medium">
                    {podPhotoUploaded ? '✓ Placement Photo Attached (Geotagged)' : 'Tap to simulate uploading placement photo'}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setActiveSignOffRequest(null)}
                  className="flex-1 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSignOffDelivery}
                  className="flex-1 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition shadow-lg shadow-emerald-500/20"
                >
                  Verify & Sign POD
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for creating a new need */}
      <RaiseNeedModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { NeedRequest } from '@/types';
import { 
  X, 
  Truck, 
  Wrench, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  UserCheck 
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  request: NeedRequest | null;
}

export const DispatchModal: React.FC<Props> = ({ isOpen, onClose, request }) => {
  const { updateRequestStatus } = useApp();

  const [vehicleType, setVehicleType] = useState('Porter 2-Wheeler / Hyperlocal Courier');
  const [driverName, setDriverName] = useState('Ramesh Yadav (DL-1M-4892)');
  const [needsRefurb, setNeedsRefurb] = useState(request?.category === 'TECH');

  if (!isOpen || !request) return null;

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();

    // If it requires refurbishment diagnostic check, route to REFURBISHING first, else IN_TRANSIT
    const nextStatus = needsRefurb ? 'REFURBISHING' : 'IN_TRANSIT';
    updateRequestStatus(request.id, nextStatus);

    alert(
      needsRefurb
        ? `Request routed to authorized hardware diagnostic hub for wiping & testing!`
        : `Hyperlocal 3PL dispatch confirmed! Driver OTP issued.`
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">Dispatch & Logistics Routing</h2>
              <p className="text-[11px] text-slate-400">Hyperlocal 3PL / Refurbishment Facility Handoff</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          <form id="dispatch-form" onSubmit={handleDispatch} className="space-y-4">
            
            {/* Target Delivery Summary */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {request.category}
                </span>
                <span className="text-xs font-mono text-emerald-400">{request.id}</span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-white">{request.title}</h4>
              <p className="text-[11px] text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                <span>{request.beneficiaryName} • PIN {request.pincode}</span>
              </p>
            </div>

            {/* Quality Diagnostic Toggle */}
            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={needsRefurb}
                  onChange={e => setNeedsRefurb(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-0 mt-0.5"
                />
                <div className="text-xs">
                  <span className="font-semibold text-slate-200 block">Route via Technical Refurbishment Hub</span>
                  <span className="text-[11px] text-slate-400 leading-relaxed block mt-0.5">
                    Recommended for electronics: Performs diagnostic stress test, DoD 3-pass data sanitization, and clean OS install before final school delivery.
                  </span>
                </div>
              </label>
            </div>

            {/* 3PL Fleet Allocation */}
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-300 mb-1">
                  Assigned 3PL Logistics Partner & Vehicle
                </label>
                <select
                  value={vehicleType}
                  onChange={e => setVehicleType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option>Porter 2-Wheeler / Hyperlocal Courier (Laptops/Books)</option>
                  <option>Porter Tata Ace / 3-Wheeler (Benches/Heavy Infra)</option>
                  <option>Delhivery Express (Inter-District)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-300 mb-1">
                  Driver / Courier Dispatch Partner
                </label>
                <input
                  type="text"
                  required
                  value={driverName}
                  onChange={e => setDriverName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Verification Undertaking */}
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl flex items-center gap-2 text-[11px] text-emerald-300">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Generates 4-digit handover OTP sent via automated WhatsApp to driver.</span>
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-slate-800 bg-slate-900 flex justify-end gap-2 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs text-slate-400 hover:text-white transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="dispatch-form"
            className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition shadow-lg shadow-emerald-500/20"
          >
            Confirm Dispatch
          </button>
        </div>

      </div>
    </div>
  );
};
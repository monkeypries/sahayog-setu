'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { NeedRequest, RequestStatus } from '@/types';
import { DispatchModal } from './DispatchModal';
import { 
  ShieldCheck, 
  Truck, 
  Wrench, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Building, 
  FileText,
  AlertCircle,
  Cpu,
  Package
} from 'lucide-react';

export const AdminDesk: React.FC = () => {
  const { requests, pledges, updateRequestStatus } = useApp();

  const [activeTab, setActiveTab] = useState<'REQUESTS' | 'PLEDGES' | 'REFURB'>('REQUESTS');
  const [selectedDispatchRequest, setSelectedDispatchRequest] = useState<NeedRequest | null>(null);

  // Status progression helper
  const handleQuickStatusAdvance = (id: string, currentStatus: RequestStatus) => {
    const sequence: Record<RequestStatus, RequestStatus> = {
      PENDING_VERIFICATION: 'ACTIVE',
      ACTIVE: 'PLEDGED',
      PLEDGED: 'IN_TRANSIT',
      REFURBISHING: 'IN_TRANSIT',
      IN_TRANSIT: 'DELIVERED',
      DELIVERED: 'DELIVERED'
    };
    updateRequestStatus(id, sequence[currentStatus]);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8 space-y-6 sm:space-y-8">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-start sm:items-center gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-base sm:text-xl font-bold text-white">Operations & Logistics Command Desk</h1>
              <span className="text-[10px] sm:text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                Audit & Fleet Control
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
              Quality Gatekeeper • Hardware Sanitization • 3PL Porter Fulfillment
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-3 p-1 bg-slate-950 rounded-xl border border-slate-800 w-full sm:w-auto text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveTab('REQUESTS')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'REQUESTS'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Needs ({requests.length})
          </button>
          <button
            onClick={() => setActiveTab('PLEDGES')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'PLEDGES'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Pledges ({pledges.length})
          </button>
          <button
            onClick={() => setActiveTab('REFURB')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'REFURB'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Diagnostics
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <span className="text-[10px] sm:text-xs text-slate-400 font-medium">Total Registered SKUs</span>
          <p className="text-lg sm:text-xl font-bold text-white mt-1">{requests.length}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <span className="text-[10px] sm:text-xs text-slate-400 font-medium">In-Kind Pledges</span>
          <p className="text-lg sm:text-xl font-bold text-emerald-400 mt-1">{pledges.length}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <span className="text-[10px] sm:text-xs text-slate-400 font-medium">Active In Transit / Fleet</span>
          <p className="text-lg sm:text-xl font-bold text-amber-400 mt-1">
            {requests.filter(r => r.status === 'IN_TRANSIT' || r.status === 'REFURBISHING').length}
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
          <span className="text-[10px] sm:text-xs text-slate-400 font-medium">Delivered / Closed</span>
          <p className="text-lg sm:text-xl font-bold text-sky-400 mt-1">
            {requests.filter(r => r.status === 'DELIVERED').length}
          </p>
        </div>
      </div>

      {/* TAB 1: ALL REQUESTS MANAGEMENT */}
      {activeTab === 'REQUESTS' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Package className="w-4 h-4 text-emerald-400" />
              <span>Institutional Needs & Fulfillment Pipeline</span>
            </h2>
            <span className="text-xs text-slate-400">Live State Synchronization</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-semibold">
                <tr>
                  <th className="p-3.5">ID / Need SKU</th>
                  <th className="p-3.5">Beneficiary & U-DISE</th>
                  <th className="p-3.5">Location / PIN</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Fulfillment</th>
                  <th className="p-3.5 text-right">Logistics Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {requests.map(req => (
                  <tr key={req.id} className="hover:bg-slate-850">
                    <td className="p-3.5">
                      <span className="font-mono text-emerald-400 text-[11px] block">{req.id}</span>
                      <span className="font-semibold text-white">{req.title}</span>
                    </td>
                    <td className="p-3.5">
                      <p className="font-medium text-slate-200">{req.beneficiaryName}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{req.udiseOrRegNo}</p>
                    </td>
                    <td className="p-3.5 font-mono text-slate-300">{req.pincode}</td>
                    <td className="p-3.5">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                        req.status === 'DELIVERED'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : req.status === 'IN_TRANSIT'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : req.status === 'REFURBISHING'
                          ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                          : 'bg-sky-500/10 text-sky-400 border-sky-500/30'
                      }`}>
                        {req.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className="font-medium text-white">{req.quantityFulfilled} / {req.quantityNeeded}</span>
                      <span className="text-[10px] text-slate-400 ml-1">({req.unit})</span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      {req.status !== 'DELIVERED' && (
                        <>
                          <button
                            onClick={() => setSelectedDispatchRequest(req)}
                            className="inline-flex items-center gap-1 text-[11px] bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-2.5 py-1.5 rounded-lg transition"
                          >
                            <Truck className="w-3 h-3" />
                            <span>Dispatch</span>
                          </button>

                          <button
                            onClick={() => handleQuickStatusAdvance(req.id, req.status)}
                            title="Quick Advance State"
                            className="inline-flex items-center text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1.5 rounded-lg transition"
                          >
                            Next ➔
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: IN-KIND PLEDGES INSPECTION */}
      {activeTab === 'PLEDGES' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800">
            <h2 className="text-sm sm:text-base font-bold text-white">
              Civic In-Kind Pledges & Quality Audits ({pledges.length})
            </h2>
          </div>

          {pledges.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No civic in-kind pledges made yet. Switch to the Individual Donor view to simulate a donation pledge.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-semibold">
                  <tr>
                    <th className="p-3.5">Pledge Ref</th>
                    <th className="p-3.5">Donor Name & Mobile</th>
                    <th className="p-3.5">Condition Assessment</th>
                    <th className="p-3.5">Logistics Plan</th>
                    <th className="p-3.5">Quality Gate Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {pledges.map(plg => (
                    <tr key={plg.id} className="hover:bg-slate-850">
                      <td className="p-3.5 font-mono text-emerald-400 font-medium">{plg.id}</td>
                      <td className="p-3.5">
                        <p className="font-semibold text-white">{plg.donorName}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{plg.donorPhone}</p>
                      </td>
                      <td className="p-3.5">
                        <span className="text-emerald-400 font-medium">{plg.itemCondition}</span>
                      </td>
                      <td className="p-3.5">
                        <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {plg.logisticsMethod.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span className="flex items-center gap-1 text-emerald-400 text-[11px] font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Rubric Confirmed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: HARDWARE DIAGNOSTICS & REFURBISHMENT */}
      {activeTab === 'REFURB' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">Hardware Diagnostic & Data Erasure Station</h3>
              <p className="text-xs text-slate-400">Authorized e-waste partner certification interface</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-semibold">1. Diagnostic Gate</span>
<p className="text-xs text-slate-300">Display, battery health ({'>'}75%), keyboard matrix, port integrity.</p>            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-semibold">2. Data Sanitization</span>
              <p className="text-xs text-slate-300">DoD 5220.22-M 3-pass erasure certificate issued per device serial.</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 font-semibold">3. School OS Deployment</span>
              <p className="text-xs text-slate-300">Clean Ubuntu / Windows Education + offline STEM content pre-loaded.</p>
            </div>
          </div>
        </div>
      )}

      {/* 3PL Dispatch Modal */}
      <DispatchModal
        isOpen={Boolean(selectedDispatchRequest)}
        onClose={() => setSelectedDispatchRequest(null)}
        request={selectedDispatchRequest}
      />

    </div>
  );
};
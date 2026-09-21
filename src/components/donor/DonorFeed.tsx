'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { NeedRequest, Category } from '@/types';
import { PledgeModal } from './PledgeModal';
import { 
  Search, 
  MapPin, 
  HeartHandshake, 
  Filter, 
  CheckCircle2, 
  Building,
  CreditCard
} from 'lucide-react';

export const DonorFeed: React.FC = () => {
  const { requests } = useApp();

  const [searchPincode, setSearchPincode] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedRequest, setSelectedRequest] = useState<NeedRequest | null>(null);

  // Filter requests
  const filteredRequests = requests.filter(r => {
    const matchesCategory = selectedCategory === 'ALL' || r.category === selectedCategory;
    const matchesPincode = !searchPincode.trim() || r.pincode.includes(searchPincode.trim());
    return matchesCategory && matchesPincode;
  });

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8 space-y-6">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 rounded-2xl p-5 sm:p-8 shadow-xl">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Hyperlocal Civic Resource Matching</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Donate functional equipment directly to verified local institutions
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Hand over your working laptops, furniture, and books without middlemen, or micro-sponsor brand-new units with Section 80G tax deductions.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchPincode}
              onChange={e => setSearchPincode(e.target.value)}
              placeholder="Search by 6-digit Pincode (e.g. 110076, 110078)..."
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>

          <div className="relative">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="ALL">All Categories</option>
              <option value="TECH">Technology & Laptops</option>
              <option value="FURNITURE">Desks & Benches</option>
              <option value="STATIONERY">Science & Book Kits</option>
              <option value="INFRA">Clean Water & Infra</option>
            </select>
          </div>
        </div>
      </div>

      {/* Feed List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-bold text-white">
            Verified Needs Near You ({filteredRequests.length})
          </h2>
          <span className="text-xs text-slate-400">Audited via U-DISE / Darpan</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredRequests.map(req => {
            const progress = Math.min(100, Math.round((req.quantityFulfilled / req.quantityNeeded) * 100));
            const isCompleted = req.status === 'DELIVERED';

            return (
              <div
                key={req.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-slate-700 transition shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {req.category}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-500" /> {req.pincode}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-white mb-1.5 leading-snug">{req.title}</h3>

                  <p className="text-[11px] text-slate-400 mb-3 flex items-center gap-1">
                    <Building className="w-3 h-3 text-slate-500 shrink-0" />
                    <span className="truncate">{req.beneficiaryName}</span>
                  </p>

                  {/* Progress */}
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
                    <p className="text-[10px] font-semibold text-slate-400 mb-1">Specifications:</p>
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

                {/* Card Action */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                  <div className="text-[10px] text-slate-400 font-mono">
                    ₹{req.estimatedCostPerUnit?.toLocaleString('en-IN')}/{req.unit}
                  </div>

                  {isCompleted ? (
                    <span className="text-xs text-emerald-400 font-semibold">Requirement Met</span>
                  ) : (
                    <button
                      onClick={() => setSelectedRequest(req)}
                      className="text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-3.5 py-1.5 rounded-lg font-bold transition shadow-md shadow-emerald-500/20"
                    >
                      Fulfill Need
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fulfillment / Pledge Modal */}
      <PledgeModal
        request={selectedRequest}
        onClose={() => setSelectedRequest(null)}
      />
    </div>
  );
};
'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { CSRBundleModal } from './CSRBundleModal';
import { 
  Building2, 
  ShieldCheck, 
  Download, 
  Layers, 
  Laptop, 
  MapPin, 
  Filter, 
  FileText, 
  Compass, 
  CheckCircle2, 
  Info,
  ChevronRight,
  TrendingUp,
  School
} from 'lucide-react';

const CSR_BUNDLES = [
  {
    id: 'BNDL-ICT-01',
    title: 'Cluster Smart ICT Lab Upgrade (5 Govt Schools)',
    scheduleVII: 'Item (ii) - Education & Digital Literacy',
    targetCount: '50 Refurbished Laptops + 5 Charging Carts',
    totalBudget: 450000,
    description: 'Empowers 1,800+ middle and high school students with dedicated computer labs, pre-loaded STEM curricula, and teacher tech-orientation.'
  },
  {
    id: 'BNDL-DESK-02',
    title: 'Dual Study Desk Infrastructure Drive (3 Shelters)',
    scheduleVII: 'Item (ii) - Education Infrastructure',
    targetCount: '120 Wooden Dual-Benches',
    totalBudget: 288000,
    description: 'Replaces makeshift floor seating with ergonomic two-seater wooden desks across three registered child care institutions.'
  },
  {
    id: 'BNDL-WATER-03',
    title: 'Clean Safe Drinking Water Hubs (4 Rural Schools)',
    scheduleVII: 'Item (i) - Preventive Healthcare & Sanitation',
    targetCount: '4 Commercial UV/RO Water Systems',
    totalBudget: 120000,
    description: 'Deploys 50 LPH commercial water purifiers with 1-year annual maintenance contracts for continuous clean drinking water.'
  }
];

export const CorporateView: React.FC = () => {
  const { requests, csrAllocations } = useApp();

  const [activeTab, setActiveTab] = useState<'NEED_INTELLIGENCE' | 'STATUTORY_CSR' | 'ITAD_ESG'>('NEED_INTELLIGENCE');
  const [selectedBundle, setSelectedBundle] = useState<typeof CSR_BUNDLES[0] | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ALL');

  // ITAD State
  const [decomCount, setDecomCount] = useState(25);
  const [decomDeviceType, setDecomDeviceType] = useState('Enterprise Laptops (Core i5 / 16GB)');
  const [itadPledged, setItadPledged] = useState(false);

  // Group needs by district to reveal real unmediated demand
  const filteredRequests = requests.filter(r => {
    if (selectedDistrict === 'ALL') return true;
    return r.location.toLowerCase().includes(selectedDistrict.toLowerCase());
  });

  const totalDemandUnits = requests.reduce((acc, curr) => acc + curr.quantityNeeded, 0);
  const totalFulfilledUnits = requests.reduce((acc, curr) => acc + curr.quantityFulfilled, 0);
  const deficitPercentage = Math.round(((totalDemandUnits - totalFulfilledUnits) / (totalDemandUnits || 1)) * 100);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8 space-y-6 sm:space-y-8">
      
      {/* Header Profile Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-start sm:items-center gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Building2 className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-base sm:text-xl font-bold text-white">Corporate CSR Strategic Portal</h1>
              <span className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                <ShieldCheck className="w-3 h-3" /> Demand-Pull CSR Engine
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
              Direct Beneficiary Ground Data • Zero Intermediary Bias • MCA Section 135 Compliant
            </p>
          </div>
        </div>

        {/* View Switcher */}
        <div className="grid grid-cols-3 p-1 bg-slate-950 rounded-xl border border-slate-800 w-full sm:w-auto text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveTab('NEED_INTELLIGENCE')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'NEED_INTELLIGENCE'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Need Intelligence
          </button>
          <button
            onClick={() => setActiveTab('STATUTORY_CSR')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'STATUTORY_CSR'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            CSR Bundles
          </button>
          <button
            onClick={() => setActiveTab('ITAD_ESG')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'ITAD_ESG'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ITAD / E-Waste
          </button>
        </div>
      </div>

      {/* TAB 1: NEED INTELLIGENCE (Direct Beneficiary Demand Heatmap) */}
      {activeTab === 'NEED_INTELLIGENCE' && (
        <div className="space-y-6">
          
          {/* Ground Reality Callout */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/30 border border-emerald-500/30 rounded-2xl p-5 sm:p-6 shadow-xl space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              <span>Direct-from-Source Institutional Deficit Audits</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              Stop relying on intermediary NGO pitch decks. Allocate capital to primary, verified school demand.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              Traditional CSR is limited by supply-push pitches: implementing non-profits propose projects that match their own convenience. Below is raw, unfiltered demand raised directly by verified government school principals and shelter wardens.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Total Verified Demand</span>
                <span className="text-base font-bold text-white">{totalDemandUnits} units</span>
              </div>
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Critical Deficit Rate</span>
                <span className="text-base font-bold text-rose-400">{deficitPercentage}% Unfulfilled</span>
              </div>
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Institutional Sources</span>
                <span className="text-base font-bold text-emerald-400">100% U-DISE Audited</span>
              </div>
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Intermediary Markup</span>
                <span className="text-base font-bold text-sky-400">0% (Direct Sourcing)</span>
              </div>
            </div>
          </div>

          {/* Regional Filter & Direct Demand Explorer */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Grassroots Deficit Registry ({filteredRequests.length} Verified Institutions)
                </h3>
                <p className="text-xs text-slate-400">Select an unaddressed institution to fund directly via CSR-1 implementing partners</p>
              </div>

              {/* District Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-slate-500" />
                <select
                  value={selectedDistrict}
                  onChange={e => setSelectedDistrict(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="ALL">All Operational Clusters</option>
                  <option value="Delhi">Delhi-NCR Cluster</option>
                  <option value="Sarita Vihar">South East Delhi</option>
                  <option value="Dwarka">South West Delhi</option>
                </select>
              </div>
            </div>

            {/* Direct Demand Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRequests.map(req => {
                const deficit = req.quantityNeeded - req.quantityFulfilled;
                const totalCostToSponsor = deficit * (req.estimatedCostPerUnit || 1000);

                return (
                  <div
                    key={req.id}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-slate-700 transition"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {req.category}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> U-DISE: {req.udiseOrRegNo}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">{req.title}</h4>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
                          <School className="w-3 h-3 text-slate-500 shrink-0" />
                          <span className="truncate">{req.beneficiaryName}</span>
                        </p>
                        <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-600 shrink-0" />
                          <span>{req.location} • {req.pincode}</span>
                        </p>
                      </div>

                      {/* Deficit Highlight Box */}
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 space-y-1 text-xs">
                        <div className="flex justify-between text-slate-400">
                          <span>Unmet Gap:</span>
                          <span className="text-rose-400 font-bold">{deficit} {req.unit}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Capital Required:</span>
                          <span className="text-emerald-400 font-bold">₹{totalCostToSponsor.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 mt-3 flex items-center justify-between">
                      <span className="text-[10px] text-slate-500">Urgency: <strong className="text-slate-300">{req.urgency}</strong></span>
                      <button
                        onClick={() => {
                          setSelectedBundle({
                            id: `DIRECT-${req.id}`,
                            title: `Direct Institutional Fulfillment: ${req.beneficiaryName}`,
                            scheduleVII: 'Item (ii) - Education Infrastructure',
                            targetCount: `${deficit} ${req.unit} direct to ${req.beneficiaryName}`,
                            totalBudget: totalCostToSponsor,
                            description: `Direct CSR funding allocated to bridge raw deficit of ${deficit} ${req.unit} for U-DISE entity ${req.udiseOrRegNo}.`
                          });
                        }}
                        className="text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-3 py-1.5 rounded-lg font-bold transition shadow-md shadow-emerald-500/20 flex items-center gap-1"
                      >
                        <span>Adopt Need</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: PRE-PACKAGED STATUTORY CSR BUNDLES */}
      {activeTab === 'STATUTORY_CSR' && (
        <div className="space-y-6">
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Aggregated Schedule VII Infrastructure Clusters</span>
              </h2>
              <span className="text-xs text-slate-400">Multi-School Aggregations</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              {CSR_BUNDLES.map(b => (
                <div
                  key={b.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-slate-700 transition"
                >
                  <div className="space-y-3">
                    <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-emerald-400">
                      {b.scheduleVII}
                    </span>

                    <h3 className="text-xs sm:text-sm font-bold text-white leading-snug">{b.title}</h3>
                    <p className="text-[11px] text-slate-400 line-clamp-3">{b.description}</p>

                    <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 text-xs">
                      <span className="text-slate-400 block text-[10px]">Scope of Deliverables:</span>
                      <span className="text-slate-200 font-semibold">{b.targetCount}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Total Grant Budget</span>
                      <span className="text-sm font-bold text-white">₹{b.totalBudget.toLocaleString('en-IN')}</span>
                    </div>

                    <button
                      onClick={() => setSelectedBundle(b)}
                      className="text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-3.5 py-1.5 rounded-lg font-bold transition shadow-md shadow-emerald-500/20"
                    >
                      Fund Project
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Past CSR Allocations Ledger */}
          <div className="space-y-3">
            <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Statutory CSR Grant Ledger ({csrAllocations.length})</span>
            </h2>

            {csrAllocations.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center text-xs text-slate-400">
                No statutory grants issued in this session yet. Fund a bundle or adopt a direct school need above to generate a real-time Utilization Certificate.
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-semibold">
                    <tr>
                      <th className="p-3">UC Ref No</th>
                      <th className="p-3">Corporate Entity / CIN</th>
                      <th className="p-3">Project Title</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Date</th>
                      <th className="p-3 text-right">Audit Dossier</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {csrAllocations.map(csr => (
                      <tr key={csr.id} className="hover:bg-slate-850">
                        <td className="p-3 font-mono text-emerald-400 font-medium">{csr.utilizationCertNo}</td>
                        <td className="p-3">
                          <p className="font-medium text-white">{csr.corporateName}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{csr.cinNo}</p>
                        </td>
                        <td className="p-3 text-slate-200">{csr.projectTitle}</td>
                        <td className="p-3 font-bold text-white">₹{csr.amountAllocated.toLocaleString('en-IN')}</td>
                        <td className="p-3 font-mono text-slate-400">{csr.date}</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => alert(`Exporting Board Audit Dossier for ${csr.utilizationCertNo}`)}
                            className="inline-flex items-center gap-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-lg transition"
                          >
                            <Download className="w-3 h-3" />
                            <span>PDF</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      )}

      {/* TAB 3: ITAD & CORPORATE E-WASTE RETIREMENT PORTAL */}
      {activeTab === 'ITAD_ESG' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
                <Laptop className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">Enterprise IT Asset Disposition (ITAD)</h3>
                <p className="text-xs text-slate-400">Direct-to-school hardware deployment with NIST-grade data wiping</p>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
              <p className="text-sky-300 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sky-400" />
                <span>Certified Data Sanitization Pipeline</span>
              </p>
              <p className="text-slate-400 leading-relaxed">
                All offloaded corporate systems undergo NIST 800-88 / DoD 5220.22-M 3-pass data wipe and receive an enterprise data erasure certificate prior to school deployment.
              </p>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                setItadPledged(true);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Asset Category</label>
                <select
                  value={decomDeviceType}
                  onChange={e => setDecomDeviceType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option>Enterprise Laptops (Core i5 / 16GB)</option>
                  <option>Workstation Desktops + Monitors</option>
                  <option>Network Switches & Wi-Fi Routers</option>
                  <option>Office Chairs & Conference Furniture</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Number of Units to Decommission</label>
                <input
                  type="number"
                  min={5}
                  max={500}
                  value={decomCount}
                  onChange={e => setDecomCount(parseInt(e.target.value) || 5)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-bold"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold transition shadow-lg shadow-sky-500/20"
              >
                Schedule Authorized ITAD Pickup
              </button>
            </form>
          </div>

          {/* ITAD ESG Certificate Preview */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-xl">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white mb-1">Corporate Circular ESG Metrics</h3>
              <p className="text-xs text-slate-400 mb-4">Real-time Scope 3 e-waste diversion and school impact</p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">E-Waste Prevented</span>
                  <p className="text-lg font-bold text-emerald-400 mt-1">{decomCount * 2.2} kg</p>
                </div>
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Students Benefited</span>
                  <p className="text-lg font-bold text-sky-400 mt-1">{decomCount * 8} students</p>
                </div>
              </div>

              {itadPledged && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>ITAD Batch Confirmed for Pickup</span>
                  </div>
                  <p className="text-[11px] text-emerald-200/90 leading-relaxed">
                    Batch of <strong>{decomCount} units</strong> registered. Authorized e-waste partner will arrive with serial barcode scanners and data-destruction chain-of-custody slips.
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500">
              * Non-CSR asset transfers: qualifies under BRSR (Business Responsibility & Sustainability Reporting) environmental disclosures.
            </div>
          </div>

        </div>
      )}

      {/* Statutory CSR Modal */}
      <CSRBundleModal
        isOpen={Boolean(selectedBundle)}
        onClose={() => setSelectedBundle(null)}
        bundle={selectedBundle}
      />

    </div>
  );
};
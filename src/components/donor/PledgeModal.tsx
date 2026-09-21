'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { NeedRequest } from '@/types';
import { 
  X, 
  HeartHandshake, 
  CheckCircle2, 
  AlertTriangle, 
  Truck, 
  CreditCard, 
  FileText, 
  ShieldCheck,
  Download
} from 'lucide-react';

interface Props {
  request: NeedRequest | null;
  onClose: () => void;
}

export const PledgeModal: React.FC<Props> = ({ request, onClose }) => {
  const { addInKindPledge, addMicroSponsorship } = useApp();

  const [activeTab, setActiveTab] = useState<'IN_KIND' | 'SPONSOR'>('IN_KIND');

  // Track A: In-Kind State
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [itemCondition, setItemCondition] = useState<'Working-Flawless' | 'Good-MinorCosmetic' | 'NeedsRepair'>('Working-Flawless');
  const [logisticsMethod, setLogisticsMethod] = useState<'SELF_DROP' | 'PORTER_PICKUP'>('PORTER_PICKUP');
  const [checklist, setChecklist] = useState({
    powersOn: false,
    noCracks: false,
    cablesIncluded: false,
    dataWiped: false
  });
  const [photoUploaded, setPhotoUploaded] = useState(false);

  // Track B: Micro-Sponsor State
  const [sponsorName, setSponsorName] = useState('');
  const [sponsorPAN, setSponsorPAN] = useState('');
  const [unitsToSponsor, setUnitsToSponsor] = useState(1);
  const [generated10BE, setGenerated10BE] = useState<string | null>(null);

  if (!request) return null;

  const costPerUnit = request.estimatedCostPerUnit || 1000;
  const totalSponsorship = costPerUnit * unitsToSponsor;

  // Handle Track A Submit
  const handleInKindSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!donorName.trim() || !donorPhone.trim()) {
      alert('Please enter your contact details.');
      return;
    }

    if (!photoUploaded) {
      alert('Please attach at least 1 functional photo of the item.');
      return;
    }

    const allChecked = Object.values(checklist).every(Boolean);
    if (!allChecked) {
      alert('You must confirm all quality-check rubric items before pledging.');
      return;
    }

    addInKindPledge({
      requestId: request.id,
      donorName,
      donorPhone,
      itemCondition,
      photos: ['https://placehold.co/400x300/10b981/ffffff?text=Verified+Item'],
      checklistConfirmed: true,
      logisticsMethod
    });

    alert('In-Kind pledge registered! Our logistics coordinator will connect for pickup.');
    onClose();
  };

  // Handle Track B Submit
  const handleSponsorSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!sponsorName.trim() || sponsorPAN.trim().length !== 10) {
      alert('Please provide your full legal name and a valid 10-digit PAN for Section 80G filing.');
      return;
    }

    const certNo = addMicroSponsorship({
      requestId: request.id,
      donorName: sponsorName,
      donorPAN: sponsorPAN.toUpperCase(),
      amount: totalSponsorship
    });

    setGenerated10BE(certNo);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white">Fulfill Institutional Request</h2>
              <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                {request.category}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{request.title}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dual Track Tabs */}
        {!generated10BE && (
          <div className="grid grid-cols-2 p-1.5 bg-slate-950/80 border-b border-slate-800 shrink-0 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('IN_KIND')}
              className={`py-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
                activeTab === 'IN_KIND'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>Donate Used Goods</span>
            </button>

            <button
              onClick={() => setActiveTab('SPONSOR')}
              className={`py-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
                activeTab === 'SPONSOR'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Sponsor New (80G Tax Benefit)</span>
            </button>
          </div>
        )}

        {/* Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          
          {/* SUCCESS SCREEN: Form 10BE Render */}
          {generated10BE ? (
            <div className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-5 sm:p-6 space-y-4 text-center">
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">Tax Exemption Certificate Generated</h3>
                <p className="text-xs text-slate-400 mt-1">Form No. 10BE under Section 80G of the Indian Income Tax Act</p>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl text-left border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Certificate No:</span>
                  <span className="text-emerald-400 font-mono font-bold">{generated10BE}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Donor Name:</span>
                  <span className="text-white font-medium">{sponsorName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Donor PAN:</span>
                  <span className="text-white font-mono uppercase">{sponsorPAN}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400">Eligible Section 80G Deduction:</span>
                  <span className="text-emerald-400 font-bold">₹{totalSponsorship.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between pt-0.5">
                  <span className="text-slate-400">Implementing NGO Partner:</span>
                  <span className="text-slate-300">Sahayog Social Foundation (CSR-1 / 12A / 80G)</span>
                </div>
              </div>

              <button
                onClick={() => {
                  alert('Certificate downloaded to your device.');
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Form 10BE Tax Receipt</span>
              </button>
            </div>
          ) : activeTab === 'IN_KIND' ? (
            
            /* TRACK A: IN-KIND FORM */
            <form id="in-kind-form" onSubmit={handleInKindSubmit} className="space-y-4">
              
              {/* Statutory Legal Disclaimer */}
              <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-200/90 leading-relaxed">
                  <strong>Indian Tax Law Notice:</strong> As per Section 80G of the Income Tax Act, used physical goods cannot be claimed for tax deduction. In-kind donations are peer-to-peer philanthropic gifts.
                </p>
              </div>

              {/* Donor Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-300 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Ankit Sharma"
                    value={donorName}
                    onChange={e => setDonorName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-300 mb-1">Mobile (for Driver OTP)</label>
                  <input
                    type="tel"
                    required
                    placeholder="98XXXXXXXX"
                    value={donorPhone}
                    onChange={e => setDonorPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              {/* Quality Checklist (Anti-Junk Rubric) */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5">
                <label className="block text-[11px] sm:text-xs font-semibold text-emerald-400">
                  Anti-Junk Quality Gate (Mandatory Confirmation)
                </label>
                <div className="space-y-2 text-xs text-slate-300">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.powersOn}
                      onChange={e => setChecklist(prev => ({ ...prev, powersOn: e.target.checked }))}
                      className="rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-0"
                    />
                    <span>Item boots / powers on completely without internal faults</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.noCracks}
                      onChange={e => setChecklist(prev => ({ ...prev, noCracks: e.target.checked }))}
                      className="rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-0"
                    />
                    <span>No structural fractures, shattered displays, or missing keys/legs</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.cablesIncluded}
                      onChange={e => setChecklist(prev => ({ ...prev, cablesIncluded: e.target.checked }))}
                      className="rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-0"
                    />
                    <span>Includes original/compatible power charger and cables</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checklist.dataWiped}
                      onChange={e => setChecklist(prev => ({ ...prev, dataWiped: e.target.checked }))}
                      className="rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-0"
                    />
                    <span>All personal accounts, passwords, and data have been wiped</span>
                  </label>
                </div>
              </div>

              {/* Photo Verification */}
              <div
                onClick={() => setPhotoUploaded(!photoUploaded)}
                className={`p-3.5 rounded-xl border-2 border-dashed cursor-pointer text-center transition ${
                  photoUploaded
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
                    : 'border-slate-700 hover:border-slate-500 text-slate-400'
                }`}
              >
                <p className="text-xs font-medium">
                  {photoUploaded ? '✓ Working Screen & Serial Photo Uploaded' : 'Tap to simulate uploading working item photo'}
                </p>
              </div>

              {/* Logistics Handover */}
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-300 mb-1.5">
                  Handover Logistics
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setLogisticsMethod('PORTER_PICKUP')}
                    className={`p-2.5 rounded-xl border text-left transition ${
                      logisticsMethod === 'PORTER_PICKUP'
                        ? 'border-emerald-500 bg-emerald-500/10 text-white font-medium'
                        : 'border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <p className="font-semibold text-slate-200">Doorstep Porter Pickup</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Subsidized flat ₹99</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLogisticsMethod('SELF_DROP')}
                    className={`p-2.5 rounded-xl border text-left transition ${
                      logisticsMethod === 'SELF_DROP'
                        ? 'border-emerald-500 bg-emerald-500/10 text-white font-medium'
                        : 'border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <p className="font-semibold text-slate-200">Self-Drop at School</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Free (within 48 hrs)</p>
                  </button>
                </div>
              </div>

            </form>
          ) : (

            /* TRACK B: MICRO-SPONSOR FORM (80G TAX EXEMPTION) */
            <form id="sponsor-form" onSubmit={handleSponsorSubmit} className="space-y-4">
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl flex items-start gap-2.5">
                <FileText className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-emerald-200/90 leading-relaxed">
                  <strong>Form No. 10BE Eligible:</strong> Funds are routed through our registered 80G non-profit partner. You will receive an official tax deduction certificate with your PAN.
                </p>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-300 mb-1">
                  How many units would you like to sponsor?
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    max={request.quantityNeeded - request.quantityFulfilled || 1}
                    value={unitsToSponsor}
                    onChange={e => setUnitsToSponsor(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-24 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 text-center font-bold"
                  />
                  <div className="text-xs">
                    <span className="text-slate-400">Total Contribution: </span>
                    <span className="text-base font-bold text-emerald-400">
                      ₹{totalSponsorship.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tax Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-300 mb-1">
                    Legal Name (As on PAN Card)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Legal Name"
                    value={sponsorName}
                    onChange={e => setSponsorName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-300 mb-1">
                    Permanent Account Number (PAN)
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    required
                    placeholder="ABCDE1234F"
                    value={sponsorPAN}
                    onChange={e => setSponsorPAN(e.target.value.toUpperCase())}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white uppercase focus:outline-none focus:border-emerald-500 font-mono tracking-wider"
                  />
                </div>
              </div>

            </form>
          )}

        </div>

        {/* Footer Actions */}
        {!generated10BE && (
          <div className="p-3 sm:p-4 border-t border-slate-800 bg-slate-900 flex justify-end gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white transition"
            >
              Cancel
            </button>
            
            {activeTab === 'IN_KIND' ? (
              <button
                type="submit"
                form="in-kind-form"
                className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-semibold transition shadow-lg shadow-emerald-500/20"
              >
                Confirm In-Kind Pledge
              </button>
            ) : (
              <button
                type="submit"
                form="sponsor-form"
                className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-semibold transition shadow-lg shadow-emerald-500/20"
              >
                Pay & Generate Form 10BE
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
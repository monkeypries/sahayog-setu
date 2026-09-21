'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Category } from '@/types';
import { X, CheckCircle2, PackagePlus } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SKU_CATALOG = [
  {
    category: 'TECH' as Category,
    title: 'Functional Laptops for ICT Lab',
    unit: 'Laptops',
    cost: 18000,
    specs: ['Core i3 / Ryzen 3 or higher', 'Min 8GB RAM + working charger', 'Min 45 min battery backup']
  },
  {
    category: 'FURNITURE' as Category,
    title: 'Dual-Seater Wooden Study Benches & Desks',
    unit: 'Sets',
    cost: 2400,
    specs: ['Dual desk + dual bench', 'Solid wood or metal frame', 'No hazardous splinters/protruding nails']
  },
  {
    category: 'STATIONERY' as Category,
    title: 'STEM Science & Geometry Kits for Students',
    unit: 'Kits',
    cost: 450,
    specs: ['Compass, divider, ruler & protractor set', 'Notebook set (4 ruled + 2 plain)']
  },
  {
    category: 'INFRA' as Category,
    title: 'Commercial RO Water Purifier & Dispenser',
    unit: 'Units',
    cost: 16000,
    specs: ['Min 50 LPH capacity', 'TDS controller with UV/UF filtration', '1 year consumable filters included']
  }
];

export const RaiseNeedModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { addRequest } = useApp();

  const [selectedSkuIndex, setSelectedSkuIndex] = useState(0);
  const [quantity, setQuantity] = useState(5);
  const [beneficiaryName, setBeneficiaryName] = useState('Govt. Boys Senior Secondary School');
  const [beneficiaryType, setBeneficiaryType] = useState<'Govt School' | 'Child Shelter' | 'Community Center'>('Govt School');
  const [udiseOrRegNo, setUdiseOrRegNo] = useState('07030204101');
  const [location, setLocation] = useState('Sarita Vihar, South East Delhi');
  const [pincode, setPincode] = useState('110076');
  const [urgency, setUrgency] = useState<'HIGH' | 'MEDIUM' | 'NORMAL'>('HIGH');

  if (!isOpen) return null;

  const currentSku = SKU_CATALOG[selectedSkuIndex];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!udiseOrRegNo.trim() || !beneficiaryName.trim()) {
      alert('Please fill out the institutional credentials.');
      return;
    }

    addRequest({
      title: currentSku.title,
      category: currentSku.category,
      quantityNeeded: Number(quantity),
      unit: currentSku.unit,
      beneficiaryName,
      beneficiaryType,
      udiseOrRegNo,
      location,
      pincode,
      urgency,
      estimatedCostPerUnit: currentSku.cost,
      specifications: currentSku.specs
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <PackagePlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">Raise Infrastructure Need</h2>
              <p className="text-[11px] sm:text-xs text-slate-400">Validated against U-DISE / NGO Darpan database</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body - Scrollable */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          <form id="raise-need-form" onSubmit={handleSubmit} className="space-y-4">
            
            {/* Institution Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-950/60 p-3 sm:p-4 rounded-xl border border-slate-800">
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-300 mb-1">Institution Name</label>
                <input
                  type="text"
                  value={beneficiaryName}
                  onChange={e => setBeneficiaryName(e.target.value)}
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-300 mb-1">Institution Type</label>
                <select
                  value={beneficiaryType}
                  onChange={e => setBeneficiaryType(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Govt School">Govt School (U-DISE)</option>
                  <option value="Child Shelter">Child Care / Orphanage</option>
                  <option value="Community Center">Non-Profit Learning Hub</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-300 mb-1">
                  {beneficiaryType === 'Govt School' ? '11-Digit U-DISE Code' : 'Darpan ID / Reg Deed No.'}
                </label>
                <input
                  type="text"
                  value={udiseOrRegNo}
                  onChange={e => setUdiseOrRegNo(e.target.value)}
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-300 mb-1">Local Pincode</label>
                <input
                  type="text"
                  value={pincode}
                  onChange={e => setPincode(e.target.value)}
                  maxLength={6}
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            </div>

            {/* Standardized SKU Picker */}
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-slate-300 mb-2">Select Need SKU</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SKU_CATALOG.map((sku, idx) => (
                  <button
                    type="button"
                    key={sku.title}
                    onClick={() => setSelectedSkuIndex(idx)}
                    className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                      selectedSkuIndex === idx
                        ? 'border-emerald-500 bg-emerald-500/10 text-white'
                        : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {sku.category}
                      </span>
                      <span className="text-xs font-semibold text-emerald-400">
                        ₹{sku.cost.toLocaleString('en-IN')}/{sku.unit}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-200 line-clamp-2">{sku.title}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* SKU Specs Preview */}
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-400 font-medium">Standard Compliance Specs:</span>
              <ul className="mt-1.5 space-y-1">
                {currentSku.specs.map((spec, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-300 text-[11px] sm:text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity & Urgency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-300 mb-1">
                  Units Needed ({currentSku.unit})
                </label>
                <input
                  type="number"
                  min={1}
                  max={200}
                  value={quantity}
                  onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-300 mb-1">Urgency Priority</label>
                <select
                  value={urgency}
                  onChange={e => setUrgency(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="HIGH">High (Within 15 Days)</option>
                  <option value="MEDIUM">Medium (Within 30 Days)</option>
                  <option value="NORMAL">Normal (Within 60 Days)</option>
                </select>
              </div>
            </div>

          </form>
        </div>

        {/* Modal Footer */}
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
            form="raise-need-form"
            className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-semibold transition shadow-lg shadow-emerald-500/20"
          >
            Publish Request
          </button>
        </div>

      </div>
    </div>
  );
};
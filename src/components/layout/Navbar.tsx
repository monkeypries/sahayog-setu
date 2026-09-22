'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';
import { Building2, HeartHandshake, School, ShieldCheck, RefreshCw, Languages } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentRole, setCurrentRole, resetData, language, toggleLanguage, t } = useApp();

  const roles: { id: UserRole; label: string; shortLabel: string; icon: React.ReactNode }[] = [
    { 
      id: 'donor', 
      label: t?.donorRole || 'Individual Donor', 
      shortLabel: language === 'hi' ? 'दाता' : 'Donor', 
      icon: <HeartHandshake className="w-4 h-4 shrink-0" /> 
    },
    { 
      id: 'beneficiary', 
      label: t?.beneficiaryRole || 'Beneficiary', 
      shortLabel: language === 'hi' ? 'स्कूल' : 'School', 
      icon: <School className="w-4 h-4 shrink-0" /> 
    },
    { 
      id: 'corporate', 
      label: t?.corporateRole || 'Corporate CSR', 
      shortLabel: language === 'hi' ? 'CSR' : 'CSR', 
      icon: <Building2 className="w-4 h-4 shrink-0" /> 
    },
    { 
      id: 'admin', 
      label: t?.opsRole || 'Ops Desk', 
      shortLabel: language === 'hi' ? 'ऑप्स' : 'Ops', 
      icon: <ShieldCheck className="w-4 h-4 shrink-0" /> 
    }
  ];

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md bg-slate-900/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* 1. Left: Brand Logo & Title */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-slate-950 text-xl shadow-md shadow-emerald-500/20">
              सं
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-white">
                  {t?.appName || 'SahayogSetu'}
                </span>
                <span className="text-[10px] uppercase font-semibold bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  MVP 1.0
                </span>
              </div>
            </div>
          </div>

          {/* 2. Center: Persona Tabs */}
          <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800 overflow-x-auto no-scrollbar">
            {roles.map(r => {
              const isActive = currentRole === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setCurrentRole(r.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {r.icon}
                  <span className="hidden sm:inline">{r.label}</span>
                  <span className="sm:hidden">{r.shortLabel}</span>
                </button>
              );
            })}
          </div>

          {/* 3. Right: Language Switcher & Reset Button */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Always-visible Language Switch Pill */}
            <button
              onClick={toggleLanguage}
              type="button"
              className="flex items-center gap-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
            </button>

            {/* Reset Button */}
            <button
              onClick={() => {
                if (confirm(language === 'hi' ? 'क्या आप डेमो डेटा रीसेट करना चाहते हैं?' : 'Reset demo database back to initial state?')) {
                  resetData();
                }
              }}
              title={t?.resetDemo || 'Reset Demo'}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 border border-slate-800 px-2.5 py-1.5 rounded-lg transition cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span className="hidden md:inline">{t?.resetDemo || 'Reset Demo'}</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
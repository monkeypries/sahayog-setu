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
      label: t.donorRole, 
      shortLabel: language === 'hi' ? 'दाता' : 'Donor', 
      icon: <HeartHandshake className="w-4 h-4 shrink-0" /> 
    },
    { 
      id: 'beneficiary', 
      label: t.beneficiaryRole, 
      shortLabel: language === 'hi' ? 'स्कूल' : 'School', 
      icon: <School className="w-4 h-4 shrink-0" /> 
    },
    { 
      id: 'corporate', 
      label: t.corporateRole, 
      shortLabel: language === 'hi' ? 'CSR' : 'CSR', 
      icon: <Building2 className="w-4 h-4 shrink-0" /> 
    },
    { 
      id: 'admin', 
      label: t.opsRole, 
      shortLabel: language === 'hi' ? 'ऑप्स' : 'Ops', 
      icon: <ShieldCheck className="w-4 h-4 shrink-0" /> 
    }
  ];

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md bg-slate-900/95">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          
          {/* Top Bar: Brand + Quick Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-slate-950 text-base sm:text-xl shadow-md shadow-emerald-500/20 shrink-0">
                सं
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-bold tracking-tight">{t.appName}</h1>
                  <span className="text-[9px] sm:text-[10px] uppercase font-semibold bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30">
                    MVP 1.0
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-400 hidden sm:block">
                  {t.tagline}
                </p>
              </div>
            </div>

            {/* Persistent Global Actions (Visible on Mobile & Desktop) */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleLanguage}
                type="button"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition shadow-sm"
                title="Switch Language / भाषा बदलें"
              >
                <Languages className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t.languageName}</span>
              </button>

              <button
                onClick={() => {
                  if (confirm(language === 'hi' ? 'क्या आप डेमो डेटा रीसेट करना चाहते हैं?' : 'Reset database back to initial seed state?')) {
                    resetData();
                  }
                }}
                title={t.resetDemo}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 border border-slate-800 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Persona Switcher Tabs: Scrollable touch container */}
          <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800 overflow-x-auto no-scrollbar scroll-smooth">
            {roles.map(r => {
              const isActive = currentRole === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setCurrentRole(r.id)}
                  className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex-1 sm:flex-initial ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 shadow-md font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {r.icon}
                  <span className="sm:inline hidden">{r.label}</span>
                  <span className="sm:hidden inline">{r.shortLabel}</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </header>
  );
};
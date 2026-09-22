'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  NeedRequest, 
  InKindPledge, 
  MicroSponsorship, 
  CSRAllocation, 
  UserRole, 
  RequestStatus 
} from '@/types';
import { 
  INITIAL_REQUESTS, 
  INITIAL_PLEDGES, 
  INITIAL_CSR_ALLOCATIONS 
} from '@/data/mockData';
import { Language, TRANSLATIONS } from '@/data/translations';

interface AppContextType {
  // Navigation & Role State
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;

  // Language & Translation State
  language: Language;
  toggleLanguage: () => void;
  t: typeof TRANSLATIONS['en'];

  // Needs State & Mutations
  requests: NeedRequest[];
  addRequest: (newReq: Omit<NeedRequest, 'id' | 'status' | 'quantityFulfilled' | 'createdAt'>) => void;
  updateRequestStatus: (id: string, status: RequestStatus) => void;

  // Individual Donor Mutations
  pledges: InKindPledge[];
  addInKindPledge: (pledge: Omit<InKindPledge, 'id' | 'createdAt'>) => void;
  addMicroSponsorship: (sponsorship: Omit<MicroSponsorship, 'id' | 'certificate10BENo' | 'date'>) => string;

  // Corporate CSR State & Mutations
  csrAllocations: CSRAllocation[];
  addCSRAllocation: (allocation: Omit<CSRAllocation, 'id' | 'utilizationCertNo' | 'date'>) => string;

  // Reset utilities
  resetData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persona switchboard
  const [currentRole, setCurrentRole] = useState<UserRole>('beneficiary');

  // Lazy state initializations to eliminate React 19 cascading-render lint errors
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('sahayog_lang') as Language;
      if (savedLang === 'en' || savedLang === 'hi') return savedLang;
    }
    return 'en';
  });

  const [requests, setRequests] = useState<NeedRequest[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('sahayog_requests');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.warn('Failed to parse cached requests', e);
      }
    }
    return INITIAL_REQUESTS;
  });

  const [pledges, setPledges] = useState<InKindPledge[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('sahayog_pledges');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.warn('Failed to parse cached pledges', e);
      }
    }
    return INITIAL_PLEDGES;
  });

  const [csrAllocations, setCsrAllocations] = useState<CSRAllocation[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('sahayog_csr');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.warn('Failed to parse cached CSR allocations', e);
      }
    }
    return INITIAL_CSR_ALLOCATIONS;
  });

  // Sync state mutations to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sahayog_requests', JSON.stringify(requests));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [requests]);

  useEffect(() => {
    try {
      localStorage.setItem('sahayog_pledges', JSON.stringify(pledges));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [pledges]);

  useEffect(() => {
    try {
      localStorage.setItem('sahayog_csr', JSON.stringify(csrAllocations));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [csrAllocations]);

  // Toggle Language Handler
  const toggleLanguage = () => {
    const nextLang: Language = language === 'en' ? 'hi' : 'en';
    setLanguage(nextLang);
    try {
      localStorage.setItem('sahayog_lang', nextLang);
    } catch (e) {
      console.warn('Failed to save language preference:', e);
    }
  };

  const t = TRANSLATIONS[language];

  // Beneficiary: Raise a new need
  const addRequest = (newReq: Omit<NeedRequest, 'id' | 'status' | 'quantityFulfilled' | 'createdAt'>) => {
    const id = `REQ-${Date.now().toString().slice(-4)}`;
    const created: NeedRequest = {
      ...newReq,
      id,
      quantityFulfilled: 0,
      status: 'ACTIVE',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setRequests(prev => [created, ...prev]);
  };

  // Ops Desk / Delivery: Update Lifecycle State
  const updateRequestStatus = (id: string, status: RequestStatus) => {
    setRequests(prev =>
      prev.map(r => {
        if (r.id === id) {
          const isFulfilled = status === 'DELIVERED';
          return {
            ...r,
            status,
            quantityFulfilled: isFulfilled ? r.quantityNeeded : r.quantityFulfilled
          };
        }
        return r;
      })
    );
  };

  // Donor: Track A - In-Kind Physical Pledge
  const addInKindPledge = (pledge: Omit<InKindPledge, 'id' | 'createdAt'>) => {
    const id = `PLG-${Date.now().toString().slice(-4)}`;
    const created: InKindPledge = {
      ...pledge,
      id,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setPledges(prev => [created, ...prev]);

    // Advance request status
    setRequests(prev =>
      prev.map(r => {
        if (r.id === pledge.requestId) {
          const nextFulfilled = Math.min(r.quantityNeeded, r.quantityFulfilled + 1);
          return {
            ...r,
            quantityFulfilled: nextFulfilled,
            status: nextFulfilled >= r.quantityNeeded ? 'PLEDGED' : r.status
          };
        }
        return r;
      })
    );
  };

  // Donor: Track B - Micro-Sponsorship with Form 10BE
  const addMicroSponsorship = (sponsorship: Omit<MicroSponsorship, 'id' | 'certificate10BENo' | 'date'>): string => {
    const certNo = `10BE-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    setRequests(prev =>
      prev.map(r => {
        if (r.id === sponsorship.requestId) {
          const unitsPurchased = Math.max(1, Math.floor(sponsorship.amount / (r.estimatedCostPerUnit || 1000)));
          const nextFulfilled = Math.min(r.quantityNeeded, r.quantityFulfilled + unitsPurchased);
          return {
            ...r,
            quantityFulfilled: nextFulfilled,
            status: nextFulfilled >= r.quantityNeeded ? 'PLEDGED' : r.status
          };
        }
        return r;
      })
    );

    return certNo;
  };

  // Corporate: Statutory Section 135 Grant with Board UC
  const addCSRAllocation = (allocation: Omit<CSRAllocation, 'id' | 'utilizationCertNo' | 'date'>): string => {
    const id = `CSR-${Date.now().toString().slice(-4)}`;
    const ucNo = `UC-MCA-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const date = new Date().toISOString().split('T')[0];

    const created: CSRAllocation = {
      ...allocation,
      id,
      utilizationCertNo: ucNo,
      date
    };

    setCsrAllocations(prev => [created, ...prev]);
    return ucNo;
  };

  // Reset to initial seed state
  const resetData = () => {
    localStorage.removeItem('sahayog_requests');
    localStorage.removeItem('sahayog_pledges');
    localStorage.removeItem('sahayog_csr');
    setRequests(INITIAL_REQUESTS);
    setPledges(INITIAL_PLEDGES);
    setCsrAllocations(INITIAL_CSR_ALLOCATIONS);
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        language,
        toggleLanguage,
        t,
        requests,
        addRequest,
        updateRequestStatus,
        pledges,
        addInKindPledge,
        addMicroSponsorship,
        csrAllocations,
        addCSRAllocation,
        resetData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
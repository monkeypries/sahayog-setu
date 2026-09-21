'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  NeedRequest, 
  UserRole, 
  InKindPledge, 
  MicroSponsorship, 
  CSRAllocation, 
  RequestStatus 
} from '@/types';
import { INITIAL_REQUESTS } from '@/data/mockData';

interface AppContextType {
  // Active Persona
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;

  // Requests Data
  requests: NeedRequest[];
  addRequest: (newReq: Omit<NeedRequest, 'id' | 'createdAt' | 'quantityFulfilled' | 'status'>) => void;
  updateRequestStatus: (id: string, status: RequestStatus) => void;

  // Donor Actions
  pledges: InKindPledge[];
  addInKindPledge: (pledge: Omit<InKindPledge, 'id' | 'createdAt'>) => void;
  sponsorships: MicroSponsorship[];
  addMicroSponsorship: (sponsorship: Omit<MicroSponsorship, 'id' | 'date' | 'certificate10BENo'>) => string;

  // Corporate Actions
  csrAllocations: CSRAllocation[];
  addCSRAllocation: (allocation: Omit<CSRAllocation, 'id' | 'date' | 'utilizationCertNo'>) => string;

  // Reset demo
  resetData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('donor');
  const [requests, setRequests] = useState<NeedRequest[]>([]);
  const [pledges, setPledges] = useState<InKindPledge[]>([]);
  const [sponsorships, setSponsorships] = useState<MicroSponsorship[]>([]);
  const [csrAllocations, setCsrAllocations] = useState<CSRAllocation[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from LocalStorage or Fallback to Seed Data
  useEffect(() => {
    try {
      const storedReqs = localStorage.getItem('sahayog_requests');
      const storedPledges = localStorage.getItem('sahayog_pledges');
      const storedSponsors = localStorage.getItem('sahayog_sponsorships');
      const storedCSR = localStorage.getItem('sahayog_csr');

      setRequests(storedReqs ? JSON.parse(storedReqs) : INITIAL_REQUESTS);
      setPledges(storedPledges ? JSON.parse(storedPledges) : []);
      setSponsorships(storedSponsors ? JSON.parse(storedSponsors) : []);
      setCsrAllocations(storedCSR ? JSON.parse(storedCSR) : []);
    } catch (e) {
      console.warn('LocalStorage error, falling back to mock data', e);
      setRequests(INITIAL_REQUESTS);
    }
    setIsInitialized(true);
  }, []);

  // Save to LocalStorage whenever state changes
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem('sahayog_requests', JSON.stringify(requests));
    localStorage.setItem('sahayog_pledges', JSON.stringify(pledges));
    localStorage.setItem('sahayog_sponsorships', JSON.stringify(sponsorships));
    localStorage.setItem('sahayog_csr', JSON.stringify(csrAllocations));
  }, [requests, pledges, sponsorships, csrAllocations, isInitialized]);

  // Actions
  const addRequest = (newReq: Omit<NeedRequest, 'id' | 'createdAt' | 'quantityFulfilled' | 'status'>) => {
    const item: NeedRequest = {
      ...newReq,
      id: `REQ-DEL-${Math.floor(100 + Math.random() * 900)}`,
      quantityFulfilled: 0,
      status: 'ACTIVE',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setRequests(prev => [item, ...prev]);
  };

  const updateRequestStatus = (id: string, status: RequestStatus) => {
    setRequests(prev =>
      prev.map(r => (r.id === id ? { ...r, status } : r))
    );
  };

  const addInKindPledge = (pledgeData: Omit<InKindPledge, 'id' | 'createdAt'>) => {
    const pledge: InKindPledge = {
      ...pledgeData,
      id: `PLG-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setPledges(prev => [pledge, ...prev]);

    // Increment fulfilled count and adjust status
    setRequests(prev =>
      prev.map(r => {
        if (r.id === pledgeData.requestId) {
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

  const addMicroSponsorship = (sponsorshipData: Omit<MicroSponsorship, 'id' | 'date' | 'certificate10BENo'>): string => {
    const certNo = `10BE-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const record: MicroSponsorship = {
      ...sponsorshipData,
      id: `SPN-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      certificate10BENo: certNo
    };
    setSponsorships(prev => [record, ...prev]);

    // Mark quantity fulfilled
    setRequests(prev =>
      prev.map(r => {
        if (r.id === sponsorshipData.requestId) {
          const nextCount = Math.min(r.quantityNeeded, r.quantityFulfilled + 1);
          return {
            ...r,
            quantityFulfilled: nextCount,
            status: nextCount >= r.quantityNeeded ? 'DELIVERED' : r.status
          };
        }
        return r;
      })
    );

    return certNo;
  };

  const addCSRAllocation = (allocationData: Omit<CSRAllocation, 'id' | 'date' | 'utilizationCertNo'>): string => {
    const certNo = `UC-CSR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const record: CSRAllocation = {
      ...allocationData,
      id: `CSR-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      utilizationCertNo: certNo
    };
    setCsrAllocations(prev => [record, ...prev]);
    return certNo;
  };

  const resetData = () => {
    setRequests(INITIAL_REQUESTS);
    setPledges([]);
    setSponsorships([]);
    setCsrAllocations([]);
    localStorage.clear();
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        requests,
        addRequest,
        updateRequestStatus,
        pledges,
        addInKindPledge,
        sponsorships,
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
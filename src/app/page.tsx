'use client';

import { useApp } from '@/context/AppContext';
import { BeneficiaryView } from '@/components/beneficiary/BeneficiaryView';
import { DonorFeed } from '@/components/donor/DonorFeed';
import { CorporateView } from '@/components/corporate/CorporateView';
import { AdminDesk } from '@/components/admin/AdminDesk';

export default function Home() {
  const { currentRole } = useApp();

  return (
    <div className="min-h-[calc(100vh-65px)]">
      {currentRole === 'donor' && <DonorFeed />}
      {currentRole === 'beneficiary' && <BeneficiaryView />}
      {currentRole === 'corporate' && <CorporateView />}
      {currentRole === 'admin' && <AdminDesk />}
    </div>
  );
}
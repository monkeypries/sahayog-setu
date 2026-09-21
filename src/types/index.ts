export type UserRole = 'beneficiary' | 'donor' | 'corporate' | 'admin';

export type Category = 'TECH' | 'FURNITURE' | 'STATIONERY' | 'INFRA';

export type RequestStatus = 
  | 'PENDING_VERIFICATION'
  | 'ACTIVE'
  | 'PLEDGED'
  | 'REFURBISHING'
  | 'IN_TRANSIT'
  | 'DELIVERED';

export interface NeedRequest {
  id: string;
  title: string;
  category: Category;
  quantityNeeded: number;
  quantityFulfilled: number;
  unit: string;
  beneficiaryName: string;
  beneficiaryType: 'Govt School' | 'Child Shelter' | 'Community Center';
  udiseOrRegNo: string;
  location: string;
  pincode: string;
  urgency: 'HIGH' | 'MEDIUM' | 'NORMAL';
  status: RequestStatus;
  estimatedCostPerUnit?: number; // For cash micro-sponsorships
  specifications: string[];
  createdAt: string;
}

export interface InKindPledge {
  id: string;
  requestId: string;
  donorName: string;
  donorPhone: string;
  itemCondition: 'Working-Flawless' | 'Good-MinorCosmetic' | 'NeedsRepair';
  photos: string[];
  checklistConfirmed: boolean;
  logisticsMethod: 'SELF_DROP' | 'PORTER_PICKUP';
  createdAt: string;
}

export interface MicroSponsorship {
  id: string;
  requestId: string;
  donorName: string;
  donorPAN: string;
  amount: number;
  date: string;
  certificate10BENo: string;
}

export interface CSRAllocation {
  id: string;
  corporateName: string;
  cinNo: string;
  amountAllocated: number;
  projectTitle: string;
  scheduleVIIItem: string;
  utilizationCertNo: string;
  date: string;
}
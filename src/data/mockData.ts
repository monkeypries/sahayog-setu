import { NeedRequest, InKindPledge, CSRAllocation } from '@/types';

export const INITIAL_REQUESTS: NeedRequest[] = [
  {
    id: 'REQ-1001',
    title: 'Functional Laptops for ICT Lab',
    category: 'TECH',
    beneficiaryName: 'Govt. Boys Senior Secondary School',
    beneficiaryType: 'Govt School',
    location: 'Sarita Vihar, South East Delhi',
    pincode: '110076',
    udiseOrRegNo: '07090301201',
    quantityNeeded: 5,
    quantityFulfilled: 0,
    unit: 'Laptops',
    urgency: 'HIGH',
    specifications: ['Minimum 8GB RAM', 'Intel Core i3 or equivalent', 'Working charger'],
    estimatedCostPerUnit: 18000,
    status: 'ACTIVE',
    createdAt: '2026-03-15'
  },
  {
    id: 'REQ-1002',
    title: 'Functional Laptops for Class 9 & 10 ICT Lab',
    category: 'TECH',
    beneficiaryName: 'Govt. Boys Senior Secondary School',
    beneficiaryType: 'Govt School',
    location: 'Sarita Vihar, South East Delhi',
    pincode: '110076',
    udiseOrRegNo: '07090301201',
    quantityNeeded: 10,
    quantityFulfilled: 3,
    unit: 'Laptops',
    urgency: 'HIGH',
    specifications: ['Intel Core i3 / Ryzen 3 or higher', 'Minimum 8GB RAM', 'Working webcam and charger'],
    estimatedCostPerUnit: 18000,
    status: 'ACTIVE',
    createdAt: '2026-03-10'
  },
  {
    id: 'REQ-1003',
    title: 'Two-Seater Wooden Study Benches & Desks',
    category: 'FURNITURE',
    beneficiaryName: 'Prerna Children Home & Shelter',
    beneficiaryType: 'Child Shelter',
    location: 'Dwarka Sector 14, New Delhi',
    pincode: '110078',
    udiseOrRegNo: 'DL-DWA-CCI-042',
    quantityNeeded: 25,
    quantityFulfilled: 10,
    unit: 'Sets',
    urgency: 'HIGH',
    specifications: ['Dual desk + dual bench integrated or separate', 'Solid wood or metal frame'],
    estimatedCostPerUnit: 2400,
    status: 'ACTIVE',
    createdAt: '2026-03-08'
  },
  {
    id: 'REQ-1004',
    title: 'Middle School STEM Science Kits',
    category: 'STATIONERY',
    beneficiaryName: 'Kasturba Balika Vidyalaya',
    beneficiaryType: 'Govt School',
    location: 'Okhla Phase II, New Delhi',
    pincode: '110020',
    udiseOrRegNo: '07090305504',
    quantityNeeded: 15,
    quantityFulfilled: 15,
    unit: 'Kits',
    urgency: 'MEDIUM',
    specifications: ['Compass & divider set with drawing instruments', 'Primary science apparatus set'],
    estimatedCostPerUnit: 1200,
    status: 'DELIVERED',
    createdAt: '2026-03-01'
  }
];

export const INITIAL_PLEDGES: InKindPledge[] = [
  {
    id: 'PLG-5001',
    requestId: 'REQ-1002',
    donorName: 'Rahul Verma',
    donorPhone: '+91 98112 34567',
    itemCondition: 'Good-MinorCosmetic',
    photos: [],
    checklistConfirmed: true,
    logisticsMethod: 'PORTER_PICKUP',
    createdAt: '2026-03-18'
  }
];

export const INITIAL_CSR_ALLOCATIONS: CSRAllocation[] = [
  {
    id: 'CSR-9001',
    corporateName: 'TechCorp Solutions India Pvt Ltd',
    cinNo: 'U72200DL2015PTC284910',
    projectTitle: 'Smart Digital Classroom Infrastructure Drive',
    scheduleVIIItem: 'Item (ii) - Education & Digital Literacy',
    amountAllocated: 250000,
    utilizationCertNo: 'UC-MCA-2026-84920',
    date: '2026-03-12'
  }
];
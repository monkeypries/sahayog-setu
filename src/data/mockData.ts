import { NeedRequest } from '@/types';

export const INITIAL_REQUESTS: NeedRequest[] = [
  {
    id: 'REQ-DEL-101',
    title: 'Functional Laptops for Class 9 & 10 ICT Lab',
    category: 'TECH',
    quantityNeeded: 10,
    quantityFulfilled: 3,
    unit: 'Laptops',
    beneficiaryName: 'Govt. Boys Senior Secondary School',
    beneficiaryType: 'Govt School',
    udiseOrRegNo: '07030204101',
    location: 'Sarita Vihar, South East Delhi',
    pincode: '110076',
    urgency: 'HIGH',
    status: 'ACTIVE',
    estimatedCostPerUnit: 18000,
    specifications: [
      'Intel Core i3 / Ryzen 3 or higher',
      'Minimum 8GB RAM with working charger',
      'Functional battery (minimum 45 min backup)',
      'Operating display with no major cracks'
    ],
    createdAt: '2026-09-18'
  },
  {
    id: 'REQ-DEL-102',
    title: 'Two-Seater Wooden Study Benches & Desks',
    category: 'FURNITURE',
    quantityNeeded: 25,
    quantityFulfilled: 10,
    unit: 'Sets',
    beneficiaryName: 'Prerna Children Home & Shelter',
    beneficiaryType: 'Child Shelter',
    udiseOrRegNo: 'DL/2018/0192842',
    location: 'Dwarka Sector 16, New Delhi',
    pincode: '110078',
    urgency: 'MEDIUM',
    status: 'ACTIVE',
    estimatedCostPerUnit: 2400,
    specifications: [
      'Dual desk + dual bench integrated or separate',
      'Solid wood or metal frame',
      'No protruding nails or hazardous splintering'
    ],
    createdAt: '2026-09-19'
  },
  {
    id: 'REQ-DEL-103',
    title: 'STEM Science & Geometry Kits for Middle School',
    category: 'STATIONERY',
    quantityNeeded: 60,
    quantityFulfilled: 60,
    unit: 'Kits',
    beneficiaryName: 'Kasturba Balika Vidyalaya',
    beneficiaryType: 'Govt School',
    udiseOrRegNo: '07040102203',
    location: 'Ishwar Nagar, Mathura Road, New Delhi',
    pincode: '110065',
    urgency: 'NORMAL',
    status: 'DELIVERED',
    estimatedCostPerUnit: 450,
    specifications: [
      'Compass & divider set with drawing instruments',
      'Primary science apparatus set',
      'Notebook bundle (4 single-line + 2 plain)'
    ],
    createdAt: '2026-09-12'
  }
];
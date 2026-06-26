import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ServiceCategory {
  id: string;
  salonId: string;
  name: string;
  nameAr: string;
  icon: string;
  color: string;
  displayOrder: number;
}

export interface StoreService {
  id: string;
  salonId: string;
  categoryId: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  coverImage: string;
  images: string[];
  originalPrice: number;
  discountedPrice?: number;
  duration: number;
  availableStaffIds: string[];
  isFeatured: boolean;
  isAvailable: boolean;
  displayOrder: number;
  status: 'active' | 'pending' | 'disabled';
  createdAt: string;
  updatedAt: string;
}

export interface StorePackage {
  id: string;
  salonId: string;
  name: string;
  nameAr: string;
  description: string;
  services: string[];
  originalPrice: number;
  packagePrice: number;
  coverImage: string;
  isActive: boolean;
  status: 'active' | 'pending' | 'disabled';
}

export interface StoreOffer {
  id: string;
  salonId: string;
  title: string;
  titleAr: string;
  description: string;
  serviceId?: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  startDate: string;
  endDate: string;
  maxUses?: number;
  usedCount: number;
  coverImage: string;
  isActive: boolean;
  status: 'active' | 'pending' | 'disabled';
}

export interface StoreCoupon {
  id: string;
  salonId: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue?: number;
  maxDiscount?: number;
  expiryDate: string;
  maxUses?: number;
  usedCount: number;
  isActive: boolean;
  applicableServices: string[];
}

export interface StoreBooking {
  id: string;
  salonId: string;
  customerId: string;
  customerName: string;
  customerAvatar: string;
  customerPhone: string;
  serviceId: string;
  serviceName: string;
  staffId: string;
  staffName: string;
  date: string;
  time: string;
  duration: number;
  amount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export interface GalleryPhoto {
  id: string;
  salonId: string;
  url: string;
  caption: string;
  category: 'interior' | 'services' | 'before-after' | 'other';
  isCover: boolean;
  createdAt: string;
}

interface GlamoraStore {
  serviceCategories: ServiceCategory[];
  services: StoreService[];
  packages: StorePackage[];
  offers: StoreOffer[];
  coupons: StoreCoupon[];
  bookings: StoreBooking[];
  galleryPhotos: GalleryPhoto[];

  // Category actions
  addCategory: (cat: Omit<ServiceCategory, 'id'>) => void;
  updateCategory: (id: string, updates: Partial<ServiceCategory>) => void;
  deleteCategory: (id: string) => void;

  // Service actions
  addService: (service: Omit<StoreService, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateService: (id: string, updates: Partial<StoreService>) => void;
  deleteService: (id: string) => void;
  toggleServiceAvailability: (id: string) => void;
  toggleServiceFeatured: (id: string) => void;
  reorderService: (id: string, newOrder: number) => void;

  // Package actions
  addPackage: (pkg: Omit<StorePackage, 'id'>) => void;
  updatePackage: (id: string, updates: Partial<StorePackage>) => void;
  deletePackage: (id: string) => void;

  // Offer actions
  addOffer: (offer: Omit<StoreOffer, 'id'>) => void;
  updateOffer: (id: string, updates: Partial<StoreOffer>) => void;
  deleteOffer: (id: string) => void;

  // Coupon actions
  addCoupon: (coupon: Omit<StoreCoupon, 'id'>) => void;
  updateCoupon: (id: string, updates: Partial<StoreCoupon>) => void;
  deleteCoupon: (id: string) => void;

  // Booking actions
  addBooking: (booking: Omit<StoreBooking, 'id' | 'createdAt'>) => void;
  updateBookingStatus: (id: string, status: StoreBooking['status']) => void;

  // Gallery actions
  addPhoto: (photo: Omit<GalleryPhoto, 'id' | 'createdAt'>) => void;
  deletePhoto: (id: string) => void;
  setPhotoCover: (id: string) => void;
}

const demoCategories: ServiceCategory[] = [
  { id: 'cat-hair-1', salonId: '1', name: 'Hair', nameAr: 'الشعر', icon: 'scissors', color: '#D4A853', displayOrder: 1 },
  { id: 'cat-nails-1', salonId: '1', name: 'Nails', nameAr: 'الأظافر', icon: 'sparkles', color: '#E91E8C', displayOrder: 2 },
  { id: 'cat-makeup-1', salonId: '1', name: 'Makeup', nameAr: 'المكياج', icon: 'palette', color: '#9B59B6', displayOrder: 3 },
  { id: 'cat-hair-2', salonId: '2', name: 'Hair', nameAr: 'الشعر', icon: 'scissors', color: '#D4A853', displayOrder: 1 },
  { id: 'cat-nails-2', salonId: '2', name: 'Nails', nameAr: 'الأظافر', icon: 'sparkles', color: '#E91E8C', displayOrder: 2 },
  { id: 'cat-hair-3', salonId: '3', name: 'Hair', nameAr: 'الشعر', icon: 'scissors', color: '#D4A853', displayOrder: 1 },
  { id: 'cat-makeup-3', salonId: '3', name: 'Makeup', nameAr: 'المكياج', icon: 'palette', color: '#9B59B6', displayOrder: 2 },
];

const demoServices: StoreService[] = [
  {
    id: 'srv-1', salonId: '1', categoryId: 'cat-hair-1',
    name: 'Hair Cut & Style', nameAr: 'قص وتسريح',
    description: 'Professional haircut and blow-dry styling by expert stylists.',
    descriptionAr: 'قص شعر احترافي وتجفيف بواسطة خبراء التصفيف.',
    coverImage: 'https://picsum.photos/seed/srv1/600/400',
    images: ['https://picsum.photos/seed/srv1a/400/300', 'https://picsum.photos/seed/srv1b/400/300'],
    originalPrice: 150, duration: 60,
    availableStaffIds: ['st1', 'st2'], isFeatured: true, isAvailable: true,
    displayOrder: 1, status: 'active',
    createdAt: '2025-01-01T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z',
  },
  {
    id: 'srv-2', salonId: '1', categoryId: 'cat-hair-1',
    name: 'Blow Dry', nameAr: 'بروش',
    description: 'Smooth blowout with volume and shine.',
    descriptionAr: 'بروش ناعم مع حجم ولمعان.',
    coverImage: 'https://picsum.photos/seed/srv2/600/400',
    images: [],
    originalPrice: 100, duration: 45,
    availableStaffIds: ['st1'], isFeatured: false, isAvailable: true,
    displayOrder: 2, status: 'active',
    createdAt: '2025-01-02T00:00:00Z', updatedAt: '2025-01-02T00:00:00Z',
  },
  {
    id: 'srv-3', salonId: '1', categoryId: 'cat-hair-1',
    name: 'Hair Color', nameAr: 'صبغة شعر',
    description: 'Full hair coloring service with professional salon products.',
    descriptionAr: 'خدمة صبغة شعر كاملة بمنتجات صالون احترافية.',
    coverImage: 'https://picsum.photos/seed/srv3/600/400',
    images: ['https://picsum.photos/seed/srv3a/400/300'],
    originalPrice: 350, discountedPrice: 280, duration: 120,
    availableStaffIds: ['st1', 'st3'], isFeatured: true, isAvailable: true,
    displayOrder: 3, status: 'active',
    createdAt: '2025-01-03T00:00:00Z', updatedAt: '2025-01-10T00:00:00Z',
  },
  {
    id: 'srv-4', salonId: '1', categoryId: 'cat-hair-1',
    name: 'Keratin Treatment', nameAr: 'كيراتين',
    description: 'Smooth frizz-free hair for up to 6 months.',
    descriptionAr: 'شعر ناعم خالٍ من التجعد لمدة ٦ أشهر.',
    coverImage: 'https://picsum.photos/seed/srv4/600/400',
    images: [],
    originalPrice: 500, duration: 180,
    availableStaffIds: ['st1'], isFeatured: false, isAvailable: true,
    displayOrder: 4, status: 'active',
    createdAt: '2025-01-04T00:00:00Z', updatedAt: '2025-01-04T00:00:00Z',
  },
  {
    id: 'srv-5', salonId: '1', categoryId: 'cat-nails-1',
    name: 'Manicure', nameAr: 'مناكير',
    description: 'Classic manicure with nail shaping, cuticle care, and polish.',
    descriptionAr: 'مناكير كلاسيكي مع تشكيل الأظافر والعناية بالبشرة.',
    coverImage: 'https://picsum.photos/seed/srv5/600/400',
    images: [],
    originalPrice: 80, duration: 45,
    availableStaffIds: ['st2'], isFeatured: false, isAvailable: true,
    displayOrder: 1, status: 'active',
    createdAt: '2025-01-05T00:00:00Z', updatedAt: '2025-01-05T00:00:00Z',
  },
  {
    id: 'srv-6', salonId: '1', categoryId: 'cat-nails-1',
    name: 'Pedicure', nameAr: 'باديكير',
    description: 'Relaxing pedicure with foot soak and polish.',
    descriptionAr: 'باديكير استرخاء مع نقع القدمين والطلاء.',
    coverImage: 'https://picsum.photos/seed/srv6/600/400',
    images: [],
    originalPrice: 100, duration: 60,
    availableStaffIds: ['st2'], isFeatured: false, isAvailable: true,
    displayOrder: 2, status: 'active',
    createdAt: '2025-01-06T00:00:00Z', updatedAt: '2025-01-06T00:00:00Z',
  },
  {
    id: 'srv-7', salonId: '1', categoryId: 'cat-nails-1',
    name: 'Gel Nails', nameAr: 'جل أظافر',
    description: 'Long-lasting gel nail application with your choice of color.',
    descriptionAr: 'تطبيق أظافر جل طويل الأمد باختيارك للون.',
    coverImage: 'https://picsum.photos/seed/srv7/600/400',
    images: [],
    originalPrice: 150, duration: 75,
    availableStaffIds: ['st2'], isFeatured: true, isAvailable: true,
    displayOrder: 3, status: 'active',
    createdAt: '2025-01-07T00:00:00Z', updatedAt: '2025-01-07T00:00:00Z',
  },
  {
    id: 'srv-8', salonId: '1', categoryId: 'cat-makeup-1',
    name: 'Bridal Makeup', nameAr: 'مكياج عروس',
    description: 'Complete bridal makeup for your special day.',
    descriptionAr: 'مكياج عروس كامل ليومك الخاص.',
    coverImage: 'https://picsum.photos/seed/srv8/600/400',
    images: ['https://picsum.photos/seed/srv8a/400/300'],
    originalPrice: 800, duration: 120,
    availableStaffIds: ['st3'], isFeatured: true, isAvailable: true,
    displayOrder: 1, status: 'active',
    createdAt: '2025-01-08T00:00:00Z', updatedAt: '2025-01-08T00:00:00Z',
  },
  // Salon 2 services
  {
    id: 'srv-9', salonId: '2', categoryId: 'cat-hair-2',
    name: 'Balayage', nameAr: 'بالياج',
    description: 'Natural sun-kissed balayage technique.',
    descriptionAr: 'تقنية البالياج الطبيعية.',
    coverImage: 'https://picsum.photos/seed/srv9/600/400',
    images: [],
    originalPrice: 450, duration: 180,
    availableStaffIds: ['st1'], isFeatured: true, isAvailable: true,
    displayOrder: 1, status: 'active',
    createdAt: '2025-01-09T00:00:00Z', updatedAt: '2025-01-09T00:00:00Z',
  },
  {
    id: 'srv-10', salonId: '2', categoryId: 'cat-nails-2',
    name: 'Gel Manicure', nameAr: 'مناكير جل',
    description: 'Long-lasting gel manicure with UV curing.',
    descriptionAr: 'مناكير جل طويل الأمد بالأشعة فوق البنفسجية.',
    coverImage: 'https://picsum.photos/seed/srv10/600/400',
    images: [],
    originalPrice: 120, duration: 60,
    availableStaffIds: ['st2'], isFeatured: false, isAvailable: true,
    displayOrder: 1, status: 'active',
    createdAt: '2025-01-10T00:00:00Z', updatedAt: '2025-01-10T00:00:00Z',
  },
  // Salon 3 services
  {
    id: 'srv-11', salonId: '3', categoryId: 'cat-hair-3',
    name: 'Bridal Hair', nameAr: 'شعر العروس',
    description: 'Elegant updo and styling for brides.',
    descriptionAr: 'تسريحة أنيقة وتصفيف للعرائس.',
    coverImage: 'https://picsum.photos/seed/srv11/600/400',
    images: [],
    originalPrice: 400, duration: 120,
    availableStaffIds: ['st1'], isFeatured: true, isAvailable: true,
    displayOrder: 1, status: 'active',
    createdAt: '2025-01-11T00:00:00Z', updatedAt: '2025-01-11T00:00:00Z',
  },
  {
    id: 'srv-12', salonId: '3', categoryId: 'cat-makeup-3',
    name: 'Evening Makeup', nameAr: 'مكياج سهرة',
    description: 'Glamorous makeup for evening events.',
    descriptionAr: 'مكياج ساحر لمناسبات السهرة.',
    coverImage: 'https://picsum.photos/seed/srv12/600/400',
    images: [],
    originalPrice: 300, duration: 60,
    availableStaffIds: ['st3'], isFeatured: false, isAvailable: true,
    displayOrder: 1, status: 'pending',
    createdAt: '2025-01-12T00:00:00Z', updatedAt: '2025-01-12T00:00:00Z',
  },
];

const demoPackages: StorePackage[] = [
  {
    id: 'pkg-1', salonId: '1',
    name: 'Full Beauty Package', nameAr: 'باقة الجمال الكاملة',
    description: 'Complete beauty experience: hair, nails, and makeup in one session.',
    services: ['srv-1', 'srv-5', 'srv-8'],
    originalPrice: 1030, packagePrice: 750,
    coverImage: 'https://picsum.photos/seed/pkg1/600/400',
    isActive: true, status: 'active',
  },
  {
    id: 'pkg-2', salonId: '1',
    name: 'Nail Combo', nameAr: 'كومبو الأظافر',
    description: 'Manicure and pedicure combo at a special price.',
    services: ['srv-5', 'srv-6'],
    originalPrice: 180, packagePrice: 140,
    coverImage: 'https://picsum.photos/seed/pkg2/600/400',
    isActive: true, status: 'active',
  },
  {
    id: 'pkg-3', salonId: '2',
    name: 'Color & Style Package', nameAr: 'باقة اللون والتصفيف',
    description: 'Balayage and blowout styling combo.',
    services: ['srv-9'],
    originalPrice: 450, packagePrice: 380,
    coverImage: 'https://picsum.photos/seed/pkg3/600/400',
    isActive: true, status: 'active',
  },
  {
    id: 'pkg-4', salonId: '3',
    name: 'Bridal Full Package', nameAr: 'باقة العروس الشاملة',
    description: 'Complete bridal hair and makeup package.',
    services: ['srv-11', 'srv-12'],
    originalPrice: 700, packagePrice: 550,
    coverImage: 'https://picsum.photos/seed/pkg4/600/400',
    isActive: true, status: 'active',
  },
];

const demoOffers: StoreOffer[] = [
  {
    id: 'off-1', salonId: '1',
    title: 'Summer Special - 30% Off Hair Color', titleAr: 'عرض الصيف - ٣٠٪ خصم على صبغة الشعر',
    description: 'Celebrate summer with stunning hair color at 30% off!',
    serviceId: 'srv-3',
    discountType: 'percentage', discountValue: 30,
    startDate: '2026-06-01', endDate: '2026-08-31',
    maxUses: 100, usedCount: 34,
    coverImage: 'https://picsum.photos/seed/off1/600/400',
    isActive: true, status: 'active',
  },
  {
    id: 'off-2', salonId: '1',
    title: 'New Customer Welcome Offer', titleAr: 'عرض ترحيب العملاء الجدد',
    description: 'Get SAR 50 off your first visit to Glamora!',
    discountType: 'fixed', discountValue: 50,
    startDate: '2026-01-01', endDate: '2026-12-31',
    maxUses: 500, usedCount: 123,
    coverImage: 'https://picsum.photos/seed/off2/600/400',
    isActive: true, status: 'active',
  },
  {
    id: 'off-3', salonId: '2',
    title: 'Weekend Nail Special', titleAr: 'عرض أظافر نهاية الأسبوع',
    description: '20% off all nail services on weekends.',
    discountType: 'percentage', discountValue: 20,
    startDate: '2026-05-01', endDate: '2026-07-31',
    maxUses: 200, usedCount: 89,
    coverImage: 'https://picsum.photos/seed/off3/600/400',
    isActive: true, status: 'active',
  },
  {
    id: 'off-4', salonId: '3',
    title: 'Bridal Season Discount', titleAr: 'خصم موسم الأعراس',
    description: '25% off all bridal packages this season.',
    discountType: 'percentage', discountValue: 25,
    startDate: '2026-09-01', endDate: '2026-12-31',
    maxUses: 50, usedCount: 0,
    coverImage: 'https://picsum.photos/seed/off4/600/400',
    isActive: true, status: 'pending',
  },
];

const demoCoupons: StoreCoupon[] = [
  {
    id: 'coup-1', salonId: '1', code: 'GLAMORA20',
    description: '20% off all services, minimum order 100 SAR',
    discountType: 'percentage', discountValue: 20,
    minOrderValue: 100, maxDiscount: 200,
    expiryDate: '2026-12-31', maxUses: 300, usedCount: 45,
    isActive: true, applicableServices: [],
  },
  {
    id: 'coup-2', salonId: '1', code: 'WELCOME50',
    description: 'SAR 50 off for new customers',
    discountType: 'fixed', discountValue: 50,
    minOrderValue: 150,
    expiryDate: '2026-12-31', maxUses: 100, usedCount: 23,
    isActive: true, applicableServices: [],
  },
  {
    id: 'coup-3', salonId: '2', code: 'NAILS15',
    description: '15% off nail services',
    discountType: 'percentage', discountValue: 15,
    expiryDate: '2026-09-30', maxUses: 200, usedCount: 67,
    isActive: true, applicableServices: ['srv-9', 'srv-10'],
  },
  {
    id: 'coup-4', salonId: '3', code: 'BRIDAL30',
    description: 'SAR 30 off bridal packages',
    discountType: 'fixed', discountValue: 30,
    minOrderValue: 400,
    expiryDate: '2026-11-30', maxUses: 50, usedCount: 8,
    isActive: true, applicableServices: [],
  },
];

const demoBookings: StoreBooking[] = [
  {
    id: 'book-1', salonId: '1', customerId: 'cust-1',
    customerName: 'Sara Al-Ahmad', customerAvatar: 'https://picsum.photos/seed/cust1/100/100',
    customerPhone: '+966501234567', serviceId: 'srv-3', serviceName: 'Hair Color',
    staffId: 'st1', staffName: 'Nour Al-Rashid',
    date: '2026-06-26', time: '10:00', duration: 120, amount: 280,
    status: 'confirmed', createdAt: '2026-06-20T08:00:00Z',
  },
  {
    id: 'book-2', salonId: '1', customerId: 'cust-2',
    customerName: 'Nora Al-Rashid', customerAvatar: 'https://picsum.photos/seed/cust2/100/100',
    customerPhone: '+966502345678', serviceId: 'srv-7', serviceName: 'Gel Nails',
    staffId: 'st2', staffName: 'Hana Al-Qahtani',
    date: '2026-06-26', time: '11:30', duration: 75, amount: 150,
    status: 'pending', createdAt: '2026-06-21T09:00:00Z',
  },
  {
    id: 'book-3', salonId: '1', customerId: 'cust-3',
    customerName: 'Hessa Al-Mansouri', customerAvatar: 'https://picsum.photos/seed/cust3/100/100',
    customerPhone: '+966503456789', serviceId: 'srv-8', serviceName: 'Bridal Makeup',
    staffId: 'st3', staffName: 'Reem Al-Dosari',
    date: '2026-06-27', time: '14:00', duration: 120, amount: 800,
    status: 'confirmed', createdAt: '2026-06-22T10:00:00Z',
  },
  {
    id: 'book-4', salonId: '1', customerId: 'cust-4',
    customerName: 'Reem Al-Zahrani', customerAvatar: 'https://picsum.photos/seed/cust4/100/100',
    customerPhone: '+966504567890', serviceId: 'srv-1', serviceName: 'Hair Cut & Style',
    staffId: 'st1', staffName: 'Nour Al-Rashid',
    date: '2026-06-25', time: '15:00', duration: 60, amount: 150,
    status: 'completed', createdAt: '2026-06-18T11:00:00Z',
  },
  {
    id: 'book-5', salonId: '1', customerId: 'cust-5',
    customerName: 'Dana Al-Harbi', customerAvatar: 'https://picsum.photos/seed/cust5/100/100',
    customerPhone: '+966505678901', serviceId: 'srv-4', serviceName: 'Keratin Treatment',
    staffId: 'st1', staffName: 'Nour Al-Rashid',
    date: '2026-06-24', time: '10:00', duration: 180, amount: 500,
    status: 'cancelled', createdAt: '2026-06-15T12:00:00Z',
  },
  {
    id: 'book-6', salonId: '1', customerId: 'cust-1',
    customerName: 'Sara Al-Ahmad', customerAvatar: 'https://picsum.photos/seed/cust1/100/100',
    customerPhone: '+966501234567', serviceId: 'srv-5', serviceName: 'Manicure',
    staffId: 'st2', staffName: 'Hana Al-Qahtani',
    date: '2026-06-26', time: '14:00', duration: 45, amount: 80,
    status: 'pending', createdAt: '2026-06-23T13:00:00Z',
  },
];

const demoGallery: GalleryPhoto[] = [
  { id: 'gal-1', salonId: '1', url: 'https://picsum.photos/seed/gal1/600/800', caption: 'Salon Interior', category: 'interior', isCover: true, createdAt: '2025-01-01T00:00:00Z' },
  { id: 'gal-2', salonId: '1', url: 'https://picsum.photos/seed/gal2/600/400', caption: 'Hair Color Service', category: 'services', isCover: false, createdAt: '2025-01-02T00:00:00Z' },
  { id: 'gal-3', salonId: '1', url: 'https://picsum.photos/seed/gal3/400/600', caption: 'Before & After', category: 'before-after', isCover: false, createdAt: '2025-01-03T00:00:00Z' },
  { id: 'gal-4', salonId: '1', url: 'https://picsum.photos/seed/gal4/600/400', caption: 'Reception Area', category: 'interior', isCover: false, createdAt: '2025-01-04T00:00:00Z' },
];

function genId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export const useGlamoraStore = create<GlamoraStore>()(
  persist(
    (set) => ({
      serviceCategories: demoCategories,
      services: demoServices,
      packages: demoPackages,
      offers: demoOffers,
      coupons: demoCoupons,
      bookings: demoBookings,
      galleryPhotos: demoGallery,

      addCategory: (cat) => set((s) => ({ serviceCategories: [...s.serviceCategories, { ...cat, id: `cat-${genId()}` }] })),
      updateCategory: (id, updates) => set((s) => ({ serviceCategories: s.serviceCategories.map(c => c.id === id ? { ...c, ...updates } : c) })),
      deleteCategory: (id) => set((s) => ({ serviceCategories: s.serviceCategories.filter(c => c.id !== id) })),

      addService: (service) => set((s) => ({
        services: [...s.services, { ...service, id: `srv-${genId()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }],
      })),
      updateService: (id, updates) => set((s) => ({
        services: s.services.map(sv => sv.id === id ? { ...sv, ...updates, updatedAt: new Date().toISOString() } : sv),
      })),
      deleteService: (id) => set((s) => ({ services: s.services.filter(sv => sv.id !== id) })),
      toggleServiceAvailability: (id) => set((s) => ({
        services: s.services.map(sv => sv.id === id ? { ...sv, isAvailable: !sv.isAvailable, updatedAt: new Date().toISOString() } : sv),
      })),
      toggleServiceFeatured: (id) => set((s) => ({
        services: s.services.map(sv => sv.id === id ? { ...sv, isFeatured: !sv.isFeatured, updatedAt: new Date().toISOString() } : sv),
      })),
      reorderService: (id, newOrder) => set((s) => ({
        services: s.services.map(sv => sv.id === id ? { ...sv, displayOrder: newOrder } : sv),
      })),

      addPackage: (pkg) => set((s) => ({ packages: [...s.packages, { ...pkg, id: `pkg-${genId()}` }] })),
      updatePackage: (id, updates) => set((s) => ({ packages: s.packages.map(p => p.id === id ? { ...p, ...updates } : p) })),
      deletePackage: (id) => set((s) => ({ packages: s.packages.filter(p => p.id !== id) })),

      addOffer: (offer) => set((s) => ({ offers: [...s.offers, { ...offer, id: `off-${genId()}` }] })),
      updateOffer: (id, updates) => set((s) => ({ offers: s.offers.map(o => o.id === id ? { ...o, ...updates } : o) })),
      deleteOffer: (id) => set((s) => ({ offers: s.offers.filter(o => o.id !== id) })),

      addCoupon: (coupon) => set((s) => ({ coupons: [...s.coupons, { ...coupon, id: `coup-${genId()}` }] })),
      updateCoupon: (id, updates) => set((s) => ({ coupons: s.coupons.map(c => c.id === id ? { ...c, ...updates } : c) })),
      deleteCoupon: (id) => set((s) => ({ coupons: s.coupons.filter(c => c.id !== id) })),

      addBooking: (booking) => set((s) => ({
        bookings: [...s.bookings, { ...booking, id: `book-${genId()}`, createdAt: new Date().toISOString() }],
      })),
      updateBookingStatus: (id, status) => set((s) => ({
        bookings: s.bookings.map(b => b.id === id ? { ...b, status } : b),
      })),

      addPhoto: (photo) => set((s) => ({ galleryPhotos: [...s.galleryPhotos, { ...photo, id: `gal-${genId()}`, createdAt: new Date().toISOString() }] })),
      deletePhoto: (id) => set((s) => ({ galleryPhotos: s.galleryPhotos.filter(p => p.id !== id) })),
      setPhotoCover: (id) => set((s) => ({ galleryPhotos: s.galleryPhotos.map(p => ({ ...p, isCover: p.id === id })) })),
    }),
    { name: 'glamora-store' }
  )
);

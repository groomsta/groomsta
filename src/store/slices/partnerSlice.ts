import { create } from 'zustand'

interface JobRequest {
  id: string;
  serviceId: string;
  customerName: string;
  amount: number;
  expiresAt: Date;
}

interface PartnerState {
  isOnline: boolean;
  incomingRequests: JobRequest[];
  activeJobs: any[]; // Define specific Job type later
  earnings: {
    currentWeek: number;
    today: number;
  };
  toggleOnline: () => void;
  addRequest: (req: JobRequest) => void;
  removeRequest: (id: string) => void;
}

export const usePartnerStore = create<PartnerState>((set) => ({
  isOnline: false,
  incomingRequests: [],
  activeJobs: [],
  earnings: {
    currentWeek: 0,
    today: 0,
  },
  toggleOnline: () => set((state) => ({ isOnline: !state.isOnline })),
  addRequest: (req) => set((state) => ({ incomingRequests: [...state.incomingRequests, req] })),
  removeRequest: (id) => set((state) => ({ 
    incomingRequests: state.incomingRequests.filter(r => r.id !== id) 
  })),
}))

import { create } from 'zustand';
import type { Role } from '@/data/mock';

interface Toast {
  id: number;
  message: string;
  tone: 'success' | 'info' | 'warning';
}

interface InjectedFailure {
  type: string;
  typeLabel: string;
  target: string;
  affectedStudents: number;
  affectedFaculty: number;
  affectedSystems: number;
}

interface AppState {
  // navigation
  activePage: string;
  setActivePage: (page: string) => void;

  // role
  role: Role;
  setRole: (r: Role) => void;

  // failure + recovery state machine
  failureActive: boolean;
  failureLabel: string;
  injectedFailure: InjectedFailure | null;
  injectFailure: (f: InjectedFailure) => void;
  clearFailure: () => void;

  recoveryApplied: boolean;
  healthPercent: number; // 92 -> 96 after recovery
  affectedStudents: number; // 520 -> 40 after recovery
  approvePlan: () => void;
  resetRecovery: () => void;

  // UI overlays
  injectModalOpen: boolean;
  setInjectModalOpen: (b: boolean) => void;
  notifOpen: boolean;
  setNotifOpen: (b: boolean) => void;
  selectedBuildingId: string | null;
  setSelectedBuildingId: (id: string | null) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (b: boolean) => void;

  // toast
  toasts: Toast[];
  pushToast: (message: string, tone?: Toast['tone']) => void;
  dismissToast: (id: number) => void;
}

export const useStore = create<AppState>((set, get) => ({
  activePage: 'dashboard',
  setActivePage: (page) => set({ activePage: page, sidebarOpen: false }),

  role: 'Admin',
  setRole: (r) => set({ role: r }),

  failureActive: true,
  failureLabel: '1 Active Failure',
  injectedFailure: null,
  injectFailure: (f) =>
    set({
      injectedFailure: f,
      failureActive: true,
      failureLabel: '1 Active Failure',
      recoveryApplied: false,
      healthPercent: 92,
      affectedStudents: f.affectedStudents,
    }),
  clearFailure: () =>
    set({
      injectedFailure: null,
      failureActive: false,
      failureLabel: 'All Systems Operational',
      recoveryApplied: false,
      healthPercent: 92,
      affectedStudents: 520,
    }),

  recoveryApplied: false,
  healthPercent: 92,
  affectedStudents: 520,
  approvePlan: () => {
    set({
      recoveryApplied: true,
      healthPercent: 96,
      affectedStudents: 40,
      failureActive: false,
      failureLabel: 'All Systems Operational',
    });
    get().pushToast('Recovery plan applied', 'success');
  },
  resetRecovery: () =>
    set({
      recoveryApplied: false,
      healthPercent: 92,
      affectedStudents: 520,
      failureActive: true,
      failureLabel: '1 Active Failure',
    }),

  injectModalOpen: false,
  setInjectModalOpen: (b) => set({ injectModalOpen: b }),
  notifOpen: false,
  setNotifOpen: (b) => set({ notifOpen: b }),
  selectedBuildingId: null,
  setSelectedBuildingId: (id) => set({ selectedBuildingId: id }),
  sidebarOpen: false,
  setSidebarOpen: (b) => set({ sidebarOpen: b }),

  toasts: [],
  pushToast: (message, tone = 'info') => {
    const id = Date.now() + Math.random();
    set((s) => ({ toasts: [...s.toasts, { id, message, tone }] }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, 3500);
  },
  dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

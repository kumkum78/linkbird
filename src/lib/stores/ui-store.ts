import { create } from "zustand"

interface UIState {
  sidebarOpen: boolean
  sidebarCollapsed: boolean
  authDialogOpen: boolean
  selectedLeadId: string | null
  selectedCampaignId: string | null
  leadSideSheetOpen: boolean
  campaignSideSheetOpen: boolean
  setSidebarOpen: (open: boolean) => void
  setSidebarCollapsed: (collapsed: boolean) => void
  setAuthDialogOpen: (open: boolean) => void
  setSelectedLeadId: (id: string | null) => void
  setSelectedCampaignId: (id: string | null) => void
  setLeadSideSheetOpen: (open: boolean) => void
  setCampaignSideSheetOpen: (open: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  sidebarCollapsed: false,
  authDialogOpen: false,
  selectedLeadId: null,
  selectedCampaignId: null,
  leadSideSheetOpen: false,
  campaignSideSheetOpen: false,
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
  setAuthDialogOpen: (authDialogOpen) => set({ authDialogOpen }),
  setSelectedLeadId: (selectedLeadId) => set({ selectedLeadId }),
  setSelectedCampaignId: (selectedCampaignId) => set({ selectedCampaignId }),
  setLeadSideSheetOpen: (leadSideSheetOpen) => set({ leadSideSheetOpen }),
  setCampaignSideSheetOpen: (campaignSideSheetOpen) => set({ campaignSideSheetOpen }),
}))

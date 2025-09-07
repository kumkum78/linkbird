import { create } from "zustand"

interface LeadFilters {
  search: string
  status: string[]
  campaign: string[]
  assignedTo: string[]
}

interface CampaignFilters {
  search: string
  status: string[]
  type: string[]
}

interface FiltersState {
  leadFilters: LeadFilters
  campaignFilters: CampaignFilters
  setLeadFilters: (filters: Partial<LeadFilters>) => void
  setCampaignFilters: (filters: Partial<CampaignFilters>) => void
  resetLeadFilters: () => void
  resetCampaignFilters: () => void
}

const initialLeadFilters: LeadFilters = {
  search: "",
  status: [],
  campaign: [],
  assignedTo: [],
}

const initialCampaignFilters: CampaignFilters = {
  search: "",
  status: [],
  type: [],
}

export const useFiltersStore = create<FiltersState>((set) => ({
  leadFilters: initialLeadFilters,
  campaignFilters: initialCampaignFilters,
  setLeadFilters: (filters) =>
    set((state) => ({
      leadFilters: { ...state.leadFilters, ...filters },
    })),
  setCampaignFilters: (filters) =>
    set((state) => ({
      campaignFilters: { ...state.campaignFilters, ...filters },
    })),
  resetLeadFilters: () => set({ leadFilters: initialLeadFilters }),
  resetCampaignFilters: () => set({ campaignFilters: initialCampaignFilters }),
}))

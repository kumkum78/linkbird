import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  email: string
  name: string
  image?: string | null
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  authDialogOpen: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setAuthDialogOpen: (open: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      authDialogOpen: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setLoading: (isLoading) => set({ isLoading }),
      setAuthDialogOpen: (authDialogOpen) => set({ authDialogOpen }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
    }
  )
)

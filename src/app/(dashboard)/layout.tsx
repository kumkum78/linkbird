"use client"

import { useEffect } from "react"
import { useAuthStore } from "@/lib/stores/auth-store"
import { useUIStore } from "@/lib/stores/ui-store"
import { authClient } from "@/lib/auth-client"
import { Sidebar } from "@/components/layout/sidebar"
import { AuthDialog } from "@/components/auth/auth-dialog"
import { Loader2 } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isAuthenticated, isLoading, setUser, setLoading } = useAuthStore()
  const { setAuthDialogOpen } = useUIStore()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await authClient.getSession()
        if (data?.user) {
          setUser(data.user)
        } else {
          setAuthDialogOpen(true)
        }
      } catch (error) {
        console.error("Auth check error:", error)
        setAuthDialogOpen(true)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [setUser, setLoading, setAuthDialogOpen])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Linkbird</h1>
          <p className="text-gray-600 mb-4">Please sign in to access your dashboard</p>
          <AuthDialog />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:pl-64">
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
      <AuthDialog />
    </div>
  )
}

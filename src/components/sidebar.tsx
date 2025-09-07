"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useUIStore } from "@/lib/stores/ui-store"
import {
  Users,
  Megaphone,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Leads", href: "/dashboard/leads", icon: Users },
  { name: "Campaigns", href: "/dashboard/campaigns", icon: Megaphone },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { sidebarCollapsed, setSidebarCollapsed } = useUIStore()
  const pathname = usePathname()

  const handleSignOut = async () => {
    try {
      await authClient.signOut()
      // Redirect to auth page after sign out
      window.location.href = "/auth"
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white shadow-lg"
        >
          {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
          sidebarCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo and Toggle */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            {!sidebarCollapsed && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">L</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900">Linkbird</h1>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex hover:bg-gray-100"
            >
              {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-6 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 group",
                    isActive
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                  title={sidebarCollapsed ? item.name : undefined}
                >
                  <item.icon className={cn("h-5 w-5", sidebarCollapsed ? "mx-auto" : "mr-3")} />
                  {!sidebarCollapsed && <span>{item.name}</span>}
                </Link>
              )
            })}
          </nav>

          {/* User Profile and Sign out */}
          <div className="p-3 border-t border-gray-200">
            {!sidebarCollapsed ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-gray-50">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
                    <p className="text-xs text-gray-500 truncate">john@example.com</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={handleSignOut}
                  className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  Sign out
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSignOut}
                className="w-full hover:bg-gray-100"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

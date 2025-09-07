"use client"

import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useUIStore } from "@/lib/stores/ui-store"
import { useAuthStore } from "@/lib/stores/auth-store"
import { Menu, Bell, User, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

const pathLabels: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/leads": "Leads",
  "/dashboard/campaigns": "Campaigns",
  "/dashboard/analytics": "Analytics",
  "/dashboard/settings": "Settings",
}

export function Header() {
  const pathname = usePathname()
  const { sidebarOpen, setSidebarOpen } = useUIStore()
  const { user, logout } = useAuthStore()

  const getBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean)
    const breadcrumbs = []
    
    for (let i = 0; i < segments.length; i++) {
      const path = "/" + segments.slice(0, i + 1).join("/")
      const label = pathLabels[path] || segments[i]
      breadcrumbs.push({ path, label })
    }
    
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs()

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <nav className="flex items-center space-x-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.path} className="flex items-center space-x-2">
                {index > 0 && (
                  <span className="text-gray-400">/</span>
                )}
                <span
                  className={cn(
                    index === breadcrumbs.length - 1
                      ? "text-gray-900 font-medium"
                      : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  {crumb.label}
                </span>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <User className="h-4 w-4 text-gray-500" />
              )}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-gray-500">
                {user?.email || "user@example.com"}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="text-gray-500 hover:text-gray-700"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

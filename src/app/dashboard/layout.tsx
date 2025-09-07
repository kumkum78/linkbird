import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/layout/header"
import { getCurrentUser } from "@/lib/auth-server"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect("/auth")
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden transition-all duration-300">
        <Header />
        <main className="flex-1 overflow-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  )
}

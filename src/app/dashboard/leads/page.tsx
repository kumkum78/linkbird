"use client"

import { useState, useEffect } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { getLeads } from "@/lib/actions/leads"
import { LeadsTable } from "@/components/leads/leads-table"
import { LeadSideSheet } from "@/components/leads/lead-side-sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search, Filter } from "lucide-react"
import { CreateLeadDialog } from "@/components/leads/create-lead-dialog"

export default function LeadsPage() {
  const [search, setSearch] = useState("")
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  // Mock data for demonstration
  const mockLeads = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      company: "Acme Corp",
      status: "new" as const,
      source: "Website",
      lastContactDate: new Date().toISOString(),
      campaign: {
        id: "campaign-1",
        name: "Q4 Marketing Campaign",
      },
      assignedTo: {
        id: "user-1",
        name: "John Doe",
      },
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@techsolutions.com",
      phone: "+1 (555) 234-5678",
      company: "Tech Solutions",
      status: "contacted" as const,
      source: "LinkedIn",
      lastContactDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      campaign: {
        id: "campaign-2",
        name: "Product Launch Campaign",
      },
      assignedTo: {
        id: "user-1",
        name: "John Doe",
      },
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "3",
      name: "Mike Wilson",
      email: "mike.wilson@globalinc.com",
      phone: "+1 (555) 345-6789",
      company: "Global Inc",
      status: "responded" as const,
      source: "Email",
      lastContactDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      campaign: {
        id: "campaign-1",
        name: "Q4 Marketing Campaign",
      },
      assignedTo: {
        id: "user-1",
        name: "John Doe",
      },
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@startupxyz.com",
      phone: "+1 (555) 456-7890",
      company: "StartupXYZ",
      status: "converted" as const,
      source: "Referral",
      lastContactDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      campaign: {
        id: "campaign-3",
        name: "Holiday Promotion",
      },
      assignedTo: {
        id: "user-1",
        name: "John Doe",
      },
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]

  const filteredLeads = mockLeads.filter(lead =>
    lead.name.toLowerCase().includes(search.toLowerCase()) ||
    lead.email.toLowerCase().includes(search.toLowerCase()) ||
    lead.company?.toLowerCase().includes(search.toLowerCase())
  )

  const handleSearch = (value: string) => {
    setSearch(value)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-600 mt-1">
            Manage and track your sales leads across all campaigns
          </p>
        </div>
        <Button 
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Lead
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search leads..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="flex items-center space-x-2">
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </Button>
      </div>

      <LeadsTable
        leads={filteredLeads}
        isLoading={false}
        onLeadSelect={setSelectedLeadId}
      />

      <LeadSideSheet />

      <CreateLeadDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSuccess={() => {
          setIsCreateDialogOpen(false)
        }}
      />
    </div>
  )
}

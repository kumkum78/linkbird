"use client"

import { useState, useEffect } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { getCampaigns } from "@/lib/actions/campaigns"
import { CampaignsTable } from "@/components/campaigns/campaigns-table"
import { CampaignSideSheet } from "@/components/campaigns/campaign-side-sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search, Filter } from "lucide-react"
import { CreateCampaignDialog } from "@/components/campaigns/create-campaign-dialog"

export default function CampaignsPage() {
  const [search, setSearch] = useState("")
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  // Mock data for demonstration
  const mockCampaigns = [
    {
      id: "1",
      name: "Q4 Marketing Campaign",
      description: "End-of-year marketing push to boost sales",
      status: "active" as const,
      type: "email" as const,
      totalLeads: 1247,
      successfulLeads: 156,
      successRate: 12.5,
      progress: 75,
      budget: 25000,
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Product Launch Campaign",
      description: "Launch campaign for our new product line",
      status: "active" as const,
      type: "social" as const,
      totalLeads: 892,
      successfulLeads: 89,
      successRate: 10.0,
      progress: 45,
      budget: 15000,
      startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "3",
      name: "Holiday Promotion",
      description: "Special holiday offers and promotions",
      status: "paused" as const,
      type: "paid" as const,
      totalLeads: 234,
      successfulLeads: 16,
      successRate: 6.8,
      progress: 30,
      budget: 8000,
      startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "4",
      name: "Lead Generation Drive",
      description: "Focused lead generation campaign",
      status: "completed" as const,
      type: "content" as const,
      totalLeads: 445,
      successfulLeads: 68,
      successRate: 15.2,
      progress: 100,
      budget: 12000,
      startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 65 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]

  const filteredCampaigns = mockCampaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(search.toLowerCase()) ||
    campaign.description?.toLowerCase().includes(search.toLowerCase())
  )

  const handleSearch = (value: string) => {
    setSearch(value)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
          <p className="text-gray-600 mt-1">
            Manage your marketing campaigns and track performance
          </p>
        </div>
        <Button 
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search campaigns..."
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

      <CampaignsTable
        campaigns={filteredCampaigns}
        isLoading={false}
        onCampaignSelect={setSelectedCampaignId}
      />

      <CampaignSideSheet />

      <CreateCampaignDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSuccess={() => {
          setIsCreateDialogOpen(false)
        }}
      />
    </div>
  )
}

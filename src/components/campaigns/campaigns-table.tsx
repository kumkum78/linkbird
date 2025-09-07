"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useUIStore } from "@/lib/stores/ui-store"
import { useFiltersStore } from "@/lib/stores/filters-store"
import { Search, Filter, MoreHorizontal, Eye, Play, Pause, Edit, Trash2, Megaphone } from "lucide-react"
import { cn } from "@/lib/utils"

interface Campaign {
  id: string
  name: string
  description?: string
  status: "draft" | "active" | "paused" | "completed"
  type: "email" | "social" | "content" | "paid" | "event"
  totalLeads: number
  successfulLeads: number
  successRate: number
  progress: number
  budget?: number
  startDate?: string
  endDate?: string
  createdAt: string
  updatedAt: string
}

const statusColors = {
  draft: "bg-gray-100 text-gray-800",
  active: "bg-green-100 text-green-800",
  paused: "bg-yellow-100 text-yellow-800",
  completed: "bg-blue-100 text-blue-800",
}

const typeColors = {
  email: "bg-purple-100 text-purple-800",
  social: "bg-blue-100 text-blue-800",
  content: "bg-green-100 text-green-800",
  paid: "bg-orange-100 text-orange-800",
  event: "bg-pink-100 text-pink-800",
}

interface CampaignsTableProps {
  campaigns: Campaign[]
  isLoading: boolean
  onCampaignSelect: (campaignId: string) => void
}

export function CampaignsTable({ campaigns, isLoading, onCampaignSelect }: CampaignsTableProps) {
  const { setSelectedCampaignId, setCampaignSideSheetOpen } = useUIStore()
  const { campaignFilters, setCampaignFilters } = useFiltersStore()
  const [searchTerm, setSearchTerm] = useState(campaignFilters.search)

  // Use the campaigns passed as props instead of generating mock data
  const allCampaigns = campaigns

  const handleCampaignClick = (campaign: Campaign) => {
    setSelectedCampaignId(campaign.id)
    setCampaignSideSheetOpen(true)
    onCampaignSelect(campaign.id)
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCampaignFilters({ search: value })
  }

  const handleStatusChange = (campaignId: string, newStatus: Campaign["status"]) => {
    // Here you would typically update the campaign status via API
    console.log(`Changing campaign ${campaignId} status to ${newStatus}`)
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-10 bg-gray-200 rounded animate-pulse" />
        <div className="space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (allCampaigns.length === 0 && !isLoading) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Megaphone className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
        <p className="text-gray-500 mb-4">Get started by creating your first campaign.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Campaign Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Leads
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Successful Leads
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Conversion Rate (%)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Progress Bar
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allCampaigns?.map((campaign) => (
              <tr
                key={campaign.id}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleCampaignClick(campaign)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                    <div className="text-sm text-gray-500">{campaign.description}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge className={cn("text-xs font-medium", statusColors[campaign.status])}>
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {campaign.totalLeads.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {campaign.successfulLeads.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {campaign.successRate}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className={cn(
                          "h-2 rounded-full transition-all duration-300",
                          campaign.progress >= 80 ? "bg-green-500" :
                          campaign.progress >= 60 ? "bg-blue-500" :
                          campaign.progress >= 40 ? "bg-yellow-500" : "bg-red-500"
                        )}
                        style={{ width: `${campaign.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{campaign.progress}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCampaignClick(campaign)
                      }}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        // Handle edit
                      }}
                      className="text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    {campaign.status === "active" ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleStatusChange(campaign.id, "paused")
                        }}
                        className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
                      >
                        <Pause className="h-4 w-4" />
                      </Button>
                    ) : campaign.status === "paused" ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleStatusChange(campaign.id, "active")
                        }}
                        className="text-green-600 hover:text-green-700 hover:bg-green-50"
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    ) : null}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        // Handle delete
                      }}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}
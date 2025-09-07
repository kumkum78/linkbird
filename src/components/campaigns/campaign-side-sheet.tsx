"use client"

import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUIStore } from "@/lib/stores/ui-store"
import { X, Calendar, DollarSign, Target, TrendingUp, Users, Edit, Save } from "lucide-react"
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
  metrics: {
    impressions?: number
    clicks?: number
    conversions?: number
    cost?: number
  }
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

export function CampaignSideSheet() {
  const { selectedCampaignId, campaignSideSheetOpen, setCampaignSideSheetOpen } = useUIStore()
  const [isEditing, setIsEditing] = useState(false)
  const [editedCampaign, setEditedCampaign] = useState<Campaign | null>(null)

  // Mock data generator
  const generateMockCampaign = (id: string): Campaign => ({
    id,
    name: "Q4 Marketing Campaign",
    description: "A comprehensive marketing campaign targeting enterprise customers for Q4 sales push.",
    status: "active",
    type: "email",
    totalLeads: 1250,
    successfulLeads: 187,
    successRate: 15,
    progress: 65,
    budget: 25000,
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    metrics: {
      impressions: 50000,
      clicks: 2500,
      conversions: 187,
      cost: 15000,
    },
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  })

  const { data: campaign, isLoading } = useQuery({
    queryKey: ["campaign", selectedCampaignId],
    queryFn: async () => {
      if (!selectedCampaignId) return null
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))
      return generateMockCampaign(selectedCampaignId)
    },
    enabled: !!selectedCampaignId,
  })

  useEffect(() => {
    if (campaign) {
      setEditedCampaign(campaign)
    }
  }, [campaign])

  const handleSave = () => {
    // Here you would typically save the changes to the API
    console.log("Saving campaign:", editedCampaign)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedCampaign(campaign || null)
    setIsEditing(false)
  }

  if (!campaignSideSheetOpen || !selectedCampaignId) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setCampaignSideSheetOpen(false)} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">Campaign Details</h2>
            <div className="flex items-center space-x-2">
              {isEditing ? (
                <>
                  <Button size="sm" variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                </>
              ) : (
                <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              )}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setCampaignSideSheetOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {isLoading ? (
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
              </div>
            ) : editedCampaign ? (
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Campaign Name</Label>
                    {isEditing ? (
                      <Input
                        value={editedCampaign.name}
                        onChange={(e) => setEditedCampaign({ ...editedCampaign, name: e.target.value })}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{editedCampaign.name}</p>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Description</Label>
                    {isEditing ? (
                      <textarea
                        value={editedCampaign.description || ""}
                        onChange={(e) => setEditedCampaign({ ...editedCampaign, description: e.target.value })}
                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                        rows={3}
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{editedCampaign.description || "—"}</p>
                    )}
                  </div>

                  <div className="flex items-center space-x-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Status</Label>
                      <div className="mt-1">
                        <Badge className={cn("text-xs", statusColors[editedCampaign.status])}>
                          {editedCampaign.status.charAt(0).toUpperCase() + editedCampaign.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Type</Label>
                      <div className="mt-1">
                        <Badge className={cn("text-xs", typeColors[editedCampaign.type])}>
                          {editedCampaign.type.charAt(0).toUpperCase() + editedCampaign.type.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{editedCampaign.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${editedCampaign.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-700">Performance Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-xs text-gray-500">Total Leads</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">
                        {editedCampaign.totalLeads.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <Target className="h-4 w-4 text-gray-500" />
                        <span className="text-xs text-gray-500">Successful</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">
                        {editedCampaign.successfulLeads.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-gray-500" />
                        <span className="text-xs text-gray-500">Success Rate</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">
                        {editedCampaign.successRate}%
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-gray-500" />
                        <span className="text-xs text-gray-500">Budget</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">
                        ${editedCampaign.budget?.toLocaleString() || "—"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Metrics */}
                {editedCampaign.metrics && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-700">Additional Metrics</h3>
                    <div className="space-y-2">
                      {editedCampaign.metrics.impressions && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Impressions</span>
                          <span className="text-gray-900">{editedCampaign.metrics.impressions.toLocaleString()}</span>
                        </div>
                      )}
                      {editedCampaign.metrics.clicks && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Clicks</span>
                          <span className="text-gray-900">{editedCampaign.metrics.clicks.toLocaleString()}</span>
                        </div>
                      )}
                      {editedCampaign.metrics.conversions && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Conversions</span>
                          <span className="text-gray-900">{editedCampaign.metrics.conversions.toLocaleString()}</span>
                        </div>
                      )}
                      {editedCampaign.metrics.cost && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Cost</span>
                          <span className="text-gray-900">${editedCampaign.metrics.cost.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Dates */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-700">Timeline</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <div className="flex-1">
                        <div className="text-xs text-gray-500">Start Date</div>
                        <div className="text-sm text-gray-900">
                          {editedCampaign.startDate
                            ? new Date(editedCampaign.startDate).toLocaleDateString()
                            : "—"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <div className="flex-1">
                        <div className="text-xs text-gray-500">End Date</div>
                        <div className="text-sm text-gray-900">
                          {editedCampaign.endDate
                            ? new Date(editedCampaign.endDate).toLocaleDateString()
                            : "—"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timestamps */}
                <div className="space-y-2 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Created</span>
                    <span>{new Date(editedCampaign.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Updated</span>
                    <span>{new Date(editedCampaign.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Campaign not found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { CampaignsTable } from "@/components/campaigns/campaigns-table"
import { CampaignSideSheet } from "@/components/campaigns/campaign-side-sheet"

export default function CampaignsPage() {
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null)

  const { data: campaigns = [], isLoading } = useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => {
      // Mock data - replace with actual API call
      return [
        {
          id: "1",
          name: "Q4 Marketing Campaign",
          description: "End of year marketing push",
          status: "active" as const,
          type: "email" as const,
          totalLeads: 156,
          successfulLeads: 12,
          conversionRate: 7.7,
          successRate: 7.7,
          progress: 75,
          startDate: "2024-01-01",
          endDate: "2024-12-31",
          budget: 5000,
          spent: 3200,
          metrics: {
            impressions: 10000,
            clicks: 500,
            conversions: 12,
            cost: 3200,
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "2",
          name: "Product Launch Campaign",
          description: "New product announcement",
          status: "draft" as const,
          type: "social" as const,
          totalLeads: 89,
          successfulLeads: 11,
          conversionRate: 12.4,
          successRate: 12.4,
          progress: 25,
          startDate: "2024-02-01",
          endDate: "2024-03-31",
          budget: 3000,
          spent: 0,
          metrics: {
            impressions: 5000,
            clicks: 200,
            conversions: 11,
            cost: 0,
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]
    },
  })

  const handleCampaignSelect = (campaignId: string) => {
    setSelectedCampaignId(campaignId)
  }

  return (
    <>
      <CampaignsTable 
        campaigns={campaigns}
        isLoading={isLoading}
        onCampaignSelect={handleCampaignSelect}
      />
      <CampaignSideSheet />
    </>
  )
}

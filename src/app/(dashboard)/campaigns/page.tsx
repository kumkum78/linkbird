"use client"

import { CampaignsTable } from "@/components/campaigns/campaigns-table"
import { CampaignSideSheet } from "@/components/campaigns/campaign-side-sheet"

export default function CampaignsPage() {
  return (
    <>
      <CampaignsTable />
      <CampaignSideSheet />
    </>
  )
}

"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { LeadsTable } from "@/components/leads/leads-table"
import { LeadSideSheet } from "@/components/leads/lead-side-sheet"

export default function LeadsPage() {
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null)

  const { data: leads = [], isLoading } = useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      // Mock data - replace with actual API call
      return [
        {
          id: "1",
          name: "John Smith",
          email: "john.smith@example.com",
          phone: "+1 (555) 123-4567",
          company: "Acme Corporation",
          status: "new" as const,
          source: "Website",
          lastContactDate: new Date().toISOString(),
          campaign: {
            id: "campaign-1",
            name: "Q4 Marketing Campaign",
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "2",
          name: "Sarah Johnson",
          email: "sarah.johnson@example.com",
          phone: "+1 (555) 987-6543",
          company: "Tech Solutions",
          status: "contacted" as const,
          source: "Social Media",
          lastContactDate: new Date().toISOString(),
          campaign: {
            id: "campaign-2",
            name: "Product Launch Campaign",
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]
    },
  })

  const handleLeadSelect = (leadId: string) => {
    setSelectedLeadId(leadId)
  }

  return (
    <>
      <LeadsTable 
        leads={leads}
        isLoading={isLoading}
        onLeadSelect={handleLeadSelect}
      />
      <LeadSideSheet />
    </>
  )
}

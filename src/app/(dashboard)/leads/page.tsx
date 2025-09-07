"use client"

import { LeadsTable } from "@/components/leads/leads-table"
import { LeadSideSheet } from "@/components/leads/lead-side-sheet"

export default function LeadsPage() {
  return (
    <>
      <LeadsTable />
      <LeadSideSheet />
    </>
  )
}

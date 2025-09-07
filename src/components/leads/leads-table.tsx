"use client"

import { useState, useEffect, useRef } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useUIStore } from "@/lib/stores/ui-store"
import { useFiltersStore } from "@/lib/stores/filters-store"
import { Search, Filter, MoreHorizontal, Eye, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  status: "new" | "contacted" | "responded" | "converted"
  source?: string
  lastContactDate?: string
  campaign?: {
    id: string
    name: string
  }
  assignedTo?: {
    id: string
    name: string
  }
  createdAt: string
}

const statusColors = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  responded: "bg-green-100 text-green-800",
  converted: "bg-purple-100 text-purple-800",
}

interface LeadsTableProps {
  leads: Lead[]
  isLoading: boolean
  onLeadSelect: (leadId: string) => void
}

export function LeadsTable({ leads, isLoading, onLeadSelect }: LeadsTableProps) {
  const { setSelectedLeadId, setLeadSideSheetOpen } = useUIStore()
  const { leadFilters, setLeadFilters } = useFiltersStore()
  const [searchTerm, setSearchTerm] = useState(leadFilters.search)
  const tableRef = useRef<HTMLDivElement>(null)

  // Use the leads passed as props instead of generating mock data
  const allLeads = leads

  const handleLeadClick = (lead: Lead) => {
    setSelectedLeadId(lead.id)
    setLeadSideSheetOpen(true)
    onLeadSelect(lead.id)
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setLeadFilters({ search: value })
  }

  // Remove infinite scroll effect since we're using props now

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-10 bg-gray-200 rounded animate-pulse" />
        <div className="space-y-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (allLeads.length === 0 && !isLoading) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Users className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No leads found</h3>
        <p className="text-gray-500 mb-4">Get started by adding your first lead.</p>
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
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name/Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Campaign Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Contact Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allLeads.map((lead) => (
              <tr
                key={lead.id}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleLeadClick(lead)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    onClick={(e) => e.stopPropagation()}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-medium text-white">
                        {lead.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                      <div className="text-sm text-gray-500">{lead.phone || "No phone"}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {lead.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {lead.company || "—"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {lead.campaign?.name || "—"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge className={cn("text-xs font-medium", statusColors[lead.status])}>
                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {lead.lastContactDate
                    ? new Date(lead.lastContactDate).toLocaleDateString()
                    : "—"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleLeadClick(lead)
                    }}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}
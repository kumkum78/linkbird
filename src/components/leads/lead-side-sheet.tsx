"use client"

import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUIStore } from "@/lib/stores/ui-store"
import { X, Mail, Phone, Building, Calendar, User, Edit, Save } from "lucide-react"
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
  notes?: string
  tags?: string[]
  createdAt: string
  updatedAt: string
}

const statusColors = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  responded: "bg-green-100 text-green-800",
  converted: "bg-purple-100 text-purple-800",
}

export function LeadSideSheet() {
  const { selectedLeadId, leadSideSheetOpen, setLeadSideSheetOpen } = useUIStore()
  const [isEditing, setIsEditing] = useState(false)
  const [editedLead, setEditedLead] = useState<Lead | null>(null)

  // Mock data generator
  const generateMockLead = (id: string): Lead => ({
    id,
    name: `Lead ${id.split('-')[2]}`,
    email: `lead${id.split('-')[2]}@example.com`,
    phone: "+1 (555) 123-4567",
    company: "Acme Corporation",
    status: "new",
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
    notes: "Interested in our premium package. Follow up next week.",
    tags: ["hot", "premium", "enterprise"],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  })

  const { data: lead, isLoading } = useQuery({
    queryKey: ["lead", selectedLeadId],
    queryFn: async () => {
      if (!selectedLeadId) return null
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))
      return generateMockLead(selectedLeadId)
    },
    enabled: !!selectedLeadId,
  })

  useEffect(() => {
    if (lead) {
      setEditedLead(lead)
    }
  }, [lead])

  const handleSave = () => {
    // Here you would typically save the changes to the API
    console.log("Saving lead:", editedLead)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedLead(lead)
    setIsEditing(false)
  }

  if (!leadSideSheetOpen || !selectedLeadId) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setLeadSideSheetOpen(false)} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">Lead Details</h2>
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
                onClick={() => setLeadSideSheetOpen(false)}
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
            ) : editedLead ? (
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Name</Label>
                    {isEditing ? (
                      <Input
                        value={editedLead.name}
                        onChange={(e) => setEditedLead({ ...editedLead, name: e.target.value })}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{editedLead.name}</p>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Email</Label>
                    {isEditing ? (
                      <Input
                        type="email"
                        value={editedLead.email}
                        onChange={(e) => setEditedLead({ ...editedLead, email: e.target.value })}
                        className="mt-1"
                      />
                    ) : (
                      <div className="mt-1 flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{editedLead.email}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Phone</Label>
                    {isEditing ? (
                      <Input
                        value={editedLead.phone || ""}
                        onChange={(e) => setEditedLead({ ...editedLead, phone: e.target.value })}
                        className="mt-1"
                      />
                    ) : (
                      <div className="mt-1 flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{editedLead.phone || "—"}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Company</Label>
                    {isEditing ? (
                      <Input
                        value={editedLead.company || ""}
                        onChange={(e) => setEditedLead({ ...editedLead, company: e.target.value })}
                        className="mt-1"
                      />
                    ) : (
                      <div className="mt-1 flex items-center space-x-2">
                        <Building className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{editedLead.company || "—"}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status and Campaign */}
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Status</Label>
                    <div className="mt-1">
                      <Badge className={cn("text-xs", statusColors[editedLead.status])}>
                        {editedLead.status.charAt(0).toUpperCase() + editedLead.status.slice(1)}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Campaign</Label>
                    <p className="mt-1 text-sm text-gray-900">
                      {editedLead.campaign?.name || "—"}
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Assigned To</Label>
                    <div className="mt-1 flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {editedLead.assignedTo?.name || "—"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Source</Label>
                    <p className="mt-1 text-sm text-gray-900">{editedLead.source || "—"}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Last Contact</Label>
                    <div className="mt-1 flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {editedLead.lastContactDate
                          ? new Date(editedLead.lastContactDate).toLocaleDateString()
                          : "—"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">Notes</Label>
                    {isEditing ? (
                      <textarea
                        value={editedLead.notes || ""}
                        onChange={(e) => setEditedLead({ ...editedLead, notes: e.target.value })}
                        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                        rows={3}
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{editedLead.notes || "—"}</p>
                    )}
                  </div>

                  {editedLead.tags && editedLead.tags.length > 0 && (
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Tags</Label>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {editedLead.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Timestamps */}
                <div className="space-y-2 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Created</span>
                    <span>{new Date(editedLead.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Updated</span>
                    <span>{new Date(editedLead.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Lead not found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
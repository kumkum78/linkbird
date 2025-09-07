"use client"

import { useState } from "react"
import { createLead } from "@/lib/actions/leads"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CreateLeadDialogProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function CreateLeadDialog({ isOpen, onClose, onSuccess }: CreateLeadDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "new",
    source: "",
    value: "",
    notes: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await createLead({
        ...formData,
        value: formData.value ? parseInt(formData.value) : undefined,
      })
      onSuccess()
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        status: "new",
        source: "",
        value: "",
        notes: "",
      })
    } catch (error) {
      console.error("Failed to create lead:", error)
      alert("Failed to create lead")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Lead</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Email *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Company</label>
                  <Input
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Business Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="proposal">Proposal</option>
                    <option value="negotiation">Negotiation</option>
                    <option value="closed-won">Closed Won</option>
                    <option value="closed-lost">Closed Lost</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Source</label>
                  <Input
                    value={formData.source}
                    onChange={(e) => setFormData(prev => ({ ...prev, source: e.target.value }))}
                    placeholder="e.g., Website, Referral, Cold Call"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Value</label>
                <Input
                  type="number"
                  value={formData.value}
                  onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
                  placeholder="0"
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full rounded-md border border-gray-300 px-3 py-2 min-h-[100px]"
                placeholder="Add any additional notes about this lead..."
              />
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Lead"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

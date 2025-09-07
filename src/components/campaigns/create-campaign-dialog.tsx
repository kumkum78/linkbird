"use client"

import { useState } from "react"
import { createCampaign } from "@/lib/actions/campaigns"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CreateCampaignDialogProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function CreateCampaignDialog({ isOpen, onClose, onSuccess }: CreateCampaignDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "draft",
    type: "email",
    budget: "",
    startDate: "",
    endDate: "",
    impressions: "",
    clicks: "",
    conversions: "",
    cost: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await createCampaign({
        name: formData.name,
        description: formData.description,
        status: formData.status,
        type: formData.type,
        budget: formData.budget ? parseInt(formData.budget) : undefined,
        startDate: formData.startDate ? new Date(formData.startDate) : undefined,
        endDate: formData.endDate ? new Date(formData.endDate) : undefined,
        metrics: {
          impressions: formData.impressions ? parseInt(formData.impressions) : undefined,
          clicks: formData.clicks ? parseInt(formData.clicks) : undefined,
          conversions: formData.conversions ? parseInt(formData.conversions) : undefined,
          cost: formData.cost ? parseInt(formData.cost) : undefined,
        },
      })
      onSuccess()
      setFormData({
        name: "",
        description: "",
        status: "draft",
        type: "email",
        budget: "",
        startDate: "",
        endDate: "",
        impressions: "",
        clicks: "",
        conversions: "",
        cost: "",
      })
    } catch (error) {
      console.error("Failed to create campaign:", error)
      alert("Failed to create campaign")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Campaign</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 min-h-[80px]"
                  placeholder="Describe your campaign goals and strategy..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                  >
                    <option value="email">Email</option>
                    <option value="social">Social Media</option>
                    <option value="content">Content Marketing</option>
                    <option value="paid">Paid Advertising</option>
                    <option value="event">Event</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Budget & Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Budget</label>
                <Input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                  className="mt-1"
                  placeholder="0"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Start Date</label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">End Date</label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Initial Metrics (Optional)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Impressions</label>
                  <Input
                    type="number"
                    value={formData.impressions}
                    onChange={(e) => setFormData(prev => ({ ...prev, impressions: e.target.value }))}
                    className="mt-1"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Clicks</label>
                  <Input
                    type="number"
                    value={formData.clicks}
                    onChange={(e) => setFormData(prev => ({ ...prev, clicks: e.target.value }))}
                    className="mt-1"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Conversions</label>
                  <Input
                    type="number"
                    value={formData.conversions}
                    onChange={(e) => setFormData(prev => ({ ...prev, conversions: e.target.value }))}
                    className="mt-1"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Cost</label>
                  <Input
                    type="number"
                    value={formData.cost}
                    onChange={(e) => setFormData(prev => ({ ...prev, cost: e.target.value }))}
                    className="mt-1"
                    placeholder="0"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Campaign"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

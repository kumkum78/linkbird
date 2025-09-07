import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Settings, User, Bell, Shield } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Name</label>
              <Input defaultValue="John Doe" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <Input defaultValue="john@example.com" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Company</label>
              <Input defaultValue="Acme Corp" className="mt-1" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Email Notifications</div>
                <div className="text-sm text-gray-600">Receive email updates about your leads and campaigns</div>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Push Notifications</div>
                <div className="text-sm text-gray-600">Get notified about important updates</div>
              </div>
              <input type="checkbox" className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Weekly Reports</div>
                <div className="text-sm text-gray-600">Receive weekly performance summaries</div>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <Button>Update Preferences</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Current Password</label>
              <Input type="password" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">New Password</label>
              <Input type="password" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
              <Input type="password" className="mt-1" />
            </div>
            <Button>Change Password</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Timezone</label>
              <select className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2">
                <option>UTC-8 (Pacific Time)</option>
                <option>UTC-5 (Eastern Time)</option>
                <option>UTC+0 (GMT)</option>
                <option>UTC+1 (Central European Time)</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Date Format</label>
              <select className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2">
                <option>MM/DD/YYYY</option>
                <option>DD/MM/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Currency</label>
              <select className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2">
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
                <option>CAD (C$)</option>
              </select>
            </div>
            <Button>Save Preferences</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

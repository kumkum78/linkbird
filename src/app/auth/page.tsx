"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/stores/auth-store"
import { AuthDialog } from "@/components/auth/auth-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, ArrowRight, Sparkles } from "lucide-react"

export default function AuthPage() {
  const router = useRouter()
  const { user, setAuthDialogOpen } = useAuthStore()

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  const handleEmailSignIn = () => {
    setAuthDialogOpen(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to Linkbird</h1>
          <p className="text-gray-600 text-lg">Your all-in-one lead management platform</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-semibold text-gray-900">Get Started</CardTitle>
            <CardDescription className="text-gray-600">
              Sign in to access your dashboard and manage your campaigns
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleEmailSignIn}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium text-base"
            >
              <Mail className="w-5 h-5 mr-2" />
              Continue with Email
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-gray-500">
                New to Linkbird?{" "}
                <button
                  onClick={handleEmailSignIn}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Create an account
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            By continuing, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700">Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700">Privacy Policy</a>
          </p>
        </div>

        <AuthDialog />
      </div>
    </div>
  )
}

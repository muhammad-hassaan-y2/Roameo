"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Mail } from "lucide-react"
import LoginForm from './LoginForm' // Import the LoginForm component

type FormType = "login" | "signup" | "verify"

export default function SignUpModal({ initialFormType }: { initialFormType?: FormType }) {
  const [open, setOpen] = useState(false) // Modal is closed by default
  const [formType, setFormType] = useState<FormType>(initialFormType || "signup") // Default to signup form
  const [email, setEmail] = useState("")

  const handleLoginSubmit = (email: string, password: string) => {
    console.log("Login form submitted:", { email, password })
    setOpen(false) // Close the modal after login
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (formType === "signup") {
      setFormType("verify")
    } else {
      console.log("Form submitted")
      setOpen(false)
    }
  }

  const handleResendEmail = () => {
    console.log("Resending verification email")
  }

  const renderForm = () => {
    switch (formType) {
      case "login":
        return (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Welcome Back</DialogTitle>
              <DialogDescription>
                Sign in to your account to continue
              </DialogDescription>
            </DialogHeader>
            <LoginForm onSubmit={handleLoginSubmit} /> {/* Use the LoginForm component */}
            <div className="mt-4 text-center text-sm text-gray-500">
              Dont have an account?{" "}
              <a href="#" className="text-primary hover:underline" onClick={() => setFormType("signup")}>
                Sign up
              </a>
            </div>
          </>
        )
      case "signup":
        return (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Create an Account</DialogTitle>
              <DialogDescription>
                Join our community and start your journey today!
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Create a password" required />
              </div>
              <Button type="submit" className="w-full">Create an Account</Button>
            </form>
            <div className="mt-4 text-center text-sm text-gray-500">
              Already have an account?{" "}
              {/* Trigger the modal and switch to login form */}
              <a href="#" className="text-primary hover:underline" onClick={() => setFormType("login")}>
                Log in
              </a>
            </div>
          </>
        )
      case "verify":
        return (
          <div className="text-center space-y-4">
            <DialogTitle className="text-2xl font-bold">Verify Your Email</DialogTitle>
            <div className="flex justify-center">
              <Mail className="h-16 w-16 text-primary" />
            </div>
            <DialogDescription>
              To finish signing up, we have sent a verification link to {email}. 
              The link will expire within the next 15 minutes.
            </DialogDescription>
            <DialogDescription>
              Still cant find the email? No worries.
            </DialogDescription>
            <Button onClick={handleResendEmail} className="w-full">
              Resend Email Verification
            </Button>
            <div className="text-sm text-gray-500 mt-4">
              Questions? Email us at{" "}
              <a href="mailto:roamio@tripplannerplatform.ca" className="text-primary hover:underline">
                roamio@tripplannerplatform.ca
              </a>
            </div>
          </div>
        )
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* Button for triggering sign-up form */}
        <Button 
          className="w-full bg-[#12321D] text-white rounded-full"
          onClick={() => setFormType("signup")}
        >
          Create an Account
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        {renderForm()}
      </DialogContent>
    </Dialog>
  )
}

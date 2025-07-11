"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface FormData {
  firstName: string
  lastName: string
  email: string
  company: string
  interest: string
  budget: string
  message: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    interest: "",
    budget: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to send message")
      }

      setSubmitStatus("success")
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        interest: "",
        budget: "",
        message: "",
      })
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-3xl">Start Your Project</CardTitle>
        <CardDescription className="text-lg">Tell us about your vision and we'll help you build it.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {submitStatus === "success" && (
          <Alert className="border-green-200 bg-green-50 dark:bg-green-950/50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              Thank you for your message! We've sent a confirmation to your email and will get back to you within 2
              hours.
            </AlertDescription>
          </Alert>
        )}

        {submitStatus === "error" && (
          <Alert className="border-red-200 bg-red-50 dark:bg-red-950/50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 dark:text-red-200">{errorMessage}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium">
                First Name *
              </Label>
              <Input
                id="firstName"
                placeholder="John"
                className="h-12"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-medium">
                Last Name *
              </Label>
              <Input
                id="lastName"
                placeholder="Doe"
                className="h-12"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@company.com"
              className="h-12"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company" className="text-sm font-medium">
              Company
            </Label>
            <Input
              id="company"
              placeholder="Your Company"
              className="h-12"
              value={formData.company}
              onChange={(e) => handleInputChange("company", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interest" className="text-sm font-medium">
              I'm interested in
            </Label>
            <Select value={formData.interest} onValueChange={(value) => handleInputChange("interest", value)}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select your interest" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AI/ML Development">AI/ML Development</SelectItem>
                <SelectItem value="Cloud Architecture">Cloud Architecture</SelectItem>
                <SelectItem value="Full-Stack Development">Full-Stack Development</SelectItem>
                <SelectItem value="Training Programs">Training Programs</SelectItem>
                <SelectItem value="Technical Consulting">Technical Consulting</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget" className="text-sm font-medium">
              Project Budget
            </Label>
            <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Under $50,000">Under $50,000</SelectItem>
                <SelectItem value="$50,000 - $100,000">$50,000 - $100,000</SelectItem>
                <SelectItem value="$100,000 - $250,000">$100,000 - $250,000</SelectItem>
                <SelectItem value="$250,000 - $500,000">$250,000 - $500,000</SelectItem>
                <SelectItem value="Over $500,000">Over $500,000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium">
              Project Details *
            </Label>
            <Textarea
              id="message"
              placeholder="Tell us about your project requirements, timeline, and goals..."
              rows={6}
              className="resize-none"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-14 text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Sending Message...
              </>
            ) : (
              <>
                Send Message
                <Send className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

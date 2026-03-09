"use client"

import { useState, useRef } from "react"
import Script from "next/script"

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

export default function ContactForm() {
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    const validFiles = selectedFiles.filter(file => 
      ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)
    )
    
    if (validFiles.length !== selectedFiles.length) {
      setErrorMessage("Only .jpg, .jpeg, and .png files are allowed")
    } else {
      setErrorMessage("")
    }
    
    setFiles(prev => [...prev, ...validFiles])
    
    // Reset input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    try {
      // Get reCAPTCHA v3 token
      let captchaToken = ""
      if (recaptchaLoaded && siteKey) {
        captchaToken = await new Promise<string>((resolve, reject) => {
          window.grecaptcha.ready(async () => {
            try {
              const token = await window.grecaptcha.execute(siteKey, { action: 'contact_submit' })
              resolve(token)
            } catch (err) {
              reject(err)
            }
          })
        })
      }

      if (!captchaToken) {
        throw new Error("Verification failed. Please refresh and try again.")
      }

      // Convert files to base64
      const attachments = await Promise.all(
        files.map(async (file) => ({
          filename: file.name,
          content: await fileToBase64(file),
          contentType: file.type,
        }))
      )

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, subject, message, captchaToken, attachments }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      setStatus("success")
      setEmail("")
      setSubject("")
      setMessage("")
      setFiles([])
    } catch (error) {
      setStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Failed to send message")
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-500/10 border border-green-500/20">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-brand-dark-text-primary mb-2 [html[data-mode=light]_&]:text-gray-900">
          Message Sent!
        </h3>
        <p className="text-brand-dark-text-secondary [html[data-mode=light]_&]:text-gray-600">
          Thank you for reaching out. We'll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-brand-orange-400 hover:text-brand-orange-300 font-medium transition-colors"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
        onLoad={() => setRecaptchaLoaded(true)}
      />
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label 
            htmlFor="email" 
            className="block text-sm font-medium text-brand-dark-text-primary mb-2 [html[data-mode=light]_&]:text-gray-900"
          >
            Your Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3 bg-brand-dark-bg border border-brand-dark-border rounded-lg 
              text-brand-dark-text-primary placeholder:text-brand-dark-text-muted
              focus:outline-none focus:ring-2 focus:ring-brand-orange-500/50 focus:border-brand-orange-500
              transition-colors
              [html[data-mode=light]_&]:bg-gray-50 [html[data-mode=light]_&]:border-gray-300 
              [html[data-mode=light]_&]:text-gray-900 [html[data-mode=light]_&]:placeholder:text-gray-400"
          />
        </div>

        <div>
          <label 
            htmlFor="subject" 
            className="block text-sm font-medium text-brand-dark-text-primary mb-2 [html[data-mode=light]_&]:text-gray-900"
          >
            Subject <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="subject"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="What's this about?"
            className="w-full px-4 py-3 bg-brand-dark-bg border border-brand-dark-border rounded-lg 
              text-brand-dark-text-primary placeholder:text-brand-dark-text-muted
              focus:outline-none focus:ring-2 focus:ring-brand-orange-500/50 focus:border-brand-orange-500
              transition-colors
              [html[data-mode=light]_&]:bg-gray-50 [html[data-mode=light]_&]:border-gray-300 
              [html[data-mode=light]_&]:text-gray-900 [html[data-mode=light]_&]:placeholder:text-gray-400"
          />
        </div>

        <div>
          <label 
            htmlFor="message" 
            className="block text-sm font-medium text-brand-dark-text-primary mb-2 [html[data-mode=light]_&]:text-gray-900"
          >
            Message <span className="text-red-400">*</span>
          </label>
          <textarea
            id="message"
            required
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us more..."
            className="w-full px-4 py-3 bg-brand-dark-bg border border-brand-dark-border rounded-lg 
              text-brand-dark-text-primary placeholder:text-brand-dark-text-muted
              focus:outline-none focus:ring-2 focus:ring-brand-orange-500/50 focus:border-brand-orange-500
              transition-colors resize-none
              [html[data-mode=light]_&]:bg-gray-50 [html[data-mode=light]_&]:border-gray-300 
              [html[data-mode=light]_&]:text-gray-900 [html[data-mode=light]_&]:placeholder:text-gray-400"
          />
        </div>

        {/* File Upload */}
        <div>
          <label 
            className="block text-sm font-medium text-brand-dark-text-primary mb-2 [html[data-mode=light]_&]:text-gray-900"
          >
            Attachments <span className="text-brand-dark-text-muted font-normal">(optional)</span>
          </label>
          
          <div 
            className="border-2 border-dashed border-brand-dark-border rounded-lg p-6 text-center
              hover:border-brand-orange-500/50 transition-colors cursor-pointer
              [html[data-mode=light]_&]:border-gray-300 [html[data-mode=light]_&]:hover:border-brand-orange-500/50"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            <svg className="w-10 h-10 mx-auto mb-3 text-brand-dark-text-muted [html[data-mode=light]_&]:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-brand-dark-text-secondary text-sm [html[data-mode=light]_&]:text-gray-600">
              Click to upload images
            </p>
            <p className="text-brand-dark-text-muted text-xs mt-1 [html[data-mode=light]_&]:text-gray-500">
              JPG, JPEG, PNG only
            </p>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="mt-3 space-y-2">
              {files.map((file, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between px-3 py-2 bg-brand-dark-bg border border-brand-dark-border rounded-lg
                    [html[data-mode=light]_&]:bg-gray-50 [html[data-mode=light]_&]:border-gray-200"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <svg className="w-4 h-4 flex-shrink-0 text-brand-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm text-brand-dark-text-primary truncate [html[data-mode=light]_&]:text-gray-900">
                      {file.name}
                    </span>
                    <span className="text-xs text-brand-dark-text-muted [html[data-mode=light]_&]:text-gray-500">
                      ({(file.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="p-1 text-brand-dark-text-muted hover:text-red-400 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {status === "error" && errorMessage && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading" || !recaptchaLoaded}
          className="w-full px-6 py-4 text-lg font-semibold text-white bg-brand-orange-500 rounded-lg 
            hover:bg-brand-orange-400 transition-all duration-300 
            shadow-lg shadow-brand-orange-500/25 hover:shadow-brand-orange-500/40
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand-orange-500"
        >
          {status === "loading" ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Sending...
            </span>
          ) : (
            "Send Message"
          )}
        </button>

        <p className="text-xs text-brand-dark-text-muted text-center [html[data-mode=light]_&]:text-gray-500">
          Protected by reCAPTCHA -{" "}
          <a href="https://policies.google.com/privacy" className="underline" target="_blank" rel="noopener noreferrer">
            Privacy
          </a>{" "}
          &{" "}
          <a href="https://policies.google.com/terms" className="underline" target="_blank" rel="noopener noreferrer">
            Terms
          </a>
        </p>
      </form>
    </>
  )
}

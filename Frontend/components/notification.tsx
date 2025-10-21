"use client"

import { useEffect } from "react"
import { AlertCircle, CheckCircle, XCircle } from "lucide-react"

interface NotificationProps {
  message: string
  type: "success" | "error" | "info"
  onClose: () => void
}

export function Notification({ message, type, onClose }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const bgColor = {
    success: "bg-green-100 border-green-400",
    error: "bg-red-100 border-red-400",
    info: "bg-blue-100 border-blue-400",
  }[type]

  const textColor = {
    success: "text-green-800",
    error: "text-red-800",
    info: "text-blue-800",
  }[type]

  const Icon = {
    success: CheckCircle,
    error: XCircle,
    info: AlertCircle,
  }[type]

  return (
    <div
      className={`fixed top-4 right-4 border-l-4 p-4 rounded ${bgColor} ${textColor} flex items-center gap-3 shadow-lg z-50`}
    >
      <Icon size={20} />
      <span>{message}</span>
    </div>
  )
}

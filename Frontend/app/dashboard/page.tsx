"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { JuiceCard } from "@/components/juice-card"
import { JuiceForm } from "@/components/juice-form"
import { Button } from "@/components/ui/button"
import { Notification } from "@/components/notification"
import type { Juice } from "@/lib/types"
import { mockJuices } from "@/lib/mock-data"

export default function DashboardPage() {
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [juices, setJuices] = useState<Juice[]>(mockJuices)
  const [showForm, setShowForm] = useState(false)
  const [editingJuice, setEditingJuice] = useState<Juice | null>(null)
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/")
    }
  }, [user, authLoading, router])

  if (authLoading || !user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  const handleAddJuice = (newJuice: Omit<Juice, "id">) => {
    const juice: Juice = {
      ...newJuice,
      id: Date.now().toString(),
    }
    setJuices([...juices, juice])
    setShowForm(false)
    setNotification({ message: "Juice added successfully!", type: "success" })
  }

  const handleUpdateJuice = (updatedJuice: Omit<Juice, "id">) => {
    if (!editingJuice) return
    setJuices(juices.map((j) => (j.id === editingJuice.id ? { ...j, ...updatedJuice } : j)))
    setEditingJuice(null)
    setShowForm(false)
    setNotification({ message: "Juice updated successfully!", type: "success" })
  }

  const handleDeleteJuice = (juiceId: string) => {
    if (confirm("Are you sure you want to delete this juice?")) {
      setJuices(juices.filter((j) => j.id !== juiceId))
      setNotification({ message: "Juice deleted successfully!", type: "success" })
    }
  }

  const handleEditClick = (juice: Juice) => {
    setEditingJuice(juice)
    setShowForm(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Our Juices</h1>
          {user.isAdmin && (
            <Button
              onClick={() => {
                setEditingJuice(null)
                setShowForm(!showForm)
              }}
              className="bg-primary hover:bg-primary/90"
              name="add-new-juice"
            >
              {showForm ? "Cancel" : "+ Add New Juice"}
            </Button>
          )}
        </div>

        {showForm && (
          <div className="mb-8">
            <JuiceForm
              juice={editingJuice || undefined}
              onSubmit={editingJuice ? handleUpdateJuice : handleAddJuice}
              onCancel={() => {
                setShowForm(false)
                setEditingJuice(null)
              }}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {juices.map((juice) => (
            <JuiceCard
              key={juice.id}
              juice={juice}
              isAdmin={user.isAdmin}
              onEdit={handleEditClick}
              onDelete={handleDeleteJuice}
            />
          ))}
        </div>
      </main>

      {notification && (
        <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />
      )}
    </div>
  )
}

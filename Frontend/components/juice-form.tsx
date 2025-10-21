"use client"

import type React from "react"

import type { Juice } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface JuiceFormProps {
  juice?: Juice
  onSubmit: (juice: Omit<Juice, "id">) => void
  onCancel: () => void
}

export function JuiceForm({ juice, onSubmit, onCancel }: JuiceFormProps) {
  const [formData, setFormData] = useState({
    name: juice?.name || "",
    price: juice?.price || 0,
    description: juice?.description || "",
    image: juice?.image || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.price || !formData.description) {
      alert("Please fill in all fields")
      return
    }
    onSubmit({
      ...formData,
      price: Number.parseFloat(formData.price.toString()),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-card p-6 rounded-lg border">
      <div>
        <label className="block text-sm font-medium mb-1">Juice Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="e.g., Green Detox"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Price ($)</label>
        <input
          type="number"
          step="0.01"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: Number.parseFloat(e.target.value) })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="5.99"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Describe the juice..."
          rows={3}
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
          {juice ? "Update Juice" : "Add Juice"}
        </Button>
        <Button type="button" onClick={onCancel} variant="outline" className="flex-1 bg-transparent">
          Cancel
        </Button>
      </div>
    </form>
  )
}

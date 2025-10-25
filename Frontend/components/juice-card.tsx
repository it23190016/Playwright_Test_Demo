"use client"

import type { Juice } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"
import { Notification } from "./notification"
import Image from "next/image"

interface JuiceCardProps {
  juice: Juice
  onEdit?: (juice: Juice) => void
  onDelete?: (juiceId: string) => void
  isAdmin?: boolean
}

export function JuiceCard({ juice, onEdit, onDelete, isAdmin }: JuiceCardProps) {
  const { addItem } = useCart()
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null)

  const handleAddToCart = () => {
    addItem(juice, 1)
    setNotification({ message: `${juice.name} added to cart!`, type: "success" })
  }

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48 bg-muted">
          <Image src={juice.image || "/placeholder.svg"} alt={juice.name} fill className="object-cover" />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2">{juice.name}</h3>
          <p className="text-sm text-muted-foreground mb-3">{juice.description}</p>
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-primary">LKR {juice.price.toFixed(2)}</span>
          </div>

          <div className="flex gap-2">
            {!isAdmin && (
              <Button onClick={handleAddToCart} className="flex-1 bg-secondary hover:bg-secondary/90">
                Add to Cart
              </Button>
            )}
            {isAdmin && (
              <>
                <Button onClick={() => onEdit?.(juice)} variant="outline" className="flex-1" name="edit-product">
                  Edit
                </Button>
                <Button onClick={() => onDelete?.(juice.id)} variant="destructive" className="flex-1" name="delete-product">
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>
      {notification && (
        <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />
      )}
    </>
  )
}

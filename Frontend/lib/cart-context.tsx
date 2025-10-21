"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { CartItem, Juice } from "./types"

interface CartContextType {
  items: CartItem[]
  addItem: (juice: Juice, quantity: number) => void
  removeItem: (juiceId: string) => void
  updateQuantity: (juiceId: string, quantity: number) => void
  clearCart: () => void
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    // Load cart from localStorage
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      setItems(JSON.parse(storedCart))
    }
  }, [])

  useEffect(() => {
    // Save cart to localStorage
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const addItem = (juice: Juice, quantity: number) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.juice.id === juice.id)
      if (existingItem) {
        return prevItems.map((item) =>
          item.juice.id === juice.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }
      return [...prevItems, { juice, quantity }]
    })
  }

  const removeItem = (juiceId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.juice.id !== juiceId))
  }

  const updateQuantity = (juiceId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(juiceId)
      return
    }
    setItems((prevItems) => prevItems.map((item) => (item.juice.id === juiceId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setItems([])
  }

  const total = items.reduce((sum, item) => sum + item.juice.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}

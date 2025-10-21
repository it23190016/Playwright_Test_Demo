"use client"

import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/lib/cart-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Notification } from "@/components/notification"
import { Trash2 } from "lucide-react"
import Image from "next/image"

export default function CartPage() {
  const { user, isLoading: authLoading } = useAuth()
  const { items, removeItem, updateQuantity, clearCart, total } = useCart()
  const router = useRouter()
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null)
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/")
    }
  }, [user, authLoading, router])

  if (authLoading || !user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  const handleCheckout = async () => {
    setIsCheckingOut(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setNotification({ message: "Order placed successfully! Thank you for your purchase.", type: "success" })
    clearCart()
    setIsCheckingOut(false)
    setTimeout(() => router.push("/dashboard"), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-lg text-muted-foreground mb-4">Your cart is empty</p>
            <Button onClick={() => router.push("/dashboard")} className="bg-primary hover:bg-primary/90">
              Continue Shopping
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.juice.id} className="p-4 flex gap-4">
                  <div className="relative w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.juice.image || "/placeholder.svg"}
                      alt={item.juice.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{item.juice.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{item.juice.description}</p>
                    <p className="font-semibold text-primary">LKR {item.juice.price.toFixed(2)}</p>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <Button
                      onClick={() => removeItem(item.juice.id)}
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 size={18} />
                    </Button>

                    <div className="flex items-center gap-2 border rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.juice.id, item.quantity - 1)}
                        className="px-2 py-1 hover:bg-muted"
                      >
                        −
                      </button>
                      <span className="px-3 py-1 font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.juice.id, item.quantity + 1)}
                        className="px-2 py-1 hover:bg-muted"
                      >
                        +
                      </button>
                    </div>

                    <p className="font-bold">LKR {(item.juice.price * item.quantity).toFixed(2)}</p>
                  </div>
                </Card>
              ))}
            </div>

            <div>
              <Card className="p-6 sticky top-4">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                <div className="space-y-2 mb-4 pb-4 border-b">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>LKR {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (10%):</span>
                    <span>LKR {(total * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery:</span>
                    <span>LKR 5.00</span>
                  </div>
                </div>

                <div className="flex justify-between text-lg font-bold mb-6">
                  <span>Total:</span>
                  <span className="text-primary">LKR {(total * 1.1 + 5).toFixed(2)}</span>
                </div>

                <Button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isCheckingOut ? "Processing..." : "Checkout"}
                </Button>

                <Button onClick={() => router.push("/dashboard")} variant="outline" className="w-full mt-2">
                  Continue Shopping
                </Button>
              </Card>
            </div>
          </div>
        )}
      </main>

      {notification && (
        <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />
      )}
    </div>
  )
}

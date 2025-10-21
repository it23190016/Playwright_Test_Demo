"use client"

import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { ShoppingCart, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export function Navbar() {
  const { user, logout } = useAuth()
  const { items } = useCart()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!user) return null

  return (
    <nav className="bg-primary text-primary-foreground shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="text-2xl font-bold">
          🥤 Juice Bar
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="hover:opacity-80 transition">
            Menu
          </Link>
          <Link href="/cart" className="flex items-center gap-2 hover:opacity-80 transition">
            <ShoppingCart size={20} />
            <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-sm font-bold">
              {items.length}
            </span>
          </Link>
          <span className="text-sm">{user.email}</span>
          {user.isAdmin && (
            <span className="bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-bold">Admin</span>
          )}
          <Button onClick={handleLogout} variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  )
}

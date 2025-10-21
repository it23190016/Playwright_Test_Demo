import { render, screen, waitFor } from "@testing-library/react"
import DashboardPage from "@/app/dashboard/page"
import jest from "jest" // Import jest to declare the variable

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

// Mock auth context
jest.mock("@/lib/auth-context", () => ({
  useAuth: () => ({
    user: { email: "admin@juicebar.com", isAdmin: true },
    isLoading: false,
  }),
}))

// Mock cart context
jest.mock("@/lib/cart-context", () => ({
  useCart: () => ({
    items: [],
    addItem: jest.fn(),
  }),
}))

describe("Dashboard CRUD Operations", () => {
  it("renders juice list", () => {
    render(<DashboardPage />)
    expect(screen.getByText("Our Juices")).toBeInTheDocument()
  })

  it("shows add juice button for admin", () => {
    render(<DashboardPage />)
    expect(screen.getByText("+ Add New Juice")).toBeInTheDocument()
  })

  it("displays juice cards", async () => {
    render(<DashboardPage />)
    await waitFor(() => {
      expect(screen.getByText("Green Detox")).toBeInTheDocument()
      expect(screen.getByText("Citrus Sunrise")).toBeInTheDocument()
    })
  })
})

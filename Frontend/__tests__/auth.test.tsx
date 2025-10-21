import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import LoginPage from "@/app/page"
import jest from "jest"

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe("Login Page", () => {
  it("renders login form", () => {
    render(<LoginPage />)
    expect(screen.getByText("Juice Bar")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("your@email.com")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("••••••••")).toBeInTheDocument()
  })

  it("shows validation error for invalid email", async () => {
    render(<LoginPage />)
    const emailInput = screen.getByPlaceholderText("your@email.com")
    const passwordInput = screen.getByPlaceholderText("••••••••")
    const loginButton = screen.getByText("Login")

    fireEvent.change(emailInput, { target: { value: "invalid-email" } })
    fireEvent.change(passwordInput, { target: { value: "password" } })
    fireEvent.click(loginButton)

    await waitFor(() => {
      expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument()
    })
  })

  it("shows demo credentials", () => {
    render(<LoginPage />)
    expect(screen.getByText("user@example.com")).toBeInTheDocument()
    expect(screen.getByText("admin@juicebar.com")).toBeInTheDocument()
  })
})

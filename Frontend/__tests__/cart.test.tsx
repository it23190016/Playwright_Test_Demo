"use client"

import { render, screen, fireEvent } from "@testing-library/react"
import { CartProvider, useCart } from "@/lib/cart-context"
import { mockJuices } from "@/lib/mock-data"

function TestComponent() {
  const { items, addItem, removeItem, total } = useCart()

  return (
    <div>
      <button onClick={() => addItem(mockJuices[0], 1)}>Add Item</button>
      <button onClick={() => removeItem(mockJuices[0].id)}>Remove Item</button>
      <div data-testid="cart-count">{items.length}</div>
      <div data-testid="cart-total">${total.toFixed(2)}</div>
    </div>
  )
}

describe("Cart Context", () => {
  it("adds item to cart", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    )

    const addButton = screen.getByText("Add Item")
    fireEvent.click(addButton)

    expect(screen.getByTestId("cart-count")).toHaveTextContent("1")
  })

  it("removes item from cart", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    )

    const addButton = screen.getByText("Add Item")
    const removeButton = screen.getByText("Remove Item")

    fireEvent.click(addButton)
    expect(screen.getByTestId("cart-count")).toHaveTextContent("1")

    fireEvent.click(removeButton)
    expect(screen.getByTestId("cart-count")).toHaveTextContent("0")
  })

  it("calculates total correctly", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    )

    const addButton = screen.getByText("Add Item")
    fireEvent.click(addButton)

    expect(screen.getByTestId("cart-total")).toHaveTextContent(`$${mockJuices[0].price.toFixed(2)}`)
  })
})

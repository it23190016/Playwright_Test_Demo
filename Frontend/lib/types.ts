export interface Juice {
  id: string
  name: string
  price: number
  description: string
  image: string
}

export interface CartItem {
  juice: Juice
  quantity: number
}

export interface User {
  email: string
  isAdmin: boolean
}

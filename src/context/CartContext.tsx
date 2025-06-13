'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type CartItem = {
  id: number
  name: string
  quantity: number
  price: number
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id)
      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      } else {
        return [...prev, item]
      }
    })
  }

  return <CartContext.Provider value={{ cart, addToCart }}>{children}</CartContext.Provider>
}

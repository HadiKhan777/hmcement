'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type CartItem = {
  id: number
  name: string
  quantity: number
  price: number
}

type CartContextType = {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  // 🔄 Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('hmcement-cart')
    if (stored) {
      try {
        setCart(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to parse cart from storage', e)
      }
    }
  }, [])

  // 💾 Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('hmcement-cart', JSON.stringify(cart))
  }, [cart])

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

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const clearCart = () => setCart([])

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

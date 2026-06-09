import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { CartContext } from './cartContext'

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem('cartItems')
      return localData ? JSON.parse(localData) : []
    } catch (error) {
      console.error('Could not parse cart data:', error)
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = product => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      if (existingItem) {
        toast(`${product.name} — qty updated`, { icon: '＋' })
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      toast.success(`${product.name} added to cart`)
      return [...prevItems, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = productId => {
    setCartItems(prevItems => {
      const item = prevItems.find(i => i.id === productId)
      if (item) toast(`${item.name} removed`, { icon: '×' })
      return prevItems.filter(i => i.id !== productId)
    })
  }

  const decrementItem = productId => {
    setCartItems(prevItems =>
      prevItems
        .map(item => {
          if (item.id === productId) {
            const newQuantity = item.quantity - 1
            if (newQuantity === 0) toast(`${item.name} removed`, { icon: '×' })
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null
          }
          return item
        })
        .filter(item => item !== null)
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    decrementItem,
    clearCart,
    cartCount,
    cartTotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

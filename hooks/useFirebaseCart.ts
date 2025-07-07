"use client"

import { useState, useEffect } from "react"
import { doc, setDoc, getDoc, onSnapshot, deleteDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface CartItem {
  id: number
  name: string
  description: string
  price: number
  category: string
  image: string
  quantity: number
}

// Уникальный ID для киоска (можно настроить для каждого устройства)
const KIOSK_ID = "kiosk-001"

export function useFirebaseCart() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const cartRef = doc(db, "carts", KIOSK_ID)

    // Подписка на изменения корзины в реальном времени
    const unsubscribe = onSnapshot(
      cartRef,
      (doc) => {
        if (doc.exists()) {
          const data = doc.data()
          setCart(data.items || [])
        } else {
          setCart([])
        }
        setLoading(false)
      },
      (error) => {
        console.error("Ошибка загрузки корзины:", error)
        setError(error.message)
        setLoading(false)
      },
    )

    return () => unsubscribe()
  }, [])

  const addToCart = async (item: Omit<CartItem, "quantity">) => {
    try {
      const cartRef = doc(db, "carts", KIOSK_ID)
      const cartDoc = await getDoc(cartRef)

      let currentCart: CartItem[] = []

      if (cartDoc.exists()) {
        currentCart = cartDoc.data().items || []
      }

      const existingItemIndex = currentCart.findIndex((cartItem) => cartItem.id === item.id)

      if (existingItemIndex >= 0) {
        // Увеличиваем количество существующего товара
        currentCart[existingItemIndex].quantity += 1
      } else {
        // Добавляем новый товар
        currentCart.push({ ...item, quantity: 1 })
      }

      await setDoc(cartRef, {
        items: currentCart,
        updatedAt: new Date(),
        kioskId: KIOSK_ID,
      })
    } catch (error) {
      console.error("Ошибка добавления в корзину:", error)
      setError("Не удалось добавить товар в корзину")
    }
  }

  const removeFromCart = async (itemId: number) => {
    try {
      const cartRef = doc(db, "carts", KIOSK_ID)
      const cartDoc = await getDoc(cartRef)

      if (cartDoc.exists()) {
        const currentCart: CartItem[] = cartDoc.data().items || []
        const existingItemIndex = currentCart.findIndex((cartItem) => cartItem.id === itemId)

        if (existingItemIndex >= 0) {
          if (currentCart[existingItemIndex].quantity > 1) {
            // Уменьшаем количество
            currentCart[existingItemIndex].quantity -= 1
          } else {
            // Удаляем товар полностью
            currentCart.splice(existingItemIndex, 1)
          }

          await setDoc(cartRef, {
            items: currentCart,
            updatedAt: new Date(),
            kioskId: KIOSK_ID,
          })
        }
      }
    } catch (error) {
      console.error("Ошибка удаления из корзины:", error)
      setError("Не удалось удалить товар из корзины")
    }
  }

  const updateQuantity = async (itemId: number, newQuantity: number) => {
    try {
      const cartRef = doc(db, "carts", KIOSK_ID)
      const cartDoc = await getDoc(cartRef)

      if (cartDoc.exists()) {
        let currentCart: CartItem[] = cartDoc.data().items || []

        if (newQuantity <= 0) {
          // Удаляем товар
          currentCart = currentCart.filter((item) => item.id !== itemId)
        } else {
          // Обновляем количество
          const itemIndex = currentCart.findIndex((item) => item.id === itemId)
          if (itemIndex >= 0) {
            currentCart[itemIndex].quantity = newQuantity
          }
        }

        await setDoc(cartRef, {
          items: currentCart,
          updatedAt: new Date(),
          kioskId: KIOSK_ID,
        })
      }
    } catch (error) {
      console.error("Ошибка обновления количества:", error)
      setError("Не удалось обновить количество")
    }
  }

  const clearCart = async () => {
    try {
      const cartRef = doc(db, "carts", KIOSK_ID)
      await deleteDoc(cartRef)
    } catch (error) {
      console.error("Ошибка очистки корзины:", error)
      setError("Не удалось очистить корзину")
    }
  }

  const getItemQuantity = (itemId: number) => {
    const item = cart.find((cartItem) => cartItem.id === itemId)
    return item ? item.quantity : 0
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return {
    cart,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity,
    totalItems,
    totalPrice,
  }
}
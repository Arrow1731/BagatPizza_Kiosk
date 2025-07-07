"use client"

import { useState, useEffect } from "react"
import { collection, doc, addDoc, updateDoc, onSnapshot, Timestamp, orderBy, query } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { AnalyticsManager } from "@/lib/analytics"

interface Order {
  id?: string
  orderNumber: number
  items: Array<{
    id: number
    name: string
    quantity: number
    price: number
  }>
  totalPrice: number
  timestamp: string
  status: "preparing" | "ready" | "completed"
  paymentMethod?: string
  kioskId: string
  createdAt?: Timestamp
}

const KIOSK_ID = "kiosk-001"

export function useFirebaseOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log("🔥 Firebase buyurtmalarga ulanish...")
    try {
      const ordersRef = collection(db, "orders")
      const q = query(ordersRef, orderBy("createdAt", "desc"))

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          console.log("📦 Buyurtmalar olindi:", snapshot.size)
          const ordersData: Order[] = []

          snapshot.forEach((doc) => {
            const data = doc.data()
            console.log("📋 Buyurtma:", doc.id, data)

            // Фильтруем по kioskId на клиенте
            if (data.kioskId === KIOSK_ID || !data.kioskId) {
              ordersData.push({
                id: doc.id,
                orderNumber: data.orderNumber || 0,
                items: data.items || [],
                totalPrice: data.totalPrice || 0,
                timestamp: data.timestamp || new Date().toISOString(),
                status: data.status || "preparing",
                paymentMethod: data.paymentMethod,
                kioskId: data.kioskId || KIOSK_ID,
                createdAt: data.createdAt,
              } as Order)
            }
          })

          setOrders(ordersData)
          setLoading(false)
          setError(null)
          console.log("✅ Buyurtmalar yuklandi:", ordersData.length)
        },
        (error) => {
          console.error("❌ Buyurtmalarni yuklashda xato:", error)
          setError(`Firebase xatosi: ${error.message}`)
          setLoading(false)
        },
      )

      return () => {
        console.log("🔌 Firebase-dan uzilish")
        unsubscribe()
      }
    } catch (error) {
      console.error("❌ Firebase-ga ulanishda xato:", error)
      setError(`Ulanish xatosi: ${error}`)
      setLoading(false)
    }
  }, [])

  const createOrder = async (orderData: Omit<Order, "id" | "orderNumber" | "timestamp" | "kioskId" | "createdAt">) => {
    try {
      console.log("🆕 Yangi buyurtma yaratish:", orderData)

      // Получаем следующий номер заказа
      const orderNumber = orders.length > 0 ? Math.max(...orders.map((o) => o.orderNumber)) + 1 : 1
      console.log("🔢 Buyurtma raqami:", orderNumber)

      const newOrder = {
        ...orderData,
        orderNumber,
        timestamp: new Date().toISOString(),
        kioskId: KIOSK_ID,
        createdAt: Timestamp.now(),
      }

      console.log("💾 Buyurtmani Firebase-ga saqlash:", newOrder)
      const docRef = await addDoc(collection(db, "orders"), newOrder)

      // Обновляем аналитику
      await AnalyticsManager.addOrderToAnalytics({
        totalPrice: newOrder.totalPrice,
        timestamp: new Date(newOrder.timestamp),
      })

      console.log("✅ Buyurtma yaratildi, ID:", docRef.id)
      return { id: docRef.id, ...newOrder }
    } catch (error) {
      console.error("❌ Buyurtma yaratishda xato:", error)
      setError(`Buyurtma yaratib bo'lmadi: ${error}`)
      throw error
    }
  }

  const updateOrderStatus = async (orderId: string, status: Order["status"]) => {
    try {
      console.log("🔄 Buyurtma holatini yangilash:", orderId, "→", status)
      const orderRef = doc(db, "orders", orderId)
      await updateDoc(orderRef, {
        status,
        updatedAt: Timestamp.now(),
      })
      console.log("✅ Holat yangilandi")
    } catch (error) {
      console.error("❌ Buyurtma holatini yangilashda xato:", error)
      setError(`Holatni yangilab bo'lmadi: ${error}`)
    }
  }

  const preparingOrders = orders.filter((order) => order.status === "preparing")
  const readyOrders = orders.filter((order) => order.status === "ready")
  const completedOrders = orders.filter((order) => order.status === "completed")

  console.log("📊 Buyurtmalar statistikasi:", {
    total: orders.length,
    preparing: preparingOrders.length,
    ready: readyOrders.length,
    completed: completedOrders.length,
  })

  return {
    orders,
    preparingOrders,
    readyOrders,
    completedOrders,
    loading,
    error,
    createOrder,
    updateOrderStatus,
  }
}
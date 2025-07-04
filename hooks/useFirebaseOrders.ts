// "use client"

// import { useState, useEffect } from "react"
// import { collection, doc, addDoc, updateDoc, onSnapshot, query, orderBy, Timestamp } from "firebase/firestore"
// import { db } from "@/lib/firebase"

// interface Order {
//   id?: string
//   orderNumber: number
//   items: Array<{
//     id: number
//     name: string
//     quantity: number
//     price: number
//   }>
//   totalPrice: number
//   timestamp: string
//   status: "preparing" | "ready" | "completed"
//   paymentMethod?: string
//   kioskId: string
//   createdAt?: Timestamp
// }

// const KIOSK_ID = "kiosk-001"

// export function useFirebaseOrders() {
//   const [orders, setOrders] = useState<Order[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     console.log("🔥 Подключение к Firebase заказам...")

//     try {
//       // Упрощенный запрос без сложного индекса
//       const ordersRef = collection(db, "orders")
//       // Убираем where и orderBy чтобы избежать необходимости в составном индексе
//       const q = query(ordersRef, orderBy("createdAt", "desc"))

//       const unsubscribe = onSnapshot(
//         q,
//         (snapshot) => {
//           console.log("📦 Получены заказы:", snapshot.size)
//           const ordersData: Order[] = []

//           snapshot.forEach((doc) => {
//             const data = doc.data()
//             console.log("📋 Заказ:", doc.id, data)

//             // Фильтруем по kioskId на клиенте
//             if (data.kioskId === KIOSK_ID) {
//               ordersData.push({
//                 id: doc.id,
//                 orderNumber: data.orderNumber || 0,
//                 items: data.items || [],
//                 totalPrice: data.totalPrice || 0,
//                 timestamp: data.timestamp || new Date().toISOString(),
//                 status: data.status || "preparing",
//                 paymentMethod: data.paymentMethod,
//                 kioskId: data.kioskId || KIOSK_ID,
//                 createdAt: data.createdAt,
//               } as Order)
//             }
//           })

//           setOrders(ordersData)
//           setLoading(false)
//           console.log("✅ Заказы загружены:", ordersData.length)
//         },
//         (error) => {
//           console.error("❌ Ошибка загрузки заказов:", error)
//           setError(`Ошибка Firebase: ${error.message}`)
//           setLoading(false)
//         },
//       )

//       return () => {
//         console.log("🔌 Отключение от Firebase")
//         unsubscribe()
//       }
//     } catch (error) {
//       console.error("❌ Ошибка подключения к Firebase:", error)
//       setError(`Ошибка подключения: ${error}`)
//       setLoading(false)
//     }
//   }, [])

//   const createOrder = async (orderData: Omit<Order, "id" | "orderNumber" | "timestamp" | "kioskId" | "createdAt">) => {
//     try {
//       console.log("🆕 Создание нового заказа:", orderData)

//       // Получаем следующий номер заказа
//       const orderNumber = orders.length > 0 ? Math.max(...orders.map((o) => o.orderNumber)) + 1 : 1
//       console.log("🔢 Номер заказа:", orderNumber)

//       const newOrder = {
//         ...orderData,
//         orderNumber,
//         timestamp: new Date().toISOString(),
//         kioskId: KIOSK_ID,
//         createdAt: Timestamp.now(),
//       }

//       console.log("💾 Сохранение заказа в Firebase:", newOrder)
//       const docRef = await addDoc(collection(db, "orders"), newOrder)
//       console.log("✅ Заказ создан с ID:", docRef.id)

//       return { id: docRef.id, ...newOrder }
//     } catch (error) {
//       console.error("❌ Ошибка создания заказа:", error)
//       setError(`Не удалось создать заказ: ${error}`)
//       throw error
//     }
//   }

//   const updateOrderStatus = async (orderId: string, status: Order["status"]) => {
//     try {
//       console.log("🔄 Обновление статуса заказа:", orderId, "→", status)
//       const orderRef = doc(db, "orders", orderId)
//       await updateDoc(orderRef, {
//         status,
//         updatedAt: Timestamp.now(),
//       })
//       console.log("✅ Статус обновлен")
//     } catch (error) {
//       console.error("❌ Ошибка обновления статуса заказа:", error)
//       setError(`Не удалось обновить статус: ${error}`)
//     }
//   }

//   const preparingOrders = orders.filter((order) => order.status === "preparing")
//   const readyOrders = orders.filter((order) => order.status === "ready")
//   const completedOrders = orders.filter((order) => order.status === "completed")

//   console.log("📊 Статистика заказов:", {
//     total: orders.length,
//     preparing: preparingOrders.length,
//     ready: readyOrders.length,
//     completed: completedOrders.length,
//   })

//   return {
//     orders,
//     preparingOrders,
//     readyOrders,
//     completedOrders,
//     loading,
//     error,
//     createOrder,
//     updateOrderStatus,
//   }
// }

























"use client"

import { useState, useEffect } from "react"
import { collection, doc, addDoc, updateDoc, onSnapshot, query, orderBy, Timestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"

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
      // Упрощенный запрос без сложного индекса
      const ordersRef = collection(db, "orders")
      // Убираем where и orderBy чтобы избежать необходимости в составном индексе
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
            if (data.kioskId === KIOSK_ID) {
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
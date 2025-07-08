// "use client"

// import { useEffect, useState } from "react"
// import { db } from "../../../lib/firebase"
// import { collection, onSnapshot } from "firebase/firestore"
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Button } from "@/components/ui/button"
// import { AnalyticsManager } from "@/lib/analytics"

// interface Order {
//   id: string
//   totalPrice: number
//   timestamp: Date
//   status: string
// }

// interface AnalyticsData {
//   date: string
//   orders: number
//   revenue: number
//   period: "daily" | "monthly" | "yearly"
// }

// export default function AdminDashboard() {
//   const [orders, setOrders] = useState<Order[]>([])
//   const [analytics, setAnalytics] = useState<AnalyticsData[]>([])
//   const [currentStats, setCurrentStats] = useState({
//     today: { orders: 0, revenue: 0 },
//     month: { orders: 0, revenue: 0 },
//     year: { orders: 0, revenue: 0 },
//     total: { orders: 0, revenue: 0 },
//   })
//   const [syncing, setSyncing] = useState(false)

//   // Получение заказов из Firestore
//   useEffect(() => {
//     const unsub = onSnapshot(collection(db, "orders"), (snapshot) => {
//       const data = snapshot.docs.map((doc) => {
//         const d = doc.data()
//         return {
//           id: doc.id,
//           ...d,
//           timestamp: d.timestamp?.toDate ? d.timestamp.toDate() : new Date(d.timestamp),
//         }
//       })
//       setOrders(data)
//     })

//     return () => unsub()
//   }, [])

//   // Получение аналитики из Firestore
//   useEffect(() => {
//     const unsub = onSnapshot(collection(db, "analytics"), (snapshot) => {
//       const data = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       })) as AnalyticsData[]
//       setAnalytics(data)
//     })

//     return () => unsub()
//   }, [])

//   // Обновление текущей статистики при изменении заказов
//   useEffect(() => {
//     if (orders.length > 0) {
//       calculateCurrentStats(orders)
//     }
//   }, [orders])

//   const calculateCurrentStats = (ordersList: Order[]) => {
//     const now = new Date()

//     const isToday = (date: Date) =>
//       date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()

//     const isThisMonth = (date: Date) => date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()

//     const isThisYear = (date: Date) => date.getFullYear() === now.getFullYear()

//     const todayOrders = ordersList.filter((o) => isToday(o.timestamp))
//     const monthOrders = ordersList.filter((o) => isThisMonth(o.timestamp))
//     const yearOrders = ordersList.filter((o) => isThisYear(o.timestamp))

//     const calcRevenue = (list: Order[]) => list.reduce((sum, o) => sum + (o.totalPrice || 0), 0)

//     setCurrentStats({
//       today: {
//         orders: todayOrders.length,
//         revenue: calcRevenue(todayOrders),
//       },
//       month: {
//         orders: monthOrders.length,
//         revenue: calcRevenue(monthOrders),
//       },
//       year: {
//         orders: yearOrders.length,
//         revenue: calcRevenue(yearOrders),
//       },
//       total: {
//         orders: ordersList.length,
//         revenue: calcRevenue(ordersList),
//       },
//     })
//   }

//   // Синхронизация аналитики
//   const handleSyncAnalytics = async () => {
//     setSyncing(true)
//     try {
//       await AnalyticsManager.syncExistingOrders(orders)
//       alert("Analitika muvaffaqiyatli sinxronlashtirildi!")
//     } catch (error) {
//       console.error("Sinxronlashtirish xatosi:", error)
//       alert("Analitikani sinxronlashtirishda xato yuz berdi")
//     } finally {
//       setSyncing(false)
//     }
//   }

//   // Подготовка данных для графиков
//   const currentData = [
//     {
//       period: "Bugun",
//       orders: currentStats.today.orders,
//       revenue: currentStats.today.revenue,
//     },
//     {
//       period: "Shu oy",
//       orders: currentStats.month.orders,
//       revenue: currentStats.month.revenue,
//     },
//     {
//       period: "Shu yil",
//       orders: currentStats.year.orders,
//       revenue: currentStats.year.revenue,
//     },
//   ]

//   // Исторические данные для графика тренда
//   const dailyAnalytics = analytics
//     .filter((a) => a.period === "daily")
//     .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
//     .slice(-30) // Последние 30 дней

//   const monthlyAnalytics = analytics
//     .filter((a) => a.period === "monthly")
//     .sort((a, b) => new Date(a.date + "-01").getTime() - new Date(b.date + "-01").getTime())
//     .slice(-12) // Последние 12 месяцев

//   return (
//     <div className="p-6 space-y-8">
//       {!orders.length && !analytics.length ? (
//         <div className="p-6">
//           <h1 className="text-3xl font-bold text-gray-800 mb-4">Admin Paneli</h1>
//           <Card>
//             <CardContent className="p-8 text-center">
//               <p className="text-gray-600">Ma'lumotlar yuklanmoqda...</p>
//             </CardContent>
//           </Card>
//         </div>
//       ) : (
//         <>
//           <div className="flex justify-between items-center">
//             <h1 className="text-3xl font-bold text-gray-800">Admin Paneli</h1>
//             <div className="flex items-center gap-4">
//               <div className="text-sm text-gray-500">
//                 Jami: {currentStats.total.orders} buyurtma, {currentStats.total.revenue.toLocaleString()} so'm
//               </div>
//               <Button onClick={handleSyncAnalytics} disabled={syncing} variant="outline">
//                 {syncing ? "Sinxronlashtirilmoqda..." : "Analitikani sinxronlashtirish"}
//               </Button>
//             </div>
//           </div>

//           {/* Статистические карточки */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//             <Card className="shadow-md">
//               <CardHeader className="pb-2">
//                 <CardTitle className="text-sm font-medium text-gray-600">Bugun</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{currentStats.today.orders}</div>
//                 <p className="text-xs text-gray-500">{currentStats.today.revenue.toLocaleString()} so'm</p>
//               </CardContent>
//             </Card>

//             <Card className="shadow-md">
//               <CardHeader className="pb-2">
//                 <CardTitle className="text-sm font-medium text-gray-600">Shu oy</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{currentStats.month.orders}</div>
//                 <p className="text-xs text-gray-500">{currentStats.month.revenue.toLocaleString()} so'm</p>
//               </CardContent>
//             </Card>

//             <Card className="shadow-md">
//               <CardHeader className="pb-2">
//                 <CardTitle className="text-sm font-medium text-gray-600">Shu yil</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{currentStats.year.orders}</div>
//                 <p className="text-xs text-gray-500">{currentStats.year.revenue.toLocaleString()} so'm</p>
//               </CardContent>
//             </Card>

//             <Card className="shadow-md">
//               <CardHeader className="pb-2">
//                 <CardTitle className="text-sm font-medium text-gray-600">Jami</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{currentStats.total.orders}</div>
//                 <p className="text-xs text-gray-500">{currentStats.total.revenue.toLocaleString()} so'm</p>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Графики */}
//           <Tabs defaultValue="current" className="space-y-4">
//             <TabsList>
//               <TabsTrigger value="current">Joriy statistika</TabsTrigger>
//               <TabsTrigger value="daily">Kunlik trend (30 kun)</TabsTrigger>
//               <TabsTrigger value="monthly">Oylik trend (12 oy)</TabsTrigger>
//             </TabsList>

//             <TabsContent value="current">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Buyurtma va daromad statistikasi</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <BarChart data={currentData}>
//                       <XAxis dataKey="period" />
//                       <YAxis />
//                       <Tooltip
//                         formatter={(value, name) => [
//                           name === "revenue" ? `${Number(value).toLocaleString()} so'm` : value,
//                           name === "revenue" ? "Daromad" : "Buyurtmalar",
//                         ]}
//                       />
//                       <Bar dataKey="orders" fill="#60A5FA" name="Buyurtmalar" />
//                       <Bar dataKey="revenue" fill="#34D399" name="Daromad" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             <TabsContent value="daily">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>30 kunlik trend</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <LineChart data={dailyAnalytics}>
//                       <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString("uz-UZ")} />
//                       <YAxis />
//                       <Tooltip
//                         labelFormatter={(value) => new Date(value).toLocaleDateString("uz-UZ")}
//                         formatter={(value, name) => [
//                           name === "revenue" ? `${Number(value).toLocaleString()} so'm` : value,
//                           name === "revenue" ? "Daromad" : "Buyurtmalar",
//                         ]}
//                       />
//                       <Line type="monotone" dataKey="orders" stroke="#60A5FA" strokeWidth={2} name="Buyurtmalar" />
//                       <Line type="monotone" dataKey="revenue" stroke="#34D399" strokeWidth={2} name="Daromad" />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             <TabsContent value="monthly">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>12 oylik trend</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <LineChart data={monthlyAnalytics}>
//                       <XAxis
//                         dataKey="date"
//                         tickFormatter={(value) => {
//                           const [year, month] = value.split("-")
//                           return `${month}/${year}`
//                         }}
//                       />
//                       <YAxis />
//                       <Tooltip
//                         labelFormatter={(value) => {
//                           const [year, month] = value.split("-")
//                           return `${month}/${year}`
//                         }}
//                         formatter={(value, name) => [
//                           name === "revenue" ? `${Number(value).toLocaleString()} so'm` : value,
//                           name === "revenue" ? "Daromad" : "Buyurtmalar",
//                         ]}
//                       />
//                       <Line type="monotone" dataKey="orders" stroke="#60A5FA" strokeWidth={2} name="Buyurtmalar" />
//                       <Line type="monotone" dataKey="revenue" stroke="#34D399" strokeWidth={2} name="Daromad" />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>

//           {/* Информация об аналитике */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Analitika haqida ma'lumot</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
//                 <div>
//                   <strong>Saqlangan kunlik ma'lumotlar:</strong> {analytics.filter((a) => a.period === "daily").length}{" "}
//                   kun
//                 </div>
//                 <div>
//                   <strong>Saqlangan oylik ma'lumotlar:</strong> {analytics.filter((a) => a.period === "monthly").length}{" "}
//                   oy
//                 </div>
//                 <div>
//                   <strong>Saqlangan yillik ma'lumotlar:</strong> {analytics.filter((a) => a.period === "yearly").length}{" "}
//                   yil
//                 </div>
//               </div>
//               <p className="text-xs text-gray-500 mt-2">
//                 Analitika ma'lumotlari Firebase-da alohida saqlanadi va buyurtmalar o'chirilganda ham saqlanib qoladi.
//               </p>
//             </CardContent>
//           </Card>
//         </>
//       )}
//     </div>
//   )
// }































"use client"
import { useEffect, useState } from "react"
import { db } from "../../../lib/firebase"
import { collection, onSnapshot } from "firebase/firestore"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { AnalyticsManager } from "@/lib/analytics"
import { ShoppingBag, Coffee, Truck } from "lucide-react"

interface Order {
  id: string
  totalPrice: number
  timestamp: Date
  status: string
  deliveryMethod?: string
}

interface AnalyticsData {
  date: string
  orders: number
  revenue: number
  period: "daily" | "monthly" | "yearly"
}

interface DeliveryStats {
  takeaway: { orders: number; revenue: number }
  "dine-in": { orders: number; revenue: number }
  delivery: { orders: number; revenue: number }
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([])
  const [currentStats, setCurrentStats] = useState({
    today: { orders: 0, revenue: 0 },
    month: { orders: 0, revenue: 0 },
    year: { orders: 0, revenue: 0 },
    total: { orders: 0, revenue: 0 },
  })
  const [deliveryStats, setDeliveryStats] = useState<DeliveryStats>({
    takeaway: { orders: 0, revenue: 0 },
    "dine-in": { orders: 0, revenue: 0 },
    delivery: { orders: 0, revenue: 0 },
  })
  const [syncing, setSyncing] = useState(false)

  // Получение заказов из Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "orders"), (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const d = doc.data()
        return {
          id: doc.id,
          ...d,
          timestamp: d.timestamp?.toDate ? d.timestamp.toDate() : new Date(d.timestamp),
        }
      })
      setOrders(data)
    })
    return () => unsub()
  }, [])

  // Получение аналитики из Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "analytics"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as AnalyticsData[]
      setAnalytics(data)
    })
    return () => unsub()
  }, [])

  // Обновление текущей статистики при изменении заказов
  useEffect(() => {
    if (orders.length > 0) {
      calculateCurrentStats(orders)
      calculateDeliveryStats(orders)
    }
  }, [orders])

  const calculateCurrentStats = (ordersList: Order[]) => {
    const now = new Date()
    const isToday = (date: Date) =>
      date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
    const isThisMonth = (date: Date) => date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
    const isThisYear = (date: Date) => date.getFullYear() === now.getFullYear()

    const todayOrders = ordersList.filter((o) => isToday(o.timestamp))
    const monthOrders = ordersList.filter((o) => isThisMonth(o.timestamp))
    const yearOrders = ordersList.filter((o) => isThisYear(o.timestamp))

    const calcRevenue = (list: Order[]) => list.reduce((sum, o) => sum + (o.totalPrice || 0), 0)

    setCurrentStats({
      today: {
        orders: todayOrders.length,
        revenue: calcRevenue(todayOrders),
      },
      month: {
        orders: monthOrders.length,
        revenue: calcRevenue(monthOrders),
      },
      year: {
        orders: yearOrders.length,
        revenue: calcRevenue(yearOrders),
      },
      total: {
        orders: ordersList.length,
        revenue: calcRevenue(ordersList),
      },
    })
  }

  // Новая функция для подсчета статистики по способам получения
  const calculateDeliveryStats = (ordersList: Order[]) => {
    const stats: DeliveryStats = {
      takeaway: { orders: 0, revenue: 0 },
      "dine-in": { orders: 0, revenue: 0 },
      delivery: { orders: 0, revenue: 0 },
    }

    ordersList.forEach((order) => {
      const method = order.deliveryMethod || "takeaway" // по умолчанию takeaway
      if (stats[method as keyof DeliveryStats]) {
        stats[method as keyof DeliveryStats].orders += 1
        stats[method as keyof DeliveryStats].revenue += order.totalPrice || 0
      }
    })

    setDeliveryStats(stats)
  }

  // Синхронизация аналитики
  const handleSyncAnalytics = async () => {
    setSyncing(true)
    try {
      await AnalyticsManager.syncExistingOrders(orders)
      alert("Analitika muvaffaqiyatli sinxronlashtirildi!")
    } catch (error) {
      console.error("Sinxronlashtirish xatosi:", error)
      alert("Analitikani sinxronlashtirishda xato yuz berdi")
    } finally {
      setSyncing(false)
    }
  }

  // Подготовка данных для графиков
  const currentData = [
    {
      period: "Bugun",
      orders: currentStats.today.orders,
      revenue: currentStats.today.revenue,
    },
    {
      period: "Shu oy",
      orders: currentStats.month.orders,
      revenue: currentStats.month.revenue,
    },
    {
      period: "Shu yil",
      orders: currentStats.year.orders,
      revenue: currentStats.year.revenue,
    },
  ]

  // Данные для графика способов получения
  const deliveryData = [
    {
      name: "Saboj",
      orders: deliveryStats.takeaway.orders,
      revenue: deliveryStats.takeaway.revenue,
      color: "#F59E0B",
    },
    {
      name: "Joyida iste'mol",
      orders: deliveryStats["dine-in"].orders,
      revenue: deliveryStats["dine-in"].revenue,
      color: "#8B5CF6",
    },
    {
      name: "Yetkazib berish",
      orders: deliveryStats.delivery.orders,
      revenue: deliveryStats.delivery.revenue,
      color: "#10B981",
    },
  ]

  // Исторические данные для графика тренда
  const dailyAnalytics = analytics
    .filter((a) => a.period === "daily")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-30) // Последние 30 дней

  const monthlyAnalytics = analytics
    .filter((a) => a.period === "monthly")
    .sort((a, b) => new Date(a.date + "-01").getTime() - new Date(b.date + "-01").getTime())
    .slice(-12) // Последние 12 месяцев

  // Функция для получения названия способа доставки
  const getDeliveryMethodName = (method: string) => {
    switch (method) {
      case "takeaway":
        return "Saboy"
      case "dine-in":
        return "Joyida iste'mol"
      case "delivery":
        return "Yetkazib berish"
      default:
        return "Saboy"
    }
  }

  // Функция для получения иконки способа доставки
  const getDeliveryMethodIcon = (method: string) => {
    switch (method) {
      case "takeaway":
        return <ShoppingBag className="h-5 w-5" />
      case "dine-in":
        return <Coffee className="h-5 w-5" />
      case "delivery":
        return <Truck className="h-5 w-5" />
      default:
        return <ShoppingBag className="h-5 w-5" />
    }
  }

  return (
    <div className="p-6 space-y-8">
      {!orders.length && !analytics.length ? (
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Admin Paneli</h1>
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-600">Ma'lumotlar yuklanmoqda...</p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">Admin Paneli</h1>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                Jami: {currentStats.total.orders} buyurtma, {currentStats.total.revenue.toLocaleString()} so'm
              </div>
              <Button onClick={handleSyncAnalytics} disabled={syncing} variant="outline">
                {syncing ? "Sinxronlashtirilmoqda..." : "Analitikani sinxronlashtirish"}
              </Button>
            </div>
          </div>

          {/* Статистические карточки */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Bugun</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentStats.today.orders}</div>
                <p className="text-xs text-gray-500">{currentStats.today.revenue.toLocaleString()} so'm</p>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Shu oy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentStats.month.orders}</div>
                <p className="text-xs text-gray-500">{currentStats.month.revenue.toLocaleString()} so'm</p>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Shu yil</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentStats.year.orders}</div>
                <p className="text-xs text-gray-500">{currentStats.year.revenue.toLocaleString()} so'm</p>
              </CardContent>
            </Card>
            <Card className="shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Jami</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentStats.total.orders}</div>
                <p className="text-xs text-gray-500">{currentStats.total.revenue.toLocaleString()} so'm</p>
              </CardContent>
            </Card>
          </div>

          {/* Новые карточки для способов получения */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Olish usullari bo'yicha statistika</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(deliveryStats).map(([method, stats]) => (
                <Card key={method} className="shadow-md border-l-4 border-l-amber-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                      {getDeliveryMethodIcon(method)}
                      {getDeliveryMethodName(method)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.orders}</div>
                    <p className="text-xs text-gray-500">{stats.revenue.toLocaleString()} so'm</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {currentStats.total.orders > 0
                        ? `${((stats.orders / currentStats.total.orders) * 100).toFixed(1)}% jami buyurtmalardan`
                        : "0%"}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Графики */}
          <Tabs defaultValue="current" className="space-y-4">
            <TabsList>
              <TabsTrigger value="current">Joriy statistika</TabsTrigger>
              <TabsTrigger value="delivery">Olish usullari</TabsTrigger>
              <TabsTrigger value="daily">Kunlik trend (30 kun)</TabsTrigger>
              <TabsTrigger value="monthly">Oylik trend (12 oy)</TabsTrigger>
            </TabsList>

            <TabsContent value="current">
              <Card>
                <CardHeader>
                  <CardTitle>Buyurtma va daromad statistikasi</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={currentData}>
                      <XAxis dataKey="period" />
                      <YAxis />
                      <Tooltip
                        formatter={(value, name) => [
                          name === "revenue" ? `${Number(value).toLocaleString()} so'm` : value,
                          name === "revenue" ? "Daromad" : "Buyurtmalar",
                        ]}
                      />
                      <Bar dataKey="orders" fill="#60A5FA" name="Buyurtmalar" />
                      <Bar dataKey="revenue" fill="#34D399" name="Daromad" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="delivery">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Buyurtmalar soni bo'yicha taqsimot</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={deliveryData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="orders"
                          label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                        >
                          {deliveryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} buyurtma`, "Soni"]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Olish usullari bo'yicha daromad</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={deliveryData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip
                          formatter={(value, name) => [
                            name === "revenue" ? `${Number(value).toLocaleString()} so'm` : value,
                            name === "revenue" ? "Daromad" : "Buyurtmalar",
                          ]}
                        />
                        <Bar dataKey="orders" fill="#60A5FA" name="Buyurtmalar" />
                        <Bar dataKey="revenue" fill="#34D399" name="Daromad" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="daily">
              <Card>
                <CardHeader>
                  <CardTitle>30 kunlik trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dailyAnalytics}>
                      <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString("uz-UZ")} />
                      <YAxis />
                      <Tooltip
                        labelFormatter={(value) => new Date(value).toLocaleDateString("uz-UZ")}
                        formatter={(value, name) => [
                          name === "revenue" ? `${Number(value).toLocaleString()} so'm` : value,
                          name === "revenue" ? "Daromad" : "Buyurtmalar",
                        ]}
                      />
                      <Line type="monotone" dataKey="orders" stroke="#60A5FA" strokeWidth={2} name="Buyurtmalar" />
                      <Line type="monotone" dataKey="revenue" stroke="#34D399" strokeWidth={2} name="Daromad" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="monthly">
              <Card>
                <CardHeader>
                  <CardTitle>12 oylik trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyAnalytics}>
                      <XAxis
                        dataKey="date"
                        tickFormatter={(value) => {
                          const [year, month] = value.split("-")
                          return `${month}/${year}`
                        }}
                      />
                      <YAxis />
                      <Tooltip
                        labelFormatter={(value) => {
                          const [year, month] = value.split("-")
                          return `${month}/${year}`
                        }}
                        formatter={(value, name) => [
                          name === "revenue" ? `${Number(value).toLocaleString()} so'm` : value,
                          name === "revenue" ? "Daromad" : "Buyurtmalar",
                        ]}
                      />
                      <Line type="monotone" dataKey="orders" stroke="#60A5FA" strokeWidth={2} name="Buyurtmalar" />
                      <Line type="monotone" dataKey="revenue" stroke="#34D399" strokeWidth={2} name="Daromad" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Информация об аналитике */}
          <Card>
            <CardHeader>
              <CardTitle>Analitika haqida ma'lumot</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <strong>Saqlangan kunlik ma'lumotlar:</strong> {analytics.filter((a) => a.period === "daily").length}{" "}
                  kun
                </div>
                <div>
                  <strong>Saqlangan oylik ma'lumotlar:</strong> {analytics.filter((a) => a.period === "monthly").length}{" "}
                  oy
                </div>
                <div>
                  <strong>Saqlangan yillik ma'lumotlar:</strong> {analytics.filter((a) => a.period === "yearly").length}{" "}
                  yil
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Analitika ma'lumotlari Firebase-da alohida saqlanadi va buyurtmalar o'chirilganda ham saqlanib qoladi.
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
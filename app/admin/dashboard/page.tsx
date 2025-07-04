// // "use client";

// // import { useEffect, useState } from "react";
// // import { db } from "../../../lib/firebase";
// // import { collection, onSnapshot } from "firebase/firestore";
// // import {
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   ResponsiveContainer,
// // } from "recharts";
// // import { Card, CardContent } from "@/components/ui/card";

// // export default function AdminDashboard() {
// //   const [orders, setOrders] = useState([]);

// //   // Firestoredan buyurtmalarni olish
// //   useEffect(() => {
// //     const unsub = onSnapshot(collection(db, "orders"), (snapshot) => {
// //       const data = snapshot.docs.map((doc) => {
// //         const d = doc.data();
// //         return {
// //           ...d,
// //           timestamp: d.timestamp?.toDate
// //             ? d.timestamp.toDate()
// //             : new Date(d.timestamp),
// //         };
// //       });
// //       setOrders(data);
// //     });

// //     return () => unsub();
// //   }, []);

// //   const now = new Date();

// //   // Sana tekshiruv funksiyalari
// //   const isToday = (date: Date) =>
// //     date.getDate() === now.getDate() &&
// //     date.getMonth() === now.getMonth() &&
// //     date.getFullYear() === now.getFullYear();

// //   const isThisMonth = (date: Date) =>
// //     date.getMonth() === now.getMonth() &&
// //     date.getFullYear() === now.getFullYear();

// //   const isThisYear = (date: Date) => date.getFullYear() === now.getFullYear();

// //   // Filterlar
// //   const todayOrders = orders.filter((o) => isToday(o.timestamp));
// //   const monthOrders = orders.filter((o) => isThisMonth(o.timestamp));
// //   const yearOrders = orders.filter((o) => isThisYear(o.timestamp));

// //   // Daromad hisoblash
// //   const calcRevenue = (list: any[]) =>
// //     list.reduce((sum, o) => sum + (o.totalPrice || 0), 0);

// //   // Diagramma uchun ma’lumotlar
// //   const data = [
// //     {
// //       period: "Bugun",
// //       orders: todayOrders.length,
// //       revenue: calcRevenue(todayOrders),
// //     },
// //     {
// //       period: "Shu oy",
// //       orders: monthOrders.length,
// //       revenue: calcRevenue(monthOrders),
// //     },
// //     {
// //       period: "Shu yil",
// //       orders: yearOrders.length,
// //       revenue: calcRevenue(yearOrders),
// //     },
// //   ];

// //   return (
// //     <div className="p-6 space-y-8">
// //       <h1 className="text-3xl font-bold text-gray-800">Admin Paneli</h1>

// //       {/* Statistika kartalari */}
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //         {data.map((item) => (
// //           <Card key={item.period} className="shadow-md">
// //             <CardContent className="p-4">
// //               <h2 className="text-xl font-semibold text-gray-700">
// //                 {item.period}
// //               </h2>
// //               <p className="text-sm text-gray-500">
// //                 Buyurtmalar soni: {item.orders}
// //               </p>
// //               <p className="text-sm text-gray-500">
// //                 Umumiy daromad: {item.revenue.toLocaleString()} so‘m
// //               </p>
// //             </CardContent>
// //           </Card>
// //         ))}
// //       </div>

// //       {/* Diagramma */}
// //       <div className="bg-white p-4 rounded-lg shadow-md">
// //         <h2 className="text-xl font-bold mb-4 text-gray-800">
// //           Buyurtma va daromad statistikasi
// //         </h2>
// //         <ResponsiveContainer width="100%" height={300}>
// //           <BarChart data={data}>
// //             <XAxis dataKey="period" />
// //             <YAxis />
// //             <Tooltip />
// //             <Bar dataKey="orders" fill="#60A5FA" name="Buyurtmalar" />
// //             <Bar dataKey="revenue" fill="#34D399" name="Daromad (so‘m)" />
// //           </BarChart>
// //         </ResponsiveContainer>
// //       </div>
// //     </div>
// //   );
// // }

















// "use client"

// import { useEffect, useState } from "react"
// import { db } from "../../../lib/firebase"
// import { collection, onSnapshot } from "firebase/firestore"
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Button } from "@/components/ui/button"
// import { AnalyticsManager } from "../../../lib/analytics"

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
//       alert("Аналитика успешно синхронизирована!")
//     } catch (error) {
//       console.error("Ошибка синхронизации:", error)
//       alert("Ошибка при синхронизации аналитики")
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
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold text-gray-800">Admin Paneli</h1>
//         <div className="flex items-center gap-4">
//           <div className="text-sm text-gray-500">
//             Jami: {currentStats.total.orders} buyurtma, {currentStats.total.revenue.toLocaleString()} so'm
//           </div>
//           <Button onClick={handleSyncAnalytics} disabled={syncing} variant="outline">
//             {syncing ? "Sinxronlashtirilmoqda..." : "Analitikani sinxronlashtirish"}
//           </Button>
//         </div>
//       </div>

//       {/* Статистические карточки */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <Card className="shadow-md">
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium text-gray-600">Bugun</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{currentStats.today.orders}</div>
//             <p className="text-xs text-gray-500">{currentStats.today.revenue.toLocaleString()} so'm</p>
//           </CardContent>
//         </Card>

//         <Card className="shadow-md">
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium text-gray-600">Shu oy</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{currentStats.month.orders}</div>
//             <p className="text-xs text-gray-500">{currentStats.month.revenue.toLocaleString()} so'm</p>
//           </CardContent>
//         </Card>

//         <Card className="shadow-md">
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium text-gray-600">Shu yil</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{currentStats.year.orders}</div>
//             <p className="text-xs text-gray-500">{currentStats.year.revenue.toLocaleString()} so'm</p>
//           </CardContent>
//         </Card>

//         <Card className="shadow-md">
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium text-gray-600">Jami</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{currentStats.total.orders}</div>
//             <p className="text-xs text-gray-500">{currentStats.total.revenue.toLocaleString()} so'm</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Графики */}
//       <Tabs defaultValue="current" className="space-y-4">
//         <TabsList>
//           <TabsTrigger value="current">Joriy statistika</TabsTrigger>
//           <TabsTrigger value="daily">Kunlik trend (30 kun)</TabsTrigger>
//           <TabsTrigger value="monthly">Oylik trend (12 oy)</TabsTrigger>
//         </TabsList>

//         <TabsContent value="current">
//           <Card>
//             <CardHeader>
//               <CardTitle>Buyurtma va daromad statistikasi</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={currentData}>
//                   <XAxis dataKey="period" />
//                   <YAxis />
//                   <Tooltip
//                     formatter={(value, name) => [
//                       name === "revenue" ? `${Number(value).toLocaleString()} so'm` : value,
//                       name === "revenue" ? "Daromad" : "Buyurtmalar",
//                     ]}
//                   />
//                   <Bar dataKey="orders" fill="#60A5FA" name="Buyurtmalar" />
//                   <Bar dataKey="revenue" fill="#34D399" name="Daromad" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="daily">
//           <Card>
//             <CardHeader>
//               <CardTitle>30 kunlik trend</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={dailyAnalytics}>
//                   <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString("uz-UZ")} />
//                   <YAxis />
//                   <Tooltip
//                     labelFormatter={(value) => new Date(value).toLocaleDateString("uz-UZ")}
//                     formatter={(value, name) => [
//                       name === "revenue" ? `${Number(value).toLocaleString()} so'm` : value,
//                       name === "revenue" ? "Daromad" : "Buyurtmalar",
//                     ]}
//                   />
//                   <Line type="monotone" dataKey="orders" stroke="#60A5FA" strokeWidth={2} name="Buyurtmalar" />
//                   <Line type="monotone" dataKey="revenue" stroke="#34D399" strokeWidth={2} name="Daromad" />
//                 </LineChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="monthly">
//           <Card>
//             <CardHeader>
//               <CardTitle>12 oylik trend</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={monthlyAnalytics}>
//                   <XAxis
//                     dataKey="date"
//                     tickFormatter={(value) => {
//                       const [year, month] = value.split("-")
//                       return `${month}/${year}`
//                     }}
//                   />
//                   <YAxis />
//                   <Tooltip
//                     labelFormatter={(value) => {
//                       const [year, month] = value.split("-")
//                       return `${month}/${year}`
//                     }}
//                     formatter={(value, name) => [
//                       name === "revenue" ? `${Number(value).toLocaleString()} so'm` : value,
//                       name === "revenue" ? "Daromad" : "Buyurtmalar",
//                     ]}
//                   />
//                   <Line type="monotone" dataKey="orders" stroke="#60A5FA" strokeWidth={2} name="Buyurtmalar" />
//                   <Line type="monotone" dataKey="revenue" stroke="#34D399" strokeWidth={2} name="Daromad" />
//                 </LineChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>

//       {/* Информация об аналитике */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Analitika haqida ma'lumot</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
//             <div>
//               <strong>Saqlangan kunlik ma'lumotlar:</strong> {analytics.filter((a) => a.period === "daily").length} kun
//             </div>
//             <div>
//               <strong>Saqlangan oylik ma'lumotlar:</strong> {analytics.filter((a) => a.period === "monthly").length} oy
//             </div>
//             <div>
//               <strong>Saqlangan yillik ma'lumotlar:</strong> {analytics.filter((a) => a.period === "yearly").length} yil
//             </div>
//           </div>
//           <p className="text-xs text-gray-500 mt-2">
//             Analitika ma'lumotlari Firebase-da alohida saqlanadi va buyurtmalar o'chirilganda ham saqlanib qoladi.
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }



















"use client"

import { useEffect, useState } from "react"
import { db } from "../../../lib/firebase"
import { collection, onSnapshot } from "firebase/firestore"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { AnalyticsManager } from "@/lib/analytics"

interface Order {
  id: string
  totalPrice: number
  timestamp: Date
  status: string
}

interface AnalyticsData {
  date: string
  orders: number
  revenue: number
  period: "daily" | "monthly" | "yearly"
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

  // Исторические данные для графика тренда
  const dailyAnalytics = analytics
    .filter((a) => a.period === "daily")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-30) // Последние 30 дней

  const monthlyAnalytics = analytics
    .filter((a) => a.period === "monthly")
    .sort((a, b) => new Date(a.date + "-01").getTime() - new Date(b.date + "-01").getTime())
    .slice(-12) // Последние 12 месяцев

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

          {/* Графики */}
          <Tabs defaultValue="current" className="space-y-4">
            <TabsList>
              <TabsTrigger value="current">Joriy statistika</TabsTrigger>
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
// // "use client"

// // import { useEffect, useState } from "react"
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Button } from "@/components/ui/button"
// // import { Badge } from "@/components/ui/badge"
// // import { CheckCircle, ChefHat, Bell, Loader2 } from "lucide-react"
// // import Link from "next/link"
// // import { useFirebaseOrders } from "@/hooks/useFirebaseOrders"

// // export default function KitchenDashboard() {
// //   const [currentTime, setCurrentTime] = useState<Date | null>(null)
// //   const [mounted, setMounted] = useState(false)
// //   const { preparingOrders, readyOrders, loading, error, updateOrderStatus } = useFirebaseOrders()

// //   // Избегаем ошибки гидратации
// //   useEffect(() => {
// //     setMounted(true)
// //     setCurrentTime(new Date())
// //     const timer = setInterval(() => {
// //       setCurrentTime(new Date())
// //     }, 1000)
// //     return () => clearInterval(timer)
// //   }, [])

// //   const markAsReady = async (orderId: string) => {
// //     if (orderId) {
// //       await updateOrderStatus(orderId, "ready")
// //     }
// //   }

// //   // Format time in Uzbek
// //   const formatUzbekTime = (date: Date) => {
// //     const days = ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"]
// //     const months = [
// //       "Yanvar",
// //       "Fevral",
// //       "Mart",
// //       "Aprel",
// //       "May",
// //       "Iyun",
// //       "Iyul",
// //       "Avgust",
// //       "Sentabr",
// //       "Oktabr",
// //       "Noyabr",
// //       "Dekabr",
// //     ]
// //     const dayName = days[date.getDay()]
// //     const day = date.getDate()
// //     const month = months[date.getMonth()]
// //     const year = date.getFullYear()
// //     const hours = date.getHours().toString().padStart(2, "0")
// //     const minutes = date.getMinutes().toString().padStart(2, "0")
// //     const seconds = date.getSeconds().toString().padStart(2, "0")
// //     return `${dayName}, ${day} ${month} ${year}, ${hours}:${minutes}:${seconds}`
// //   }

// //   if (!mounted) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
// //         <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl">
// //           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
// //             <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
// //               <div className="text-center sm:text-left">
// //                 <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold flex items-center gap-3">
// //                   <ChefHat className="h-8 w-8 sm:h-10 sm:w-10" />
// //                   Oshxona - Boshqaruv paneli
// //                 </h1>
// //                 <p className="text-base sm:text-lg opacity-90 mt-1">Yuklanmoqda...</p>
// //               </div>
// //             </div>
// //           </div>
// //         </header>
// //         <div className="flex items-center justify-center min-h-[50vh]">
// //           <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
// //         </div>
// //       </div>
// //     )
// //   }

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
// //         <Card className="p-8 text-center">
// //           <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600" />
// //           <h2 className="text-xl font-semibold">Buyurtmalar yuklanmoqda...</h2>
// //           <p className="text-gray-600">Firebase-ga ulanish</p>
// //         </Card>
// //       </div>
// //     )
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
// //         <Card className="p-8 text-center max-w-md">
// //           <div className="text-red-500 text-4xl mb-4">⚠️</div>
// //           <h2 className="text-xl font-semibold mb-2">Ulanish xatosi</h2>
// //           <p className="text-gray-600 mb-4">{error}</p>
// //           <Button onClick={() => window.location.reload()}>Qayta urinib ko'ring</Button>
// //         </Card>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
// //       {/* Header */}
// //       <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
// //           <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
// //             <div className="text-center sm:text-left">
// //               <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold flex items-center gap-3">
// //                 <ChefHat className="h-8 w-8 sm:h-10 sm:w-10" />
// //                 Oshxona - Boshqaruv paneli
// //               </h1>
// //               <p className="text-base sm:text-lg opacity-90 mt-1">
// //                 {currentTime && formatUzbekTime(currentTime)} • {preparingOrders.length} buyurtma bajarilmoqda
// //               </p>
// //             </div>
// //             <div className="flex gap-2 sm:gap-4">
// //               <Link href="/">
// //                 <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
// //                   📱 Menyu
// //                 </Button>
// //               </Link>
// //               <Link href="/display">
// //                 <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
// //                   📺 Monitor
// //                 </Button>
// //               </Link>
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
// //         {/* Stats */}
// //         <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
// //           <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0">
// //             <CardContent className="p-4 text-center">
// //               <div className="text-2xl sm:text-3xl font-bold">{preparingOrders.length}</div>
// //               <div className="text-sm opacity-90">Jarayonda</div>
// //             </CardContent>
// //           </Card>
// //           <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white border-0">
// //             <CardContent className="p-4 text-center">
// //               <div className="text-2xl sm:text-3xl font-bold">{readyOrders.length}</div>
// //               <div className="text-sm opacity-90">Tayyor</div>
// //             </CardContent>
// //           </Card>
// //           <Card className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white border-0">
// //             <CardContent className="p-4 text-center">
// //               <div className="text-2xl sm:text-3xl font-bold">{preparingOrders.length + readyOrders.length}</div>
// //               <div className="text-sm opacity-90">Jami</div>
// //             </CardContent>
// //           </Card>
// //         </div>

// //         {/* Preparing Orders */}
// //         <div className="mb-8">
// //           <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
// //             <ChefHat className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />
// //             Buyurtmalar bajarilmoqda ({preparingOrders.length})
// //           </h2>
// //           {preparingOrders.length === 0 ? (
// //             <Card className="bg-gray-50">
// //               <CardContent className="p-8 text-center">
// //                 <ChefHat className="h-16 w-16 text-gray-400 mx-auto mb-4" />
// //                 <p className="text-xl text-gray-600">Yangi buyurtmalar yo'q</p>
// //                 <p className="text-gray-500">Yangi buyurtmalarni kutamiz...</p>
// //               </CardContent>
// //             </Card>
// //           ) : (
// //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
// //               {preparingOrders
// //                 .sort((a, b) => a.orderNumber - b.orderNumber)
// //                 .map((order) => (
// //                   <Card
// //                     key={order.id}
// //                     className="overflow-hidden border-2 border-blue-200 bg-white hover:border-blue-300 transition-all duration-300 hover:shadow-xl"
// //                   >
// //                     <CardHeader className="pb-3">
// //                       <div className="flex justify-between items-start">
// //                         <div>
// //                           <CardTitle className="text-xl sm:text-2xl font-bold">Buyurtma #{order.orderNumber}</CardTitle>
// //                           <Badge className="mt-2 bg-blue-500 text-white">
// //                             {order.paymentMethod === "card" ? "💳 Karta orqali" : "💵 Naqd pulda"}
// //                           </Badge>
// //                         </div>
// //                         <div className="text-right">
// //                           <div className="text-sm text-gray-500">
// //                             {new Date(order.timestamp).toLocaleTimeString("uz-UZ")}
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </CardHeader>
// //                     <CardContent>
// //                       <div className="space-y-2 mb-4">
// //                         {order.items.map((item, index) => (
// //                           <div key={index} className="flex justify-between text-sm sm:text-base">
// //                             <span className="font-medium">
// //                               {item.name} x{item.quantity}
// //                             </span>
// //                             <span className="text-gray-600">{(item.price * item.quantity).toLocaleString()} UZS</span>
// //                           </div>
// //                         ))}
// //                       </div>
// //                       <div className="flex justify-between items-center pt-3 border-t">
// //                         <span className="font-bold text-lg">{order.totalPrice.toLocaleString()} UZS</span>
// //                         <Button
// //                           size="lg"
// //                           className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
// //                           onClick={() => order.id && markAsReady(order.id)}
// //                         >
// //                           <CheckCircle className="mr-2 h-5 w-5" />
// //                           Tayyor!
// //                         </Button>
// //                       </div>
// //                     </CardContent>
// //                   </Card>
// //                 ))}
// //             </div>
// //           )}
// //         </div>

// //         {/* Ready Orders */}
// //         {readyOrders.length > 0 && (
// //           <div>
// //             <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
// //               <Bell className="h-6 w-6 sm:h-8 sm:w-8 text-green-500 animate-pulse" />
// //               Tugallangan buyurtmalar ({readyOrders.length})
// //             </h2>
// //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
// //               {readyOrders.map((order) => (
// //                 <Card key={order.id} className="border-green-300 bg-green-50 animate-pulse">
// //                   <CardContent className="p-4 text-center">
// //                     <div className="text-3xl font-bold text-green-600 mb-2">#{order.orderNumber}</div>
// //                     <p className="text-sm text-gray-600 mb-2">
// //                       {order.items.length} mahsulot • {order.totalPrice.toLocaleString()} UZS
// //                     </p>
// //                     <Badge className="bg-green-600 text-white">
// //                       <CheckCircle className="h-3 w-3 mr-1" />
// //                       Olib ketishga tayyor
// //                     </Badge>
// //                   </CardContent>
// //                 </Card>
// //               ))}
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   )
// // }

























// "use client"

// import { useEffect, useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { CheckCircle, ChefHat, Bell, Loader2, Truck, Store, CreditCard, Banknote, Printer } from "lucide-react"
// import Link from "next/link"
// import { useFirebaseOrders } from "@/hooks/useFirebaseOrders"

// export default function KitchenDashboard() {
//   const [currentTime, setCurrentTime] = useState<Date | null>(null)
//   const [mounted, setMounted] = useState(false)
//   const [printingOrders, setPrintingOrders] = useState<Set<string>>(new Set())
//   const { preparingOrders, readyOrders, loading, error, updateOrderStatus } = useFirebaseOrders()

//   // Избегаем ошибки гидратации
//   useEffect(() => {
//     setMounted(true)
//     setCurrentTime(new Date())
//     const timer = setInterval(() => {
//       setCurrentTime(new Date())
//     }, 1000)
//     return () => clearInterval(timer)
//   }, [])

//   // Функция печати чека
//   const printReceipt = async (order: any) => {
//     try {
//       console.log("🖨️ Печать чека для заказа #", order.orderNumber)

//       // Создаем содержимое чека
//       const receiptContent = `
//         ================================
//                  BOG'OT PIZZA N1
//         ================================
        
//         Buyurtma #${order.orderNumber}
//         Sana: ${new Date(order.timestamp).toLocaleDateString("uz-UZ")}
//         Vaqt: ${new Date(order.timestamp).toLocaleTimeString("uz-UZ")}
        
//         --------------------------------
//         MAHSULOTLAR:
//         --------------------------------
//         ${order.items
//           .map(
//             (item: any) =>
//               `${item.name} x${item.quantity}
//            ${(item.price * item.quantity).toLocaleString()} UZS`,
//           )
//           .join("\n        ")}
        
//         --------------------------------
        
//         Olish usuli: ${order.deliveryMethod === "delivery" ? "Yetkazib berish" : "O'zim olaman"}
//         To'lov turi: ${order.paymentMethod === "card" ? "Plastik karta" : "Naxt pul"}
        
//         --------------------------------
//         JAMI: ${order.totalPrice.toLocaleString()} UZS
//         --------------------------------
        
//         Rahmat! Yoqimli ishtaha!
        
//         ================================
//                Created by CodeVibe
//       `

//       // Попытка печати через различные методы
//       if (window.print) {
//         // Создаем новое окно для печати
//         const printWindow = window.open("", "_blank", "width=300,height=600")
//         if (printWindow) {
//           printWindow.document.write(`
//             <html>
//               <head>
//                 <title>Chek #${order.orderNumber}</title>
//                 <style>
//                   body { 
//                     font-family: 'Courier New', monospace; 
//                     font-size: 12px; 
//                     margin: 0; 
//                     padding: 10px;
//                     white-space: pre-line;
//                   }
//                   @media print {
//                     body { margin: 0; }
//                   }
//                 </style>
//               </head>
//               <body>${receiptContent}</body>
//             </html>
//           `)
//           printWindow.document.close()
//           printWindow.print()
//           printWindow.close()
//         }
//       }

//       // Альтернативный метод - отправка на принтер через fetch API
//       try {
//         await fetch("/api/print-receipt", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             orderNumber: order.orderNumber,
//             content: receiptContent,
//             order: order,
//           }),
//         })
//       } catch (fetchError) {
//         console.log("API печати недоступен, используем браузерную печать")
//       }

//       console.log("✅ Чек отправлен на печать")
//     } catch (error) {
//       console.error("❌ Ошибка печати чека:", error)
//       alert("Ошибка печати чека. Проверьте подключение принтера.")
//     }
//   }

//   const markAsReady = async (orderId: string) => {
//     if (orderId) {
//       // Находим заказ для печати чека
//       const order = preparingOrders.find((o) => o.id === orderId)

//       if (order) {
//         // Добавляем в список печатающихся заказов
//         setPrintingOrders((prev) => new Set(prev).add(orderId))

//         try {
//           // Сначала печатаем чек
//           await printReceipt(order)

//           // Затем обновляем статус заказа
//           await updateOrderStatus(orderId, "ready")

//           console.log(`✅ Заказ #${order.orderNumber} готов и чек напечатан`)
//         } catch (error) {
//           console.error("Ошибка при обработке заказа:", error)
//         } finally {
//           // Убираем из списка печатающихся заказов
//           setPrintingOrders((prev) => {
//             const newSet = new Set(prev)
//             newSet.delete(orderId)
//             return newSet
//           })
//         }
//       }
//     }
//   }

//   // Format time in Uzbek
//   const formatUzbekTime = (date: Date) => {
//     const days = ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"]
//     const months = [
//       "Yanvar",
//       "Fevral",
//       "Mart",
//       "Aprel",
//       "May",
//       "Iyun",
//       "Iyul",
//       "Avgust",
//       "Sentabr",
//       "Oktabr",
//       "Noyabr",
//       "Dekabr",
//     ]
//     const dayName = days[date.getDay()]
//     const day = date.getDate()
//     const month = months[date.getMonth()]
//     const year = date.getFullYear()
//     const hours = date.getHours().toString().padStart(2, "0")
//     const minutes = date.getMinutes().toString().padStart(2, "0")
//     const seconds = date.getSeconds().toString().padStart(2, "0")
//     return `${dayName}, ${day} ${month} ${year}, ${hours}:${minutes}:${seconds}`
//   }

//   if (!mounted) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
//         <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
//             <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
//               <div className="text-center sm:text-left">
//                 <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold flex items-center gap-3">
//                   <ChefHat className="h-8 w-8 sm:h-10 sm:w-10" />
//                   Oshxona - Boshqaruv paneli
//                 </h1>
//                 <p className="text-base sm:text-lg opacity-90 mt-1">Yuklanmoqda...</p>
//               </div>
//             </div>
//           </div>
//         </header>
//         <div className="flex items-center justify-center min-h-[50vh]">
//           <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
//         </div>
//       </div>
//     )
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
//         <Card className="p-8 text-center">
//           <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600" />
//           <h2 className="text-xl font-semibold">Buyurtmalar yuklanmoqda...</h2>
//           <p className="text-gray-600">Firebase-ga ulanish</p>
//         </Card>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
//         <Card className="p-8 text-center max-w-md">
//           <div className="text-red-500 text-4xl mb-4">⚠️</div>
//           <h2 className="text-xl font-semibold mb-2">Ulanish xatosi</h2>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <Button onClick={() => window.location.reload()}>Qayta urinib ko'ring</Button>
//         </Card>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
//       {/* Header */}
//       <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
//           <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
//             <div className="text-center sm:text-left">
//               <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold flex items-center gap-3">
//                 <ChefHat className="h-8 w-8 sm:h-10 sm:w-10" />
//                 Oshxona - Boshqaruv paneli
//               </h1>
//               <p className="text-base sm:text-lg opacity-90 mt-1">
//                 {currentTime && formatUzbekTime(currentTime)} • {preparingOrders.length} buyurtma bajarilmoqda
//               </p>
//             </div>
//             <div className="flex gap-2 sm:gap-4">
//               <Link href="/">
//                 <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
//                   📱 Menyu
//                 </Button>
//               </Link>
//               <Link href="/display">
//                 <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
//                   📺 Monitor
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         {/* Stats */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
//           <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0">
//             <CardContent className="p-4 text-center">
//               <div className="text-2xl sm:text-3xl font-bold">{preparingOrders.length}</div>
//               <div className="text-sm opacity-90">Jarayonda</div>
//             </CardContent>
//           </Card>
//           <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white border-0">
//             <CardContent className="p-4 text-center">
//               <div className="text-2xl sm:text-3xl font-bold">{readyOrders.length}</div>
//               <div className="text-sm opacity-90">Tayyor</div>
//             </CardContent>
//           </Card>
//           <Card className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white border-0">
//             <CardContent className="p-4 text-center">
//               <div className="text-2xl sm:text-3xl font-bold">{preparingOrders.length + readyOrders.length}</div>
//               <div className="text-sm opacity-90">Jami</div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Preparing Orders */}
//         <div className="mb-8">
//           <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
//             <ChefHat className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />
//             Buyurtmalar bajarilmoqda ({preparingOrders.length})
//           </h2>
//           {preparingOrders.length === 0 ? (
//             <Card className="bg-gray-50">
//               <CardContent className="p-8 text-center">
//                 <ChefHat className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//                 <p className="text-xl text-gray-600">Yangi buyurtmalar yo'q</p>
//                 <p className="text-gray-500">Yangi buyurtmalarni kutamiz...</p>
//               </CardContent>
//             </Card>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//               {preparingOrders
//                 .sort((a, b) => a.orderNumber - b.orderNumber)
//                 .map((order) => {
//                   const isPrinting = printingOrders.has(order.id || "")
//                   return (
//                     <Card
//                       key={order.id}
//                       className="overflow-hidden border-2 border-blue-200 bg-white hover:border-blue-300 transition-all duration-300 hover:shadow-xl"
//                     >
//                       <CardHeader className="pb-3">
//                         <div className="flex justify-between items-start">
//                           <div>
//                             <CardTitle className="text-xl sm:text-2xl font-bold">
//                               Buyurtma #{order.orderNumber}
//                             </CardTitle>
//                             <div className="flex gap-2 mt-2 flex-wrap">
//                               <Badge
//                                 variant="outline"
//                                 className={`text-xs ${
//                                   order.deliveryMethod === "delivery"
//                                     ? "bg-blue-50 text-blue-700 border-blue-200"
//                                     : "bg-green-50 text-green-700 border-green-200"
//                                 }`}
//                               >
//                                 {order.deliveryMethod === "delivery" ? (
//                                   <>
//                                     <Truck className="h-3 w-3 mr-1" />
//                                     Yetkazib berish
//                                   </>
//                                 ) : (
//                                   <>
//                                     <Store className="h-3 w-3 mr-1" />
//                                     O'zim olaman
//                                   </>
//                                 )}
//                               </Badge>
//                               <Badge
//                                 variant="outline"
//                                 className={`text-xs ${
//                                   order.paymentMethod === "card"
//                                     ? "bg-purple-50 text-purple-700 border-purple-200"
//                                     : "bg-orange-50 text-orange-700 border-orange-200"
//                                 }`}
//                               >
//                                 {order.paymentMethod === "card" ? (
//                                   <>
//                                     <CreditCard className="h-3 w-3 mr-1" />
//                                     Karta
//                                   </>
//                                 ) : (
//                                   <>
//                                     <Banknote className="h-3 w-3 mr-1" />
//                                     Naxt
//                                   </>
//                                 )}
//                               </Badge>
//                             </div>
//                           </div>
//                           <div className="text-right">
//                             <div className="text-sm text-gray-500">
//                               {new Date(order.timestamp).toLocaleTimeString("uz-UZ")}
//                             </div>
//                           </div>
//                         </div>
//                       </CardHeader>
//                       <CardContent>
//                         <div className="space-y-2 mb-4">
//                           {order.items.map((item, index) => (
//                             <div key={index} className="flex justify-between text-sm sm:text-base">
//                               <span className="font-medium">
//                                 {item.name} x{item.quantity}
//                               </span>
//                               <span className="text-gray-600">{(item.price * item.quantity).toLocaleString()} UZS</span>
//                             </div>
//                           ))}
//                         </div>
//                         <div className="flex justify-between items-center pt-3 border-t">
//                           <span className="font-bold text-lg">{order.totalPrice.toLocaleString()} UZS</span>
//                           <Button
//                             size="lg"
//                             className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
//                             onClick={() => order.id && markAsReady(order.id)}
//                             disabled={isPrinting}
//                           >
//                             {isPrinting ? (
//                               <>
//                                 <Printer className="mr-2 h-5 w-5 animate-spin" />
//                                 Chek chiqarilmoqda...
//                               </>
//                             ) : (
//                               <>
//                                 <CheckCircle className="mr-2 h-5 w-5" />
//                                 Tayyor!
//                               </>
//                             )}
//                           </Button>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   )
//                 })}
//             </div>
//           )}
//         </div>

//         {/* Ready Orders */}
//         {readyOrders.length > 0 && (
//           <div>
//             <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
//               <Bell className="h-6 w-6 sm:h-8 sm:w-8 text-green-500 animate-pulse" />
//               Tugallangan buyurtmalar ({readyOrders.length})
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//               {readyOrders.map((order) => (
//                 <Card key={order.id} className="border-green-300 bg-green-50 animate-pulse">
//                   <CardContent className="p-4 text-center">
//                     <div className="text-3xl font-bold text-green-600 mb-2">#{order.orderNumber}</div>
//                     <div className="flex justify-center gap-1 mb-2">
//                       <Badge
//                         variant="outline"
//                         className={`text-xs ${
//                           order.deliveryMethod === "delivery"
//                             ? "bg-blue-50 text-blue-700 border-blue-200"
//                             : "bg-green-50 text-green-700 border-green-200"
//                         }`}
//                       >
//                         {order.deliveryMethod === "delivery" ? "🚚" : "🏪"}
//                       </Badge>
//                       <Badge
//                         variant="outline"
//                         className={`text-xs ${
//                           order.paymentMethod === "card"
//                             ? "bg-purple-50 text-purple-700 border-purple-200"
//                             : "bg-orange-50 text-orange-700 border-orange-200"
//                         }`}
//                       >
//                         {order.paymentMethod === "card" ? "💳" : "💵"}
//                       </Badge>
//                     </div>
//                     <p className="text-sm text-gray-600 mb-2">
//                       {order.items.length} mahsulot • {order.totalPrice.toLocaleString()} UZS
//                     </p>
//                     <Badge className="bg-green-600 text-white">
//                       <CheckCircle className="h-3 w-3 mr-1" />
//                       Olib ketishga tayyor
//                     </Badge>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }







































"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ChefHat, Bell, Loader2, Store, Banknote, Printer } from "lucide-react"
import Link from "next/link"
import { useFirebaseOrders } from "@/hooks/useFirebaseOrders"

export default function KitchenDashboard() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [mounted, setMounted] = useState(false)
  const [printingOrders, setPrintingOrders] = useState<Set<string>>(new Set())
  const { preparingOrders, readyOrders, loading, error, updateOrderStatus } = useFirebaseOrders()

  // Избегаем ошибки гидратации
  useEffect(() => {
    setMounted(true)
    setCurrentTime(new Date())
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Функция печати чека
  const printReceipt = async (order: any) => {
    try {
      console.log("🖨️ Печать чека для заказа #", order.orderNumber)
      // Создаем содержимое чека
      const receiptContent = `
        ================================
                 BOG'OT PIZZA N1
        ================================
        
        Buyurtma #${order.orderNumber}
        Sana: ${new Date(order.timestamp).toLocaleDateString("uz-UZ")}
        Vaqt: ${new Date(order.timestamp).toLocaleTimeString("uz-UZ")}
        
        --------------------------------
        MAHSULOTLAR:
        --------------------------------
        ${order.items
          .map(
            (item: any) =>
              `${item.name} x${item.quantity}           ${(item.price * item.quantity).toLocaleString()} UZS`,
          )
          .join("\n        ")}
        
        --------------------------------
        
        Olish usuli: ${order.deliveryMethod === "delivery" ? "Yetkazib berish" : "O'zim olaman"}
        To'lov turi: ${order.paymentMethod === "card" ? "Plastik karta" : "Naxt pul"}
        
        --------------------------------
        JAMI: ${order.totalPrice.toLocaleString()} UZS
        --------------------------------
        
        Rahmat! Yoqimli ishtaha!
        
        ================================
               Created by CodeVibe
      `

      // Попытка печати через различные методы
      if (window.print) {
        // Создаем новое окно для печати
        const printWindow = window.open("", "_blank", "width=300,height=600")
        if (printWindow) {
          printWindow.document.write(`
            <html>
              <head>
                <title>Chek #${order.orderNumber}</title>
                <style>
                  body {
                     font-family: 'Courier New', monospace;
                     font-size: 12px;
                     margin: 0;
                     padding: 10px;
                    white-space: pre-line;
                  }
                  @media print {
                    body { margin: 0; }
                  }
                </style>
              </head>
              <body>${receiptContent}</body>
            </html>
          `)
          printWindow.document.close()
          printWindow.print()
          printWindow.close()
        }
      }

      // Альтернативный метод - отправка на принтер через fetch API
      try {
        await fetch("/api/print-receipt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderNumber: order.orderNumber,
            content: receiptContent,
            order: order,
          }),
        })
      } catch (fetchError) {
        console.log("API печати недоступен, используем браузерную печать")
      }

      console.log("✅ Чек отправлен на печать")
    } catch (error) {
      console.error("❌ Ошибка печати чека:", error)
      alert("Ошибка печати чека. Проверьте подключение принтера.")
    }
  }

  const markAsReady = async (orderId: string) => {
    if (orderId) {
      // Находим заказ для печати чека
      const order = preparingOrders.find((o) => o.id === orderId)
      if (order) {
        // Добавляем в список печатающихся заказов
        setPrintingOrders((prev) => new Set(prev).add(orderId))
        try {
          // Сначала печатаем чек
          await printReceipt(order)

          // ВАЖНО: Обновляем заказ в Firebase с новым timestamp для таймера
          await updateOrderStatus(orderId, "ready")

          console.log(`✅ Заказ #${order.orderNumber} готов и чек напечатан. Таймер запущен!`)
        } catch (error) {
          console.error("Ошибка при обработке заказа:", error)
        } finally {
          // Убираем из списка печатающихся заказов
          setPrintingOrders((prev) => {
            const newSet = new Set(prev)
            newSet.delete(orderId)
            return newSet
          })
        }
      }
    }
  }

  // Format time in Uzbek
  const formatUzbekTime = (date: Date) => {
    const days = ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"]
    const months = [
      "Yanvar",
      "Fevral",
      "Mart",
      "Aprel",
      "May",
      "Iyun",
      "Iyul",
      "Avgust",
      "Sentabr",
      "Oktabr",
      "Noyabr",
      "Dekabr",
    ]

    const dayName = days[date.getDay()]
    const day = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
    const seconds = date.getSeconds().toString().padStart(2, "0")

    return `${dayName}, ${day} ${month} ${year}, ${hours}:${minutes}:${seconds}`
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold flex items-center gap-3">
                  <ChefHat className="h-8 w-8 sm:h-10 sm:w-10" />
                  Oshxona - Boshqaruv paneli
                </h1>
                <p className="text-base sm:text-lg opacity-90 mt-1">Yuklanmoqda...</p>
              </div>
            </div>
          </div>
        </header>
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600" />
          <h2 className="text-xl font-semibold">Buyurtmalar yuklanmoqda...</h2>
          <p className="text-gray-600">Firebase-ga ulanish</p>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold mb-2">Ulanish xatosi</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Qayta urinib ko'ring</Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold flex items-center gap-3">
                <ChefHat className="h-8 w-8 sm:h-10 sm:w-10" />
                Oshxona - Boshqaruv paneli
              </h1>
              <p className="text-base sm:text-lg opacity-90 mt-1">
                {currentTime && formatUzbekTime(currentTime)} • {preparingOrders.length} buyurtma bajarilmoqda
              </p>
            </div>
            <div className="flex gap-2 sm:gap-4">
              <Link href="/">
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  📱 Menyu
                </Button>
              </Link>
              <Link href="/display">
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  📺 Monitor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold">{preparingOrders.length}</div>
              <div className="text-sm opacity-90">Jarayonda</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold">{readyOrders.length}</div>
              <div className="text-sm opacity-90">Tayyor</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl sm:text-3xl font-bold">{preparingOrders.length + readyOrders.length}</div>
              <div className="text-sm opacity-90">Jami</div>
            </CardContent>
          </Card>
        </div>

        {/* Preparing Orders */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <ChefHat className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />
            Buyurtmalar bajarilmoqda ({preparingOrders.length})
          </h2>
          {preparingOrders.length === 0 ? (
            <Card className="bg-gray-50">
              <CardContent className="p-8 text-center">
                <ChefHat className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-600">Yangi buyurtmalar yo'q</p>
                <p className="text-gray-500">Yangi buyurtmalarni kutamiz...</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {preparingOrders
                .sort((a, b) => a.orderNumber - b.orderNumber)
                .map((order) => {
                  const isPrinting = printingOrders.has(order.id || "")
                  return (
                    <Card
                      key={order.id}
                      className="overflow-hidden border-2 border-blue-200 bg-white hover:border-blue-300 transition-all duration-300 hover:shadow-xl"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl sm:text-2xl font-bold">
                              Buyurtma #{order.orderNumber}
                            </CardTitle>
                            <div className="flex gap-2 mt-2 flex-wrap">
                              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                                <Store className="h-3 w-3 mr-1" />
                                O'zim olaman
                              </Badge>
                              <Badge
                                variant="outline"
                                className="text-xs bg-orange-50 text-orange-700 border-orange-200"
                              >
                                <Banknote className="h-3 w-3 mr-1" />
                                {order.paymentMethod === "card" ? "Karta" : "Naxt"}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500">
                              {new Date(order.timestamp).toLocaleTimeString("uz-UZ")}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 mb-4">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm sm:text-base">
                              <span className="font-medium">
                                {item.name} x{item.quantity}
                              </span>
                              <span className="text-gray-600">{(item.price * item.quantity).toLocaleString()} UZS</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t">
                          <span className="font-bold text-lg">{order.totalPrice.toLocaleString()} UZS</span>
                          <Button
                            size="lg"
                            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            onClick={() => order.id && markAsReady(order.id)}
                            disabled={isPrinting}
                          >
                            {isPrinting ? (
                              <>
                                <Printer className="mr-2 h-5 w-5 animate-spin" />
                                Chek chiqarilmoqda...
                              </>
                            ) : (
                              <>
                                <CheckCircle className="mr-2 h-5 w-5" />
                                Tayyor!
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
            </div>
          )}
        </div>

        {/* Ready Orders */}
        {readyOrders.length > 0 && (
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <Bell className="h-6 w-6 sm:h-8 sm:w-8 text-green-500 animate-pulse" />
              Tugallangan buyurtmalar ({readyOrders.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {readyOrders.map((order) => (
                <Card key={order.id} className="border-green-300 bg-green-50 animate-pulse">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">#{order.orderNumber}</div>
                    <div className="flex justify-center gap-1 mb-2">
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                        🏪
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                        {order.paymentMethod === "card" ? "💳" : "💵"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {order.items.length} mahsulot • {order.totalPrice.toLocaleString()} UZS
                    </p>
                    <Badge className="bg-green-600 text-white">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Olib ketishga tayyor
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
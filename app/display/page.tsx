// "use client"

// import { useEffect, useState } from "react"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { CheckCircle, Clock, Sparkles, Loader2 } from "lucide-react"
// import { useFirebaseOrders } from "@/hooks/useFirebaseOrders"

// export default function DisplayMonitor() {
//   const [currentTime, setCurrentTime] = useState<Date | null>(null)
//   const [mounted, setMounted] = useState(false)

//   const { preparingOrders, readyOrders, loading, error } = useFirebaseOrders()

//   useEffect(() => {
//     setMounted(true)
//     setCurrentTime(new Date())

//     const timer = setInterval(() => {
//       setCurrentTime(new Date())
//     }, 1000)

//     return () => clearInterval(timer)
//   }, [])

//   if (!mounted) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden flex items-center justify-center">
//         <Loader2 className="h-16 w-16 animate-spin text-white" />
//       </div>
//     )
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden flex items-center justify-center">
//         <Card className="bg-white/10 backdrop-blur-sm border-white/20">
//           <CardContent className="p-8 text-center">
//             <Loader2 className="h-16 w-16 animate-spin mx-auto mb-4 text-white" />
//             <h2 className="text-2xl font-semibold text-white">Buyurtmalar yuklanmoqda...</h2>
//           </CardContent>
//         </Card>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden flex items-center justify-center">
//         <Card className="bg-white/10 backdrop-blur-sm border-white/20">
//           <CardContent className="p-8 text-center">
//             <div className="text-red-400 text-4xl mb-4">⚠️</div>
//             <h2 className="text-xl font-semibold mb-2 text-white">Ulanish xatosi</h2>
//             <p className="text-gray-300">{error}</p>
//           </CardContent>
//         </Card>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
//       {/* Animated Background */}
//       <div className="absolute inset-0 opacity-20">
//         <div className="absolute top-10 left-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
//         <div className="absolute top-10 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
//         <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
//       </div>

//       {/* Header */}
//       <header className="relative z-10 text-center py-8 sm:py-12">
//         <div className="max-w-6xl mx-auto px-4">
//           <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
//             Bog'ot Pizza
//           </h1>
//           <p className="text-xl sm:text-2xl lg:text-3xl opacity-90 mb-2">Buyurtmangizni kuzatib boring</p>
//           {currentTime && (
//             <div className="text-lg sm:text-xl opacity-75">
//               {currentTime.toLocaleString("ru-RU", {
//                 weekday: "long",
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric",
//                 hour: "2-digit",
//                 minute: "2-digit",
//                 second: "2-digit",
//               })}
//             </div>
//           )}
//         </div>
//       </header>

//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Ready Orders Section */}
//         {readyOrders.length > 0 ? (
//           <div className="mb-12">
//             <div className="text-center mb-8">
//               <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-green-400 mb-4 animate-pulse flex items-center justify-center gap-4">
//                 <Sparkles className="h-8 w-8 sm:h-12 sm:w-12 lg:h-16 lg:w-16" />
//                 Buyurtmalar tayyor!
//                 <Sparkles className="h-8 w-8 sm:h-12 sm:w-12 lg:h-16 lg:w-16" />
//               </h2>
//               <p className="text-xl sm:text-2xl lg:text-3xl opacity-90">
//                 {readyOrders.length} qabul qilishni kutayotgan buyurtma(lar).
//               </p>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
//               {readyOrders.map((order, index) => (
//                 <Card
//                   key={order.id}
//                   className="bg-gradient-to-br from-green-500 to-emerald-600 border-0 shadow-2xl transform hover:scale-105"
//                   // style={{ animationDelay: `${index * 0.2}s` }}
//                 >
//                   <CardContent className="p-6 sm:p-8 text-center text-white">
//                     <div className="mb-4">
//                       <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 mx-auto mb-4 animate-spin" />
//                     </div>
//                     <div className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4">#{order.orderNumber}</div>
//                     <div className="text-lg sm:text-xl lg:text-2xl font-bold bg-white text-green-600 rounded-full py-2 px-4 inline-block">
//                     Buyurtmangiz tayyor!
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <div className="text-center mb-12">
//             <div className="text-2xl sm:text-3xl lg:text-4xl opacity-75 mb-8">Hali tugallangan buyurtmalar yo'q</div>
//           </div>
//         )}

//         {/* Preparing Orders Section */}
//         <div className="mb-8">
//           <div className="text-center mb-8">
//             <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-400 mb-4 flex items-center justify-center gap-3">
//               <Clock className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 animate-spin" />
//               Buyurtmalar tayyorlanmoqda
//             </h3>
//             <p className="text-lg sm:text-xl lg:text-2xl opacity-75">{preparingOrders.length} заказ(ов) готовится</p>
//           </div>

//           {preparingOrders.length > 0 ? (
//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
//               {preparingOrders
//                 .sort((a, b) => a.orderNumber - b.orderNumber)
//                 .map((order) => (
//                   <Card key={order.id} className="bg-gradient-to-br from-yellow-500 to-orange-600 border-0 shadow-xl">
//                     <CardContent className="p-4 sm:p-6 text-center text-white">
//                       <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">#{order.orderNumber}</div>
//                       <Badge className="mt-2 bg-white text-orange-600 text-xs sm:text-sm">
//                         <Clock className="h-3 w-3 mr-1" />
//                         Tayyorgarlikda
//                       </Badge>
//                     </CardContent>
//                   </Card>
//                 ))}
//             </div>
//           ) : (
//             <div className="text-center">
//               <div className="text-xl sm:text-2xl opacity-60">Tayyorgarlik bosqichida hech qanday buyurtma yo'q.</div>
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <footer className="text-center py-8 opacity-75">
//           <p className="text-lg sm:text-xl">Bizni tanlaganingiz uchun tashakkur! • Kutish vaqti: 10-15 daqiqa</p>
//           <p className="text-base sm:text-lg mt-2">Agar sizda biron bir savol bo'lsa, iltimos, xodimlarga murojaat qiling.</p>
//         </footer>
//       </div>
//     </div>
//   )
// }






























"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Sparkles, Loader2, Bell, ChefHat, Timer } from "lucide-react"
import { useFirebaseOrders } from "@/hooks/useFirebaseOrders"

export default function DisplayPage() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [mounted, setMounted] = useState(false)
  const [previousReadyOrders, setPreviousReadyOrders] = useState<any[]>([])
  const [newReadyOrder, setNewReadyOrder] = useState<number | null>(null)
  const { preparingOrders, readyOrders, loading, error } = useFirebaseOrders()

  useEffect(() => {
    setMounted(true)
    setCurrentTime(new Date())
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Check for new ready orders and show alert with order number
  useEffect(() => {
    if (previousReadyOrders.length > 0) {
      const newOrders = readyOrders.filter(
        (order) => !previousReadyOrders.some((prevOrder) => prevOrder.id === order.id),
      )

      if (newOrders.length > 0) {
        // Show alert for the first new ready order
        const latestOrder = newOrders[0]
        setNewReadyOrder(latestOrder.orderNumber)
        setTimeout(() => setNewReadyOrder(null), 5000)
      }
    }
    setPreviousReadyOrders([...readyOrders])
  }, [readyOrders])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-20 w-20 animate-spin text-purple-400 mx-auto mb-4" />
          <p className="text-xl text-purple-200">Tizim yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden flex items-center justify-center">
        <div className="bg-white/5 backdrop-blur-xl border border-purple-500/30 shadow-2xl rounded-2xl p-12 text-center">
          <ChefHat className="h-20 w-20 mx-auto mb-6 text-purple-400" />
          <h2 className="text-3xl font-bold text-white mb-2">Buyurtmalar yuklanmoqda</h2>
          <p className="text-purple-200">Iltimos, kuting...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-slate-900 to-red-900 text-white overflow-hidden flex items-center justify-center">
        <div className="bg-white/5 backdrop-blur-xl border border-red-500/30 shadow-2xl rounded-2xl p-12 text-center">
          <div className="text-red-400 text-6xl mb-6">⚠️</div>
          <h2 className="text-2xl font-bold mb-4 text-white">Ulanish xatosi</h2>
          <p className="text-red-200 mb-4">{error}</p>
          <p className="text-sm text-red-300">Sahifani yangilashga harakat qiling</p>
        </div>
      </div>
    )
  }

  // Sort orders by order number
  const sortedPreparingOrders = [...preparingOrders].sort((a, b) => a.orderNumber - b.orderNumber)
  const sortedReadyOrders = [...readyOrders].sort((a, b) => a.orderNumber - b.orderNumber)

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* New Order Alert with Order Number */}
      {newReadyOrder && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 border-0 shadow-2xl rounded-2xl px-8 py-6 flex items-center gap-4">
            <Bell className="h-8 w-8 text-white" />
            <div className="text-center">
              <div className="text-white font-black text-2xl">Buyurtma #{newReadyOrder}</div>
              <div className="text-green-100 font-semibold text-lg">TAYYOR!</div>
            </div>
            <Sparkles className="h-8 w-8 text-yellow-300" />
          </div>
        </div>
      )}

      {/* Header */}
      <header className="relative z-10 text-center py-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Bog'ot Pizza
          </h1>

          {currentTime && (
            <div className="flex items-center justify-center gap-3 text-lg text-purple-200">
              <Timer className="h-5 w-5 text-purple-400" />
              {formatUzbekTime(currentTime)}
            </div>
          )}
        </div>
      </header>

      {/* Two-Column Layout */}
      <div className="relative z-10 h-[calc(100vh-180px)] flex">
        {/* LEFT SIDE - PREPARING ORDERS */}
        <div className="w-1/2 border-r border-white/10 p-8 overflow-y-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Clock className="h-10 w-10 text-orange-400" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                TAYYORLANMOQDA
              </h2>
            </div>
            <p className="text-xl text-orange-300 font-semibold">
              {sortedPreparingOrders.length} ta buyurtma tayyorlanmoqda
            </p>
          </div>

          <div className="space-y-4">
            {sortedPreparingOrders.length > 0 ? (
              sortedPreparingOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 backdrop-blur-sm border border-orange-400/30 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-orange-500 rounded-full p-3">
                        <ChefHat className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-3xl font-black text-white mb-1">Buyurtma #{order.orderNumber}</div>
                        <div className="text-orange-300 text-sm font-medium">Tayyorlanmoqda</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-orange-500 text-white text-lg font-bold px-4 py-2 border-0">
                        <Clock className="h-4 w-4 mr-2" />
                        Jarayonda
                      </Badge>
                      <div className="w-4 h-4 bg-orange-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <ChefHat className="h-16 w-16 text-orange-400/50 mb-4" />
                <p className="text-2xl text-orange-400/70 font-medium">Tayyorlanayotgan buyurtmalar yo'q</p>
                <p className="text-orange-400/50 mt-2">Barcha buyurtmalar bajarildi</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE - READY ORDERS */}
        <div className="w-1/2 p-8 overflow-y-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <CheckCircle className="h-10 w-10 text-green-400" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                TAYYOR
              </h2>
            </div>
            <p className="text-xl text-green-300 font-semibold">{sortedReadyOrders.length} ta buyurtma tayyor</p>
          </div>

          <div className="space-y-4">
            {sortedReadyOrders.length > 0 ? (
              sortedReadyOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-400/30 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-green-500 rounded-full p-3">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-3xl font-black text-white mb-1">Buyurtma #{order.orderNumber}</div>
                        <div className="text-green-300 text-sm font-medium">Olib ketishga tayyor</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-green-500 text-white text-lg font-bold px-4 py-2 border-0">
                        <Sparkles className="h-4 w-4 mr-2" />
                        TAYYOR!
                      </Badge>
                      <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <CheckCircle className="h-16 w-16 text-green-400/50 mb-4" />
                <p className="text-2xl text-green-400/70 font-medium">Tayyor buyurtmalar yo'q</p>
                <p className="text-green-400/50 mt-2">Buyurtmalar tayyorlangandan keyin bu yerda ko'rinadi</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center py-4 border-t border-white/10 bg-black/20">
        <div className="flex items-center justify-center gap-6 text-sm text-purple-200">
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4 text-green-400" />
            <span>O'rtacha kutish vaqti: 10-15 daqiqa</span>
          </div>
          <div className="w-px h-4 bg-white/20"></div>
          <span>Bog'ot Pizza'ni tanlaganingiz uchun rahmat!</span>
        </div>
      </footer>
    </div>
  )
}
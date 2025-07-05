"use client"

import { useEffect, useState, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Sparkles, Loader2, Bell, ChefHat, Timer } from "lucide-react"
import { useFirebaseOrders } from "@/hooks/useFirebaseOrders"

export default function DisplayPage() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [mounted, setMounted] = useState(false)
  const [newReadyOrder, setNewReadyOrder] = useState<number | null>(null)
  const { preparingOrders, readyOrders, loading, error } = useFirebaseOrders()

  // Use useRef to store previous ready orders to avoid dependency issues
  const previousReadyOrdersRef = useRef<any[]>([])

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
    if (previousReadyOrdersRef.current.length > 0) {
      const newOrders = readyOrders.filter(
        (order) => !previousReadyOrdersRef.current.some((prevOrder) => prevOrder.id === order.id),
      )
      if (newOrders.length > 0) {
        // Show alert for the first new ready order
        const latestOrder = newOrders[0]
        setNewReadyOrder(latestOrder.orderNumber)
        setTimeout(() => setNewReadyOrder(null), 5000)
      }
    }
    // Update the ref with current ready orders
    previousReadyOrdersRef.current = [...readyOrders]
  }, [readyOrders]) // Only depend on readyOrders

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
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 border-0 shadow-2xl rounded-2xl px-8 py-6 flex items-center gap-4">
            <Bell className="h-8 w-8 text-white animate-pulse" />
            <div className="text-center">
              <div className="text-white font-black text-2xl">Buyurtma #{newReadyOrder}</div>
              <div className="text-green-100 font-semibold text-lg">TAYYOR!</div>
            </div>
            <Sparkles className="h-8 w-8 text-yellow-300 animate-pulse" />
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
                  className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 backdrop-blur-sm border border-orange-400/30 rounded-xl p-6 hover:scale-105 transition-transform duration-300"
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
                      <div className="w-4 h-4 bg-orange-400 rounded-full animate-pulse"></div>
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
                  className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-400/30 rounded-xl p-6 hover:scale-105 transition-transform duration-300 animate-pulse"
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
                      <div className="w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
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
"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Sparkles, Loader2 } from "lucide-react"
import { useFirebaseOrders } from "@/hooks/useFirebaseOrders"

export default function DisplayMonitor() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [mounted, setMounted] = useState(false)

  const { preparingOrders, readyOrders, loading, error } = useFirebaseOrders()

  useEffect(() => {
    setMounted(true)
    setCurrentTime(new Date())

    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden flex items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-white" />
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden flex items-center justify-center">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-8 text-center">
            <Loader2 className="h-16 w-16 animate-spin mx-auto mb-4 text-white" />
            <h2 className="text-2xl font-semibold text-white">Загрузка заказов...</h2>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden flex items-center justify-center">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-8 text-center">
            <div className="text-red-400 text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold mb-2 text-white">Ошибка подключения</h2>
            <p className="text-gray-300">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 text-center py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
            БЫСТРО ВКУСНО
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl opacity-90 mb-2">Следите за своим заказом</p>
          {currentTime && (
            <div className="text-lg sm:text-xl opacity-75">
              {currentTime.toLocaleString("ru-RU", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </div>
          )}
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Ready Orders Section */}
        {readyOrders.length > 0 ? (
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-green-400 mb-4 animate-pulse flex items-center justify-center gap-4">
                <Sparkles className="h-8 w-8 sm:h-12 sm:w-12 lg:h-16 lg:w-16" />
                ЗАКАЗЫ ГОТОВЫ!
                <Sparkles className="h-8 w-8 sm:h-12 sm:w-12 lg:h-16 lg:w-16" />
              </h2>
              <p className="text-xl sm:text-2xl lg:text-3xl opacity-90">
                {readyOrders.length} заказ(ов) ожидают получения
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {readyOrders.map((order, index) => (
                <Card
                  key={order.id}
                  className="bg-gradient-to-br from-green-500 to-emerald-600 border-0 shadow-2xl transform hover:scale-105 transition-all duration-500 animate-bounce"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardContent className="p-6 sm:p-8 text-center text-white">
                    <div className="mb-4">
                      <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 mx-auto mb-4 animate-spin" />
                    </div>
                    <div className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4">#{order.orderNumber}</div>
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold bg-white text-green-600 rounded-full py-2 px-4 inline-block">
                      ВАШ ЗАКАЗ ГОТОВ!
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center mb-12">
            <div className="text-2xl sm:text-3xl lg:text-4xl opacity-75 mb-8">Готовых заказов пока нет</div>
          </div>
        )}

        {/* Preparing Orders Section */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-400 mb-4 flex items-center justify-center gap-3">
              <Clock className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 animate-spin" />
              Заказы в приготовлении
            </h3>
            <p className="text-lg sm:text-xl lg:text-2xl opacity-75">{preparingOrders.length} заказ(ов) готовится</p>
          </div>

          {preparingOrders.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
              {preparingOrders
                .sort((a, b) => a.orderNumber - b.orderNumber)
                .map((order) => (
                  <Card key={order.id} className="bg-gradient-to-br from-yellow-500 to-orange-600 border-0 shadow-xl">
                    <CardContent className="p-4 sm:p-6 text-center text-white">
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">#{order.orderNumber}</div>
                      <Badge className="mt-2 bg-white text-orange-600 text-xs sm:text-sm">
                        <Clock className="h-3 w-3 mr-1" />
                        Готовится
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
            </div>
          ) : (
            <div className="text-center">
              <div className="text-xl sm:text-2xl opacity-60">Заказов в приготовлении нет</div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center py-8 opacity-75">
          <p className="text-lg sm:text-xl">Спасибо, что выбрали нас! • Время ожидания: 10-15 минут</p>
          <p className="text-base sm:text-lg mt-2">При возникновении вопросов обратитесь к персоналу</p>
        </footer>
      </div>
    </div>
  )
}

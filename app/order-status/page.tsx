"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, ChefHat, Bell } from "lucide-react"
import Link from "next/link"

interface Order {
  orderNumber: number
  items: Array<{
    id: number
    name: string
    quantity: number
    price: number
  }>
  customerName: string
  customerPhone: string
  totalPrice: number
  timestamp: string
  status: "preparing" | "ready" | "completed"
}

export default function OrderStatus() {
  const [orders, setOrders] = useState<Order[]>([])
  const [readyOrders, setReadyOrders] = useState<Order[]>([])

  useEffect(() => {
    const loadOrders = () => {
      const savedOrders = JSON.parse(localStorage.getItem("kiosk-orders") || "[]")
      setOrders(savedOrders)

      // Simulate some orders becoming ready
      const updatedOrders = savedOrders.map((order: Order) => {
        const orderTime = new Date(order.timestamp).getTime()
        const now = Date.now()
        const timeDiff = now - orderTime

        // Orders become ready after 2 minutes (for demo)
        if (timeDiff > 120000 && order.status === "preparing") {
          return { ...order, status: "ready" }
        }
        return order
      })

      if (JSON.stringify(updatedOrders) !== JSON.stringify(savedOrders)) {
        localStorage.setItem("kiosk-orders", JSON.stringify(updatedOrders))
        setOrders(updatedOrders)
      }

      setReadyOrders(updatedOrders.filter((order: Order) => order.status === "ready"))
    }

    loadOrders()
    const interval = setInterval(loadOrders, 5000) // Check every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "preparing":
        return <ChefHat className="h-5 w-5 text-yellow-600" />
      case "ready":
        return <Bell className="h-5 w-5 text-green-600" />
      case "completed":
        return <CheckCircle className="h-5 w-5 text-gray-600" />
      default:
        return <Clock className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "preparing":
        return "Готовится"
      case "ready":
        return "Готов к выдаче"
      case "completed":
        return "Выдан"
      default:
        return "Неизвестно"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "preparing":
        return "bg-yellow-100 text-yellow-800"
      case "ready":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const markAsCompleted = (orderNumber: number) => {
    const updatedOrders = orders.map((order) =>
      order.orderNumber === orderNumber ? { ...order, status: "completed" as const } : order,
    )
    setOrders(updatedOrders)
    setReadyOrders(updatedOrders.filter((order) => order.status === "ready"))
    localStorage.setItem("kiosk-orders", JSON.stringify(updatedOrders))
  }

  return (
    <div className="min-h-screen bg-red-50">
      <header className="bg-red-600 text-white p-6 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Статус заказов</h1>
          <p className="text-lg opacity-90">Отслеживайте готовность ваших заказов</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {/* Ready Orders Alert */}
        {readyOrders.length > 0 && (
          <div className="mb-8">
            <Card className="border-green-200 bg-green-50">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <Bell className="h-8 w-8 text-green-600" />
                  <div>
                    <CardTitle className="text-2xl text-green-800">Заказы готовы к выдаче!</CardTitle>
                    <p className="text-green-700">{readyOrders.length} заказ(ов) ожидают получения</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {readyOrders.map((order) => (
                    <Card key={order.orderNumber} className="border-green-300 bg-white">
                      <CardContent className="p-4 text-center">
                        <div className="text-4xl font-bold text-green-600 mb-2">#{order.orderNumber}</div>
                        <p className="font-semibold text-lg mb-2">{order.customerName}</p>
                        <p className="text-sm text-gray-600 mb-3">
                          {order.items.length} товар(ов) • {order.totalPrice}₽
                        </p>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => markAsCompleted(order.orderNumber)}
                        >
                          Выдан
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* All Orders */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Все заказы</h2>
            <Link href="/">
              <Button variant="outline">Новый заказ</Button>
            </Link>
          </div>

          {orders.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-xl text-gray-600 mb-4">Заказов пока нет</p>
                <Link href="/">
                  <Button className="bg-red-600 hover:bg-red-700">Сделать первый заказ</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders
                .slice()
                .reverse()
                .map((order) => (
                  <Card key={order.orderNumber} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">Заказ #{order.orderNumber}</CardTitle>
                          <p className="text-gray-600">{order.customerName}</p>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(order.status)}
                            {getStatusText(order.status)}
                          </div>
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>
                              {item.name} x{item.quantity}
                            </span>
                            <span>{item.price * item.quantity}₽</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="font-semibold">Итого:</span>
                        <span className="font-bold text-lg text-red-600">{order.totalPrice}₽</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">{new Date(order.timestamp).toLocaleString("ru-RU")}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

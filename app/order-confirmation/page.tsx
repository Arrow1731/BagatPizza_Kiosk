"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Receipt } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function OrderConfirmation() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get("orderNumber")

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl text-center shadow-2xl">
        <CardHeader className="pb-6">
          <div className="mx-auto mb-6">
            <div className="relative">
              <CheckCircle className="h-24 w-24 text-green-500 mx-auto animate-bounce" />
              <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold animate-pulse">
                ✓
              </div>
            </div>
          </div>
          <CardTitle className="text-4xl font-bold text-green-600 mb-4">Buyurtma qabul qilindi</CardTitle>
          <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-2xl p-6 mx-4">
            <p className="text-lg mb-2">Buyurtma raqami:</p>
            <div className="text-6xl font-bold">{orderNumber}</div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Clock className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-semibold text-blue-800">Tayyorlanmoqda...</span>
            </div>
            <p className="text-lg text-blue-700">Taxminiy tayyorlanish vaqti: 10-15 daqiqa</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-800">Keyingi qadam?</h3>
            <div className="text-left space-y-4 max-w-lg mx-auto">
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  1
                </span>
                <div>
                  <p className="font-semibold">Buyurtma Oshxonaga jo'natildi</p>
                  {/* <p className="text-gray-600 text-sm">Повара уже готовят ваши блюда</p> */}
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  2
                </span>
                <div>
                  <p className="font-semibold">Manitor orqali buyutmangizni kuzatib boring</p>
                  <p className="text-gray-600 text-sm">Buyurtma tayyor bo'lgach Manitor orqali e'lon qilinadi</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  3
                </span>
                <div>
                  <p className="font-semibold">Buyutmangizni oling</p>
                  {/* <p className="text-gray-600 text-sm">Подойдите к стойке выдачи с номером</p> */}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 space-y-4">
            <Link href="/order-status">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-4 shadow-lg"
              >
                <Receipt className="mr-2 h-5 w-5" />
                Barcha buyurtmalarni ko'rish
              </Button>
            </Link>
            <div>
              <Link href="/">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4 border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                >
                  Yangi buyurtma berish
                </Button>
              </Link>
            </div>
          </div>

          <div className="text-sm text-gray-500 pt-6 border-t bg-gray-50 rounded-lg p-4">
            <p className="font-semibold mb-2">
              Buyurtma raqamini eslab qoling: <span className="text-red-600 text-lg">#{orderNumber}</span>
            </p>
            {/* <p>При возникновении вопросов обратитесь к персоналу</p> */}
            <p className="mt-2 text-xs">Check avtomatik tarzda beriladi</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

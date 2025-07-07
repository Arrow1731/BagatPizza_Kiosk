"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Plus, Minus, Trash2, CreditCard, Banknote, Loader2, Truck, Store, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useFirebaseCart } from "@/hooks/useFirebaseCart"
import { useFirebaseOrders } from "@/hooks/useFirebaseOrders"

export default function CartPage() {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash">("card")
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery" | "takeaway">("pickup")
  const [isOrdering, setIsOrdering] = useState(false)
  const [orderError, setOrderError] = useState<string | null>(null)
  const router = useRouter()

  const {
    cart,
    loading: cartLoading,
    error: cartError,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useFirebaseCart()

  const { createOrder, error: ordersError } = useFirebaseOrders()

  const removeItem = (itemId: number) => {
    updateQuantity(itemId, 0)
  }

  const handleOrder = async () => {
    if (cart.length === 0 || isOrdering) return

    setIsOrdering(true)
    setOrderError(null)

    try {
      console.log("🛒 Начинаем оформление заказа...")
      console.log("📦 Товары в корзине:", cart)
      console.log("💰 Общая сумма:", totalPrice)
      console.log("💳 Способ оплаты:", paymentMethod)
      console.log("🚚 Способ получения:", deliveryMethod)

      const orderData = {
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        totalPrice,
        status: "preparing" as const,
        paymentMethod,
        deliveryMethod,
      }

      console.log("📋 Данные заказа:", orderData)
      const order = await createOrder(orderData)
      console.log("✅ Заказ создан:", order)

      // Очищаем корзину после успешного заказа
      console.log("🧹 Очищаем корзину...")
      await clearCart()
      console.log("✅ Корзина очищена")

      // Переходим на страницу подтверждения
      console.log("🔄 Переход на страницу подтверждения...")
      router.push(`/order-confirmation?orderNumber=${order.orderNumber}`)
    } catch (error) {
      console.error("❌ Ошибка создания заказа:", error)
      setOrderError(`Ошибка: ${error}`)
    } finally {
      setIsOrdering(false)
    }
  }

  // Функция для получения текста способа доставки
  const getDeliveryMethodText = () => {
    switch (deliveryMethod) {
      case "pickup":
        return "O'zim olaman"
      case "delivery":
        return "Yetkazib berish"
      case "takeaway":
        return "Saboj"
      default:
        return "O'zim olaman"
    }
  }

  // Функция для получения времени ожидания
  const getDeliveryTime = () => {
    switch (deliveryMethod) {
      case "pickup":
        return "Buyurtma 15-20 daqiqada tayyor bo'ladi"
      case "delivery":
        return "Yetkazib berish 30-45 daqiqa"
      case "takeaway":
        return "Buyurtma 10-15 daqiqada tayyor bo'ladi"
      default:
        return "Buyurtma 15-20 daqiqada tayyor bo'ladi"
    }
  }

  if (cartLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-red-600" />
          <h2 className="text-xl font-semibold">Savat yuklanmoqda...</h2>
        </Card>
      </div>
    )
  }

  if (cartError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold mb-2">Yuklanishda xatolik</h2>
          <p className="text-gray-600 mb-4">{cartError}</p>
          <Button onClick={() => window.location.reload()}>Qayta urunib ko'rish</Button>
        </Card>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center shadow-2xl">
          <CardContent className="p-8">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold mb-4">Savat bosh</h2>
            <p className="text-gray-600 mb-6">Menyudan mahsulot tanlash</p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-lg px-8 py-3">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Menyuga qaytish
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <header className="bg-gradient-to-r from-red-600 via-red-700 to-orange-600 text-white shadow-2xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <ArrowLeft className="h-6 w-6" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Sizning buyurtmangiz</h1>
              <p className="text-lg opacity-90">
                {totalItems} mahsulot narxi {totalPrice} UZS
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Показываем ошибки */}
        {(orderError || ordersError) && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-red-600">
                <span className="text-2xl">⚠️</span>
                <div>
                  <h3 className="font-semibold">Buyurtma berishda xatolik</h3>
                  <p className="text-sm">{orderError || ordersError}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold mb-6">Savatdagi mahsulotlar</h2>
            {cart.map((item) => (
              <Card key={item.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex gap-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg sm:text-xl">{item.name}</h3>
                      <p className="text-gray-600 text-sm sm:text-base line-clamp-2">{item.description}</p>
                      <p className="text-red-600 font-bold text-xl sm:text-2xl mt-2">{item.price} UZS</p>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-10 w-10 border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-xl font-semibold min-w-[2.5rem] text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-10 w-10 border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Delivery and Payment Method - Combined */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Olish va to'lov usuli</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Delivery Method */}
                <div>
                  <h3 className="font-semibold mb-3 text-gray-700">Olish usuli</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <Button
                      variant={deliveryMethod === "pickup" ? "default" : "outline"}
                      size="lg"
                      className={`h-20 flex-col gap-2 text-xs ${
                        deliveryMethod === "pickup"
                          ? "bg-gradient-to-r from-red-600 to-orange-600"
                          : "border-red-200 hover:bg-red-50"
                      }`}
                      onClick={() => setDeliveryMethod("pickup")}
                    >
                      <Store className="h-5 w-5" />
                      <span>O'zim olaman</span>
                    </Button>
                    <Button
                      variant={deliveryMethod === "takeaway" ? "default" : "outline"}
                      size="lg"
                      className={`h-20 flex-col gap-2 text-xs ${
                        deliveryMethod === "takeaway"
                          ? "bg-gradient-to-r from-red-600 to-orange-600"
                          : "border-red-200 hover:bg-red-50"
                      }`}
                      onClick={() => setDeliveryMethod("takeaway")}
                    >
                      <ShoppingBag className="h-5 w-5" />
                      <span>Saboj</span>
                    </Button>
                    <Button
                      variant={deliveryMethod === "delivery" ? "default" : "outline"}
                      size="lg"
                      className={`h-20 flex-col gap-2 text-xs ${
                        deliveryMethod === "delivery"
                          ? "bg-gradient-to-r from-red-600 to-orange-600"
                          : "border-red-200 hover:bg-red-50"
                      }`}
                      onClick={() => setDeliveryMethod("delivery")}
                    >
                      <Truck className="h-5 w-5" />
                      <span>Yetkazib berish</span>
                    </Button>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="font-semibold mb-3 text-gray-700">To'lov turi</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant={paymentMethod === "card" ? "default" : "outline"}
                      size="lg"
                      className={`h-20 flex-col gap-2 ${
                        paymentMethod === "card"
                          ? "bg-gradient-to-r from-red-600 to-orange-600"
                          : "border-red-200 hover:bg-red-50"
                      }`}
                      onClick={() => setPaymentMethod("card")}
                    >
                      <CreditCard className="h-6 w-6" />
                      <span className="text-sm">Plastik karta</span>
                    </Button>
                    <Button
                      variant={paymentMethod === "cash" ? "default" : "outline"}
                      size="lg"
                      className={`h-20 flex-col gap-2 ${
                        paymentMethod === "cash"
                          ? "bg-gradient-to-r from-red-600 to-orange-600"
                          : "border-red-200 hover:bg-red-50"
                      }`}
                      onClick={() => setPaymentMethod("cash")}
                    >
                      <Banknote className="h-6 w-6" />
                      <span className="text-sm">Naxt pul</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Total */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Umumiy hisob</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-lg">
                    <span>Mahsulot ({totalItems} dona)</span>
                    <span>{totalPrice} UZS</span>
                  </div>
                  <hr className="my-3" />
                  <div className="flex justify-between text-2xl font-bold">
                    <span>Umumiy</span>
                    <span className="text-red-600">{totalPrice} UZS</span>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-xl py-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={handleOrder}
                  disabled={isOrdering}
                >
                  {isOrdering ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Buyurtma berilmoqda...
                    </>
                  ) : (
                    `${getDeliveryMethodText()} • ${paymentMethod === "card" ? "Karta" : "Naxt"}`
                  )}
                </Button>
                <p className="text-sm text-gray-600 text-center">{getDeliveryTime()}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
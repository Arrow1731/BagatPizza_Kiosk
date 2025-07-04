"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Plus, Minus, Star, Clock, Loader2 } from "lucide-react"
import Link from "next/link"
import { useFirebaseCart } from "@/hooks/useFirebaseCart"

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  category: string
  image: string
  rating: number
  cookTime: string
  popular?: boolean
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Классический Бургер",
    description: "Сочная говяжья котлета, свежий салат, помидор, огурец, фирменный соус",
    price: 350,
    category: "Бургеры",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    rating: 4.8,
    cookTime: "8-10 мин",
    popular: true,
  },
  {
    id: 2,
    name: "Чизбургер Делюкс",
    description: "Двойная котлета, расплавленный сыр чеддер, хрустящий бекон, карамелизированный лук",
    price: 450,
    category: "Бургеры",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
    rating: 4.9,
    cookTime: "10-12 мин",
    popular: true,
  },
  {
    id: 3,
    name: "Куриные Крылышки",
    description: "Острые крылышки в медово-барбекю глазури, подаются с соусом блю-чиз",
    price: 280,
    category: "Закуски",
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&h=300&fit=crop",
    rating: 4.7,
    cookTime: "12-15 мин",
  },
  {
    id: 4,
    name: "Картофель Фри",
    description: "Золотистый хрустящий картофель, приправленный морской солью",
    price: 150,
    category: "Гарниры",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop",
    rating: 4.6,
    cookTime: "5-7 мин",
  },
  {
    id: 5,
    name: "Кола",
    description: "Освежающий газированный напиток 0.5л со льдом",
    price: 120,
    category: "Напитки",
    image: "https://images.unsplash.com/photo-1581636625402-29d2c5b3cc88?w=400&h=300&fit=crop",
    rating: 4.5,
    cookTime: "1 мин",
  },
  {
    id: 6,
    name: "Лаваш с Курицей",
    description: "Нежная курица гриль, свежие овощи, соус цезарь в тонком лаваше",
    price: 320,
    category: "Лаваши",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    rating: 4.8,
    cookTime: "6-8 мин",
  },
  {
    id: 7,
    name: "Пицца Маргарита",
    description: "Классическая пицца с томатным соусом, моцареллой и свежим базиликом",
    price: 420,
    category: "Пицца",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    rating: 4.7,
    cookTime: "15-18 мин",
  },
  {
    id: 8,
    name: "Салат Цезарь",
    description: "Хрустящий салат романо, курица гриль, пармезан, сухарики, соус цезарь",
    price: 290,
    category: "Салаты",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
    rating: 4.6,
    cookTime: "5 мин",
  },
]

const categories = ["Hammasi", "Gamburgerlar", "Lavashi", "Pitsa", "Salatlar", "E'lonlar", "Gonorlar", "Ichimliklar"]

export default function KioskMenu() {
  const [selectedCategory, setSelectedCategory] = useState("Все")
  const { cart, loading, error, addToCart, removeFromCart, getItemQuantity, totalItems, totalPrice } = useFirebaseCart()

  const filteredItems =
    selectedCategory === "Все" ? menuItems : menuItems.filter((item) => item.category === selectedCategory)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-red-600" />
          <h2 className="text-xl font-semibold">Menyu yuklanmoqda...</h2>
          <p className="text-gray-600">Firebase-ga ulanish</p>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center">
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 via-red-700 to-orange-600 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-300 to-orange-200 bg-clip-text text-transparent">
              Bog'ot Pizza
              </h1>
              <p className="text-lg sm:text-xl opacity-90 mt-1">O'z-o'ziga xizmat ko'rsatish kioskasi</p>
            </div>
            <Link href="/cart">
              <Button
                size="lg"
                className="bg-white text-red-600 hover:bg-gray-100 text-lg sm:text-xl px-6 sm:px-8 py-3 sm:py-4 h-auto shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <ShoppingCart className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                <span className="hidden sm:inline">Savat </span>({totalItems})
                <Badge className="ml-2 sm:ml-3 bg-red-600 text-white text-base sm:text-lg px-2 sm:px-3 py-1">
                  {totalPrice} UZS
                </Badge>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Categories */}
        <div className="flex gap-2 sm:gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="lg"
              className={`text-base sm:text-lg px-4 sm:px-6 py-2 sm:py-3 whitespace-nowrap transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 shadow-lg transform scale-105"
                  : "border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Popular Items Banner */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Star className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500 fill-current" />
            Ommabop taomlar
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {menuItems
              .filter((item) => item.popular)
              .map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-red-300 transform hover:scale-105 bg-gradient-to-br from-white to-red-50"
                >
                  <div className="relative aspect-video bg-gray-100">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 left-2 bg-red-600 text-white">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      Хит
                    </Badge>
                    <Badge className="absolute top-2 right-2 bg-green-600 text-white">
                      <Clock className="h-3 w-3 mr-1" />
                      {item.cookTime}
                    </Badge>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg sm:text-xl">{item.name}</CardTitle>
                    <CardDescription className="text-sm sm:text-base">{item.description}</CardDescription>
                    <div className="flex justify-between items-center">
                      <div className="text-xl sm:text-2xl font-bold text-red-600">{item.price} UZS</div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{item.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      {getItemQuantity(item.id) > 0 ? (
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="text-xl font-semibold min-w-[2rem] text-center">
                            {getItemQuantity(item.id)}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                            onClick={() => addToCart(item)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="lg"
                          className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-base sm:text-lg px-4 sm:px-6 py-2 sm:py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                          onClick={() => addToCart(item)}
                        >
                          <Plus className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                          Qo'shish
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* All Menu Items */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
            {selectedCategory === "Все" ? "Barcha taomlar" : selectedCategory}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-red-300 transform hover:scale-105 bg-white"
              >
                <div className="relative aspect-video bg-gray-100">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                  {item.popular && (
                    <Badge className="absolute top-2 left-2 bg-red-600 text-white">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      Xit
                    </Badge>
                  )}
                  <Badge className="absolute top-2 right-2 bg-green-600 text-white">
                    <Clock className="h-3 w-3 mr-1" />
                    {item.cookTime}
                  </Badge>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg sm:text-xl">{item.name}</CardTitle>
                  <CardDescription className="text-sm sm:text-base line-clamp-2">{item.description}</CardDescription>
                  <div className="flex justify-between items-center">
                    <div className="text-xl sm:text-2xl font-bold text-red-600">{item.price} UZS</div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{item.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    {getItemQuantity(item.id) > 0 ? (
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 sm:h-10 sm:w-10 border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                        <span className="text-lg sm:text-xl font-semibold min-w-[2rem] text-center">
                          {getItemQuantity(item.id)}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 sm:h-10 sm:w-10 border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                          onClick={() => addToCart(item)}
                        >
                          <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="lg"
                        className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-sm sm:text-lg px-3 sm:px-6 py-2 sm:py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                        onClick={() => addToCart(item)}
                      >
                        <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-5 sm:w-5" />
                        Qo'shish
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Cart Button for Mobile */}
      {totalItems > 0 && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:hidden z-50">
          <Link href="/cart">
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 rounded-full h-14 w-14 sm:h-16 sm:w-16 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110"
            >
              <div className="flex flex-col items-center">
                <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
                <Badge className="absolute -top-2 -right-2 bg-white text-red-600 text-xs sm:text-sm min-w-[1.5rem] h-6">
                  {totalItems}
                </Badge>
              </div>
            </Button>
          </Link>
        </div>
      )}

      {/* Quick Access Links */}
      <div className="fixed bottom-4 left-4 space-y-2 hidden lg:block">
        <Link href="/kitchen">
          <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm">
            👨‍🍳 Oshxona
          </Button>
        </Link>
        <Link href="/display">
          <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm">
            📺 Zaldagi monitor
          </Button>
        </Link>
      </div>
    </div>
  )
}
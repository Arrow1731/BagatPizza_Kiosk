"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function TestCart() {
  const [cartData, setCartData] = useState<string>("")
  const [parsedCart, setParsedCart] = useState<any[]>([])

  useEffect(() => {
    loadCartData()
  }, [])

  const loadCartData = () => {
    const saved = localStorage.getItem("kiosk-cart")
    setCartData(saved || "null")

    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setParsedCart(Array.isArray(parsed) ? parsed : [])
      } catch (e) {
        setParsedCart([])
      }
    }
  }

  const clearCart = () => {
    localStorage.removeItem("kiosk-cart")
    loadCartData()
  }

  const addTestItem = () => {
    const testItem = {
      id: 999,
      name: "Тестовый товар",
      description: "Для проверки корзины",
      price: 100,
      category: "Тест",
      image: "/placeholder.svg",
      quantity: 1,
    }

    const existing = localStorage.getItem("kiosk-cart")
    let cart = []

    if (existing) {
      try {
        cart = JSON.parse(existing)
      } catch (e) {
        cart = []
      }
    }

    cart.push(testItem)
    localStorage.setItem("kiosk-cart", JSON.stringify(cart))
    loadCartData()
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Тестирование корзины</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-4">
              <Button onClick={loadCartData}>Обновить данные</Button>
              <Button onClick={addTestItem} variant="outline">
                Добавить тестовый товар
              </Button>
              <Button onClick={clearCart} variant="destructive">
                Очистить корзину
              </Button>
              <Link href="/">
                <Button variant="outline">Назад к меню</Button>
              </Link>
              <Link href="/cart">
                <Button>Открыть корзину</Button>
              </Link>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Данные в localStorage:</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">{cartData}</pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Распарсенные данные ({parsedCart.length} товаров):</h3>
              {parsedCart.length > 0 ? (
                <div className="space-y-2">
                  {parsedCart.map((item, index) => (
                    <div key={index} className="bg-white p-3 rounded border">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-600">
                        Количество: {item.quantity} | Цена: {item.price}₽
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Корзина пуста</p>
              )}
            </div>

            <div className="bg-blue-50 p-4 rounded">
              <h4 className="font-semibold mb-2">Инструкции по тестированию:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Нажмите "Добавить тестовый товар" чтобы добавить товар в корзину</li>
                <li>Перейдите на главную страницу и добавьте товары из меню</li>
                <li>Вернитесь сюда и нажмите "Обновить данные"</li>
                <li>Откройте корзину чтобы проверить отображение</li>
                <li>Используйте "Очистить корзину" для сброса</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

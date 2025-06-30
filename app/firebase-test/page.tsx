"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import Link from "next/link"

export default function FirebaseTest() {
  const [status, setStatus] = useState<string>("Не проверено")
  const [logs, setLogs] = useState<string[]>([])
  const [testData, setTestData] = useState<any[]>([])

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs((prev) => [...prev, `[${timestamp}] ${message}`])
    console.log(message)
  }

  const testFirebaseConnection = async () => {
    setLogs([])
    addLog("🔥 Начинаем тест Firebase...")

    try {
      // Тест 1: Запись данных
      addLog("📝 Тест 1: Создание тестового документа...")
      const testDoc = {
        message: "Тестовое сообщение",
        timestamp: new Date().toISOString(),
        testId: Math.random().toString(36).substr(2, 9),
      }

      const docRef = await addDoc(collection(db, "test"), testDoc)
      addLog(`✅ Документ создан с ID: ${docRef.id}`)

      // Тест 2: Чтение данных
      addLog("📖 Тест 2: Чтение данных из коллекции...")
      const querySnapshot = await getDocs(collection(db, "test"))
      const docs: any[] = []
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() })
      })

      addLog(`✅ Найдено документов: ${docs.length}`)
      setTestData(docs)

      // Тест 3: Удаление тестового документа
      addLog("🗑️ Тест 3: Удаление тестового документа...")
      await deleteDoc(doc(db, "test", docRef.id))
      addLog("✅ Документ удален")

      setStatus("✅ Все тесты пройдены успешно!")
      addLog("🎉 Firebase работает корректно!")
    } catch (error) {
      addLog(`❌ Ошибка: ${error}`)
      setStatus(`❌ Ошибка: ${error}`)
    }
  }

  const testOrders = async () => {
    addLog("📦 Тестируем создание заказа...")

    try {
      const testOrder = {
        orderNumber: Math.floor(Math.random() * 1000),
        items: [{ id: 1, name: "Тестовый бургер", quantity: 1, price: 350 }],
        totalPrice: 350,
        status: "preparing",
        paymentMethod: "card",
        kioskId: "kiosk-001",
        timestamp: new Date().toISOString(),
        createdAt: new Date(),
      }

      const docRef = await addDoc(collection(db, "orders"), testOrder)
      addLog(`✅ Тестовый заказ создан: ${docRef.id}`)

      // Читаем заказы
      const ordersSnapshot = await getDocs(collection(db, "orders"))
      addLog(`📋 Всего заказов в базе: ${ordersSnapshot.size}`)
    } catch (error) {
      addLog(`❌ Ошибка создания заказа: ${error}`)
    }
  }

  const clearTestData = async () => {
    try {
      addLog("🧹 Очищаем тестовые данные...")
      const querySnapshot = await getDocs(collection(db, "test"))

      for (const document of querySnapshot.docs) {
        await deleteDoc(doc(db, "test", document.id))
      }

      addLog(`✅ Удалено ${querySnapshot.size} тестовых документов`)
      setTestData([])
    } catch (error) {
      addLog(`❌ Ошибка очистки: ${error}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🔥 Тест Firebase подключения
              <Link href="/">
                <Button variant="outline" size="sm">
                  Назад к меню
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button onClick={testFirebaseConnection}>Тест подключения</Button>
                <Button onClick={testOrders} variant="outline">
                  Тест заказов
                </Button>
                <Button onClick={clearTestData} variant="destructive">
                  Очистить тесты
                </Button>
              </div>

              <div className="p-4 bg-gray-100 rounded">
                <strong>Статус:</strong> {status}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Логи */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>📋 Логи</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-black text-green-400 p-4 rounded font-mono text-sm max-h-96 overflow-y-auto">
              {logs.length === 0 ? (
                <div>Нажмите "Тест подключения" для начала...</div>
              ) : (
                logs.map((log, index) => <div key={index}>{log}</div>)
              )}
            </div>
          </CardContent>
        </Card>

        {/* Данные */}
        {testData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>📊 Тестовые данные</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">{JSON.stringify(testData, null, 2)}</pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

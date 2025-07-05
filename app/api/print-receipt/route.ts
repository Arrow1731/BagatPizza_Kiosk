import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { orderNumber, content, order } = await request.json()

    console.log(`🖨️ Печать чека для заказа #${orderNumber}`)

    // Здесь можно добавить интеграцию с конкретным принтером
    // Например, отправка на USB принтер, сетевой принтер или POS-терминал

    // Пример для различных типов принтеров:

    // 1. Для USB принтеров (требует дополнительное ПО)
    // await sendToUSBPrinter(content)

    // 2. Для сетевых принтеров
    // await sendToNetworkPrinter(content, '192.168.1.100')

    // 3. Для POS принтеров через ESC/POS команды
    // await sendToPOSPrinter(formatESCPOS(order))

    // Пока что просто логируем
    console.log("Содержимое чека:")
    console.log(content)

    return NextResponse.json({
      success: true,
      message: `Чек для заказа #${orderNumber} отправлен на печать`,
    })
  } catch (error) {
    console.error("Ошибка печати чека:", error)
    return NextResponse.json({ success: false, error: "Ошибка печати чека" }, { status: 500 })
  }
}

// Функция для форматирования в ESC/POS команды
function formatESCPOS(order: any) {
  const ESC = "\x21"
  const commands = [
    ESC + "@", // Инициализация принтера
    ESC + "a" + "\x01", // Выравнивание по центру
    ESC + "!" + "\x32", // Увеличенный шрифт
    "BOG'OT PIZZA\n",
    ESC + "!" + "\x00", // Обычный шрифт
    "================================\n",
    `Buyurtma #${order.orderNumber}\n`,
    `Sana: ${new Date(order.timestamp).toLocaleDateString("uz-UZ")}\n`,
    `Vaqt: ${new Date(order.timestamp).toLocaleTimeString("uz-UZ")}\n`,
    "--------------------------------\n",
    "MAHSULOTLAR:\n",
    "--------------------------------\n",
  ]

  // Добавляем товары
  order.items.forEach((item: any) => {
    commands.push(`${item.name} x${item.quantity}\n`)
    commands.push(`${(item.price * item.quantity).toLocaleString()} UZS\n`)
  })

  commands.push(
    "--------------------------------\n",
    `Olish: ${order.deliveryMethod === "delivery" ? "Yetkazib berish" : "O'zim olaman"}\n`,
    `To'lov: ${order.paymentMethod === "card" ? "Karta" : "Naxt"}\n`,
    "--------------------------------\n",
    ESC + "!" + "\x18", // Увеличенный шрифт для итога
    `JAMI: ${order.totalPrice.toLocaleString()} UZS\n`,
    ESC + "!" + "\x00", // Обычный шрифт
    "--------------------------------\n",
    "Rahmat! Yaxshi ishtaha!\n",
    "================================\n",
    "\n\n\n", // Отступ для отрыва
    ESC + "i", // Частичная обрезка
  )

  return commands.join("")
}
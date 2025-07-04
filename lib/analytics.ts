import { db } from "./firebase"
import { doc, increment, writeBatch } from "firebase/firestore"

export interface AnalyticsEntry {
  date: string
  orders: number
  revenue: number
  period: "daily" | "monthly" | "yearly"
  lastUpdated: Date
}

export class AnalyticsManager {
  // Обновление аналитики при добавлении заказа
  static async addOrderToAnalytics(orderData: {
    totalPrice: number
    timestamp: Date
  }) {
    const { totalPrice, timestamp } = orderData
    const batch = writeBatch(db)

    try {
      // Форматирование дат
      const date = timestamp.toISOString().split("T")[0]
      const month = `${timestamp.getFullYear()}-${String(timestamp.getMonth() + 1).padStart(2, "0")}`
      const year = `${timestamp.getFullYear()}`

      // Обновление дневной аналитики
      const dailyRef = doc(db, "analytics", `daily_${date}`)
      batch.set(
        dailyRef,
        {
          date,
          orders: increment(1),
          revenue: increment(totalPrice),
          period: "daily",
          lastUpdated: new Date(),
        },
        { merge: true },
      )

      // Обновление месячной аналитики
      const monthlyRef = doc(db, "analytics", `monthly_${month}`)
      batch.set(
        monthlyRef,
        {
          date: month,
          orders: increment(1),
          revenue: increment(totalPrice),
          period: "monthly",
          lastUpdated: new Date(),
        },
        { merge: true },
      )

      // Обновление годовой аналитики
      const yearlyRef = doc(db, "analytics", `yearly_${year}`)
      batch.set(
        yearlyRef,
        {
          date: year,
          orders: increment(1),
          revenue: increment(totalPrice),
          period: "yearly",
          lastUpdated: new Date(),
        },
        { merge: true },
      )

      await batch.commit()
      console.log("✅ Analytics updated successfully")
    } catch (error) {
      console.error("❌ Error updating analytics:", error)
      throw error
    }
  }

  // Синхронизация существующих заказов с аналитикой
  static async syncExistingOrders(orders: any[]) {
    console.log("🔄 Синхронизация аналитики с существующими заказами...")

    try {
      // Группируем заказы по датам
      const dailyStats: { [key: string]: { orders: number; revenue: number } } = {}
      const monthlyStats: { [key: string]: { orders: number; revenue: number } } = {}
      const yearlyStats: { [key: string]: { orders: number; revenue: number } } = {}

      orders.forEach((order) => {
        const timestamp = order.timestamp instanceof Date ? order.timestamp : new Date(order.timestamp)
        const date = timestamp.toISOString().split("T")[0]
        const month = `${timestamp.getFullYear()}-${String(timestamp.getMonth() + 1).padStart(2, "0")}`
        const year = `${timestamp.getFullYear()}`
        const revenue = order.totalPrice || 0

        // Дневная статистика
        if (!dailyStats[date]) {
          dailyStats[date] = { orders: 0, revenue: 0 }
        }
        dailyStats[date].orders += 1
        dailyStats[date].revenue += revenue

        // Месячная статистика
        if (!monthlyStats[month]) {
          monthlyStats[month] = { orders: 0, revenue: 0 }
        }
        monthlyStats[month].orders += 1
        monthlyStats[month].revenue += revenue

        // Годовая статистика
        if (!yearlyStats[year]) {
          yearlyStats[year] = { orders: 0, revenue: 0 }
        }
        yearlyStats[year].orders += 1
        yearlyStats[year].revenue += revenue
      })

      // Сохраняем в Firebase
      const batch = writeBatch(db)

      // Дневная аналитика
      Object.entries(dailyStats).forEach(([date, stats]) => {
        const ref = doc(db, "analytics", `daily_${date}`)
        batch.set(ref, {
          date,
          orders: stats.orders,
          revenue: stats.revenue,
          period: "daily",
          lastUpdated: new Date(),
        })
      })

      // Месячная аналитика
      Object.entries(monthlyStats).forEach(([month, stats]) => {
        const ref = doc(db, "analytics", `monthly_${month}`)
        batch.set(ref, {
          date: month,
          orders: stats.orders,
          revenue: stats.revenue,
          period: "monthly",
          lastUpdated: new Date(),
        })
      })

      // Годовая аналитика
      Object.entries(yearlyStats).forEach(([year, stats]) => {
        const ref = doc(db, "analytics", `yearly_${year}`)
        batch.set(ref, {
          date: year,
          orders: stats.orders,
          revenue: stats.revenue,
          period: "yearly",
          lastUpdated: new Date(),
        })
      })

      await batch.commit()
      console.log("✅ Аналитика синхронизирована")
    } catch (error) {
      console.error("❌ Ошибка синхронизации аналитики:", error)
      throw error
    }
  }
}
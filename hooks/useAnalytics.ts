"use client"

import { useState, useEffect } from "react"
import { db } from "../lib/firebase"
import { collection, onSnapshot, query, where, orderBy, limit } from "firebase/firestore"

export interface AnalyticsData {
  id: string
  date: string
  orders: number
  revenue: number
  period: "daily" | "monthly" | "yearly"
  lastUpdated: Date
}

export function useAnalytics(period: "daily" | "monthly" | "yearly" = "daily", limitCount = 30) {
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const q = query(
      collection(db, "analytics"),
      where("period", "==", period),
      orderBy("date", "desc"),
      limit(limitCount),
    )

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          lastUpdated: doc.data().lastUpdated?.toDate() || new Date(),
        })) as AnalyticsData[]

        setAnalytics(data.reverse()) // Reverse to show chronological order
        setLoading(false)
        setError(null)
      },
      (err) => {
        console.error("Error fetching analytics:", err)
        setError(err.message)
        setLoading(false)
      },
    )

    return () => unsubscribe()
  }, [period, limitCount])

  return { analytics, loading, error }
}
"use client";

import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  // Firestoredan buyurtmalarni olish
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "orders"), (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const d = doc.data();
        return {
          ...d,
          timestamp: d.timestamp?.toDate
            ? d.timestamp.toDate()
            : new Date(d.timestamp),
        };
      });
      setOrders(data);
    });

    return () => unsub();
  }, []);

  const now = new Date();

  // Sana tekshiruv funksiyalari
  const isToday = (date: Date) =>
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const isThisMonth = (date: Date) =>
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const isThisYear = (date: Date) => date.getFullYear() === now.getFullYear();

  // Filterlar
  const todayOrders = orders.filter((o) => isToday(o.timestamp));
  const monthOrders = orders.filter((o) => isThisMonth(o.timestamp));
  const yearOrders = orders.filter((o) => isThisYear(o.timestamp));

  // Daromad hisoblash
  const calcRevenue = (list: any[]) =>
    list.reduce((sum, o) => sum + (o.totalPrice || 0), 0);

  // Diagramma uchun ma’lumotlar
  const data = [
    {
      period: "Bugun",
      orders: todayOrders.length,
      revenue: calcRevenue(todayOrders),
    },
    {
      period: "Shu oy",
      orders: monthOrders.length,
      revenue: calcRevenue(monthOrders),
    },
    {
      period: "Shu yil",
      orders: yearOrders.length,
      revenue: calcRevenue(yearOrders),
    },
  ];

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Admin Paneli</h1>

      {/* Statistika kartalari */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((item) => (
          <Card key={item.period} className="shadow-md">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold text-gray-700">
                {item.period}
              </h2>
              <p className="text-sm text-gray-500">
                Buyurtmalar soni: {item.orders}
              </p>
              <p className="text-sm text-gray-500">
                Umumiy daromad: {item.revenue.toLocaleString()} so‘m
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Diagramma */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Buyurtma va daromad statistikasi
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="orders" fill="#60A5FA" name="Buyurtmalar" />
            <Bar dataKey="revenue" fill="#34D399" name="Daromad (so‘m)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
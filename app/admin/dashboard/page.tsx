// "use client";

// import { useEffect, useState } from "react";
// import { db } from "../../../lib/firebase";
// import { collection, onSnapshot } from "firebase/firestore";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import { Card, CardContent } from "@/components/ui/card";

// export default function AdminDashboard() {
//   const [orders, setOrders] = useState([]);

//   // Firestoredan buyurtmalarni olish
//   useEffect(() => {
//     const unsub = onSnapshot(collection(db, "orders"), (snapshot) => {
//       const data = snapshot.docs.map((doc) => {
//         const d = doc.data();
//         return {
//           ...d,
//           timestamp: d.timestamp?.toDate
//             ? d.timestamp.toDate()
//             : new Date(d.timestamp),
//         };
//       });
//       setOrders(data);
//     });

//     return () => unsub();
//   }, []);

//   const now = new Date();

//   // Sana tekshiruv funksiyalari
//   const isToday = (date: Date) =>
//     date.getDate() === now.getDate() &&
//     date.getMonth() === now.getMonth() &&
//     date.getFullYear() === now.getFullYear();

//   const isThisMonth = (date: Date) =>
//     date.getMonth() === now.getMonth() &&
//     date.getFullYear() === now.getFullYear();

//   const isThisYear = (date: Date) => date.getFullYear() === now.getFullYear();

//   // Filterlar
//   const todayOrders = orders.filter((o) => isToday(o.timestamp));
//   const monthOrders = orders.filter((o) => isThisMonth(o.timestamp));
//   const yearOrders = orders.filter((o) => isThisYear(o.timestamp));

//   // Daromad hisoblash
//   const calcRevenue = (list: any[]) =>
//     list.reduce((sum, o) => sum + (o.totalPrice || 0), 0);

//   // Diagramma uchun ma’lumotlar
//   const data = [
//     {
//       period: "Bugun",
//       orders: todayOrders.length,
//       revenue: calcRevenue(todayOrders),
//     },
//     {
//       period: "Shu oy",
//       orders: monthOrders.length,
//       revenue: calcRevenue(monthOrders),
//     },
//     {
//       period: "Shu yil",
//       orders: yearOrders.length,
//       revenue: calcRevenue(yearOrders),
//     },
//   ];

//   return (
//     <div className="p-6 space-y-8">
//       <h1 className="text-3xl font-bold text-gray-800">Admin Paneli</h1>

//       {/* Statistika kartalari */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {data.map((item) => (
//           <Card key={item.period} className="shadow-md">
//             <CardContent className="p-4">
//               <h2 className="text-xl font-semibold text-gray-700">
//                 {item.period}
//               </h2>
//               <p className="text-sm text-gray-500">
//                 Buyurtmalar soni: {item.orders}
//               </p>
//               <p className="text-sm text-gray-500">
//                 Umumiy daromad: {item.revenue.toLocaleString()} so‘m
//               </p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Diagramma */}
//       <div className="bg-white p-4 rounded-lg shadow-md">
//         <h2 className="text-xl font-bold mb-4 text-gray-800">
//           Buyurtma va daromad statistikasi
//         </h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={data}>
//             <XAxis dataKey="period" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="orders" fill="#60A5FA" name="Buyurtmalar" />
//             <Bar dataKey="revenue" fill="#34D399" name="Daromad (so‘m)" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }















"use client";

import { useEffect, useState } from "react";
import { db, storage } from "../../../lib/firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

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
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

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
  const isToday = (date: Date) =>
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();
  const isThisMonth = (date: Date) =>
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();
  const isThisYear = (date: Date) => date.getFullYear() === now.getFullYear();

  const todayOrders = orders.filter((o) => isToday(o.timestamp));
  const monthOrders = orders.filter((o) => isThisMonth(o.timestamp));
  const yearOrders = orders.filter((o) => isThisYear(o.timestamp));

  const calcRevenue = (list: any[]) =>
    list.reduce((sum, o) => sum + (o.totalPrice || 0), 0);

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

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !category || !imageFile) {
      alert("Iltimos, barcha maydonlarni to‘ldiring.");
      return;
    }

    setLoading(true);
    try {
      const imageRef = ref(storage, `products/${Date.now()}-${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);

      await addDoc(collection(db, "products"), {
        title,
        price: Number(price),
        category,
        imageUrl,
        createdAt: serverTimestamp(),
      });

      alert("Mahsulot muvaffaqiyatli qo‘shildi!");
      setTitle("");
      setPrice("");
      setCategory("");
      setImageFile(null);
    } catch (err) {
      console.error("Xatolik:", err);
      alert("Mahsulot qo‘shishda xatolik yuz berdi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Admin Paneli</h1>

      {/* Statistika */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((item) => (
          <Card key={item.period} className="shadow-md">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold text-gray-700">
                {item.period}
              </h2>
              <p className="text-sm text-gray-500">
                Buyurtmalar: {item.orders}
              </p>
              <p className="text-sm text-gray-500">
                Daromad: {item.revenue.toLocaleString()} so‘m
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Diagramma */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Statistika (Buyurtma va Daromad)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="orders" fill="#60A5FA" name="Buyurtmalar" />
            <Bar dataKey="revenue" fill="#34D399" name="Daromad" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Mahsulot qo‘shish formasi */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Mahsulot qo‘shish</h2>

        <form onSubmit={handleAddProduct} className="space-y-4">
          <input
            type="text"
            placeholder="Mahsulot nomi"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Narxi (so‘m)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Kategoriya"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Yuklanmoqda..." : "Qo‘shish"}
          </button>
        </form>
      </div>
    </div>
  );
}
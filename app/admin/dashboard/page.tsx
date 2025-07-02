"use client";

import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  rating?: number;
  cookTime?: string;
  popular?: boolean;
}

const categories = ["Бургеры", "Лаваши", "Пицца", "Салаты", "Закуски", "Гарниры", "Напитки"];

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: categories[0],
    rating: "4.5",
    cookTime: "5 мин",
    popular: false,
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const productsRef = collection(db, "products");

  const loadProducts = async () => {
    const snapshot = await getDocs(productsRef);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [target.name]: target.checked,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [target.name]: target.value,
      }));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const imageRef = ref(storage, `products/${Date.now()}-${file.name}`);
    await uploadBytes(imageRef, file);
    const url = await getDownloadURL(imageRef);
    setForm((prev) => ({ ...prev, image: url }));
    setUploading(false);
  };

  const clearForm = () =>
    setForm({
      name: "",
      description: "",
      price: "",
      image: "",
      category: categories[0],
      rating: "4.5",
      cookTime: "5 мин",
      popular: false,
    });

  const handleAdd = async () => {
    if (!form.name || !form.price || !form.image) return alert("Barcha maydonlar to‘ldirilishi kerak!");

    const newProduct = {
      name: form.name,
      description: form.description,
      price: parseInt(form.price),
      image: form.image,
      category: form.category,
      rating: parseFloat(form.rating),
      cookTime: form.cookTime,
      popular: form.popular,
    };

    await addDoc(productsRef, newProduct);
    clearForm();
    loadProducts();
  };

  const handleUpdate = async () => {
    if (!editId) return;

    await updateDoc(doc(productsRef, editId), {
      ...form,
      price: parseInt(form.price),
      rating: parseFloat(form.rating),
    });

    setEditId(null);
    clearForm();
    loadProducts();
  };

  const handleEdit = (product: Product) => {
    setEditId(product.id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image: product.image || "",
      category: product.category,
      rating: product.rating?.toString() || "4.5",
      cookTime: product.cookTime || "",
      popular: product.popular || false,
    });
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(productsRef, id));
    loadProducts();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">🛠 Mahsulotlar boshqaruvi</h2>

      <div className="grid gap-4 bg-gray-100 p-4 rounded-xl">
        <input
          type="text"
          name="name"
          value={form.name}
          placeholder="Nomi"
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <textarea
          name="description"
          value={form.description}
          placeholder="Tavsifi"
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="price"
          value={form.price}
          placeholder="Narxi (so‘m)"
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <select name="category" value={form.category} onChange={handleChange} className="p-2 border rounded">
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="text"
          name="cookTime"
          value={form.cookTime}
          placeholder="Pishirish vaqti"
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="rating"
          value={form.rating}
          placeholder="Reyting (4.5)"
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="popular"
            checked={form.popular}
            onChange={handleChange}
          />
          🔥 Mashhur taom
        </label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {uploading && <p>Yuklanmoqda...</p>}
        {form.image && <img src={form.image} alt="Preview" className="w-32 h-32 object-cover rounded border" />}
        <div className="flex gap-3">
          {editId ? (
            <button onClick={handleUpdate} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
              Yangilash
            </button>
          ) : (
            <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Qo‘shish
            </button>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold">📦 Mahsulotlar ro‘yxati</h3>
        {products.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <p className="font-bold">{item.name} ({item.category})</p>
              <p className="text-sm text-gray-500">{item.price.toLocaleString()} so‘m</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Tahrirlash
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                O‘chirish
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
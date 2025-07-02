"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      router.push("/admin/dashboard");
    } else {
      alert("Noto‘g‘ri login yoki parol");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <input
        type="text"
        placeholder="Foydalanuvchi nomi"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input input-bordered w-full max-w-xs p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Parol"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input input-bordered w-full max-w-xs p-2 border rounded"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Kirish
      </button>
    </div>
  );
}
// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { ShoppingCart, Plus, Minus, Star, Clock, Loader2 } from "lucide-react"
// import Link from "next/link"
// import { useFirebaseCart } from "@/hooks/useFirebaseCart"

// interface MenuItem {
//   id: number
//   name: string
//   description: string
//   price: number
//   category: string
//   image: string
//   rating: number
//   cookTime: string
//   popular?: boolean
// }

// const menuItems: MenuItem[] = [
//   {
//     id: 1,
//     name: "Классический Бургер",
//     description: "Сочная говяжья котлета, свежий салат, помидор, огурец, фирменный соус",
//     price: 350,
//     category: "Бургеры",
//     image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
//     rating: 4.8,
//     cookTime: "8-10 мин",
//     popular: true,
//   },
//   {
//     id: 2,
//     name: "Чизбургер Делюкс",
//     description: "Двойная котлета, расплавленный сыр чеддер, хрустящий бекон, карамелизированный лук",
//     price: 450,
//     category: "Бургеры",
//     image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
//     rating: 4.9,
//     cookTime: "10-12 мин",
//     popular: true,
//   },
//   {
//     id: 3,
//     name: "Куриные Крылышки",
//     description: "Острые крылышки в медово-барбекю глазури, подаются с соусом блю-чиз",
//     price: 280,
//     category: "Закуски",
//     image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&h=300&fit=crop",
//     rating: 4.7,
//     cookTime: "12-15 мин",
//   },
//   {
//     id: 4,
//     name: "Картофель Фри",
//     description: "Золотистый хрустящий картофель, приправленный морской солью",
//     price: 150,
//     category: "Гарниры",
//     image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop",
//     rating: 4.6,
//     cookTime: "5-7 мин",
//   },
//   {
//     id: 5,
//     name: "Кола",
//     description: "Освежающий газированный напиток 0.5л со льдом",
//     price: 120,
//     category: "Напитки",
//     image: "https://images.unsplash.com/photo-1581636625402-29d2c5b3cc88?w=400&h=300&fit=crop",
//     rating: 4.5,
//     cookTime: "1 мин",
//   },
//   {
//     id: 6,
//     name: "Лаваш с Курицей",
//     description: "Нежная курица гриль, свежие овощи, соус цезарь в тонком лаваше",
//     price: 320,
//     category: "Лаваши",
//     image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
//     rating: 4.8,
//     cookTime: "6-8 мин",
//   },
//   {
//     id: 7,
//     name: "Пицца Маргарита",
//     description: "Классическая пицца с томатным соусом, моцареллой и свежим базиликом",
//     price: 420,
//     category: "Пицца",
//     image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
//     rating: 4.7,
//     cookTime: "15-18 мин",
//   },
//   {
//     id: 8,
//     name: "Салат Цезарь",
//     description: "Хрустящий салат романо, курица гриль, пармезан, сухарики, соус цезарь",
//     price: 290,
//     category: "Салаты",
//     image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
//     rating: 4.6,
//     cookTime: "5 мин",
//   },
// ]

// const categories = ["Hammasi", "Burger", "ichimlik", "Hot-dog", "KFC", "Lavash", "Pizza", ]

// export default function KioskMenu() {
//   const [selectedCategory, setSelectedCategory] = useState("Все")
//   const { cart, loading, error, addToCart, removeFromCart, getItemQuantity, totalItems, totalPrice } = useFirebaseCart()

//   const filteredItems =
//     selectedCategory === "Все" ? menuItems : menuItems.filter((item) => item.category === selectedCategory)

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center">
//         <Card className="p-8 text-center">
//           <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-red-600" />
//           <h2 className="text-xl font-semibold">Menyu yuklanmoqda...</h2>
//           <p className="text-gray-600">Firebase-ga ulanish</p>
//         </Card>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center">
//         <Card className="p-8 text-center max-w-md">
//           <div className="text-red-500 text-4xl mb-4">⚠️</div>
//           <h2 className="text-xl font-semibold mb-2">Ulanish xatosi</h2>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <Button onClick={() => window.location.reload()}>Qayta urinib ko'ring</Button>
//         </Card>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
//       {/* Header */}
//       <header className="bg-gradient-to-r from-red-600 via-red-700 to-orange-600 text-white shadow-2xl">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
//             <div className="text-center sm:text-left">
//               <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-300 to-orange-200 bg-clip-text text-transparent">
//               Bog'ot Pizza
//               </h1>
//               <p className="text-lg sm:text-xl opacity-90 mt-1">O'z-o'ziga xizmat ko'rsatish kioskasi</p>
//             </div>
//             <Link href="/cart">
//               <Button
//                 size="lg"
//                 className="bg-white text-red-600 hover:bg-gray-100 text-lg sm:text-xl px-6 sm:px-8 py-3 sm:py-4 h-auto shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
//               >
//                 <ShoppingCart className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
//                 <span className="hidden sm:inline">Savat </span>({totalItems})
//                 <Badge className="ml-2 sm:ml-3 bg-red-600 text-white text-base sm:text-lg px-2 sm:px-3 py-1">
//                   {totalPrice} UZS
//                 </Badge>
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         {/* Categories */}
//         <div className="flex gap-2 sm:gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
//           {categories.map((category) => (
//             <Button
//               key={category}
//               variant={selectedCategory === category ? "default" : "outline"}
//               size="lg"
//               className={`text-base sm:text-lg px-4 sm:px-6 py-2 sm:py-3 whitespace-nowrap transition-all duration-300 ${
//                 selectedCategory === category
//                   ? "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 shadow-lg transform scale-105"
//                   : "border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
//               }`}
//               onClick={() => setSelectedCategory(category)}
//             >
//               {category}
//             </Button>
//           ))}
//         </div>

//         {/* Popular Items Banner */}
//         <div className="mb-8">
//           <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 flex items-center gap-2">
//             <Star className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500 fill-current" />
//             Ommabop taomlar
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//             {menuItems
//               .filter((item) => item.popular)
//               .map((item) => (
//                 <Card
//                   key={item.id}
//                   className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-red-300 transform hover:scale-105 bg-gradient-to-br from-white to-red-50"
//                 >
//                   <div className="relative aspect-video bg-gray-100">
//                     <img
//                       src={item.image || "/placeholder.svg"}
//                       alt={item.name}
//                       className="w-full h-full object-cover"
//                     />
//                     <Badge className="absolute top-2 left-2 bg-red-600 text-white">
//                       <Star className="h-3 w-3 mr-1 fill-current" />
//                       Хит
//                     </Badge>
//                     <Badge className="absolute top-2 right-2 bg-green-600 text-white">
//                       <Clock className="h-3 w-3 mr-1" />
//                       {item.cookTime}
//                     </Badge>
//                   </div>
//                   <CardHeader className="pb-3">
//                     <CardTitle className="text-lg sm:text-xl">{item.name}</CardTitle>
//                     <CardDescription className="text-sm sm:text-base">{item.description}</CardDescription>
//                     <div className="flex justify-between items-center">
//                       <div className="text-xl sm:text-2xl font-bold text-red-600">{item.price} UZS</div>
//                       <div className="flex items-center gap-1">
//                         <Star className="h-4 w-4 text-yellow-500 fill-current" />
//                         <span className="text-sm font-medium">{item.rating}</span>
//                       </div>
//                     </div>
//                   </CardHeader>
//                   <CardContent className="pt-0">
//                     <div className="flex items-center justify-between">
//                       {getItemQuantity(item.id) > 0 ? (
//                         <div className="flex items-center gap-3">
//                           <Button
//                             variant="outline"
//                             size="icon"
//                             className="h-10 w-10 border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
//                             onClick={() => removeFromCart(item.id)}
//                           >
//                             <Minus className="h-4 w-4" />
//                           </Button>
//                           <span className="text-xl font-semibold min-w-[2rem] text-center">
//                             {getItemQuantity(item.id)}
//                           </span>
//                           <Button
//                             variant="outline"
//                             size="icon"
//                             className="h-10 w-10 border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
//                             onClick={() => addToCart(item)}
//                           >
//                             <Plus className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       ) : (
//                         <Button
//                           size="lg"
//                           className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-base sm:text-lg px-4 sm:px-6 py-2 sm:py-3 shadow-lg hover:shadow-xl transition-all duration-300"
//                           onClick={() => addToCart(item)}
//                         >
//                           <Plus className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
//                           Qo'shish
//                         </Button>
//                       )}
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//           </div>
//         </div>

//         {/* All Menu Items */}
//         <div className="mb-8">
//           <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
//             {selectedCategory === "Все" ? "Barcha taomlar" : selectedCategory}
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
//             {filteredItems.map((item) => (
//               <Card
//                 key={item.id}
//                 className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-red-300 transform hover:scale-105 bg-white"
//               >
//                 <div className="relative aspect-video bg-gray-100">
//                   <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
//                   {item.popular && (
//                     <Badge className="absolute top-2 left-2 bg-red-600 text-white">
//                       <Star className="h-3 w-3 mr-1 fill-current" />
//                       Xit
//                     </Badge>
//                   )}
//                   <Badge className="absolute top-2 right-2 bg-green-600 text-white">
//                     <Clock className="h-3 w-3 mr-1" />
//                     {item.cookTime}
//                   </Badge>
//                 </div>
//                 <CardHeader className="pb-3">
//                   <CardTitle className="text-lg sm:text-xl">{item.name}</CardTitle>
//                   <CardDescription className="text-sm sm:text-base line-clamp-2">{item.description}</CardDescription>
//                   <div className="flex justify-between items-center">
//                     <div className="text-xl sm:text-2xl font-bold text-red-600">{item.price} UZS</div>
//                     <div className="flex items-center gap-1">
//                       <Star className="h-4 w-4 text-yellow-500 fill-current" />
//                       <span className="text-sm font-medium">{item.rating}</span>
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="pt-0">
//                   <div className="flex items-center justify-between">
//                     {getItemQuantity(item.id) > 0 ? (
//                       <div className="flex items-center gap-3">
//                         <Button
//                           variant="outline"
//                           size="icon"
//                           className="h-8 w-8 sm:h-10 sm:w-10 border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
//                           onClick={() => removeFromCart(item.id)}
//                         >
//                           <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
//                         </Button>
//                         <span className="text-lg sm:text-xl font-semibold min-w-[2rem] text-center">
//                           {getItemQuantity(item.id)}
//                         </span>
//                         <Button
//                           variant="outline"
//                           size="icon"
//                           className="h-8 w-8 sm:h-10 sm:w-10 border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
//                           onClick={() => addToCart(item)}
//                         >
//                           <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
//                         </Button>
//                       </div>
//                     ) : (
//                       <Button
//                         size="lg"
//                         className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-sm sm:text-lg px-3 sm:px-6 py-2 sm:py-3 shadow-lg hover:shadow-xl transition-all duration-300"
//                         onClick={() => addToCart(item)}
//                       >
//                         <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-5 sm:w-5" />
//                         Qo'shish
//                       </Button>
//                     )}
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Floating Cart Button for Mobile */}
//       {totalItems > 0 && (
//         <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:hidden z-50">
//           <Link href="/cart">
//             <Button
//               size="lg"
//               className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 rounded-full h-14 w-14 sm:h-16 sm:w-16 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110"
//             >
//               <div className="flex flex-col items-center">
//                 <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
//                 <Badge className="absolute -top-2 -right-2 bg-white text-red-600 text-xs sm:text-sm min-w-[1.5rem] h-6">
//                   {totalItems}
//                 </Badge>
//               </div>
//             </Button>
//           </Link>
//         </div>
//       )}

//       {/* Quick Access Links */}
//       <div className="fixed bottom-4 left-4 space-y-2 hidden lg:block">
//         <Link href="/kitchen">
//           <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm">
//             👨‍🍳 Oshxona
//           </Button>
//         </Link>
//         <Link href="/display">
//           <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm">
//             📺 Zaldagi monitor
//           </Button>
//         </Link>
//       </div>
//     </div>
//   )
// }









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
    name: "Kombo Pizza",
    description: "Bu pizza, ichimlik va yondama taomlar jamlangan qulay to‘plam. Narxi tejamli va do‘stlar bilan baham ko‘rishga qulay.",
    price: 60000,
    category: "Pizza",
    image: "https://venicesfpizza.com/wp-content/uploads/2021/09/Supreme-Combo-Pizza.jpg",
    rating: 4.7,
    cookTime: "15-25 min",
  },
  {
    id: 2,
    name: "Qazi Pizza",
    description: "Bu milliy ta’mga moslashtirilgan pizza bo‘lib, ustiga qazi, pishloq va sabzavotlar qo‘shiladi.",
    price: 110000,
    category: "Pizza",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx9_qGgZJVTVRw7L1K3alz0q0dg7ChnmDELZJ722KgV703a9yCCBzH6hzfSV7IS88PExY&usqp=CAU",
    rating: 4.7,
    cookTime: "20-25 min",
  },
  {
    id: 3,
    name: "Sezar Pizza",
    description: "Bu mashhur Sezar salati asosida tayyorlangan pizza bo‘lib, ustiga tovuq go‘shti, pomidor, Sezar sousi va parmezan qo‘shiladi.",
    price: 7000,
    category: "Pizza",
    image: "https://elizinn.com.tr/wp-content/uploads/2022/11/p6-600x600.jpg",
    rating: 4.7,
    cookTime: "15-20 min",
  },
  {
    id: 4,
    name: "Qiymali Pizza",
    description: "Bu ustiga mol go‘shti qiymasi, pomidor, piyoz va pishloq solinadigan pizza turi.",
    price: 70000,
    category: "Pizza",
    image: "https://imageproxy.wolt.com/menu/menu-images/shared/caa8246a-56bc-11ee-a242-5a69ca56eef4_qarisiq_32sm_14.7_28sm_12.3.jpg",
    rating: 4.6,
    cookTime: "20-25 min",
  },
  {
    id: 5,
    name: "Danar Pizza",
    description: "bu ustiga donar go‘shti (sho‘r va ziravorli kabob go‘shti), sabzavotlar va souslar qo‘shilgan pizza turi.",
    price: 80000,
    category: "ichimlik",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQSZtWTOL-V6DUh1ktXqOhLU7ZlI7XpFmDaA&s",
    rating: 4.5,
    cookTime: "15-20 min",
  },
  {
    id: 6,
    name: "Margarita",
    description: "Bu klassik italyan pitzasi bo‘lib, ustiga faqat pomidor sousi, mozzarella pishlog‘i va reyhan qo‘shiladi.",
    price: 60000,
    category: "Lavash",
    image: "https://img.taste.com.au/DhThzPm9/taste/2016/11/eat-pray-love-39581-3.jpeg",
    rating: 4.8,
    cookTime: "12-18 min",
  },
  {
    id: 7,
    name: "Assorti Pizza",
    description: "Bu turli xil taomlardan aralashtirilgan pizza bo‘lib, odatda kolbasa, qo‘ziqorin, zaytun, sabzavot va pishloq qo‘shiladi.",
    price: 110000,
    category: "Pizza",
    image: "https://www.mashed.com/img/gallery/what-you-should-know-about-pizza-huts-hot-dog-stuffed-crust-pizza/intro-1657418310.webp",
    rating: 4.7,
    cookTime: "20-25 min",
  },
  {
    id: 8,
    name: "Peperoni kichik",
    description: "Bu eng mashhur pizzalardan biri bo‘lib, ustiga qizartirilgan kolbasa (pepperoni), pomidor sousi va mozzarella pishlog‘i qo‘yiladi.",
    price: 60000,
    category: "Pizza",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_tamoqMRIezOD7P6uZXGPPdOfGv1NhNcK1w&s",
    rating: 4.6,
    cookTime: "12-18 min",
  },
  {
    id: 9,
    name: "Peperoni katta",
    description: "Bu eng mashhur pizzalardan biri bo‘lib, ustiga qizartirilgan kolbasa (pepperoni), pomidor sousi va mozzarella pishlog‘i qo‘yiladi.",
    price: 80000,
    category: "Pizza",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_tamoqMRIezOD7P6uZXGPPdOfGv1NhNcK1w&s",
    rating: 4.6,
    cookTime: "12-18 min",
  },
  {
    id: 10,
    name: "Sosiskali Pizza",
    description: " bu ustiga kesilgan sosiska, pomidor sousi va pishloq qo‘shilgan oddiy va mazali pizza turi.",
    price: 90000,
    category: "Pizza",
    image: "https://www.mashed.com/img/gallery/what-you-should-know-about-pizza-huts-hot-dog-stuffed-crust-pizza/intro-1657418310.webp",
    rating: 4.6,
    cookTime: "15-20 min",
  },{
    id: 11,
    name: "Gamburger",
    description: "Bu ikki dona bulka orasiga qiyma go‘sht kotleti, pishloq, pomidor, salat bargi, piyoz va souslar (masalan, ketchup, mayonez) qo‘yilgan fast food taomidir.",
    price: 30000,
    category: "Burger",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX_xqdQ2fJ5BW_glIGLRNhoIs4xmoW0II2-w&s",
    rating: 4.6,
    cookTime: "10-15 min",
  },{
    id: 12,
    name: "Chizburger",
    description: "Bu oddiy gamburgerga o‘xshaydi, lekin ichida pishloq (cheese) bo‘ladi.",
    price: 40000,
    category: "Burger",
    image: "data:image/jpeg;base64,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",
    rating: 4.6,
    cookTime: "10-12 min",
  },{
    id: 13,
    name: "Peperoni katta",
    description: "Bu eng mashhur pizzalardan biri bo‘lib, ustiga qizartirilgan kolbasa (pepperoni), pomidor sousi va mozzarella pishlog‘i qo‘yiladi.",
    price: 80000,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
    rating: 4.6,
    cookTime: "12-18 min",
  },{
    id: 14,
    name: "Peperoni katta",
    description: "Bu eng mashhur pizzalardan biri bo‘lib, ustiga qizartirilgan kolbasa (pepperoni), pomidor sousi va mozzarella pishlog‘i qo‘yiladi.",
    price: 80000,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
    rating: 4.6,
    cookTime: "12-18 min",
  },{
    id: 9,
    name: "Peperoni katta",
    description: "Bu eng mashhur pizzalardan biri bo‘lib, ustiga qizartirilgan kolbasa (pepperoni), pomidor sousi va mozzarella pishlog‘i qo‘yiladi.",
    price: 80000,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
    rating: 4.6,
    cookTime: "12-18 min",
  },{
    id: 9,
    name: "Peperoni katta",
    description: "Bu eng mashhur pizzalardan biri bo‘lib, ustiga qizartirilgan kolbasa (pepperoni), pomidor sousi va mozzarella pishlog‘i qo‘yiladi.",
    price: 80000,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
    rating: 4.6,
    cookTime: "12-18 min",
  },{
    id: 9,
    name: "Peperoni katta",
    description: "Bu eng mashhur pizzalardan biri bo‘lib, ustiga qizartirilgan kolbasa (pepperoni), pomidor sousi va mozzarella pishlog‘i qo‘yiladi.",
    price: 80000,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
    rating: 4.6,
    cookTime: "12-18 min",
  },{
    id: 9,
    name: "Peperoni katta",
    description: "Bu eng mashhur pizzalardan biri bo‘lib, ustiga qizartirilgan kolbasa (pepperoni), pomidor sousi va mozzarella pishlog‘i qo‘yiladi.",
    price: 80000,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
    rating: 4.6,
    cookTime: "12-18 min",
  },{
    id: 9,
    name: "Peperoni katta",
    description: "Bu eng mashhur pizzalardan biri bo‘lib, ustiga qizartirilgan kolbasa (pepperoni), pomidor sousi va mozzarella pishlog‘i qo‘yiladi.",
    price: 80000,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
    rating: 4.6,
    cookTime: "12-18 min",
  },{
    id: 9,
    name: "Peperoni katta",
    description: "Bu eng mashhur pizzalardan biri bo‘lib, ustiga qizartirilgan kolbasa (pepperoni), pomidor sousi va mozzarella pishlog‘i qo‘yiladi.",
    price: 80000,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
    rating: 4.6,
    cookTime: "12-18 min",
  },{
    id: 9,
    name: "Peperoni katta",
    description: "Bu eng mashhur pizzalardan biri bo‘lib, ustiga qizartirilgan kolbasa (pepperoni), pomidor sousi va mozzarella pishlog‘i qo‘yiladi.",
    price: 80000,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
    rating: 4.6,
    cookTime: "12-18 min",
  },{
    id: 9,
    name: "Peperoni katta",
    description: "Bu eng mashhur pizzalardan biri bo‘lib, ustiga qizartirilgan kolbasa (pepperoni), pomidor sousi va mozzarella pishlog‘i qo‘yiladi.",
    price: 80000,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
    rating: 4.6,
    cookTime: "12-18 min",
  },{
    id: 9,
    name: "Peperoni katta",
    description: "Bu eng mashhur pizzalardan biri bo‘lib, ustiga qizartirilgan kolbasa (pepperoni), pomidor sousi va mozzarella pishlog‘i qo‘yiladi.",
    price: 80000,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
    rating: 4.6,
    cookTime: "12-18 min",
  },{
    id: 9,
    name: "Peperoni katta",
    description: "Bu eng mashhur pizzalardan biri bo‘lib, ustiga qizartirilgan kolbasa (pepperoni), pomidor sousi va mozzarella pishlog‘i qo‘yiladi.",
    price: 80000,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
    rating: 4.6,
    cookTime: "12-18 min",
  },{
    id: 9,
    name: "Peperoni katta",
    description: "Bu eng mashhur pizzalardan biri bo‘lib, ustiga qizartirilgan kolbasa (pepperoni), pomidor sousi va mozzarella pishlog‘i qo‘yiladi.",
    price: 80000,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
    rating: 4.6,
    cookTime: "12-18 min",
  },{
    id: 9,
    name: "Peperoni katta",
    description: "Bu eng mashhur pizzalardan biri bo‘lib, ustiga qizartirilgan kolbasa (pepperoni), pomidor sousi va mozzarella pishlog‘i qo‘yiladi.",
    price: 80000,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
    rating: 4.6,
    cookTime: "12-18 min",
  },{
    id: 9,
    name: "Peperoni katta",
    description: "Bu eng mashhur pizzalardan biri bo‘lib, ustiga qizartirilgan kolbasa (pepperoni), pomidor sousi va mozzarella pishlog‘i qo‘yiladi.",
    price: 80000,
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
    rating: 4.6,
    cookTime: "12-18 min",
  },
]

const categories = ["Hammasi", "Pizza", "ichimlik", "Hot-dog", "KFC", "Lavash", "Burger"]

export default function KioskMenu() {
  const [selectedCategory, setSelectedCategory] = useState("Hammasi")
  const { cart, loading, error, addToCart, removeFromCart, getItemQuantity, totalItems, totalPrice } = useFirebaseCart()

  const filteredItems =
    selectedCategory === "Hammasi" ? menuItems : menuItems.filter((item) => item.category === selectedCategory)

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

        {/* All Menu Items */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
            {selectedCategory === "Hammasi" ? "Barcha taomlar" : selectedCategory}
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

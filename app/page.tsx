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
    name: "Katletli Hot - Dog",
    description: "Bu eng mashhur hot - doglardan biri bo‘lib, ustiga qizartirilgan kolbasa (pepperoni), pomidor sousi va mozzarella pishlog‘i qo‘yiladi.",
    price: 25000,
    category: "Hot-dog",
    image: "https://imageproxy.wolt.com/menu/menu-images/678a52885c252192b63bddd5/b2f102b4-3cc6-11f0-a42d-5aaddb23265b_c67077d0a7c49d5e7ec87b23e4c09221.jpeg",
    rating: 4.3,
    cookTime: "20-25 min",
  },{
    id: 14,
    name: "Shashlikli Hot - Dog",
    description: "Bu eng mashhur pizzalardan biri bo‘lib, ustiga qizartirilgan kolbasa (pepperoni), pomidor sousi va mozzarella pishlog‘i qo‘yiladi.",
    price: 25000,
    category: "Hot-dog",
    image: "https://avatars.mds.yandex.net/get-altay/10216747/2a0000018b9efdac62ad2451ac6b29514ec9/L_height",
    rating: 4.7,
    cookTime: "18-23 min",
  },{
    id: 15,
    name: "Go'shtli Hot - Dog",
    description: "Bu eng mashhur pizzalardan biri bo‘lib, ustiga qizartirilgan kolbasa (pepperoni), pomidor sousi va mozzarella pishlog‘i qo‘yiladi.",
    price: 30000,
    category: "Hot-dog",
    image: "https://chefsmate.ru/image/cache/catalog/Foto-recepty/001/Hot-dogsrvanimmyasom-1200x700.jpg",
    rating: 4.8,
    cookTime: "23-28 min",
  },{
    id: 16,
    name: "Assorti Hot-dog",
    description: "Bu turli xil kolbasa yoki sosiska, sabzavot, souslar va pishloq aralashtirilgan boy tarkibli hot-dog turidir.",
    price: 30000,
    category: "Hot-dog",
    image: "data:image/jpeg;base64,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",
    rating: 4.6,
    cookTime: "8-12 min",
  },{
    id: 17,
    name: "Assorti Hot-dog",
    description: "Bu turli xil kolbasa yoki sosiska, sabzavot, souslar va pishloq aralashtirilgan boy tarkibli hot-dog turidir.",
    price: 35000,
    category: "Hot-dog",
    image: "data:image/jpeg;base64,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",
    rating: 4.6,
    cookTime: "8-12 min",
  },{
    id: 18,
    name: "Assorti Hot-dog",
    description: "Bu turli xil kolbasa yoki sosiska, sabzavot, souslar va pishloq aralashtirilgan boy tarkibli hot-dog turidir.",
    price: 40000,
    category: "Hot-dog",
    image: "data:image/jpeg;base64,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",
    rating: 4.6,
    cookTime: "8-12 min",
  },{
    id: 19,
    name: "Hot - Dog kichik",
    description: "Bu uzun bulka ichiga sosiska, souslar (ketchup, mayonez, xantal) va ba’zida pishloq yoki sabzavot solib tayyorlanadigan fast food taomidir.",
    price: 10000,
    category: "Hot-dog",
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

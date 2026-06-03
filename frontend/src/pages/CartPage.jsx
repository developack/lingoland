import { Link } from "react-router"
import { useState, useEffect } from "react"
import { Header } from "../shared/components/Header"
import { Footer } from "../shared/components/Footer"


export function CartPage() {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL
    const authToken = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY)
    const [ order, setOrder ] = useState({})

    useEffect(() => {
        if (!order) return

        const fetchOrderData = async () => {
            try {
                const response = await fetch('/api/order/', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${authToken}`
                    }
                })

                const data = await response.json()
                console.log(data)

                if (response.ok) {
                    setOrder(data)
                }

            } catch (error) {
                console.log(error)
            }
        }

        void fetchOrderData()
    }, []);

    return (
        <>
            <title> Cart </title>
            <Header/>

            <div className="min-h-screen bg-gray-50 py-10">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold mb-8">
                        سبد خرید
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {order?.order_items?.map((order_item) => (
                                <div key={order_item.id} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition">
                                    <div className="flex gap-4">
                                        <img
                                            src={`${BASE_URL}${order_item.course_thumbnail}`}
                                            alt=""
                                            className="w-32 h-24 rounded-xl object-cover"
                                        />

                                        <div className="flex-1">
                                            <h2 className="font-bold text-lg">{order_item.course_title}</h2>

                                            <div className="flex justify-between items-center mt-4">
                                <span className="font-bold text-primary text-lg">
                                    {order_item.price} تومان
                                </span>

                                                <button className="text-red-500 hover:text-red-600">
                                                    حذف
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div>
                            <div className="bg-white rounded-2xl p-6 shadow-sm  sticky top-28">

                                <h2 className="font-bold text-xl mb-6">
                                    خلاصه سفارش
                                </h2>

                                <div className="space-y-4">

                                    <div className="flex justify-between">
                            <span className="text-gray-500">
                                تعداد دوره‌ها
                            </span>
                                        <span>{order?.order_items?.length}</span>
                                    </div>

                                    <div className="flex justify-between">
                            <span className="text-gray-500">
                                مبلغ کل
                            </span>

                                        <span>
                                {order.total_price}  تومان
                            </span>
                                    </div>

                                    <hr/>

                                    <div className="flex justify-between text-lg font-bold">
                            <span>
                                مبلغ نهایی
                            </span>

                                        <span className="text-primary">
                                {order.total_price} تومان
                            </span>
                                    </div>

                                </div>

                                <Link to="/checkout"
                                    className="w-full mt-6 bg-primary text-white py-3 rounded-xl hover:opacity-90 transition block text-center">
                                    ادامه فرایند خرید
                                </Link>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Footer/>
        </>
    )
}
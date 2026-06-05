import { useNavigate } from "react-router"
import { useEffect, useState } from "react";
import { Header } from "../shared/components/Header/Header.jsx"
import { Footer } from "../shared/components/Footer"

export function CheckoutPage() {
    const navigate = useNavigate()
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

    const handlePayment = async () => {
        try {
            const response = await fetch('/api/order/payment/', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${authToken}`
                }
            })

            await response.json()

            if (response.ok) {
                navigate('/my-courses')
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <title>Checkout</title>

            <Header/>

            <div className="min-h-screen bg-gray-50 py-10">
                <div className="container mx-auto px-4">

                    <h1 className="text-3xl font-bold mb-8">
                        تکمیل سفارش
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* User Information */}
                        <div className="lg:col-span-2 space-y-6">

                            <div className="bg-white rounded-2xl shadow-sm p-6">
                                <h2 className="font-bold text-xl mb-6">
                                    اطلاعات خریدار
                                </h2>

                                <div className="grid md:grid-cols-2 gap-5">

                                    <div>
                                        <label className="block mb-2 text-sm font-medium">
                                            نام و نام خانوادگی
                                        </label>

                                        <input
                                            type="text"
                                            value="علی محمدی"
                                            className="w-full border border-border rounded-xl px-4 py-3"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium">
                                            شماره موبایل
                                        </label>

                                        <input
                                            type="text"
                                            value="09123456789"
                                            className="w-full border border-border rounded-xl px-4 py-3"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block mb-2 text-sm font-medium">
                                            ایمیل
                                        </label>

                                        <input
                                            type="email"
                                            value="ali@example.com"
                                            className="w-full border border-border rounded-xl px-4 py-3"
                                        />
                                    </div>

                                </div>
                            </div>

                            {/* Payment Method */}

                            <div className="bg-white rounded-2xl shadow-sm p-6">
                                <h2 className="font-bold text-xl mb-6">
                                    روش پرداخت
                                </h2>

                                <div className="space-y-4">

                                    <label className="flex items-center gap-4 border border-border rounded-xl p-4 cursor-pointer">
                                        <input
                                            type="radio"
                                            checked
                                            readOnly
                                        />

                                        <div>
                                            <p className="font-medium">
                                                پرداخت آنلاین
                                            </p>

                                            <span className="text-sm text-gray-500">
                                    پرداخت از طریق درگاه بانکی
                                </span>
                                        </div>
                                    </label>

                                    <label className="flex items-center gap-4 border border-border rounded-xl p-4 cursor-pointer">
                                        <input
                                            type="radio"
                                            readOnly
                                        />

                                        <div>
                                            <p className="font-medium">
                                                کیف پول
                                            </p>

                                            <span className="text-sm text-gray-500">
                                    موجودی کیف پول: 850,000 تومان
                                </span>
                                        </div>
                                    </label>

                                </div>
                            </div>

                        </div>

                        {/* Order Summary */}

                        <div>
                            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-28">
                                <h2 className="font-bold text-xl mb-6">
                                    خلاصه سفارش
                                </h2>

                                <div className="space-y-4">
                                    {order?.order_items?.map((order_item) => (
                                        <div className="flex justify-between">
                                            <span>{order_item.course_title}</span>
                                            <span>{order_item.price} تومان</span>
                                        </div>
                                    ))}

                                </div>

                                <hr className="my-6"/>

                                <div className="space-y-4">

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">مبلغ کل</span>
                                        <span>{order.total_price} تومان</span>
                                    </div>

                                    <div className="flex justify-between font-bold text-lg">
                                        <span>مبلغ قابل پرداخت</span>
                                        <span className="text-primary">{order.total_price} تومان</span>
                                    </div>

                                </div>

                                <button onClick={handlePayment} className="w-full mt-6 bg-primary text-white py-4 rounded-xl font-medium hover:opacity-90 transition">
                                    پرداخت و ثبت سفارش
                                </button>

                                <p className="text-xs text-gray-500 text-center mt-4 leading-6">
                                    با کلیک روی دکمه پرداخت، قوانین و شرایط استفاده از سایت را می‌پذیرید.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>
            </div>

            <Footer/>
        </>
    )
}
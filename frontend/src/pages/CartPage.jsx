import { Link } from "react-router"
import { Header } from "../shared/components/Header"
import { Footer } from "../shared/components/Footer"


export function CartPage() {
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

                            <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition">
                                <div className="flex gap-4">
                                    <img
                                        src="https://placehold.co/150x100"
                                        alt=""
                                        className="w-32 h-24 rounded-xl object-cover"
                                    />

                                    <div className="flex-1">
                                        <h2 className="font-bold text-lg">
                                            دوره جامع React
                                        </h2>

                                        <p className="text-gray-500 text-sm mt-2">
                                            مدرس: علی محمدی
                                        </p>

                                        <div className="flex justify-between items-center mt-4">
                                <span className="font-bold text-primary text-lg">
                                    ۱,۹۹۰,۰۰۰ تومان
                                </span>

                                            <button className="text-red-500 hover:text-red-600">
                                                حذف
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition">
                                <div className="flex gap-4">
                                    <img
                                        src="https://placehold.co/150x100"
                                        alt=""
                                        className="w-32 h-24 rounded-xl object-cover"
                                    />

                                    <div className="flex-1">
                                        <h2 className="font-bold text-lg">
                                            دوره Django REST Framework
                                        </h2>

                                        <p className="text-gray-500 text-sm mt-2">
                                            مدرس: رضا احمدی
                                        </p>

                                        <div className="flex justify-between items-center mt-4">
                                <span className="font-bold text-primary text-lg">
                                    ۲,۴۹۰,۰۰۰ تومان
                                </span>

                                            <button className="text-red-500 hover:text-red-600">
                                                حذف
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

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

                                        <span>
                                2
                            </span>
                                    </div>

                                    <div className="flex justify-between">
                            <span className="text-gray-500">
                                مبلغ کل
                            </span>

                                        <span>
                                4,480,000 تومان
                            </span>
                                    </div>

                                    <div className="flex justify-between">
                            <span className="text-gray-500">
                                تخفیف
                            </span>

                                        <span className="text-green-600">
                                500,000 تومان
                            </span>
                                    </div>

                                    <hr/>

                                    <div className="flex justify-between text-lg font-bold">
                            <span>
                                مبلغ نهایی
                            </span>

                                        <span className="text-primary">
                                3,980,000 تومان
                            </span>
                                    </div>

                                </div>

                                <Link to="/checkout"
                                    className="w-full mt-6 bg-primary text-white py-3 rounded-xl hover:opacity-90 transition block text-center">
                                    ادامه فرایند خرید
                                </Link>

                                <div className="mt-6">
                                    <label className="block mb-2 text-sm font-medium">
                                        کد تخفیف
                                    </label>

                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="کد تخفیف"
                                            className="flex-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                                        />

                                        <button className="px-5 rounded-xl bg-gray-900 text-white">
                                            اعمال
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Footer/>
        </>
    )
}
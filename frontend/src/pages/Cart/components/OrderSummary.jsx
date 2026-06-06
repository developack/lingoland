import { Link } from "react-router"


export function OrderSummary({ order }) {
    return (
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
                                {order.total_price} تومان
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
    )
}
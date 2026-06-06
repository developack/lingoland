

export function OrderSummary({ order, handlePayment }) {
    return (
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

                <button onClick={handlePayment}
                        className="w-full mt-6 bg-primary text-white py-4 rounded-xl font-medium hover:opacity-90 transition">
                    پرداخت و ثبت سفارش
                </button>

                <p className="text-xs text-gray-500 text-center mt-4 leading-6">
                    با کلیک روی دکمه پرداخت، قوانین و شرایط استفاده از سایت را می‌پذیرید.
                </p>

            </div>

        </div>
    )
}
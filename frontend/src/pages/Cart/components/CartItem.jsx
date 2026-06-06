import { BASE_URL } from "@/config/api";


export function CartItem({ orderItem }) {
    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition">
            <div className="flex gap-4">
                <img
                    src={`${BASE_URL}${orderItem.course_thumbnail}`}
                    alt=""
                    className="w-32 h-24 rounded-xl object-cover"
                />

                <div className="flex-1">
                    <h2 className="font-bold text-lg">{orderItem.course_title}</h2>

                    <div className="flex justify-between items-center mt-4">
                                <span className="font-bold text-primary text-lg">
                                    {orderItem.price} تومان
                                </span>

                        <button className="text-red-500 hover:text-red-600">
                            حذف
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
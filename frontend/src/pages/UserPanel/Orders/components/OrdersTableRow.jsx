import { Link } from "react-router"


export function OrdersTableRow({ order }) {
    const statusClasses = {
        Completed: "bg-green-100 text-green-700",
        Pending: "bg-yellow-100 text-yellow-700",
        Failed: "bg-red-100 text-red-700",
    }

    return (
        <div className="grid grid-cols-5 p-3 border-t border-border items-center">
            <div className="text-sm">#{order.id}</div>
            <div className="text-sm text-gray-500">{order.created}</div>
            <div className="text-right font-semibold">{order.total_price} تومان</div>
            <div>
              <span
                  className={`text-xs px-2 py-1 rounded ${statusClasses[order.status] || 'bg-gray-100 text-gray-700'}`}>
                {order.status}
              </span>
            </div>
            <Link to='/' className="bg-primary text-white rounded-xl p-2 px-4 text-center w-fit text-sm">مشاهده</Link>
        </div>
    )
}
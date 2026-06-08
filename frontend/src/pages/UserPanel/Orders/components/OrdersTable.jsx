import { OrdersTableRow } from "./OrdersTableRow"


export function OrdersTable({ orders }) {
    return (
        <div className="bg-white border border-border rounded-xl overflow-hidden">

            <div className="grid grid-cols-5 bg-gray-100 text-sm font-medium text-gray-600 p-3">
                <div>شناسه سفارش</div>
                <div>تاریخ</div>
                <div className="text-right">قیمت کل</div>
                <div>وضعیت</div>
                <div>جزئیات</div>
            </div>

            {orders.map((order) => (
                <OrdersTableRow key={order.id} order={order} />
            ))}
        </div>
    )
}
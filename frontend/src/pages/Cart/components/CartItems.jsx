import { CartItem } from "./CartItem"


export function CartItems({ order }) {
    return (
        <div className="lg:col-span-2 space-y-4">
            {order?.order_items?.map((order_item) => (
                <CartItem key={order_item.id} orderItem={order_item} />
            ))}
        </div>
    )
}
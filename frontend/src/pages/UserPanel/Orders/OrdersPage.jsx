import { PanelHeader } from "../../../features/user-panel/components/PanelHeader.jsx"
import { PanelSidebar } from "../../../features/user-panel/components/PanelSidebar.jsx"
import { useEffect, useState } from "react"
import { OrdersTable } from "./components/OrdersTable"


export function OrdersPage() {
    const authToken = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY)
    const [ orders, setOrders ] = useState([])
    const [ stats, setStats ] = useState([])

    useEffect(() => {
        const fetchUserOrdersData = async () => {
            const response = await fetch('/api/my-orders/', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${authToken}`
                }
            })

            const data = await response.json()
            setOrders(data)
        }

        void fetchUserOrdersData()
    }, []);

    useEffect(() => {
        const fetchOrderStatsData = async () => {
            const response = await fetch('/api/orders/stats/', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${authToken}`
                }
            })

            const data = await response.json()
            console.log(data)
        }

        void fetchOrderStatsData()
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <PanelSidebar/>
            <div className="flex-1 flex flex-col">
                <PanelHeader/>
                <div className="container p-6">

                    <div className="mb-6">
                        <h1 className="text-2xl font-bold">سفارش‌های من</h1>
                        <p className="text-gray-500">همه سفارش‌هایی که برای شما ثبت شده است</p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">

                        <div className="bg-white border border-border  rounded-xl p-4">
                            <p className="text-sm text-gray-500">همه سفارش‌ها</p>
                            <p className="text-2xl font-bold">{stats.orders_count}</p>
                        </div>

                        <div className="bg-white border border-border rounded-xl p-4">
                            <p className="text-sm text-gray-500">تکمیل شده</p>
                            <p className="text-2xl font-bold text-green-600">{stats.complete_orders_count}</p>
                        </div>

                        <div className="bg-white border border-border rounded-xl p-4">
                            <p className="text-sm text-gray-500">در انتظار پرداخت</p>
                            <p className="text-2xl font-bold text-yellow-500">{stats.pending_orders_count}</p>
                        </div>
                    </div>

                    <OrdersTable orders={orders} />
                </div>
            </div>
        </div>
    )
}
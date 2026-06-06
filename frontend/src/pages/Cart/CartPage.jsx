import { useState, useEffect } from "react"
import { Header } from "../../shared/components/Header/Header"
import { Footer } from "../../shared/components/Footer"
import { OrderSummary } from "./components/OrderSummary"
import { CartItems } from "./components/CartItems"


export function CartPage() {
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

                        <CartItems order={order} />
                        <OrderSummary order={order} />

                    </div>
                </div>
            </div>

            <Footer/>
        </>
    )
}
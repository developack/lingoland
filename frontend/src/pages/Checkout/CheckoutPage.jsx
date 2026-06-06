import { useNavigate } from "react-router"
import { useEffect, useState } from "react";
import { Header } from "../../shared/components/Header/Header"
import { Footer } from "../../shared/components/Footer"
import { OrderSummary } from "./components/OrderSummary"
import { CustomerInfo } from "./components/CustomerInfo"
import { PaymentMethod } from "./components/PaymentMethod"

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

                        <div className="lg:col-span-2 space-y-6">
                            <CustomerInfo />
                            <PaymentMethod />
                        </div>

                        <OrderSummary order={order} handlePayment={handlePayment} />
                    </div>

                </div>
            </div>

            <Footer/>
        </>
    )
}
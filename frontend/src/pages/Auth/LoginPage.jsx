import { useState } from 'react'
import { Link, useNavigate } from "react-router"


export function LoginPage() {
    const navigate = useNavigate()
    const [ loading, setLoading ] = useState(false)
    const [ message, setMessage ] = useState('')
    const [ inputs, setInputs ] = useState({
        email: "",
        password: ""
    })
    const [ error, setError ] = useState({
        general: "",
        email: "",
        password: ""
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setInputs((prev) => ({...prev, [name]: value}))
        setError((prev) => ({...prev, [name]: '', general: ''}))
    }

    const handleFormValidation = (inputs) => {
         const errors = {
            email: '',
            password: '',
            general: ''
        }
        if (!inputs.email.trim()) {
            errors.email = 'وارد کردن آدرس ایمیل الزامی است'
        }
        if (!inputs.password.trim()) {
            errors.password = 'وارد کردن رمزعبور الزامی است'
        }
        setError(errors)
        return !errors.email && !errors.password
    }

    const login = async (event) => {
        event.preventDefault()
        const isValid = handleFormValidation(inputs)
        if (!isValid) return

        setLoading(true)
        try {
            const response = await fetch('/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: inputs.email,
                    password: inputs.password
                })
            })

            const data = await response.json()
            if (!response.ok) {
                setError((prev) => ({...prev, general: data.message || 'آدرس ایمیل یا رمزعبور اشتباه است'}))
                return
            }

            localStorage.setItem(import.meta.env.VITE_AUTH_TOKEN_KEY, data.token)
            setMessage('شما با موفقیت لاگین شدید')
            navigate('/')

        } catch (error) {
            console.log(error)
            setError((prev) => ({...prev, general: 'خطا در برقراری ارتباط با سرور'}))
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <title>Login Page</title>

            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
                    <div className="bg-primary p-6 text-center">
                        <h2 className="text-2xl font-bold text-white">خوش آمدید</h2>
                        <p className="text-blue-100 mt-2">لطفاً وارد حساب کاربری خود شوید</p>
                    </div>
                    <div className="p-8">
                        <p className="my-5">
                            {message && <span className="text-green-500">{message}</span>}
                            {error.general && <span className="text-red-500 block text-sm mt-1">{error.general}</span>}
                        </p>
                        <form onSubmit={login} id="loginForm" className="space-y-6">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">
                                    <span className="text-red-500">*</span> ایمیل
                                </label>
                                <div className="relative">
                                    <input onChange={handleChange} type="text" name="email"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                        placeholder="example@email.com" required/>
                                    {error.email && <span className="text-red-500 block text-sm mt-1">{error.email}</span>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">
                                    <span className="text-red-500">*</span> رمز عبور
                                </label>
                                <div className="relative">
                                    <input onChange={handleChange} type="password" name="password"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                        placeholder="••••••••" required/>
                                    {error.password && <span className="text-red-500 block text-sm mt-1">{error.password}</span>}
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input type="checkbox"
                                           className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"/>
                                    <span className="mr-2 text-sm text-gray-600">مرا به خاطر بسپار</span>
                                </label>
                                <Link to='/forgot-password' className="text-sm text-primary hover:text-primary-dark transition">
                                    رمز عبور را فراموش کرده‌اید؟
                                </Link>
                            </div>
                            <button type="submit"
                                className={`w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-dark
                                 transition transform hover:scale-[1.02] duration-200 ${loading ? 'opacity-50' : ''}`} disabled={loading}>
                                ورود به سامانه
                            </button>
                            <div className="text-center mt-6">
                                <p className="text-gray-600">
                                    حساب کاربری ندارید؟
                                    <Link to='/register' className="text-primary font-semibold hover:underline">
                                        ثبت‌نام کنید
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
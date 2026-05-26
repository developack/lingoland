import {useRef, useState} from 'react'
import { useNavigate } from "react-router"
import { Link } from "react-router"


export function LoginPage() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState({
        general: "",
        email: "",
        password: ""
    })
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const login = async () => {
        let errors = {}
        const email = emailRef.current
        const password = passwordRef.current
        setLoading(true)

        if (email.value === '') {
            errors.email = 'email field is required'
        }

        if (password.value === '') {
            errors.password = 'password field is required'
        }

        try {
            const response = await fetch('/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email.value,
                    password: password.value
                })
            })

            const data = await response.json()
            if (!response.ok) {
                errors.general = data.message || 'Invalid credential!'
                return
            }

            localStorage.setItem(import.meta.env.VITE_AUTH_TOKEN_KEY, data.token)
            setMessage('You are logged in successfully')
            navigate('/')

        } catch (error) {
            console.log(error)
            errors.general = 'network error'
        } finally {
            setLoading(false)
            setError(errors)
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
                        <div id="errorMessage" className="hidden bg-red-50 border-r-4 border-red-500 p-3 mb-4 rounded">
                            <p className="text-red-700 text-sm">❌ نام کاربری یا رمز عبور اشتباه است</p>
                        </div>
                        <p className="my-5">
                            {message && <span className="text-green-500">{message}</span>}
                            {error.general && <span className="text-red-500">{error.general}</span>}
                        </p>
                        <form id="loginForm" className="space-y-6">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">
                                    <span className="text-red-500">*</span> ایمیل یا نام کاربری
                                </label>
                                <div className="relative">
                                    <div
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor"
                                             viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                        </svg>
                                    </div>
                                    <input ref={emailRef} type="text" id="username"
                                        className="w-full pr-10 pl-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                        placeholder="example@email.com" required
                                    />
                                    {error.email && <span className="text-red-500">{error.email}</span>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">
                                    <span className="text-red-500">*</span> رمز عبور
                                </label>
                                <div className="relative">
                                    <div
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor"
                                             viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                        </svg>
                                    </div>
                                    <input ref={passwordRef} type="password" id="password"
                                        className="w-full pr-10 pl-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                        placeholder="••••••••" required
                                    />
                                    {error.password && <span className="text-red-500">{error.password}</span>}
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
                            <button onClick={login} type="button"
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
import { useRef } from 'react'
import { Link } from "react-router"


export function LoginPage() {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const login = async () => {
        const email = emailRef.current.value
        const password = passwordRef.current.value

        try {
            const response = await fetch('/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })

            const data = await response.json()
            if (response.ok) {
                console.log(data.token)
            }
        } catch (error) {
            console.log(error)
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
                                className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-dark transition transform hover:scale-[1.02] duration-200">
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
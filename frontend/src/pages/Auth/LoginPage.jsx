import { useState } from 'react'
import { Link, useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"


export function LoginPage() {
    const navigate = useNavigate()
    const [ error, setError ] = useState({})
    const [ loading, setLoading ] = useState(false)
    const [ inputs, setInputs ] = useState({
        email: "",
        password: ""
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setInputs((prev) => ({...prev, [name]: value}))
        setError((prev) => ({...prev, [name]: '', general: ''}))
    }

    const FormValidation = () => {
        const errors = {}
        if (!inputs.email.trim()) {
            errors.email = 'وارد کردن آدرس ایمیل الزامی است'
        }
        if (!inputs.password.trim()) {
            errors.password = 'وارد کردن رمزعبور الزامی است'
        }
        return errors
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        const errors = FormValidation()
        if (Object.keys(errors).length) {
            setError(errors)
            return
        }

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
                const errors = {}
                console.log(data)
                Object.entries(data).forEach(([field, message]) => {
                    errors[field] = message[0]
                })

                setError(errors)
                return
            }

            localStorage.setItem(import.meta.env.VITE_AUTH_TOKEN_KEY, data.token)
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
                            {error.general && <span className="text-red-500 block text-sm mt-1">{error.general}</span>}
                        </p>
                        <form onSubmit={handleLogin} id="loginForm" className="space-y-6">
                            <Field>
                                <Label htmlFor="email">آدرس ایمیل</Label>
                                <div className="relative">
                                    <Input onChange={handleChange} type="email" name="email" id="email"
                                           placeholder="example@email.com" value={inputs.email} className="p-5"/>
                                    {error.email &&
                                        <span className="text-red-500 block text-sm mt-1">{error.email}</span>}
                                </div>
                            </Field>
                            <Field>
                                <Label htmlFor="password">رمزعبور</Label>
                                <div className="relative">
                                    <Input onChange={handleChange} type="password" name="password" id="password"
                                           placeholder="••••••••" value={inputs.password} className="p-5"/>
                                    {error.password &&
                                        <span className="text-red-500 block text-sm mt-1">{error.password}</span>}
                                </div>
                            </Field>
                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <Checkbox/>
                                    <span className="mr-2 text-sm text-gray-600">مرا به خاطر بسپار</span>
                                </label>
                                <Link to='/forgot-password'
                                      className="text-sm text-primary hover:text-primary-dark transition">
                                رمز عبور را فراموش کرده‌اید؟
                                </Link>
                            </div>
                            <Button className={`w-full bg-primary text-white py-3 rounded-lg p-5
                                ${loading ? 'opacity-50' : ''}`} disabled={loading}>
                                {loading ? 'در حال ورود...' : 'ورود'}
                            </Button>
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
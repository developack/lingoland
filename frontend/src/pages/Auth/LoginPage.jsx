import { useState } from 'react'
import { Link, useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "sonner"


export function LoginPage() {
    const { login } = useAuth()
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
        setError((prev) => ({...prev, [name]: ''}))
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
            await login(inputs)
            toast.success('شما با موفقیت وارد سیستم شدید')
            navigate('/')

        } catch (error) {
            setError(error.errors)

        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <title>Login Page</title>

            <div className="min-h-screen flex items-center flex-col justify-center p-4 bg-body-bg">
                <Link to="/" className="flex items-center gap-3 mb-8">
                    <img className="w-10" src="/logo.png" alt="logo"/>
                    <div>
                        <p className="font-bold text-xl">لینگــولند</p>
                        <span className="text-sm">آموزشگاه آنلاین زبان انگلیسی</span>
                    </div>
                </Link>
                <div className="bg-white rounded-xl max-w-md w-full overflow-hidden">
                    <div className="p-8">
                        <div className="text-center">
                            <p className="font-bold mb-10 text-xl">ورود به حساب کاربری</p>
                        </div>
                        <form onSubmit={handleLogin} id="loginForm" className="space-y-6">
                            <Field className="gap-3">
                                <Label className={`${error?.email ? 'text-destructive' : ''}`} htmlFor="email">آدرس
                                    ایمیل</Label>
                                <div className="relative space-y-2">
                                    <Input onChange={handleChange} type="email" name="email" id="email"
                                           placeholder="example@email.com" value={inputs.email} className="p-5"
                                           aria-invalid={!!error?.email}/>
                                    {error?.email &&
                                        <span className="text-destructive block text-sm">{error?.email}</span>}
                                </div>
                            </Field>
                            <Field className="gap-3">
                                <Label className={`${error?.password ? 'text-destructive' : ''}`}
                                       htmlFor="password">رمزعبور</Label>
                                <div className="relative space-y-2">
                                    <Input onChange={handleChange} type="password" name="password" id="password"
                                           placeholder="••••••••" value={inputs.password} className="p-5"
                                           aria-invalid={!!error?.password}/>
                                    {error?.password &&
                                        <span className="text-destructive block text-sm">{error?.password}</span>}
                                </div>
                            </Field>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="remember-me"/>
                                    <Label htmlFor="remember-me">مرا به خاطر بسپار</Label>
                                </div>
                                <Link to='/forgot-password'
                                      className="text-sm text-primary font-semibold">
                                    رمز عبور را فراموش کرده‌اید؟
                                </Link>
                            </div>
                            <Button className={`w-full bg-primary text-white py-3 rounded-lg p-5
                                ${loading ? 'opacity-50' : ''}`} disabled={loading}>
                                {loading ? 'در حال ورود ...' : 'ورود'}
                            </Button>
                            <div className="text-center">
                                <p className="text-gray-600 text-sm">
                                    حساب کاربری ندارید؟
                                    <Link to='/register' className="text-primary mr-1 font-semibold hover:underline">
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
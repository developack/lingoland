import {Link, useNavigate} from 'react-router'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"


export function RegisterPage() {
    const navigate = useNavigate()
    const [ loading, setLoading ] = useState(false)
    const [ inputs, setInputs ] = useState({
        username: "",
        email: "",
        password: "",
        confirm_password: ""
    })
    const [ error, setError ] = useState({})

    const handleChange = (event) => {
        const { name, value } = event.target
        setInputs((prev) => ({...prev, [name]: value}))
        setError((prev) => ({...prev, [name]: ''}))
    }

    const formValidation = () => {
        let errors = {}

        if (!inputs.email.trim()) {
            errors.email = "وارد کردن آدرس ایمیل الزامی است"
        }
        if (!inputs.username.trim()) {
            errors.username = "وارد کردن نام کاربری الزامی است"
        }
        if (!inputs.password.trim()) {
            errors.password = "وارد کردن رمزعبور الزامی است"
        }
        if (!inputs.confirm_password.trim()) {
            errors.confirm_password = "وارد کردن تکرار رمزعبور الزامی است"
        }
        if (inputs.password !== inputs.confirm_password) {
            errors.password = "رمزعبور و تکرار آن باید برابر باشد"
        }

        return errors
    }

    const handleRegister = async (event) => {
        event.preventDefault()
        const errors = formValidation()
        if (Object.keys(errors).length) {
            setError(errors)
            return
        }

        setLoading(true)
        try {
            const response = await fetch('/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputs)
            })
            const data = await response.json()

            if (!response.ok) {
                const errors = {}
                Object.entries(data).forEach(([field, message]) => {
                    errors[field] = message[0]
                })

                setError(errors)
                return
            }

            localStorage.setItem(import.meta.env.VITE_AUTH_TOKEN_KEY, data.token)
            navigate('/dashboard')

        } catch (error) {
            toast.error('خطا در برقراری ارتباط با سرور')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <title>Register Page</title>

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
                            <p className="font-bold mb-10 text-xl">ساخت حساب کاربری جدید</p>
                        </div>
                        <form onSubmit={handleRegister} id="registerForm" className="space-y-6">
                            <Field className="gap-3">
                                <Label className={`${error.username ? 'text-destructive' : ''}`} htmlFor="username">
                                    نام کاربری</Label>
                                <div className="relative space-y-2">
                                    <Input onChange={handleChange} type="text" name="username" id="username"
                                           placeholder="jack" value={inputs.username} className="p-5"
                                           aria-invalid={!!error.username}/>
                                    {error.username &&
                                        <span className="text-destructive block text-sm">{error.username}</span>}
                                </div>
                            </Field>
                            <Field className="gap-3">
                                <Label className={`${error.email ? 'text-destructive' : ''}`} htmlFor="email">آدرس
                                    ایمیل</Label>
                                <div className="relative space-y-2">
                                    <Input onChange={handleChange} type="email" name="email" id="email"
                                           placeholder="example@email.com" value={inputs.email} className="p-5"
                                           aria-invalid={!!error.email}/>
                                    {error.email &&
                                        <span className="text-destructive block text-sm">{error.email}</span>}
                                </div>
                            </Field>
                            <Field className="gap-3">
                                <Label className={`${error.password ? 'text-destructive' : ''}`}
                                       htmlFor="password">رمزعبور</Label>
                                <div className="relative space-y-2">
                                    <Input onChange={handleChange} type="password" name="password" id="password"
                                           placeholder="••••••••" value={inputs.password} className="p-5"
                                           aria-invalid={!!error.password}/>
                                    {error.password &&
                                        <span className="text-destructive block text-sm">{error.password}</span>}
                                </div>
                            </Field>
                            <Field className="gap-3">
                                <Label className={`${error.confirm_password ? 'text-destructive' : ''}`}
                                       htmlFor="confirm_password">تکرار رمزعبور</Label>
                                <div className="relative space-y-2">
                                    <Input onChange={handleChange} type="password" name="confirm_password"
                                           id="confirm_password"
                                           placeholder="••••••••" value={inputs.confirm_password} className="p-5"
                                           aria-invalid={!!error.confirm_password}/>
                                    {error.confirm_password &&
                                        <span
                                            className="text-destructive block text-sm">{error.confirm_password}</span>}
                                </div>
                            </Field>

                            <Button className={`w-full bg-primary text-white py-3 rounded-lg p-5
                                ${loading ? 'opacity-50' : ''}`} disabled={loading}>
                                {loading ? 'در حال ثبت نام ...' : 'ثبت نام'}
                            </Button>
                            <div className="text-center">
                                <p className="text-gray-600 text-sm">
                                    قبلا ثبت نام کرده‌اید؟
                                    <Link to='/login' className="text-primary mr-1 font-semibold hover:underline">
                                        وارد شوید
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
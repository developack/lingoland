import { useNavigate } from 'react-router'
import { useState, useEffect } from "react"


export function RegisterPage() {
    const navigate = useNavigate()
    const [ loading, setLoading ] = useState(false)
    const [ inputs, setInputs ] = useState({})
    const [ message, setMessage ] = useState('')
    const [ error, setError ] = useState({
        general: "",
        username: "",
        email: "",
        password: ""
    })

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setInputs(values => ({...values, [name]: value}))
    }

    const handleFormValidation = (inputs) => {
        let errors = {}

        if (inputs.email === '') {
            errors.email = "This field is required"
        }

        if (inputs.username === '') {
            errors.username = "This field is required"
        }

        if (inputs.password === '') {
            errors.password = "This field is required"
        }

        if (inputs.password !== inputs.confirm_password) {
            errors.password = "Password and confirm password must match"
        }

        setError(prev => ({...prev, ...errors}))
        return Object.keys(errors).length === 0
    }

    const register = async () => {
        setLoading(true)

        try {
            const response = await fetch('/api/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: inputs.username,
                email: inputs.email,
                password: inputs.password,
                confirm_password: inputs.confirm_password
            })
        })
            const data = await response.json()
            if (!response.ok) {
                setError(prev => ({...prev, general: "Something went wrong, please try later"}))
                return
            }

            setMessage('You are registered successfully')
            navigate('/')

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()
        const isValid = handleFormValidation(inputs)
        if (!isValid) return

        void register()
    }

    return (
        <>
            <title>Register Page</title>

            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
                    <div className="bg-primary p-6 text-center">
                        <h2 className="text-2xl font-bold text-white">خوش آمدید</h2>
                        <p className="text-blue-100 mt-2">ثبت نام در لینگولند</p>
                    </div>
                    <div className="p-8">
                        <div id="errorMessage" className="hidden bg-red-50 border-r-4 border-red-500 p-3 mb-4 rounded">
                            <p className="text-red-700 text-sm">❌ نام کاربری یا رمز عبور اشتباه است</p>
                        </div>
                        <p className="my-5">
                            {message && <span className="text-green-500">{message}</span>}
                            {error.general && <span className="text-red-500">{error.general}</span>}
                        </p>
                        <form id="RegisterForm" className="space-y-6" onSubmit={handleFormSubmit}>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">
                                    <span className="text-red-500">*</span>نام کاربری
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
                                    <input type="text" name="username" id="username" onChange={handleChange}
                                           className="w-full pr-10 pl-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                           placeholder="example@email.com" required
                                    />
                                    {error.username && <span className="text-red-500">{error.username}</span>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">
                                    <span className="text-red-500">*</span> ایمیل
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
                                    <input type="text" name="email" id="email" onChange={handleChange}
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
                                    <input type="password" name="password" id="password" onChange={handleChange}
                                           className="w-full pr-10 pl-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                           placeholder="••••••••" required
                                    />
                                    {error.password && <span className="text-red-500">{error.password}</span>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">
                                    <span className="text-red-500">*</span>تکرار رمز عبور
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
                                    <input type="password" name="confirm_password" id="confirm_password" onChange={handleChange}
                                           className="w-full pr-10 pl-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                           placeholder="••••••••" required
                                    />
                                </div>
                            </div>
                            <input type="submit" value="ثبت نام" className={`w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-dark
                                 transition transform hover:scale-[1.02] duration-200 ${loading ? 'opacity-50' : ''} `} disabled={loading} />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
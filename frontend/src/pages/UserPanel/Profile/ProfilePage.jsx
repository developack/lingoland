import { PanelHeader } from "../../../features/user-panel/components/PanelHeader"
import { PanelSidebar } from "../../../features/user-panel/components/PanelSidebar"
import {useState, useEffect} from "react"
import {replace} from "react-router";


export function ProfilePage() {
    const authToken = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY)
    const [ inputs, setInputs ] = useState({})
    const [ message, setMessage ] = useState('')
    const [ error, setError ] = useState({ username: "", email: ""})

    useEffect(() => {
        const fetchUserProfileData = async () => {
            try {
                const response = await fetch('/api/user-profile/', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${authToken}`
                    }
                })

                const data = await response.json()
                setInputs(data)

            } catch (error) {
                console.log(error)
            }
        }

        void fetchUserProfileData()
    }, []);

    const handleInputChanges = (event) => {
        const { name, value } = event.target
        if (name.includes('.')) {
            const [parent, child] = name.split(".");
            setInputs((prev) => ({...prev, [parent]: {...prev[parent], [child]: value}}))
        }
        else {
            setInputs((prev) => ({...prev, [name]: value}))
        }
    }

    const handleFormValidation = (inputs) => {
        let errors = {}

        if (!inputs.email.trim()) {
            errors.email = "This field is required"
        }

        if (!inputs.username.trim()) {
            errors.username = "This field is required"
        }

        setError({
            email: errors.email ?? "",
            username: errors.username ?? ""
        })
        return Object.keys(errors).length === 0
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        const isValid = handleFormValidation(inputs)
        if (!isValid) return

        try {
            const response = await fetch('/api/user-profile/', {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${authToken}`
                },
                body: JSON.stringify(inputs)
            })

            const data = await response.json()
            if (response.ok) {
                setMessage('Profile updated successfully')
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <PanelSidebar/>
            <div className="flex-1 flex flex-col">
                <PanelHeader/>
                <div className="container p-6">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold">تنظیمات حساب کاربری</h1>
                        <p className="text-gray-500">اطلاعات شخصی خود را بروزرسانی کنید</p>
                    </div>

                    <div className="bg-white border border-border rounded-xl p-6 max-w-3xl">
                        <p className="my-2">
                            {message && <span className="text-white p-3 rounded-xl bg-secondary block text-xs">{message}</span>}
                        </p>
                        <div className="flex items-center gap-4 mb-6">
                            <img src="/avatar.png" className="w-20 h-20 rounded-full object-cover border border-border"
                                 alt="profile"/>
                            <div>
                                <button
                                    className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                                    ویرایش آواتار
                                </button>
                                <p className="text-xs text-gray-500 mt-2">
                                    JPG, PNG up to 2MB
                                </p>
                            </div>
                        </div>

                        <form id="EditProfileForm" className="grid grid-cols-2 gap-4" onSubmit={handleFormSubmit}>
                            <div>
                                <label className="text-sm text-gray-600">نام</label>
                                <input type="text" name="first_name" onChange={handleInputChanges}
                                       value={inputs.first_name ?? ""}
                                       className="w-full mt-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                            </div>
                            <div>
                                <label className="text-sm text-gray-600">نام خانوادگی</label>
                                <input type="text" name="last_name" onChange={handleInputChanges}
                                       value={inputs.last_name ?? ""}
                                       className="w-full mt-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                            </div>
                            <div>
                                <label className="text-sm text-gray-600">نام کاربری</label>
                                <input type="text" name="username" onChange={handleInputChanges}
                                       value={inputs.username ?? ""}
                                       className="w-full mt-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                {error.username && <span className="text-red-500">{error.username}</span>}
                            </div>

                            <div>
                                <label className="text-sm text-gray-600">نام نمایشی</label>
                                <input type="text" name="user_profile.full_name" onChange={handleInputChanges}
                                       value={inputs?.user_profile?.full_name ?? ""}
                                       className="w-full mt-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                            </div>
                            <div>
                                <label className="text-sm text-gray-600">شماره تلفن</label>
                                <input type="text" name="phone" onChange={handleInputChanges}
                                       value={inputs.phone ?? ""}
                                       className="w-full mt-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                            </div>
                            <div>
                                <label className="text-sm text-gray-600">ایمیل</label>
                                <input type="email" name="email" onChange={handleInputChanges}
                                       value={inputs.email ?? ""}
                                       className="w-full mt-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                                {error.email && <span className="text-red-500">{error.email}</span>}
                            </div>
                            <div className="flex justify-start gap-3 mt-6">
                                <button type="submit"
                                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700">
                                    ذخیره تغییرات
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
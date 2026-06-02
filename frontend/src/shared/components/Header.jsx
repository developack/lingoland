import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { Link } from 'react-router'


export function Header() {
    const navigate = useNavigate()
    const BASE_URL = import.meta.env.VITE_API_BASE_URL
    const authToken = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY)
    const [userProfile, setUserProfile] = useState(null)

    useEffect(() => {
        if (!authToken) return
        const fetchUserProfileData = async () => {
            try {
                const response = await fetch('/api/user-profile/', {
                    method: 'GET',
                    headers: {
                        "Authorization": `Token ${authToken}`,
                        "Content-Type": "application/json"
                    }
                })
                const data = await response.json()
                setUserProfile(data)

            } catch (error) {
                console.log(error)
            }
        }
        void fetchUserProfileData()
    }, [authToken])

    const handleLogout = async () => {
        try {
             await fetch('/api/logout/', {
                method: 'POST',
                headers: {
                    "Authorization": `Token ${authToken}`,
                }
            })
        } catch (error) {
            console.log(error)
        } finally {
            localStorage.removeItem(import.meta.env.VITE_AUTH_TOKEN_KEY)
            setUserProfile(null)
            navigate('/')
        }
    }

    return (
        <>
            <header className="p-5 bg-body-bg/80 backdrop-filter backdrop-blur-md shadow-xs sticky top-0 z-10">
                <div className="container flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        <img className="w-10" src="../../../public/logo.png" alt="logo"/>
                        <div>
                            <p className="font-bold text-xl">لینگــولند</p>
                            <span className="text-sm">آموزشگاه آنلاین زبان انگلیسی</span>
                        </div>
                    </Link>
                    <nav>
                        <ul className="flex items-center gap-12 text-sm font-medium">
                            <li className="hover:text-primary"><Link to="/">صفحه اصلی</Link></li>
                            <li className="hover:text-primary"><Link to="/courses">دوره‌ها</Link></li>
                            <li className="hover:text-primary"><Link to="/dictionary">دیکشنری</Link></li>
                            <li className="hover:text-primary"><Link to="/articles">مقالات</Link></li>
                        </ul>
                    </nav>
                    <div className="flex items-center gap-8">
                        <Link to="cart">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/>
                            </svg>
                        </Link>
                        {userProfile
                            ? <div className="relative group">
                                <div className="flex items-center gap-3 cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-2 shadow-sm transition hover:bg-gray-50">
                                    <img src={userProfile?.user_profile?.avatar ? `${BASE_URL}${userProfile.user_profile.avatar}` : '/avatar.png'} alt="avatar" className="h-8 w-8 rounded-full object-cover"/>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-gray-800">
                                            {userProfile.username}
                                        </span>
                                    </div>
                                </div>

                                <div className="invisible absolute left-0 top-16 z-50 w-56 translate-y-2 rounded-2xl border border-gray-100 bg-white p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                                    <Link to="/dashboard" className="block rounded-xl px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-100">
                                        داشبورد
                                    </Link>
                                    <Link to="/my-courses" className="block rounded-xl px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-100">
                                        دوره‌های من
                                    </Link>
                                    <Link to="/dictionary" className="block rounded-xl px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-100">
                                        دیکشنری
                                    </Link>
                                    <Link to="/dictionary" className="block rounded-xl px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-100">
                                        نظرات
                                    </Link>
                                    <Link to="/dictionary" className="block rounded-xl px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-100">
                                        سفارش‌ها
                                    </Link>
                                    <Link to="/support" className="block rounded-xl px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-100">
                                        پشتیبانی
                                    </Link>
                                    <Link to="/dictionary" className="block rounded-xl px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-100">
                                        حساب کاربری
                                    </Link>
                                    <div className="my-2 h-px bg-gray-100"/>
                                        <button onClick={handleLogout} className="w-full rounded-xl px-4 py-3 text-right text-sm text-red-500 transition hover:bg-red-50">
                                            خروج از حساب
                                        </button>
                                    </div>
                            </div>
                            : <div className="flex gap-2 items-center text-sm">
                                <Link className=" py-3 px-5 bg-button rounded-xl" to="/login">ورود</Link>
                                <Link
                                    className="bg-primary py-3 px-5 text-white rounded-xl transition-colors hover:bg-primary/85"
                                    to="/register">
                                    ثبت نام
                                </Link>
                            </div>
                        }
                    </div>
                </div>
            </header>
        </>
    )
}
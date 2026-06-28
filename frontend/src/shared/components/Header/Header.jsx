import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { Link, NavLink } from 'react-router'
import { AuthButtons } from "./AuthButtons"
import { ProfileDropdown } from "./ProfileDropdown"
import { CartButton } from "./CartButton"
import { refreshAccessToken } from "@/api/auth"


export function Header() {
    const navigate = useNavigate()
    const refresh_token = localStorage.getItem(import.meta.env.VITE_REFRESH_KEY)
    const [ access, setAccess ] = useState(localStorage.getItem(import.meta.env.VITE_VITE_ACCESS_KEY))
    const [ userProfile, setUserProfile ] = useState(null)
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        const fetchUserProfileData = async () => {
            try {
                const response = await fetch('/api/user-profile/', {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${access}`,
                        "Content-Type": "application/json"
                    }
                })
                const data = await response.json()
                if (response.ok) {
                    setUserProfile(data)
                }
                else if (response.status === 401) {
                    const newAccess = await refreshAccessToken(refresh_token)

                    // if (!newAccess) {
                    //     navigate('/login')
                    //     return
                    // }
                    setAccess(newAccess)
                }

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        void fetchUserProfileData()
    }, [access])

    const handleLogout = () => {
        localStorage.removeItem(import.meta.env.VITE_ACCESS_KEY)
        localStorage.removeItem(import.meta.env.VITE_REFRESH_KEY)
        setUserProfile(null)
        navigate('/')
    }
    return (
        <>
            <header className="p-5 bg-body-bg/80 backdrop-filter backdrop-blur-md shadow-xs sticky top-0 z-10">
                <div className="container flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        <img className="w-10" src="/logo.png" alt="logo"/>
                        <div>
                            <p className="font-bold text-xl">لینگــولند</p>
                            <span className="text-sm">آموزشگاه آنلاین زبان انگلیسی</span>
                        </div>
                    </Link>
                    <nav>
                        <ul className="flex items-center gap-12 text-sm font-medium">
                            <li className="hover:text-primary">
                                <NavLink to="/" className={({isActive}) => isActive ? 'text-primary' : ''} end>صفحه اصلی</NavLink>
                            </li>
                            <li className="hover:text-primary">
                                <NavLink to="/courses" className={({isActive}) => isActive ? 'text-primary' : ''}>دوره‌ها</NavLink>
                            </li>
                            <li className="hover:text-primary">
                                <NavLink to="/dictionary" className={({isActive}) => isActive ? 'text-primary' : ''}>دیکشنری</NavLink>
                            </li>
                            <li className="hover:text-primary">
                                <NavLink to="/articles" className={({isActive}) => isActive ? 'text-primary' : ''}>مقالات</NavLink>
                            </li>
                        </ul>
                    </nav>
                    <div className="flex items-center gap-8">
                        <CartButton />
                        {
                            loading ? <div className="skeleton h-12 w-[170px] rounded-xl"></div> :
                            userProfile ? <ProfileDropdown userProfile={userProfile} onLogout={handleLogout} /> : <AuthButtons />
                        }
                    </div>
                </div>
            </header>
        </>
    )
}
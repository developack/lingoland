import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { Link } from 'react-router'
import { AuthButtons } from "./AuthButtons"
import { ProfileDropdown } from "./ProfileDropdown"


export function Header() {
    const navigate = useNavigate()
    const authToken = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY)
    const [ userProfile, setUserProfile ] = useState(null)
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
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
                if (response.ok) {
                    setUserProfile(data)
                }

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
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
                        <Link to="/cart">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/>
                            </svg>
                        </Link>
                        {
                            loading ? <div className="skeleton h-12 w-30"></div> :
                            userProfile ? <ProfileDropdown userProfile={userProfile} onLogout={handleLogout} /> : <AuthButtons />
                        }
                    </div>
                </div>
            </header>
        </>
    )
}
import { Link, useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { ProfileDropdown } from "../../../shared/components/Header/ProfileDropdown"


export function LearningHeader({ step }) {
    const navigate = useNavigate()
    const authToken = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY)
    const [ userProfile, setUserProfile ] = useState(null)

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
        <header className="flex items-center justify-between border-b border-border bg-white px-6 py-4">
            <Link className="flex items-center gap-3" to="/" data-discover="true">
                <img className="w-10" alt="logo" src="/logo.png"/>
                <div>
                    <p className="font-bold text-xl">لینگــولند</p>
                    <span className="text-sm">آموزشگاه آنلاین زبان انگلیسی</span>
                </div>
            </Link>
            <div className="w-100">
                <div className="mb-1 flex justify-between gap-5 items-center text-sm">
                    <span className="text-xs whitespace-nowrap">درصد پیشرفت دوره</span>
                    <div className="h-2 w-full rounded-full bg-slate-200">
                        <div className="h-2 rounded-full bg-secondary" style={{width: `${step.progress_percentage}%`}}/>
                    </div>
                    <span className="text-xs">{step.progress_percentage}%</span>
                </div>
            </div>
            <ProfileDropdown userProfile={userProfile} onLogout={handleLogout}/>
        </header>
    )
}
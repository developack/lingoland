import { Link } from "react-router"
import { useNavigate } from "react-router"


export function PanelSidebar() {
    const authToken = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY)
    const navigate = useNavigate()

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
            navigate('/')
        }
    }

    return (
        <aside className="w-64 bg-gray-900 text-white p-5 hidden md:block">
            <Link to="/" className="flex items-center gap-3 mb-5 pb-5 border-b border-white" href="/" data-discover="true">
                <img className="w-8" alt="logo" src="/logo.png"/>
                <div>
                    <p className="font-bold text-md text-white">لینگــولند</p>
                    <span className="text-xs text-white">آموزشگاه آنلاین زبان انگلیسی</span>
                </div>
            </Link>

            <nav className="space-y-4">
                <Link to="/dashboard" className="block hover:bg-gray-700 p-2 rounded text-white">داشبورد</Link>
                <Link to="/my-courses" className="block hover:bg-gray-700 p-2 rounded text-white">دوره‌های من</Link>
                <Link to="/comments" className="block hover:bg-gray-700 p-2 rounded text-white">نظرات</Link>
                <Link to="/orders" className="block hover:bg-gray-700 p-2 rounded text-white">سفارش‌ها</Link>
                <Link to="/profile" className="block hover:bg-gray-700 p-2 rounded text-white">حساب کاربری</Link>
                <button onClick={handleLogout} className="block w-full text-right hover:bg-red-700 p-2 rounded text-white ">خروج</button>
            </nav>
        </aside>
    )
}
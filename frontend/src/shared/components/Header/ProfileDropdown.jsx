import { Link } from "react-router"
import { useAuth } from "@/hooks/useAuth"
import { BASE_URL } from "@/config/api"


export function ProfileDropdown() {
    const { loading, logout, user } = useAuth()

    return (
        <>
            {loading
                ? <div className="skeleton w-[170px] h-[50px]"></div>
                : <div className="relative group">
                    <div
                        className="flex items-center gap-3 cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-2 transition hover:bg-gray-50 w-[170px]">
                        <img src={user?.user_profile?.avatar ? `${BASE_URL}${user.user_profile.avatar}` : '/avatar.png'}
                            alt="avatar" className="h-8 w-8 rounded-full object-cover"/>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-gray-800 max-w-[100px] overflow-hidden truncate">
                                {user ? user.username  : 'مهمان'}
                            </span>
                        </div>
                    </div>
                    <div
                        className="invisible absolute left-0 top-16 z-50 w-56 translate-y-2 rounded-2xl border border-gray-100 bg-white p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                        <Link to="/dashboard"
                              className="block rounded-xl px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-100">
                            داشبورد
                        </Link>
                        <Link to="/my-courses"
                              className="block rounded-xl px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-100">
                            دوره‌های من
                        </Link>
                        <Link to="/comments"
                              className="block rounded-xl px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-100">
                            نظرات
                        </Link>
                        <Link to="/orders"
                              className="block rounded-xl px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-100">
                            سفارش‌ها
                        </Link>
                        <Link to="/profile"
                              className="block rounded-xl px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-100">
                            حساب کاربری
                        </Link>
                        <div className="my-2 h-px bg-gray-100"/>
                        <button onClick={logout}
                                className="w-full rounded-xl px-4 py-3 text-right text-sm text-red-500 transition hover:bg-red-50">
                            خروج از حساب
                        </button>
                    </div>
                </div>
            }
        </>
    )
}
import { Link, NavLink } from 'react-router'
import { AuthButtons } from "./AuthButtons"
import { ProfileDropdown } from "./ProfileDropdown"
import { CartButton } from "./CartButton"
import { useAuth } from "@/hooks/useAuth"


export function Header() {
    const { loading, isAuthenticated } = useAuth()

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
                            isAuthenticated ? <ProfileDropdown /> : <AuthButtons />
                        }
                    </div>
                </div>
            </header>
        </>
    )
}
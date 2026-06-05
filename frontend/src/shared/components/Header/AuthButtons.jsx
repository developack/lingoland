import { Link } from "react-router"


export function AuthButtons() {
    return (
        <div className="flex gap-2 items-center text-sm">
            <Link className=" py-3 px-5 bg-button rounded-xl" to="/login">ورود</Link>
            <Link
                className="bg-primary py-3 px-5 text-white rounded-xl transition-colors hover:bg-primary/85"
                to="/register">
                ثبت نام
            </Link>
        </div>
    )
}
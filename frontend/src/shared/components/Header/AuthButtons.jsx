import { Link } from "react-router"
import { Button } from "@/components/ui/button"


export function AuthButtons() {
    return (
        <div className="flex gap-2 items-center text-sm">
            <Button variant="secondary" asChild className="h-10">
                <Link className=" py-3 px-5 bg-button rounded-xl" to="/login">ورود</Link>
            </Button>

            <Button className="h-10" asChild>
                <Link className="bg-primary py-3 px-5 text-white rounded-xl transition-colors hover:bg-primary/85"
                      to="/register">
                    ثبت نام
                </Link>
            </Button>
        </div>
    )
}
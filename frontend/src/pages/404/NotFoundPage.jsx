import { Header } from "../../shared/components/Header/Header"
import { Footer } from "../../shared/components/Footer"
import { Button } from "@/components/ui/button"
import { Link } from "react-router"


export function NotFoundPage() {
    return (
        <>
            <Header/>
                <div className="min-h-screen flex items-center justify-center text-white px-6">
                <div className="text-center max-w-lg">
                    <h1 className="text-8xl md:text-9xl font-extrabold text-primary">
                        404
                    </h1>

                    <h2 className="mt-4 text-3xl md:text-4xl font-bold">
                        صفحه پیدا نشد!
                    </h2>

                    <p className="mt-4 leading-relaxed">
                        متأسفیم، صفحه‌ای که به دنبال آن هستید وجود ندارد یا به آدرس
                        دیگری منتقل شده است.
                    </p>

                    <div className="mt-8 flex justify-center gap-4 flex-wrap">
                        <Button asChild>
                            <Link to="/" className="h-10">
                                بازگشت به خانه
                            </Link>
                        </Button>
                    </div>

                    <div className="mt-10">
                        <div className="relative mx-auto w-32 h-32">
                            <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-3xl"></div>
                            <div className="relative flex items-center justify-center w-full h-full text-6xl">
                                🚀
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
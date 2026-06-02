import { Link } from "react-router"


export function Footer() {
    return(
        <footer className="mt-40 bg-text py-5">
            <div className="container grid grid-cols-[1fr_1fr_1fr] items-center justify-items-center py-5 gap-5">
                <div>
                    <Link to="/" className="flex items-center gap-3 mb-5">
                        <img className="w-10" src="../../../public/logo.png" alt="logo"/>
                        <div>
                            <p className="font-bold text-xl text-white">لینگــولند</p>
                            <span className="text-sm text-white">آموزشگاه آنلاین زبان انگلیسی</span>
                        </div>
                    </Link>
                    <p className="text-sm text-justify leading-8 text-white">مجموعه لینگولند در طی سال‌های اخیر با تلاش‌های بسیار همواره به دنبال یافتن بهترین روش با
                        بالاترین بازدهی بوده است. روشی که بتوان از آن در آموزش‌های آنلاین استفاده کرد تا دانشجویان
                        علاوه بر دریافت هرچه بیشتر دانش، از گذراندن دوره‌های آموزشی لذت ببرند.</p>
                </div>
                <nav>
                    <h4 className="text-white font-bold mb-5 text-xl">دسترسی سریع</h4>
                    <ul className="text-sm flex flex-col gap-4">
                        <li><Link to="" className="text-white">درباره ما</Link></li>
                        <li><Link to="" className="text-white">تماس با ما</Link></li>
                        <li><Link to="" className="text-white">حریم خصوصی</Link></li>
                        <li><Link to="" className="text-white">قوانین و مقررات</Link></li>
                        <li><Link to="" className="text-white">شبکه‌های اجتماعی</Link></li>
                    </ul>
                </nav>
                <div className="grid grid-cols-3 w-full h-full gap-5 items-start">
                    <div className="bg-button rounded-xl w-full h-30"></div>
                    <div className="bg-button rounded-xl w-full h-30"></div>
                    <div className="bg-button rounded-xl w-full h-30"></div>
                </div>
            </div>
            <div className="border-t border-border pt-5">
                <div className="flex items-start justify-between container">
                    <p className="text-sm text-white container">ساخته شده با ❤️ در لینگولند</p>
                    <div className="flex items-center gap-5">
                        <span className="bg-button h-5 w-5 rounded-sm
                        "></span>
                        <span className="bg-button h-5 w-5 rounded-sm
                        "></span>
                        <span className="bg-button h-5 w-5 rounded-sm
                        "></span>
                        <span className="bg-button h-5 w-5 rounded-sm
                        "></span>
                        <span className="bg-button h-5 w-5 rounded-sm
                        "></span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
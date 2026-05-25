import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";


export function CourseDetailPage() {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL
    const [course, setCourse] = useState({})
    const { slug } = useParams()

    useEffect(() => {
        fetch(`/api/course/${slug}`)
            .then((response) => response.json())
            .then((data) => {
                setCourse(data)
            })
    }, [])

    return(
        <>
            <title>{course.title}</title>

            <Header/>
            <div className="container grid grid-cols-[3fr_1fr] gap-10 flex-1 mt-20 items-start">
                <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

                    <div className="relative h-96">
                        <img src={`${BASE_URL}${course.thumbnail}`} alt="تصویر دوره" className="w-full h-full object-cover"/>
                        <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
                            🔥 ویژه
                        </div>
                    </div>

                    <div className="p-8">

                        <h1 className="text-3xl font-bold text-gray-800 mb-3">دوره جامع آموزش React.js</h1>

                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-1">
                                <span className="text-yellow-400">★★★★★</span>
                                <span className="text-gray-600 text-sm">(۴.۸)</span>
                            </div>
                            <div className="text-gray-400">|</div>
                            <div className="text-gray-600 text-sm">
                                👥 ۱,۲۳۴ دانشجو
                            </div>
                        </div>

                        <div className="bg-blue-50 border-r-4 border-blue-500 p-4 rounded-lg mb-6">
                            <p className="text-gray-700 leading-relaxed">
                                ✨ آموزش حرفه‌ای React.js از صفر تا صد به همراه پروژه‌های عملی
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <div className="text-2xl mb-1">⏱️</div>
                                <div className="text-sm text-gray-600">مدت دوره</div>
                                <div className="font-bold text-gray-800">۲۴ ساعت</div>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <div className="text-2xl mb-1">📹</div>
                                <div className="text-sm text-gray-600">تعداد جلسات</div>
                                <div className="font-bold text-gray-800">۴۲ جلسه</div>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <div className="text-2xl mb-1">👨‍🏫</div>
                                <div className="text-sm text-gray-600">مدرس</div>
                                <div className="font-bold text-gray-800">علی رضوی</div>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <div className="text-2xl mb-1">📁</div>
                                <div className="text-sm text-gray-600">آخرین بروزرسانی</div>
                                <div className="font-bold text-gray-800">۱۴۰۳</div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2 inline-block">
                                📖 توضیحات کامل دوره
                            </h2>
                            <div className="mt-4 space-y-3 text-gray-700 leading-relaxed">
                                <p>
                                    در این دوره جامع و عملی، شما از صفر تا صد فریمورک React.js را به صورت پروژه‌محور یاد
                                    خواهید گرفت.
                                    این دوره مناسب تمام برنامه‌نویسانی است که آشنایی مقدماتی با HTML، CSS و جاوااسکریپت
                                    دارند.
                                </p>
                                <p>
                                    در طول این دوره، بیش از ۱۰ پروژه عملی کوچک و بزرگ خواهیم ساخت و با مفاهیم پیشرفته‌ای
                                    مانند
                                    Hooks، Context API، Redux، React Router و موارد دیگر آشنا خواهید شد.
                                </p>
                                <p>
                                    پس از پایان این دوره، شما توانایی ساخت اپلیکیشن‌های پیشرفته وب با React را خواهید
                                    داشت
                                    و می‌توانید به عنوان یک توسعه‌دهنده حرفه‌ای React مشغول به کار شوید.
                                </p>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-gray-800 mb-3">
                                ✅ آنچه در این دوره یاد می‌گیرید:
                            </h3>
                            <div className="grid md:grid-cols-2 gap-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>مفاهیم پایه و نصب React</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>کامپوننت‌ها و Props</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>State و مدیریت داده</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>Hooks (useState, useEffect و...)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>React Router برای مسیریابی</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span>
                                    <span>اتصال به API و Backend</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4 border-t">
                            <button
                                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition">
                                🛒 ثبت‌نام در دوره
                            </button>
                            <button
                                className="px-6 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition">
                                💬 سوال دارم
                            </button>
                        </div>

                    </div>
                </div>
                <aside className="bg-white rounded-xl h-full"></aside>
            </div>
            <Footer/>
        </>
    )
}
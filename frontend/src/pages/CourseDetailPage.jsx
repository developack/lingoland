import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { Header } from "../shared/components/Header"
import { Footer } from "../shared/components/Footer"
import { LessonsList } from '../features/lms/components/LessonsList'
import { Comments } from '../features/comment/components/Comments'
import { useNavigate } from "react-router"


export function CourseDetailPage() {
    const authToken = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY)
    const navigate = useNavigate()
    const [ course, setCourse ] = useState({})
    const [ comments, setComments ] = useState([])
    const { slug } = useParams()

    useEffect(() => {
        const fetchCourseDetailData = async () => {
            try {
                let headers = {
                    "Content-Type": "application/json"
                }
                if (authToken) {
                    headers.Authorization = `Token ${authToken}`
                }

                const response = await fetch(`/api/course/${slug}/`, {
                    method: 'GET',
                    headers: headers
                })
                const data = await response.json()
                setCourse(data)
            } catch (error) {
                console.log('Error fetching courses:', error)
            }
        }

        void fetchCourseDetailData()
    }, [])

    useEffect(() => {
        if (!course.id) return

        const fetchCourseCommentsData = async () => {
            try {
                const response = await fetch(`/api/comments/course/${course?.id}/`)
                const data = await response.json()
                setComments(data)
            } catch (error) {
                console.log(error)
            }
        }

        void fetchCourseCommentsData()
    }, [course.id])

    const handleEnrollment = async () => {
        if (!authToken) return

        try {
            const response = await fetch('/api/orders/', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${authToken}`
                },
                body: JSON.stringify({
                    courses: [slug]
                })
            })
            const data = await response.json()
            console.log(data)
            if (response.ok) {
                navigate('/cart')
            }

        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
            <title>{course.title}</title>

            <Header/>
            <div className="container grid grid-cols-[3fr_1fr] gap-10 flex-1 mt-20 items-start">
                <div className="max-w-6xl mx-auto bg-white rounded-2xl overflow-hidden">

                    <div className="relative h-96">
                        <img src={`${course.thumbnail}`} alt="تصویر دوره" className="w-full h-full object-cover"/>
                        <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
                            🔥 ویژه
                        </div>
                    </div>

                    <div className="p-8">

                        <h1 className="text-3xl font-bold text-gray-800 mb-3">{course.title}</h1>

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
                                {course.excerpt}
                            </p>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2 inline-block">
                                📖 توضیحات کامل دوره
                            </h2>
                            <div className="mt-4 space-y-3 text-gray-700 leading-relaxed">
                                {course.content}
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

                        <LessonsList lessons={course.lessons} is_enrolled={course.is_enrolled} />
                        <Comments comments={comments} setComments={setComments} slug={course.slug} type='Course' />
                    </div>
                </div>
                <aside className="bg-white rounded-xl p-5 sticky top-[110px]">
                    <div className="grid grid-cols-2 md:grid-cols-1 gap-4 mb-8">
                        <div className="text-center flex p-2 bg-gray-50 rounded-lg items-center gap-2">
                            <div className="text-2xl">⏱️</div>
                            <div className="text-sm text-gray-600">مدت دوره</div>
                            <div className="font-bold text-gray-800">۲۴ ساعت</div>
                        </div>
                        <div className="text-center flex p-2 bg-gray-50 rounded-lg items-center gap-2">
                            <div className="text-2xl">📹</div>
                            <div className="text-sm text-gray-600">تعداد جلسات</div>
                            <div className="font-bold text-gray-800">۴۲ جلسه</div>
                        </div>
                        <div className="text-center flex p-2 bg-gray-50 rounded-lg items-center gap-2">
                            <div className="text-2xl">👨‍🏫</div>
                            <div className="text-sm text-gray-600">مدرس</div>
                            <div className="font-bold text-gray-800">علی رضوی</div>
                        </div>
                        <div className="text-center flex p-2 bg-gray-50 rounded-lg items-center gap-2">
                            <div className="text-2xl">📁</div>
                            <div className="text-sm text-gray-600">آخرین بروزرسانی</div>
                            <div className="font-bold text-gray-800">۱۴۰۳</div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 pt-4 border-t">
                        {authToken
                            ? <button onClick={handleEnrollment} className="flex-1 bg-secondary text-white py-3 rounded-xl font-bold">ثبت‌نام در دوره</button>
                            : <span className="bg-cta/10 text-cta text-sm p-5 rounded-xl">جهت ثبت‌نام در دوره وارد حساب کاربری خود شوید</span>
                        }

                        <button
                            className="px-6 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition">💬
                            سوال دارم
                        </button>
                    </div>
                </aside>
            </div>
            <Footer/>
        </>
    )
}
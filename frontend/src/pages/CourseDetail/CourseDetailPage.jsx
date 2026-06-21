import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { Header } from "../../shared/components/Header/Header"
import { Footer } from "../../shared/components/Footer"
import { LessonsList } from './components/LessonsList'
import { Comments } from '../../features/comment/components/Comments'
import { CourseSidebar } from "./components/CourseSidebar"
import { CourseContent } from "./components/CourseContent"
import { CourseHero } from "./components/CourseHero"
import { useNavigate } from "react-router"
import { useComments } from "@/hooks/useComments"


export function CourseDetailPage() {
    const authToken = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY)
    const { slug } = useParams()
    const navigate = useNavigate()
    const [ course, setCourse ] = useState({})
    const [ loading, setLoading ] = useState(true)
    const [ comments, setComments ] = useComments('course', course?.id)

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

                if (response.status === 404) {
                    navigate('/404')
                }

                const data = await response.json()
                setCourse(data)

            } catch (error) {
                console.log('Error fetching courses:', error)
            } finally {
                setLoading(false)
            }
        }

        void fetchCourseDetailData()
    }, [slug, authToken])

    const handleEnrollment = async () => {
        if (!authToken) return

        try {
            const response = await fetch('/api/order/', {
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
                <div className="bg-white rounded-2xl overflow-hidden">
                    <div className="p-8">
                        <CourseHero course={course} />
                        <CourseContent course={course}/>
                        <LessonsList lessons={course.lessons} is_enrolled={course.is_enrolled}/>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2 inline-block">
                                دیدگاه‌های دوره
                            </h2>
                            <Comments comments={comments} setComments={setComments} slug={course.slug} type='Course'/>
                        </div>
                    </div>
                </div>
                <CourseSidebar handleEnrollment={handleEnrollment} isEnrolled={course.is_enrolled} loading={loading}/>
            </div>
            <Footer/>
        </>
    )
}
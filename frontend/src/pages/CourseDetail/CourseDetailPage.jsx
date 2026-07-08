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
import { apiRequest } from "@/api/client"
import { useAuth } from "@/hooks/useAuth"


export function CourseDetailPage() {
    const { isAuthenticated } = useAuth()
    const { slug } = useParams()
    const navigate = useNavigate()
    const [ course, setCourse ] = useState({})
    const [ loading, setLoading ] = useState(true)
    const [ comments, setComments ] = useComments('course', course?.id)

    useEffect(() => {
        const fetchCourseDetailData = async () => {
            try {
                const data = await apiRequest(`/api/course/${slug}/`, {method: 'GET'})
                setCourse(data)

            } catch (error) {
                console.log('Error fetching courses:', error)
            } finally {
                setLoading(false)
            }
        }

        void fetchCourseDetailData()
    }, [slug])

    const handleEnrollment = async () => {
        if (!isAuthenticated) return

        try {
            await apiRequest('/api/order/', {method: 'POST', data: { courses: [slug] }})
            navigate('/cart')

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
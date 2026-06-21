import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { Comments } from "../../features/comment/components/Comments"
import { LearningHeader } from "../../features/lms/components/LearningHeader"
import { LessonsSidebarNavigation } from "../../features/lms/components/LessonsSidebarNavigation"
import { ServerError } from "@/shared/components/Messages/ServerError"
import { useLmsContext } from "@/hooks/useLmsContext"
import { toast } from "sonner"


export function LessonDetailPage() {
    const authToken = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY)
    const { slug } = useParams()
    const [ lesson, setLesson ] = useState({})
    const [ error, setError ] = useState('')
    const [ lessonLoading, setLessonLoading ] = useState(true)
    const [ comments, setComments ] = useState([])
    const { learningContext, loading, reload } = useLmsContext(lesson?.course)

    useEffect(() => {
        const fetchLessonDetailData = async () => {
            try {
                const response = await fetch(`/api/lesson/${slug}/`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${authToken}`
                    }
                })

                const data = await response.json()
                setLesson(data)

            } catch (error) {
                setError('خطا در برقراری ارتباط با سرور')
                toast.error('خطا در برقراری ارتباط با سرور')
            } finally {
                setLessonLoading(false)
            }
        }

        void fetchLessonDetailData()
    }, [slug]);

    useEffect(() => {
        if (!lesson.id) return
        const fetchLessonCommentsData = async () => {
            try {
                const response = await fetch(`/api/comments/lesson/${lesson.id}/`)
                const data = await response.json()

                setComments(data)
            } catch (error) {
                console.log(error)
            }
        }

        void fetchLessonCommentsData()
    }, [lesson.id])

    const handleMarkComplete = async () => {
        try {
            const response = await fetch(`/api/lesson/${lesson.slug}/mark-complete/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Token ${authToken}`
                }
            })

            const data = await response.json()
            setLesson(prev => ({...prev, is_complete: true, progress_percentage: data.progress_percentage}))
            toast.success('درس با موفقیت تکمیل شد')
            await reload()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">

            <LearningHeader learningContext={learningContext} loading={loading} />

            <div className="flex flex-1 overflow-hidden">

                <LessonsSidebarNavigation learningContext={learningContext} lessonId={lesson.id} loading={loading} />

                <main className="flex-1 overflow-y-auto p-8 container">
                    <div className="mx-auto max-w-4xl bg-white p-8 rounded-xl shadow-sm">

                        <div className="flex items-center justify-between mb-8 pb-5 border-b border-border">
                            {lessonLoading
                                ? <div className="skeleton w-[30%] h-[32px]"></div>
                                : <h2 className="text-2xl font-bold">{lesson.title}</h2>
                            }
                            {lessonLoading
                                ? <div className="skeleton w-[137px] h-[36px]"></div>
                                : <button type="button" onClick={handleMarkComplete} className={`rounded-lg px-4 py-2 text-sm font-medium transition
                                    ${lesson.is_complete ? 'bg-success text-white' : 'bg-primary text-white hover:bg-indigo-700'}`}>
                                    {lesson.is_complete ? 'درس تکمیل شد ✓' : 'تکمیل درس'}
                                </button>}
                        </div>

                        <div className="rounded-xl bg-white">
                            <p className="mb-5 bg-gray-100 rounded-xl p-5">{lesson.excerpt}</p>
                            <p className="text-slate-700 leading-7 min-h-70">
                                {error && <ServerError />}
                                {lessonLoading
                                    ? <div className="flex flex-col gap-10">
                                        <div className="flex flex-col gap-3">
                                            <p className="w-full h-3.5 skeleton"></p>
                                            <p className="w-full h-3.5 skeleton"></p>
                                            <p className="w-[50%] h-3.5 skeleton"></p>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <p className="w-full h-3.5 skeleton"></p>
                                            <p className="w-full h-3.5 skeleton"></p>
                                            <p className="w-[50%] h-3.5 skeleton"></p>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <p className="w-full h-3.5 skeleton"></p>
                                            <p className="w-full h-3.5 skeleton"></p>
                                            <p className="w-[50%] h-3.5 skeleton"></p>
                                        </div>
                                    </div>
                                    : lesson.content
                                }
                            </p>
                        </div>
                        <div className="mt-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2 inline-block">دیدگاه‌ها</h2>
                            <Comments comments={comments} setComments={setComments} slug={slug} type='Lesson'/>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
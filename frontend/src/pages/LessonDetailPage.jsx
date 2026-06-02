import { useState, useEffect } from "react"
import { Link, useParams } from "react-router"
import { Comments } from "../features/comment/components/Comments";
import { LearningHeader } from "../features/lms/components/LearningHeader"
import { LessonsSidebarNavigation } from "../features/lms/components/LessonsSidebarNavigation"


export function LessonDetailPage() {
    const authToken = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY)
    const [ lesson, setLesson ] = useState({})
    const [ comments, setComments ] = useState([])
    const { slug } = useParams()

    useEffect(() => {
        const fetchLessonDetailData = async () => {
            try {
                const response = await fetch(`/api/lesson/${slug}/`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Token ${authToken}`
                    }
                })

                const data = await response.json()
                setLesson(data)
            } catch (error) {
                console.log(error)
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

        } catch (error) {
            console.log(error)
        }
    }

    const user = {
        name: "Ali",
        progress: 35,
    };
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">

            {/* HEADER */}
            <LearningHeader user={user} step={lesson} />

            {/* BODY */}
            <div className="flex flex-1 overflow-hidden">

                {/* SIDEBAR (RIGHT) */}
                <LessonsSidebarNavigation step={lesson} />

                {/* CONTENT */}
                <main className="flex-1 overflow-y-auto p-8 container">
                    <div className="mx-auto max-w-4xl">

                        <h2 className="mb-4 text-2xl font-bold">
                            {lesson.title}
                        </h2>

                        <div className="my-6">
                            <h3 className="mb-2 font-semibold">
                                Topics:
                            </h3>

                            <ul className="space-y-2 text-sm text-slate-600">
                                {lesson.topics && lesson.topics.map((topic, index) => (
                                    <li key={index}><Link to={`/topic/${topic.slug}/`}>• {topic.title}</Link></li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-xl border bg-white p-6 shadow-sm">
                            <p className="mb-5 bg-gray-100 rounded-xl p-5">{lesson.excerpt}</p>
                            <p className="text-slate-700 leading-7">
                                {lesson.content}
                            </p>

                             {/*COMPLETE BUTTON*/}
                            <button type="button" onClick={ handleMarkComplete } className={`mt-6 rounded-lg px-4 py-2 text-sm font-medium transition
                             ${lesson.is_complete ? 'bg-green-500 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
                                {lesson.is_complete ? 'درس تکمیل شد ✓' : 'تکمیل درس' }
                            </button>
                        </div>
                        <div className="mt-8">
                            <Comments comments={comments} setComments={setComments} slug={slug} type='Lesson'/>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
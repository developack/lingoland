import { useState, useEffect } from "react"
import { Link, useParams } from "react-router"
import { Comments } from "../components/Comments/Comments.jsx";


export function LessonDetailPage() {
    const authToken = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY)
    const [ lesson, setLesson ] = useState({})
    const [ comments, setComments ] = useState([])
    const [ courseSteps, setCourseSteps ] = useState([])
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

    useEffect(() => {
        if (!lesson.course) return

        const fetchCourseStepsData = async () => {
            try {
                const response = await fetch(`/api/course/${lesson?.course}/lessons/`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Token ${authToken}`
                    }
                })
                const data = await response.json()
                setCourseSteps(data)
            } catch (error) {
                console.log(error)
            }
        }

        void fetchCourseStepsData()
    }, [lesson.course]);

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
            <header className="flex items-center justify-between border-b bg-white px-6 py-4">
                <div>
                    <h1 className="text-lg font-bold">Course Player</h1>
                    <p className="text-sm text-slate-500">
                        Welcome {user.name}
                    </p>
                </div>

                <div className="w-72">
                    <div className="mb-1 flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{lesson.progress_percentage}%</span>
                    </div>

                    <div className="h-2 w-full rounded-full bg-slate-200">
                        <div
                            className="h-2 rounded-full bg-indigo-500"
                            style={{ width: `${lesson.progress_percentage}%` }}
                        />
                    </div>
                </div>
            </header>

            {/* BODY */}
            <div className="flex flex-1 overflow-hidden">

                {/* SIDEBAR (RIGHT) */}
                <aside className="w-96 border-l bg-white overflow-y-auto">

                    <div className="border-b p-4">
                        <h3 className="font-bold">Course Lessons</h3>
                        {/*<p className="text-xs text-slate-500">*/}
                        {/*    {completedLessons.length} / {lessons.length} completed*/}
                        {/*</p>*/}
                    </div>

                    <div>
                        {courseSteps.map((step) => {

                            return (
                                <button
                                    key={step.id}
                                    className={`w-full border-b px-4 py-3 text-right transition 
                                    ${step.slug === lesson.slug ? "bg-indigo-50" : "hover:bg-slate-50"}`}>
                                    <div className="flex items-center justify-between">
                                        <Link to={`/lesson/${step.slug}/`} className="text-sm font-medium">
                                            {step.title}
                                        </Link>

                                        <span
                                            className={`text-xs ${step.is_complete ? "text-green-500" : "text-slate-400"}`}>
                                            {step.is_complete ? "✔" : "○"}
                                        </span>
                                    </div>

                                    <p className="text-xs text-slate-400 mt-1">
                                        {step.topics.length} topics
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </aside>

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
                            <Comments authToken={authToken} comments={comments} setComments={setComments} slug={slug} type='Lesson'/>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
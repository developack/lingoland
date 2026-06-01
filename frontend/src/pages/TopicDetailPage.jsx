import { useState, useEffect } from "react"
import { Link, useParams } from "react-router"
import { Comments } from "../components/Comments/Comments.jsx";


export function TopicDetailPage() {
    const authToken = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY)
    const [ topic, setTopic ] = useState({})
    const [ comments, setComments ] = useState([])
    const [ courseSteps, setCourseSteps ] = useState([])
    const { slug } = useParams()

    useEffect(() => {
        const fetchTopicDetailData = async () => {
            try {
                const response = await fetch(`/api/topic/${slug}/`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Token ${authToken}`
                    }
                })

                const data = await response.json()
                setTopic(data)
            } catch (error) {
                console.log(error)
            }
        }

        void fetchTopicDetailData()
    }, [slug]);

    useEffect(() => {
        if (!topic.id) return

        const fetchTopicCommentsData = async () => {
            try {
                const response = await fetch(`/api/comments/topic/${topic.id}/`)
                const data = await response.json()
                setComments(data)
            } catch (error) {
                console.log(error)
            }
        }

        void fetchTopicCommentsData()
    }, [topic.id])

    useEffect(() => {
        if (!topic.course) return

        const fetchCourseStepsData = async () => {
            try {
                const response = await fetch(`/api/course/${topic?.course}/lessons/`, {
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
    }, [topic.course]);

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
                        <span>{topic.progress_percentage}%</span>
                    </div>

                    <div className="h-2 w-full rounded-full bg-slate-200">
                        <div
                            className="h-2 rounded-full bg-indigo-500"
                            style={{ width: `${topic.progress_percentage}%` }}
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
                    </div>

                    <div>
                        {courseSteps.map((step) => {

                            return (
                                <button
                                    key={step.id}
                                    className={`w-full border-b px-4 py-3 text-right transition 
                                    ${step.slug === topic.slug ? "bg-indigo-50" : "hover:bg-slate-50"}`}>
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
                            {topic.title}
                        </h2>

                        <div className="rounded-xl border bg-white p-6 shadow-sm">
                            <p className="text-slate-700 leading-7">
                                {topic.content}
                            </p>

                        </div>
                        <div className="mt-8">
                            <Comments authToken={authToken} comments={comments} setComments={setComments} slug={slug} type='Topic'/>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
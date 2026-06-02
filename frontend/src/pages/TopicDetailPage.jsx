import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { Comments } from "../components/Comments/Comments";
import { LearningHeader } from "../components/LearningHeader";
import { LessonsSidebarNavigation } from "../components/LessonsSidebarNavigation"


export function TopicDetailPage() {
    const authToken = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY)
    const [ topic, setTopic ] = useState({})
    const [ comments, setComments ] = useState([])
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

    const user = {
        name: "Ali",
        progress: 35,
    };
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">

            {/* HEADER */}
            <LearningHeader user={user} step={topic} />

            {/* BODY */}
            <div className="flex flex-1 overflow-hidden">

                {/* SIDEBAR (RIGHT) */}
                <LessonsSidebarNavigation step={topic} />

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
                            <Comments comments={comments} setComments={setComments} slug={slug} type='Topic'/>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
import { useState, useEffect } from "react"
import { PanelHeader } from "../../../features/user-panel/components/PanelHeader.jsx"
import { PanelSidebar } from "../../../features/user-panel/components/PanelSidebar.jsx"
import { Comments } from "./components/Comments"


export function CommentsPage() {
    // my-comments
    const authToken = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY)
    const [comments, setComments] = useState([])
    const [stats, setStats] = useState([])

    useEffect(() => {
        const fetchUserCommentsData = async () => {
            try{
                const response = await fetch('/api/my-comments/', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${authToken}`
                    }
                })

                const data = await response.json()
                setComments(data)

            } catch (error) {
                console.log(error)
            }
        }

        void fetchUserCommentsData()
    }, []);

    useEffect(() => {
        const fetchCommentStatsData = async () => {
            try {
                const response = await fetch('/api/comments/stats/', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${authToken}`
                    }
                })

                const data = await response.json()
                setStats(data)

            } catch (error) {
                console.log(error)
            }
        }

        void fetchCommentStatsData()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <PanelSidebar />
            <div className="flex-1 flex flex-col">
                <PanelHeader />
                <div className="p-6 container">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold">دیدگاه‌های من</h1>
                        <p className="text-gray-500">همه دیدگاه‌هایی که در سایت ارسال کردید</p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-xl border border-border">
                            <p className="text-gray-500 text-sm">همه کامنت‌ها</p>
                            <p className="text-2xl font-bold">{stats.comments_count}</p>
                        </div>

                        <div className="bg-white p-4 rounded-xl border border-border">
                            <p className="text-gray-500 text-sm">تایید شده</p>
                            <p className="text-2xl font-bold text-green-600">{stats.approved_comments_count}</p>
                        </div>

                        <div className="bg-white p-4 rounded-xl border border-border">
                            <p className="text-gray-500 text-sm">تایید نشده</p>
                            <p className="text-2xl font-bold text-yellow-500">{stats.unapproved_comments_count}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Comments comments={comments} />
                    </div>
                </div>
            </div>
        </div>
    )
}
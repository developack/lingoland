import { Link } from "react-router";
import { useEffect, useState } from "react";


export function LessonsSidebarNavigation({ step }) {
    const authToken = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY)
    const [ courseSteps, setCourseSteps ] = useState([])

    useEffect(() => {
        if (!step.course) return

        const fetchCourseStepsData = async () => {
            try {
                const response = await fetch(`/api/course/${step?.course}/lessons/`, {
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
    }, [step.course]);

    return (
        <aside className="w-96 border-l border-border bg-white overflow-y-auto">

            <div className="border-b border-border p-4">
                <h3 className="font-bold">Course Lessons</h3>
            </div>

            <div>
                {courseSteps.map((item, index) => {

                    return (
                        <button
                            key={index}
                            className={`w-full border-b border-border px-4 py-3 text-right transition 
                                    ${item.slug === step.slug ? "bg-indigo-50" : "hover:bg-slate-50"}`}>
                            <div className="flex items-center justify-between">
                                <Link to={`/lesson/${item.slug}/`} className="text-sm font-medium">
                                    {item.title}
                                </Link>

                                <span
                                    className={`text-xs ${item.is_complete ? "text-green-500" : "text-slate-400"}`}>
                                            {item.is_complete ? "✔" : "○"}
                                        </span>
                            </div>

                            <p className="text-xs text-slate-400 mt-1">
                                {item.topics.length} topics
                            </p>
                        </button>
                    );
                })}
            </div>
        </aside>
    )
}
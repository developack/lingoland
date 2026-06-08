import { PanelHeader } from "../../../features/user-panel/components/PanelHeader.jsx"
import { PanelSidebar } from "../../../features/user-panel/components/PanelSidebar.jsx"
import { useState, useEffect } from "react"
import { CoursesList } from "./components/CoursesList"

export function MyCoursesPage() {
    const authToken = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY)
    const [courses, setCourses] = useState([])

    useEffect(() => {
        const fetchUserCoursesData = async () => {
            try {
                const response = await fetch('/api/my-courses/', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${authToken}`
                    }
                })

                const data = await response.json()
                setCourses(data)

            } catch (error) {
                console.log(error)
            }
        }

        void fetchUserCoursesData()
    }, []);

    return (
        <div className="flex min-h-screen">

            <PanelSidebar />

            <div className="flex-1 flex flex-col">

                <PanelHeader />

                <div className="p-6 container">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold">دوره‌های من</h1>
                        <p className="text-gray-500">همه دوره‌هایی که ثبت‌نام کرده‌اید</p>
                    </div>

                    <CoursesList courses={courses}/>
                </div>

            </div>

        </div>

    )
}
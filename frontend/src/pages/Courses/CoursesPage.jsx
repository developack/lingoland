import { useState, useEffect } from "react"
import { Header } from "@/shared/components/Header/Header"
import { Footer } from "@/shared/components/Footer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { CoursesGrid } from "./components/CoursesGrid"


export function CoursesPage() {
    const [ courses, setCourses ] = useState([])

    useEffect(() => {
        const fetchCoursesData = async () => {
            try {
                const response = await fetch('/api/courses/')
                const data = await response.json()
                if (response.ok) {
                    setCourses(data)
                }

            } catch (error) {
                console.log('Error fetching courses:', error)
            }
        }
        void fetchCoursesData()
    }, [])

    return (
        <>
            <title>Courses Page</title>

            <Header/>
            <div className="container grid grid-cols-[1fr_3fr] gap-10 flex-1 mt-20 items-start">
                <aside className="">
                    <div className="sticky top-6 space-y-6">
                        <div className="bg-white rounded-2xl p-5 shadow-sm">
                            <h3 className="font-bold text-lg mb-4">
                                جستجو
                            </h3>

                            <Input type="text" placeholder="جستجوی دروه..."/>
                        </div>
                        <div className="bg-white rounded-2xl p-5 shadow-sm">
                            <h3 className="font-bold text-lg mb-4">
                                مرتب‌سازی
                            </h3>

                            <select
                                className="w-full border border-gray-200 rounded-xl px-4 py-3"
                            >
                                <option>جدیدترین</option>
                                <option>قدیمی‌ترین</option>
                                <option>محبوب‌ترین</option>
                                <option>بیشترین بازدید</option>
                            </select>
                        </div>
                        <div className="bg-white rounded-2xl p-5 shadow-sm">
                            <h3 className="font-bold text-lg mb-4">
                                دسته‌بندی‌ها
                            </h3>

                            <div className="space-y-3">

                                <div className="flex items-center gap-3 cursor-pointer">
                                    <Checkbox id="option1" />
                                    <Label htmlFor="option1">برنامه نویسی</Label>
                                </div>

                                <div className="flex items-center gap-3 cursor-pointer">
                                    <Checkbox id="option2" />
                                    <Label htmlFor="option2">هوش مصنوعی</Label>
                                </div>

                                <div className="flex items-center gap-3 cursor-pointer">
                                    <Checkbox id="option3" />
                                    <Label htmlFor="option3">React</Label>
                                </div>

                                <div className="flex items-center gap-3 cursor-pointer">
                                    <Checkbox id="option4" />
                                    <Label htmlFor="option4">TailwindCSS</Label>
                                </div>

                            </div>
                        </div>
                    </div>
                </aside>
                <div className="flex flex-col gap-10">
                    <CoursesGrid courses={courses}/>
                </div>
            </div>
            <Footer/>
        </>
    )
}
import { useState, useEffect } from "react"
import { Header } from "@/shared/components/Header/Header"
import { Footer } from "@/shared/components/Footer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { CoursesGrid } from "./components/CoursesGrid"


export function CoursesPage() {
    const [ courses, setCourses ] = useState([])
    const [ error, setError ] = useState('')

    useEffect(() => {
        const fetchCoursesData = async () => {
            try {
                const response = await fetch('/api/courses/')
                const data = await response.json()
                if (response.ok) {
                    setCourses(data)
                }

            } catch (error) {
                setError('خطا هنگام برقراری ارتباط با سرور')
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
                    {error && <div className="flex flex-col items-center justify-center bg-white rounded-xl p-5">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="size-30 stroke-destructive">
                              <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/>
                            </svg>
                        </span>
                        <p className="text-destructive font-bold">{error}</p>
                    </div>}
                    <CoursesGrid courses={courses}/>
                </div>
            </div>
            <Footer/>
        </>
    )
}
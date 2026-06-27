import { useState, useEffect } from "react"
import { Header } from "@/shared/components/Header/Header"
import { Footer } from "@/shared/components/Footer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { CoursesGrid } from "./components/CoursesGrid"
import { ServerError } from "@/shared/components/Messages/ServerError"
import { toast } from "sonner";


export function CoursesPage() {
    const [ courses, setCourses ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState('')
    const [ page, setPage ] = useState(1)
    const [ search, setSearch ] = useState('')
    const [ ordering, setOrdering ] = useState('')

    useEffect(() => {
        const fetchCoursesData = async () => {
            try {
                const response = await fetch(`/api/courses/?page=${page}&search=${search}&ordering=${ordering}`)

                const data = await response.json()
                if (response.ok) {
                    setCourses(data)
                }

            } catch (error) {
                console.log(error)
                setError('خطا هنگام برقراری ارتباط با سرور')
                toast.error('خطا هنگام برقراری ارتباط با سرور')
            } finally {
                setLoading(false)
            }
        }

        void fetchCoursesData()
    }, [page, search, ordering])

    const handleSearch = (event) => {
        setSearch(event.target.value)
        setPage(1)
    }

    const handleOrdering = (event) => {
        setOrdering(event.target.value)
        setPage(1)
        console.log(ordering)
    }

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

                            <Input type="text" onInput={handleSearch} value={search} placeholder="جستجوی دروه..."/>
                        </div>
                        <div className="bg-white rounded-2xl p-5 shadow-sm">
                            <h3 className="font-bold text-lg mb-4">
                                مرتب‌سازی
                            </h3>

                            <select onChange={handleOrdering} className="w-full border border-gray-200 rounded-xl px-4 py-3">
                                <option value="id">جدیدترین</option>
                                <option value="-id">قدیمی‌ترین</option>
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
                    {error && <ServerError />}
                    <CoursesGrid courses={courses} loading={loading} page={page} setPage={setPage}/>
                </div>
            </div>
            <Footer/>
        </>
    )
}
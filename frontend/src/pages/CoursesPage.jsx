import { Link } from 'react-router'
import { useState, useEffect } from "react"
import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";


export function CoursesPage() {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL
    const [courses, setCourses] = useState([])

    useEffect(() => {
        fetch('/api/courses/')
            .then((response) => response.json())
            .then((data) => {
                setCourses(data)
            })
    }, [])

    return (
        <>
            <title>Courses Page</title>

            <Header/>
            <div className="container grid grid-cols-[3fr_1fr] gap-10 flex-1 mt-20 items-start">
                <div className="flex flex-col gap-10">
                    <div className="flex items-start justify-between">
                        <div className="flex flex-col gap-2">
                            <h3 className="font-bold text-2xl">همه دوره‌ها</h3>
                            <span className="text-text-secondary text-sm">ما 24 دوره برای شما پیدا کردیم</span>
                        </div>
                        <div>
                            <select className="border border-border rounded-xl py-2 px-5">
                                <option value="" selected>جدیدترین</option>
                                <option value="">گرانترین</option>
                                <option value="">ارزان ترین</option>
                                <option value="">تخفیف دار</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-5 items-start">
                        {courses.map((course) => {
                            return (
                                <div key={course.id} className="rounded-xl bg-white overflow-hidden">
                                    <figure className="flex">
                                        <img className="w-full h-50 object-cover" src={`${BASE_URL}${course.thumbnail}`}
                                             alt={course.title}/>
                                    </figure>
                                    <div className="p-5">
                                        <div className="flex flex-col gap-2">
                                            <h5 className="font-bold text-md truncate">{course.title}</h5>
                                            <p className="text-text-secondary text-xs leading-6 line-clamp-3">
                                                {course.excerpt}
                                            </p>
                                        </div>
                                        <div className="flex gap-4 items-start mt-3">
                                            <div className="flex gap-1 items-center">
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                         className="size-5">
                                                      <path strokeLinecap="round" strokeLinejoin="round"
                                                            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/>
                                                    </svg>
                                                </span>
                                                <span className="text-xs ">14 ساعت</span>
                                            </div>
                                            <div className="flex gap-1 items-center">
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                         className="size-5">
                                                      <path strokeLinecap="round" strokeLinejoin="round"
                                                            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                                    </svg>
                                                </span>
                                                <span className="text-xs ">8 آزمون</span>
                                            </div>
                                        </div>
                                        <div className="mt-5 flex items-end justify-between">
                                            <Link
                                                to={`/course/${course.slug}`}
                                                className="text-sm rounded-xl text-primary bg-primary/5 p-2 font-medium transition-colors hover:text-white hover:bg-primary">
                                                مشاهده دوره
                                            </Link>
                                            <span className="text-sm text-secondary font-bold">{course.price}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div></div>
                </div>
                <aside className="bg-white rounded-xl p-5">
                    <div className="flex gap-2 items-center border-b border-border pb-5">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"/>
                            </svg>
                        </span>
                        <span className="font-bold">فیلترها</span>
                    </div>
                    <div className="mt-5">
                        <div className="flex items-center justify-between mb-5">
                            <span className="text-sm font-medium">دسته‌بندی</span>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="size-5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5"/>
                                </svg>
                            </span>
                        </div>
                        <ul className="flex flex-col gap-4">
                            <div className="flex gap-2 items-center text-sm">
                                <input id="1" type="checkbox"/>
                                <label htmlFor="1">برنامه نویسی وب</label>
                            </div>
                            <div className="flex gap-2 items-center text-sm">
                                <input id="1" type="checkbox"/>
                                <label htmlFor="1">برنامه نویسی موبایل</label>
                            </div>
                            <div className="flex gap-2 items-center text-sm">
                                <input id="1" type="checkbox"/>
                                <label htmlFor="1">طراحی UI / UX</label>
                            </div>
                            <div className="flex gap-2 items-center text-sm">
                                <input id="1" type="checkbox"/>
                                <label htmlFor="1">دیتا ساینس</label>
                            </div>
                            <div className="flex gap-2 items-center text-sm">
                                <input id="1" type="checkbox"/>
                                <label htmlFor="1">DevOps</label>
                            </div>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-3 text-sm mt-5">
                        <button type="button" className="text-white bg-primary rounded-xl p-3 cursor-pointer">اعمال
                            فیلترها
                        </button>
                        <button type="button" className="bg-white shadow-md rounded-xl p-3 cursor-pointer">پاک کردن
                            همه
                        </button>
                    </div>
                </aside>
            </div>
            <Footer/>
        </>
    )
}
import { useState, useEffect } from "react"
import { Header } from "../../shared/components/Header/Header"
import { Footer } from "../../shared/components/Footer"
import { ArticlesGrid } from "./components/ArticlesGrid"


export function ArticlesPage() {
    const [ articles, setArticles ] = useState([])

    useEffect(() => {
        const fetchArticlesData = async () => {
            try {
                const response = await fetch('/api/articles/')
                const data = await response.json()
                setArticles(data)

            } catch (error) {
                console.log(error)
            }

        }

        void fetchArticlesData()
    }, [])
    return (
        <>
            <title>Articles Page</title>

            <Header/>

            <section className="bg-gray-50 min-h-screen py-12">
                <div className="container mx-auto px-4">

                    <div className="grid lg:grid-cols-4 gap-8">

                        <aside className="lg:col-span-1">

                            <div className="sticky top-6 space-y-6">

                                <div className="bg-white rounded-2xl p-5 shadow-sm">
                                    <h3 className="font-bold text-lg mb-4">
                                        جستجو
                                    </h3>

                                    <input
                                        type="text"
                                        placeholder="جستجوی مقاله..."
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="bg-white rounded-2xl p-5 shadow-sm">
                                    <h3 className="font-bold text-lg mb-4">
                                        دسته‌بندی‌ها
                                    </h3>

                                    <div className="space-y-3">

                                        <label className="flex items-center justify-between cursor-pointer">
                                            <span>برنامه نویسی</span>
                                            <input type="checkbox"/>
                                        </label>

                                        <label className="flex items-center justify-between cursor-pointer">
                                            <span>هوش مصنوعی</span>
                                            <input type="checkbox"/>
                                        </label>

                                        <label className="flex items-center justify-between cursor-pointer">
                                            <span>React</span>
                                            <input type="checkbox"/>
                                        </label>

                                        <label className="flex items-center justify-between cursor-pointer">
                                            <span>TailwindCSS</span>
                                            <input type="checkbox"/>
                                        </label>

                                    </div>
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
                                        مقالات محبوب
                                    </h3>

                                    <div className="space-y-4">

                                        <a href="#" className="block group">
                                            <h4 className="font-medium group-hover:text-blue-600 transition">
                                                آموزش کامل React
                                            </h4>
                                            <span className="text-sm text-gray-500">
                  ۱۲ دقیقه مطالعه
                </span>
                                        </a>

                                        <a href="#" className="block group">
                                            <h4 className="font-medium group-hover:text-blue-600 transition">
                                                معرفی TailwindCSS
                                            </h4>
                                            <span className="text-sm text-gray-500">
                  ۷ دقیقه مطالعه
                </span>
                                        </a>

                                        <a href="#" className="block group">
                                            <h4 className="font-medium group-hover:text-blue-600 transition">
                                                هوش مصنوعی و آینده برنامه‌نویسی
                                            </h4>
                                            <span className="text-sm text-gray-500">
                  ۱۰ دقیقه مطالعه
                </span>
                                        </a>

                                    </div>
                                </div>

                            </div>

                        </aside>

                        <main className="lg:col-span-3">

                            <ArticlesGrid articles={articles} />

                        </main>

                    </div>

                </div>
            </section>

            <Footer/>
        </>
    )
}
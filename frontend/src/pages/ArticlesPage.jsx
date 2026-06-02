import { useState, useEffect } from "react"
import { Link } from "react-router"
import { Header } from "../shared/components/Header"
import { Footer } from "../shared/components/Footer"


export function ArticlesPage() {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL
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

                            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

                                {articles.map((article) => (
                                    <article key={article.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition">
                                        <img
                                            src={`${BASE_URL}${article.thumbnail}`} alt=""
                                            className="w-full h-52 object-cover"/>
                                        <div className="p-5">
                                          <span className="text-sm text-blue-600">
                                            برنامه نویسی
                                          </span>

                                            <h3 className="font-bold text-lg mt-2 mb-3">
                                                {article.title}
                                            </h3>

                                            <p className="text-gray-600 text-sm leading-7 line-clamp-2">
                                                {article.excerpt}
                                            </p>

                                            <Link
                                                to={`/article/${article.slug}`}
                                                className="inline-block mt-4 text-blue-600 font-medium"
                                            >
                                                ادامه مطلب →
                                            </Link>
                                        </div>
                                    </article>
                                ))}


                            </div>

                        </main>

                    </div>

                </div>
            </section>

            <Footer/>
        </>
    )
}
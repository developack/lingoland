import {useState, useEffect} from "react"
import { useParams } from 'react-router'
import { Header } from "../shared/components/Header/Header.jsx"
import { Footer } from "../shared/components/Footer"
import { Comments } from "../features/comment/components/Comments";


export function ArticleDetailPage() {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL
    const [ article, setArticle ] = useState({})
    const [ comments, setComments ] = useState([])
    const { slug } = useParams()

    useEffect(() => {
        if (!slug) return

        const fetchArticleData = async () => {
            try {
                const response = await fetch(`/api/article/${slug}/`)
                const data = await response.json()
                setArticle(data)

            } catch (error) {
                console.log(error)
            }
        }

        void fetchArticleData()
    }, [])


    useEffect(() => {
        if (!article.id) return

        const fetchArticleCommentsData = async () => {
            try {
                const response = await fetch(`/api/comments/article/${article?.id}/`)
                const data = await response.json()
                setComments(data)
            } catch (error) {
                console.log(error)
            }
        }

        void fetchArticleCommentsData()
    }, [article.id])

    return (
        <>
            <title>Article Detail Page</title>

            <Header/>

            <section className="bg-slate-50 py-12">
                <div className="max-w-7xl mx-auto px-4">

                    <div className="grid lg:grid-cols-12 gap-10">

                        <aside className="hidden lg:block lg:col-span-3">

                            <div className="sticky top-8 space-y-6">

                                <div className="bg-white rounded-3xl p-6 shadow-sm">
                                    <h3 className="font-bold text-lg mb-4">
                                        فهرست مطالب
                                    </h3>

                                    <nav className="space-y-3 text-sm">

                                        <a href="#" className="block text-slate-600 hover:text-blue-600">
                                            مقدمه
                                        </a>

                                        <a href="#" className="block text-slate-600 hover:text-blue-600">
                                            چرا React؟
                                        </a>

                                        <a href="#" className="block text-slate-600 hover:text-blue-600">
                                            نصب پروژه
                                        </a>

                                        <a href="#" className="block text-slate-600 hover:text-blue-600">
                                            ساخت کامپوننت‌ها
                                        </a>

                                        <a href="#" className="block text-slate-600 hover:text-blue-600">
                                            جمع‌بندی
                                        </a>

                                    </nav>
                                </div>

                                <div className="bg-white rounded-3xl p-6 shadow-sm">
                                    <div className="flex items-center gap-4">

                                        <img
                                            src="/avatar.png"
                                            className="w-14 h-14 rounded-full"
                                        />

                                        <div>
                                            <h4 className="font-semibold">
                                                علی محمدی
                                            </h4>

                                            <p className="text-sm text-slate-500">
                                                Frontend Developer
                                            </p>
                                        </div>

                                    </div>
                                </div>

                                <div className="bg-white rounded-3xl p-6 shadow-sm">

                                    <h3 className="font-bold mb-4">
                                        مقالات مرتبط
                                    </h3>

                                    <div className="space-y-4">

                                        <a href="#" className="block">
                                            <h4 className="font-medium hover:text-blue-600">
                                                آموزش TailwindCSS
                                            </h4>
                                        </a>

                                        <a href="#" className="block">
                                            <h4 className="font-medium hover:text-blue-600">
                                                ساخت پروژه با Next.js
                                            </h4>
                                        </a>

                                        <a href="#" className="block">
                                            <h4 className="font-medium hover:text-blue-600">
                                                مدیریت State در React
                                            </h4>
                                        </a>

                                    </div>

                                </div>

                            </div>

                        </aside>

                        <main className="lg:col-span-9">

                            <article className="bg-white rounded-3xl shadow-sm overflow-hidden">

                                <img src={`${BASE_URL}${article.thumbnail}`} className="w-full h-[400px] object-cover"/>

                                <div className="max-w-4xl mx-auto p-8 lg:p-12">

                                <span className="inline-flex px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm">React</span>

                                    <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mt-6 leading-tight">
                                        {article.title}
                                    </h1>

                                    <div className="flex flex-wrap gap-6 mt-6 text-sm text-slate-500">
                                        <span>نویسنده: علی محمدی</span>
                                        <span>۱۵ خرداد ۱۴۰۵</span>
                                        <span>۱۰ دقیقه مطالعه</span>
                                    </div>

                                    <p className="my-10 text-lg leading-9 text-slate-700">
                                        {article.excerpt}
                                    </p>

                                    <p>{article.content}</p>

                                </div>

                                <div className="p-8">
                                    <Comments comments={comments} setComments={setComments} slug={article.slug} type='Article' />
                                </div>

                            </article>

                        </main>

                    </div>

                </div>
            </section>

            <Footer/>
        </>
    )
}
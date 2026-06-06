import {useState, useEffect} from "react"
import { useParams } from 'react-router'
import { Header } from "../../shared/components/Header/Header.jsx"
import { Footer } from "../../shared/components/Footer.jsx"
import { Comments } from "../../features/comment/components/Comments.jsx";
import { ArticleSidebar } from "./components/ArticleSidebar"
import { ArticleContent } from "./components/ArticleContent"
import { ArticleHeader } from "./components/ArticleHeader"


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
                        <ArticleSidebar />
                        <main className="lg:col-span-9">
                            <article className="bg-white rounded-3xl shadow-sm overflow-hidden">
                                <ArticleHeader article={article} />
                                <ArticleContent article={article} />
                                <div className="p-8">
                                    <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2 inline-block">
                                        دیدگاه‌ها
                                    </h2>
                                    <Comments comments={comments} setComments={setComments} slug={article.slug}
                                              type='Article'/>
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
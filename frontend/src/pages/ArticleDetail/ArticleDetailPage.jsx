import {useState, useEffect} from "react"
import { useParams } from 'react-router'
import { Header } from "../../shared/components/Header/Header.jsx"
import { Footer } from "../../shared/components/Footer.jsx"
import { Comments } from "../../features/comment/components/Comments.jsx";
import { ArticleSidebar } from "./components/ArticleSidebar"
import { ArticleContent } from "./components/ArticleContent"
import { ArticleHeader } from "./components/ArticleHeader"
import { useComments } from "@/hooks/useComments"


export function ArticleDetailPage() {
    const [ article, setArticle ] = useState({})
    const [ comments, setComments ] = useComments('article', article?.id)
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
                                    <Comments comments={comments} setComments={setComments} slug={article.slug} type='Article'/>
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
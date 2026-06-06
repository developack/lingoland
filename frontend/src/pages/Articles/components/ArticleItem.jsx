import { Link } from "react-router"
import { BASE_URL } from "@/config/api";


export function ArticleItem({ article }) {
    return (
        <article key={article.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition">
            <img src={`${BASE_URL}${article.thumbnail}`} alt="" className="w-full h-52 object-cover"/>
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
                <Link to={`/article/${article.slug}`} className="inline-block mt-4 text-blue-600 font-medium">
                    ادامه مطلب →
                </Link>
            </div>
        </article>
    )
}
import { BASE_URL } from "@/config/api";


export function ArticleHeader({ article }) {
    return(
        <>
            <img src={`${BASE_URL}${article.thumbnail}`} className="w-full h-[400px] object-cover"/>

            <div className="p-8">
                <span className="inline-flex px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm">React</span>

                <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mt-6 leading-tight">
                    {article.title}
                </h1>

                <div className="flex flex-wrap gap-6 mt-6 text-sm text-slate-500">
                    <span>نویسنده: علی محمدی</span>
                    <span>۱۵ خرداد ۱۴۰۵</span>
                    <span>۱۰ دقیقه مطالعه</span>
                </div>

                <p className="mt-10 text-lg leading-9 text-slate-700">
                    {article.excerpt}
                </p>
            </div>
        </>
    )
}
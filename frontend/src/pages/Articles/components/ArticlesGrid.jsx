import { ArticleItem } from "./ArticleItem"
import { Pagination } from "@/shared/components/Pagination/Pagination";


export function ArticlesGrid({ articles, page, setPage }) {
    return (
        <>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-5">
                {articles?.results?.map((article) => (
                    <ArticleItem article={article} />
                ))}
            </div>
            {articles?.results?.length > 0 && <Pagination result={articles} page={page} setPage={setPage} />}
        </>
    )
}
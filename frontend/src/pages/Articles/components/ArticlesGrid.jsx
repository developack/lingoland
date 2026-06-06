import { ArticleItem } from "./ArticleItem"


export function ArticlesGrid({ articles }) {
    return (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {articles.map((article) => (
                <ArticleItem article={article} />
            ))}
        </div>
    )
}
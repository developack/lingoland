

export function ArticleContent({ article }) {
    return (
        <div className="p-8">
            <p className="text-justify leading-9">{article.content}</p>
        </div>
    )
}
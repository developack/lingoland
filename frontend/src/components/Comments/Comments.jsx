import { CommentForm } from './CommentForm'
import { CommentsList } from './CommentsList'


export function Comments({ comments, authToken }) {
    return (
        <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2 inline-block">
                📖 دیدگاه‌های دوره
            </h2>
            <CommentForm authToken={authToken} />
            <CommentsList comments={comments} />
        </div>
    )
}
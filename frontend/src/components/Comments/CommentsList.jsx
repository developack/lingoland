import { CommentItem } from './CommentItem'


export function CommentsList({ comments }) {
    return (
        <div className="flex flex-col gap-5 mt-8">
            {comments && comments.map((comment, index) => (
                <CommentItem key={index} comment={comment} />
            ))}
        </div>
    )
}
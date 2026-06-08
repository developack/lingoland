import { CommentItem } from "./CommentItem"


export function Comments({ comments }) {
    return(
        <>
            {comments.map((comment, index) => (
                <CommentItem key={index} comment={comment} />
            ))}
        </>
    )
}
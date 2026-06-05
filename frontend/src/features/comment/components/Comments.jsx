import { CommentForm } from './CommentForm'
import { CommentsList } from './CommentsList'


export function Comments({ comments, setComments, slug, type }) {
    return (
        <div>
            <CommentForm setComments={setComments} slug={slug} type={type} />
            <CommentsList comments={comments} />
        </div>
    )
}
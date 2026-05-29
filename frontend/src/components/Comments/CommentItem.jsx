


export function CommentItem({ comment }) {
    return (
        <div className="flex flex-col gap-3 bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2">
                <img src={comment.user.avatar ? comment.user.avatar : '/avatar.png'}
                     className="w-10 h-10 rounded-full border border-border"
                     alt="user avatar"/>
                <span className="text-sm font-bold">
                    {comment.user.full_name ? comment.user.full_name : comment.user.username}
                </span>
            </div>
            <p className="text-sm">{comment.text}</p>
        </div>
    )
}


export function CommentItem({ comment }) {
    const statusClasses = {
        Approved: "bg-green-100 text-green-700",
        Unapproved: "bg-yellow-100 text-yellow-700",
        Spam: "bg-red-100 text-red-700",
    }

    return (
        <div className="bg-white border border-border rounded-xl p-4">
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{comment.resource.object_title}</h3>
                <span className={`text-xs px-2 py-1 rounded ${statusClasses[comment.status] || 'bg-gray-100 text-gray-700'}`}>
                                        {comment.status}
                                    </span>
            </div>
            <p className="text-gray-700 mb-3">
                {comment.text}
            </p>

            <div className="flex justify-between text-sm text-gray-500">
                <span>{comment.created}</span>
            </div>
        </div>
    )
}
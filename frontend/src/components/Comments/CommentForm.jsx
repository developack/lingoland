import { useState } from "react"


export function CommentForm({ authToken, setComments }) {
    const [ commentText, setCommentText ] = useState(null)

    const handleTextChange = (event) => {
        setCommentText(event.target.value)
    }

    const addComment = async (event) => {
        event.preventDefault()
        const response = await fetch('/api/comments/create/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${authToken}`
            },
            body: {
                type: 'course',
                slug: 'دوره-جامع-و-پیشرفته-تیلویند-نسخه-4',
                text: commentText,
            }
        })
        const data = await response.json()
        setComments(data)
    }

    return(
        (authToken) ?
            <form onSubmit={addComment} className="mt-4 flex flex-col gap-5 items-start w-full">
                                        <textarea className="w-full border border-border rounded-xl p-5 resize-none"
                                                  onChange={handleTextChange}
                                                  placeholder="دیدگاه خود را بنویسید..."></textarea>
                <button type="submit"
                        className="bg-primary text-white rounded-xl p-3 text-sm cursor-pointer">ارسال
                    دیدگاه
                </button>
            </form> :
            <div className="bg-cta/10 text-cta text-sm p-5 rounded-xl">برای ارسال دیدگاه وارد حساب کاربری خود شوید</div>
    )
}
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { apiRequest } from "@/api/client"
import { useAuth } from "@/hooks/useAuth"


export function CommentForm({ setComments, slug, type }) {
    const [ commentText, setCommentText ] = useState('')
    const { isAuthenticated } = useAuth()

    const handleTextChange = (event) => {
        setCommentText(event.target.value)
    }

    const addComment = async (event) => {
        event.preventDefault()

        const data = await apiRequest('/api/comments/create/', {method: 'POST', data: {
                type: type,
                slug: slug,
                text: commentText,
        }})

        setComments(prevComments => [...prevComments, data])
        setCommentText('')
    }

    return(
        (isAuthenticated) ?
            <form onSubmit={addComment} className="mt-4 flex flex-col gap-5 items-start w-full">
                <textarea className="w-full border border-border rounded-xl p-5 resize-none"
                          onChange={handleTextChange}
                          value={commentText}
                          placeholder="دیدگاه خود را بنویسید..." />
                <Button type="submit" className="bg-primary h-10 text-white rounded-xl p-3 text-sm cursor-pointer">ارسال دیدگاه</Button>
            </form> :
            <div className="bg-cta/10 text-cta text-sm p-5 rounded-xl">برای ارسال دیدگاه وارد حساب کاربری خود شوید</div>
    )
}
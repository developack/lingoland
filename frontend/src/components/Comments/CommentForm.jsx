export function CommentForm({ authToken }) {

    const addComment = () => {

    }

    return(
        (authToken) ?
            <form onSubmit={addComment} className="mt-4 flex flex-col gap-5 items-start w-full">
                                        <textarea className="w-full border border-border rounded-xl p-5 resize-none"
                                                  placeholder="دیدگاه خود را بنویسید..."></textarea>
                <button type="submit"
                        className="bg-primary text-white rounded-xl p-3 text-sm cursor-pointer">ارسال
                    دیدگاه
                </button>
            </form> :
            <div className="bg-cta/10 text-cta text-sm p-5 rounded-xl">برای ارسال دیدگاه وارد حساب کاربری خود شوید</div>
    )
}
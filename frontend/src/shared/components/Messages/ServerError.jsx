import { Button } from "@/components/ui/button"


export function ServerError() {
    return (
        <div className="rounded-2xl border border-dashed border-zinc-300 p-10 bg-white">
            <div className="flex flex-col items-center text-center">
                <span className="mb-3 text-4xl">
                  ⚠️
                </span>
                <h3 className="mb-2 text-lg font-semibold">
                    دریافت محتوا ناموفق بود
                </h3>
                <p className="mb-6 text-sm text-zinc-500">
                    امکان دریافت اطلاعات این قسمت وجود ندارد.
                </p>
            </div>
        </div>
    )
}
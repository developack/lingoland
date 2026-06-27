import { Button } from "@/components/ui/button"


export function Pagination({ result, page, setPage }) {
    const totalPages = Math.ceil(result.count / result.page_size)

    return(
        <div className="flex items-center gap-2">
            <Button onClick={() => setPage(page - 1)} variant={result.previous ? '' : 'secondary'} disabled={!result.previous} className="border border-border px-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className={`size-6 ${result.previous && 'stroke-white'}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                </svg>
            </Button>
            <div className="flex items-center gap-2">
                {Array.from({length: totalPages}, (_, index) => (
                    <>
                        <Button variant={page === (index + 1) ? 'default' : 'secondary'} key={index} onClick={() => setPage(index + 1)}>
                            {index + 1}
                        </Button>
                    </>
                ))}
            </div>
            <Button onClick={() => setPage(page + 1)} variant={result.next ? '' : 'secondary'} disabled={!result.next} className="border border-border px-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className={`size-6 ${result.next && 'stroke-white'}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
                </svg>
            </Button>
        </div>
    )
}
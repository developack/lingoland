import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { BASE_URL } from "@/config/api";


export function CourseItem({ course }) {
    return (
        <div className="rounded-xl bg-white overflow-hidden shadow-sm hover:shadow-lg transition">
            <figure className="flex">
                <img className="w-full h-50 object-cover" src={`${BASE_URL}${course.thumbnail}`}
                     alt={course.title}/>
            </figure>
            <div className="p-5">
                <div className="flex flex-col gap-2">
                    <h5 className="font-bold text-md truncate">{course.title}</h5>
                    <p className="text-text-secondary text-xs leading-6 line-clamp-3">
                        {course.excerpt}
                    </p>
                </div>
                <div className="flex gap-4 items-start mt-3">
                    <div className="flex gap-1 items-center">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                             className="size-5">
                          <path strokeLinecap="round" strokeLinejoin="round"
                                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/>
                        </svg>
                    </span>
                        <span className="text-xs ">14 ساعت</span>
                    </div>
                    <div className="flex gap-1 items-center">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                 className="size-5">
                              <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                        </span>
                        <span className="text-xs ">8 آزمون</span>
                    </div>
                </div>
                <div className="mt-5 flex items-end justify-between">
                    <Button asChild variant="secondary" className="h-10">
                        <Link to={`/course/${course.slug}`}>مشاهده دوره</Link>
                    </Button>
                    <span className="text-sm text-success font-bold">{course.price}</span>
                </div>
            </div>
        </div>
    )
}
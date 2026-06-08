import { Link } from "react-router"


export function CourseItem({ course }) {
    return (
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition">
            <img src={course.thumbnail} alt="" className="w-full h-48 object-cover"/>

            <div className="p-5">

                <div className="inline-flex px-3 py-1 rounded-full text-xs bg-indigo-100 text-indigo-700 mb-4">
                    در حال یادگیری
                </div>

                <h3 className="font-bold text-lg text-slate-900 mb-3">{course.title}</h3>

                <p className="text-slate-500 text-sm mb-5 line-clamp-1">{course.excerpt}</p>

                <div className="mb-4">
                    <div
                        className="flex justify-between text-sm mb-2 text-slate-600">
                        <span>پیشرفت</span>
                        <span>{course.progress_percentage}%</span>
                    </div>

                    <div className="h-2 bg-slate-100 rounded-full">
                        {course.progress_percentage > 0 && <div
                            className={`h-2 bg-indigo-600 rounded-full w-[${course.progress_percentage}%]`}></div>}
                    </div>
                </div>

                <Link to={`/course/${course.slug}/`}
                      className="w-full bg-slate-900 block text-center hover:bg-black text-white py-3 rounded-xl transition">
                    ادامه یادگیری
                </Link>

            </div>

        </div>
    )
}
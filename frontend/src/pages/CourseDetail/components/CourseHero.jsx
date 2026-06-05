

export function CourseHero({ course }) {
    return (
        <>
            <div className="relative h-[500px] rounded-xl overflow-hidden border border-border mb-5">
                <img src={`${course.thumbnail}`} alt="تصویر دوره" className="w-full h-full object-cover"/>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-3">{course.title}</h1>

            <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★★★★★</span>
                    <span className="text-gray-600 text-sm">(۴.۸)</span>
                </div>
                <div className="text-gray-400">|</div>
                <div className="text-gray-600 text-sm">
                    👥 ۱,۲۳۴ دانشجو
                </div>
            </div>

            <div className="bg-blue-50 border-r-4 border-blue-500 p-4 rounded-lg mb-6">
                <p className="text-gray-700 leading-relaxed">
                    {course.excerpt}
                </p>
            </div>
        </>
    )
}
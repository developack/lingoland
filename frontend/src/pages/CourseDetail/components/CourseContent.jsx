

export function CourseContent({ course }) {
    return(
        <>
            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2 inline-block">
                    توضیحات کامل دوره
                </h2>
                <div className="mt-4 space-y-3 text-gray-700 leading-8 text-justify">
                    {course.content}
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                    ✅ آنچه در این دوره یاد می‌گیرید:
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span>مفاهیم پایه و نصب React</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span>کامپوننت‌ها و Props</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span>State و مدیریت داده</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span>Hooks (useState, useEffect و...)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span>React Router برای مسیریابی</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span>اتصال به API و Backend</span>
                    </div>
                </div>
            </div>
        </>
    )
}
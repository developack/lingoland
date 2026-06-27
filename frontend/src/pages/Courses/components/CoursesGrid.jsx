import { CourseItem } from "./CourseItem"
import { CoursesPageCard } from "@/shared/components/Skeletons/CoursesPageCard"
import { Pagination } from "@/shared/components/Pagination/Pagination"


export function CoursesGrid({ courses, loading, page, setPage }) {
    return (
        <>
            <div className="grid grid-cols-3 gap-5 items-start">
                {loading
                    ? <>
                        <CoursesPageCard/>
                        <CoursesPageCard/>
                        <CoursesPageCard/>
                        <CoursesPageCard/>
                        <CoursesPageCard/>
                        <CoursesPageCard/>
                    </>
                    : courses.results.map((course) => (
                        <CourseItem key={course.id} course={course}/>
                    ))
                }
            </div>
            <Pagination result={courses} page={page} setPage={setPage} />
        </>
    )
}
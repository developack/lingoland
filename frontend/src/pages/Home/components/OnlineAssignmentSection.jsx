

export function OnlineAssignmentSection() {
    return (
        <section className="container grid grid-cols-2 items-center mt-40 bg-primary/5 p-5 rounded-xl">
            <figure className="flex justify-start">
                <img className="w-[80%]" src="/img/assignment.png" alt="assignment image"/>
            </figure>
            <div className="flex items-start gap-10">
                    <span className="p-6 rounded-2xl bg-primary/3 shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                             stroke="currentColor" className="size-10 stroke-primary">
                          <path strokeLinecap="round" strokeLinejoin="round"
                                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/>
                        </svg>
                    </span>
                <div>
                    <div className="flex flex-col gap-5">
                        <h2 className="text-2xl font-bold">تکالیف آنلاین</h2>
                        <p className="text-sm text-text-secondary leading-8">
                            تکالیف خود را به صورت آنلاین بارگذاری کنید وضعیت بررسی را مشاهده و کنید و بازخورد
                            مدرس
                            را دریافت کنید
                            و درباره مشکلات خود با پشتیبانان آموزشی در ارتباط باشید.
                        </p>
                    </div>
                    <div className="flex flex-col items-start gap-5 mt-5">
                        <div className="flex items-center gap-2">
                            <span className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                                     stroke="currentColor" className="size-6 stroke-primary">
                                  <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                            </span>
                            <span className="text-xs font-medium">ارسال فایل در انواع فرمت ها</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                                     stroke="currentColor" className="size-6 stroke-primary">
                                  <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                            </span>
                            <span className="text-xs font-medium">تعیین مهلت و یادآوری خودکار</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                                     stroke="currentColor" className="size-6 stroke-primary">
                                  <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                            </span>
                            <span className="text-xs font-medium">مشاهده و بررسی آنلاین تکالیف</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
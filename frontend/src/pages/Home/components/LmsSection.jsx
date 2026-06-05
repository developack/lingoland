

export function LmsSection() {
    return (
        <section className="container grid grid-cols-2 items-center mt-40 bg-cta/5 p-5 rounded-xl">
            <div className="flex items-start gap-10">
                    <span className="p-6 rounded-2xl bg-cta/5 shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2}
                             stroke="currentColor" className="size-10 stroke-cta">
                          <path strokeLinecap="round" strokeLinejoin="round"
                                d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"/>
                        </svg>
                    </span>
                <div>
                    <div className="flex flex-col gap-5">
                        <h2 className="text-2xl font-bold">سیستم آموزش جامع</h2>
                        <p className="text-sm text-text-secondary leading-8">
                            دوره ها، درس ها، تکالیف و موضوعات خود را به راحتی با سیستم آموزشی یکپارجه لینگولند
                            مدیریت کنید
                        </p>
                    </div>
                    <div className="flex flex-col items-start gap-5 mt-5">
                        <div className="flex items-center gap-2">
                                <span className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth="2"
                                         stroke="currentColor" className="size-6 stroke-cta">
                                          <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                        </svg>
                                </span>
                            <span className="text-xs font-medium">مدیریت کلاس ها و کاربران</span>
                        </div>
                        <div className="flex items-center gap-2">
                                <span className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth="2"
                                         stroke="currentColor" className="size-6 stroke-cta">
                                      <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                    </svg>
                                </span>
                            <span className="text-xs font-medium">انتشار محتوای آموزشی</span>
                        </div>
                        <div className="flex items-center gap-2">
                                <span className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth="2"
                                         stroke="currentColor" className="size-6 stroke-cta">
                                          <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                        </svg>
                                </span>
                            <span className="text-xs font-medium">گزارش گیری و تحلیل پیشرفت</span>
                        </div>
                    </div>
                </div>
            </div>
            <figure className="flex justify-end">
                <img className="w-[80%]" src="/img/classes.png" alt="assignment image"/>
            </figure>
        </section>
    )
}
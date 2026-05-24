import {Header} from '../components/Header'
import {Footer} from '../components/Footer'
import {Link} from "react-router";


export function HomePage() {
    return (
        <>
            <Header/>

            <title>Home Page</title>

            <section className="container grid grid-cols-2 items-center mt-20">
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-5">
                        <div className="bg-primary/10 w-fit py-2 px-5 rounded-xl font-bold flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                                 stroke="currentColor" className="size-5 stroke-primary">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"/>
                            </svg>
                            <span className="text-primary text-xs">سیستم آموزشی هوشمند</span>
                        </div>
                        <h2 className="text-2xl font-bold">یادگیری اصولی و دقیق زبان انگلیسی در آکادمی لینگولند</h2>
                        <p className="text-sm text-text-secondary leading-8">
                            آکادمی لینگولند یک پلتفرم آموزش زبان انگلیسی آنلاین می‌باشد، با هدف آموزش آسان و اصولی این
                            پلتفرم جهت کمک به کاربران عزیز طراحی شد
                            آکادمی لینگولند یک پلتفرم آموزش زبان انگلیسی آنلاین می‌باشد، با هدف آموزش آسان و اصولی این
                            پلتفرم جهت کمک به کاربران عزیز طراحی شد
                        </p>
                    </div>
                    <div className="flex items-center gap-5">
                        <Link to="/courses" className="bg-primary text-white rounded-xl py-3 px-5 text-sm">شروع
                            کنید</Link>
                        <Link to="" className="bg-button rounded-xl py-3 px-5 text-sm">مشاهده امکانات</Link>
                    </div>
                </div>
                <figure className="flex justify-end">
                    <img className="w-[80%]" src="../../public/img/hero.png" alt="hero image"/>
                </figure>
            </section>

            <section className="container grid grid-cols-2 items-center mt-40 bg-primary/5 p-5 rounded-xl">
                <figure className="flex justify-start">
                    <img className="w-[80%]" src="../../public/img/assignment.png" alt="assignment image"/>
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
                                تکالیف خود را به صورت آنلاین بارگذاری کنید وضعیت بررسی را مشاهده و کنید و بازخورد مدرس
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

            <section className="container grid grid-cols-2 items-center mt-40 bg-[#8253f5]/5 p-5 rounded-xl">
                <div className="flex items-start gap-10">
                    <span className="p-6 rounded-2xl bg-[#8253f5]/5 shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2}
                             stroke="currentColor" className="size-10 stroke-[#8253f5]">
                          <path strokeLinecap="round" strokeLinejoin="round"
                                d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z"/>
                        </svg>
                    </span>
                    <div>
                        <div className="flex flex-col gap-5">
                            <h2 className="text-2xl font-bold">آزمون آنلاین</h2>
                            <p className="text-sm text-text-secondary leading-8">
                                آزمون های آنلاین متنوع و زمان دار برگزار کنید و نتایج را به صورت خودکار و دقیق بررسی و
                                تحلیل کنید
                            </p>
                        </div>
                        <div className="flex flex-col items-start gap-5 mt-5">
                            <div className="flex items-center gap-2">
                                <span className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth="2"
                                         stroke="currentColor" className="size-6 stroke-[#8253f5]">
                                          <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                        </svg>
                                </span>
                                <span className="text-xs font-medium">پشتیبانی از سوالات تستی و تشریحی</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth="2"
                                         stroke="currentColor" className="size-6 stroke-[#8253f5]">
                                      <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                    </svg>
                                </span>
                                <span className="text-xs font-medium">زمان بندی و محدودیت زمانی</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth="2"
                                         stroke="currentColor" className="size-6 stroke-[#8253f5]">
                                          <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                        </svg>
                                </span>
                                <span className="text-xs font-medium">گزارش نتایج و تحلیل عملکرد</span>
                            </div>
                        </div>
                    </div>
                </div>
                <figure className="flex justify-end">
                    <img className="w-[60%]" src="../../public/img/quiz.png" alt="assignment image"/>
                </figure>
            </section>

            <section className="container grid grid-cols-2 items-center mt-40 bg-secondary/5 p-5 rounded-xl">
                <figure className="flex justify-start">
                    <img className="w-[80%]" src="../../public/img/payment.png" alt="assignment image"/>
                </figure>
                <div className="flex items-start gap-10">
                    <span className="p-6 rounded-2xl bg-secondary/5 shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                             stroke="currentColor" className="size-10 stroke-secondary">
                          <path strokeLinecap="round" strokeLinejoin="round"
                                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"/>
                        </svg>
                    </span>
                    <div>
                        <div className="flex flex-col gap-5">
                            <h2 className="text-2xl font-bold">پرداخت آنلاین</h2>
                            <p className="text-sm text-text-secondary leading-8">
                                تمام پرداخت های خود رو به صورت آنلاین و طریق درگاه های امن و سریع انجام دهید و تاریخچه
                                تراکنش ها را مشاهده کنید.
                            </p>
                        </div>
                        <div className="flex flex-col items-start gap-5 mt-5">
                            <div className="flex items-center gap-2">
                            <span className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                                     stroke="currentColor" className="size-6 stroke-secondary">
                                  <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                            </span>
                                <span className="text-xs font-medium">پرداخت امن با درگاه های معتبر</span>
                            </div>
                            <div className="flex items-center gap-2">
                            <span className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                                     stroke="currentColor" className="size-6 stroke-secondary">
                                  <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                            </span>
                                <span className="text-xs font-medium">خرید دوره های و بسته های آموزشی</span>
                            </div>
                            <div className="flex items-center gap-2">
                            <span className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                                     stroke="currentColor" className="size-6 stroke-secondary">
                                  <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                            </span>
                                <span className="text-xs font-medium">مشاهده فاکتور و تارخچه پرداخت ها</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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
                    <img className="w-[80%]" src="../../public/img/classes.png" alt="assignment image"/>
                </figure>
            </section>

            <section className="container grid grid-cols-2 items-center mt-40 shadow-sm p-5 rounded-xl">
                <figure className="flex justify-start">
                    <img className="w-[60%]" src="../../public/img/education.png" alt="assignment image"/>
                </figure>
                <div className="flex flex-col items-start gap-2">
                    <div className="flex flex-col items-start gap-5">
                        <h2 className="text-2xl font-bold">آماده شروع هستید؟</h2>
                        <p className="text-sm text-text-secondary leading-8">همین امروز به جمع هزاران کاربر و دانشجو
                             برای یادگیری زبان انگلیسی بپیوندید. تا شما هم از این تجربه حرفه ای لذت ببرید و خود را ارتقا دهید
                        </p>
                    </div>
                    <Link to="/courses" className="bg-primary text-white rounded-xl py-3 px-5 text-sm">ثبت‌نام کنید</Link>
                </div>
            </section>

            <Footer/>
        </>
    )
}
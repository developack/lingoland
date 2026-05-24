import {Header} from '../components/Header'
import {Footer} from '../components/Footer'
import {Link} from "react-router";


export function HomePage() {
    return (
        <>
            <Header />

            <title>Home Page</title>

            <section className="container grid grid-cols-2 items-center mt-20">
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-5">
                        <div className="bg-primary/10 w-fit py-2 px-5 rounded-xl font-bold flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-5 stroke-primary">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"/>
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
                <figure className="flex justify-center">
                    <img className="w-[80%]" src="../../public/img/hero.png" alt="hero image"/>
                </figure>
            </section>

            <section className="container grid grid-cols-2 items-center mt-40 bg-primary/3 p-5 rounded-xl">
                <figure className="flex justify-center">
                    <img className="w-[80%]" src="../../public/img/assignment.png" alt="assignment image"/>
                </figure>
                <div className="flex items-start gap-10">
                    <span className="p-6 rounded-2xl bg-primary/3 shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-10 stroke-primary">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/>
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

            <Footer/>
        </>
    )
}
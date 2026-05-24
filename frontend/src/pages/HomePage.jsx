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
                        <span className="text-primary text-xs bg-primary/10 w-fit py-2 px-5 rounded-xl font-bold">سیستم آموزشی هوشمند</span>
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

            <Footer/>
        </>
    )
}
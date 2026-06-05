import { Link } from "react-router"


export function CallToActionSection() {
    return (
        <section className="container grid grid-cols-2 items-center mt-40 shadow-sm p-5 rounded-xl">
            <figure className="flex justify-start">
                <img className="w-[60%]" src="/img/education.png" alt="assignment image"/>
            </figure>
            <div className="flex flex-col items-start gap-2">
                <div className="flex flex-col items-start gap-5">
                    <h2 className="text-2xl font-bold">آماده شروع هستید؟</h2>
                    <p className="text-sm text-text-secondary leading-8">همین امروز به جمع هزاران کاربر و دانشجو
                        برای یادگیری زبان انگلیسی بپیوندید. تا شما هم از این تجربه حرفه ای لذت ببرید و خود را
                        ارتقا دهید
                    </p>
                </div>
                <Link to="/courses" className="bg-primary text-white rounded-xl py-3 px-5 text-sm">ثبت‌نام
                    کنید</Link>
            </div>
        </section>
    )
}
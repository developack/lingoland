import { Header } from "../shared/components/Header/Header.jsx"
import { Footer } from "../shared/components/Footer"

export function DictionaryPage() {
    return(
        <>
            <title>Dictionary Page</title>

            <Header/>

            <div className="min-h-screen bg-gray-50" dir="rtl">

                <section className="bg-white border-b">
                    <div className="max-w-7xl mx-auto px-6 py-16">

                        <div className="text-center max-w-3xl mx-auto">
        <span className="inline-flex px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
          دیکشنری هوشمند زبان انگلیسی
        </span>

                            <h1 className="text-5xl font-bold text-gray-900 mt-6">
                                هر کلمه‌ای را در چند ثانیه پیدا کنید
                            </h1>

                            <p className="text-gray-500 mt-4 text-lg">
                                معنی، تلفظ، مثال، مترادف و متضاد هزاران واژه انگلیسی را جستجو کنید.
                            </p>
                        </div>

                        <div className="max-w-3xl mx-auto mt-10">
                            <div className="bg-white rounded-2xl border shadow-sm p-3 flex gap-3">
                                <input
                                    type="text"
                                    placeholder="کلمه مورد نظر خود را جستجو کنید..."
                                    className="flex-1 outline-none px-3"
                                />

                                <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
                                    جستجو
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-center flex-wrap gap-2">
        <span className="text-sm text-gray-500">
          جستجوهای پرطرفدار:
        </span>

                            <button className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                                achievement
                            </button>

                            <button className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                                improve
                            </button>

                            <button className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                                confidence
                            </button>

                            <button className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                                opportunity
                            </button>
                        </div>

                    </div>
                </section>

                <section className="max-w-7xl mx-auto px-6 py-12">

                    <h2 className="text-2xl font-bold mb-6">
                        امکانات دیکشنری
                    </h2>

                    <div className="grid md:grid-cols-4 gap-4">

                        <div className="bg-white shadow-sm hover:shadow-lg transition rounded-2xl p-6">
                            <h3 className="font-semibold text-lg">
                                معنی واژگان
                            </h3>

                            <p className="text-gray-500 text-sm mt-2">
                                مشاهده معنی فارسی و انگلیسی هزاران واژه.
                            </p>
                        </div>

                        <div className="bg-white shadow-sm hover:shadow-lg transition rounded-2xl p-6">
                            <h3 className="font-semibold text-lg">
                                تلفظ صوتی
                            </h3>

                            <p className="text-gray-500 text-sm mt-2">
                                یادگیری تلفظ صحیح کلمات با لهجه آمریکایی و بریتانیایی.
                            </p>
                        </div>

                        <div className="bg-white shadow-sm hover:shadow-lg transition rounded-2xl p-6">
                            <h3 className="font-semibold text-lg">
                                مثال‌های کاربردی
                            </h3>

                            <p className="text-gray-500 text-sm mt-2">
                                مشاهده جملات واقعی برای درک بهتر کاربرد واژگان.
                            </p>
                        </div>

                        <div className="bg-white shadow-sm hover:shadow-lg transition rounded-2xl p-6">
                            <h3 className="font-semibold text-lg">
                                مترادف و متضاد
                            </h3>

                            <p className="text-gray-500 text-sm mt-2">
                                گسترش دایره لغات با واژگان مرتبط.
                            </p>
                        </div>

                    </div>

                </section>

                <section className="max-w-7xl mx-auto px-6 py-6">

                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">
                            دسته‌بندی واژگان
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4">

                        <div className="bg-white shadow-sm hover:shadow-lg transition rounded-2xl p-6">
                            <h3 className="font-semibold text-lg">
                                کسب‌وکار
                            </h3>

                            <p className="text-gray-500 text-sm mt-2">
                                واژگان و اصطلاحات مرتبط با محیط کار و تجارت.
                            </p>
                        </div>

                        <div className="bg-white shadow-sm hover:shadow-lg transition rounded-2xl p-6">
                            <h3 className="font-semibold text-lg">
                                سفر و گردشگری
                            </h3>

                            <p className="text-gray-500 text-sm mt-2">
                                واژگان پرکاربرد در سفر و مکالمات روزمره.
                            </p>
                        </div>

                        <div className="bg-white shadow-sm hover:shadow-lg transition rounded-2xl p-6">
                            <h3 className="font-semibold text-lg">
                                دانشگاهی
                            </h3>

                            <p className="text-gray-500 text-sm mt-2">
                                واژگان آکادمیک و مناسب آزمون‌های بین‌المللی.
                            </p>
                        </div>

                        <div className="bg-white shadow-sm hover:shadow-lg transition rounded-2xl p-6">
                            <h3 className="font-semibold text-lg">
                                فناوری
                            </h3>

                            <p className="text-gray-500 text-sm mt-2">
                                اصطلاحات حوزه تکنولوژی و برنامه‌نویسی.
                            </p>
                        </div>

                    </div>

                </section>

                <section className="max-w-7xl mx-auto px-6 py-10">

                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-10 text-white">

      <span className="text-sm opacity-80">
        کلمه روز
      </span>

                        <h2 className="text-4xl font-bold mt-2">
                            Resilient
                        </h2>

                        <p className="mt-4 max-w-2xl">
                            فردی که توانایی بازیابی سریع پس از مشکلات و سازگاری با شرایط جدید را دارد.
                        </p>

                        <div className="mt-6">
        <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
          صفت
        </span>
                        </div>

                    </div>

                </section>

                <section className="max-w-7xl mx-auto px-6 py-10">

                    <h2 className="text-2xl font-bold mb-6">
                        یادگیری هدفمند
                    </h2>

                    <div className="grid md:grid-cols-3 gap-4">

                        <div className="bg-white shadow-sm hover:shadow-lg transition rounded-2xl p-6">
                            <h3 className="font-semibold">
                                واژگان ضروری آیلتس
                            </h3>

                            <p className="text-gray-500 text-sm mt-2">
                                مجموعه‌ای از مهم‌ترین لغات مورد نیاز آزمون آیلتس.
                            </p>
                        </div>

                        <div className="bg-white shadow-sm hover:shadow-lg transition rounded-2xl p-6">
                            <h3 className="font-semibold">
                                واژگان ضروری تافل
                            </h3>

                            <p className="text-gray-500 text-sm mt-2">
                                لغات پرتکرار و کاربردی آزمون تافل.
                            </p>
                        </div>

                        <div className="bg-white shadow-sm hover:shadow-lg transition rounded-2xl p-6">
                            <h3 className="font-semibold">
                                اصطلاحات و فریزال ورب‌ها
                            </h3>

                            <p className="text-gray-500 text-sm mt-2">
                                یادگیری اصطلاحات رایج و افعال دو قسمتی انگلیسی.
                            </p>
                        </div>

                    </div>

                </section>

                <section className="max-w-7xl mx-auto px-6 pb-16">

                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">
                            واژگان جدید
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">

                        <div className="bg-white shadow-sm hover:shadow-lg transition rounded-2xl p-5">
                            <h3 className="font-semibold">
                                Mindfulness
                            </h3>

                            <p className="text-gray-500 text-sm mt-2">
                                تمرکز آگاهانه بر لحظه حال و توجه به افکار و احساسات.
                            </p>
                        </div>

                        <div className="bg-white shadow-sm hover:shadow-lg transition rounded-2xl p-5">
                            <h3 className="font-semibold">
                                Innovation
                            </h3>

                            <p className="text-gray-500 text-sm mt-2">
                                ایجاد ایده‌ها و روش‌های نوآورانه برای حل مسائل.
                            </p>
                        </div>

                        <div className="bg-white shadow-sm hover:shadow-lg transition rounded-2xl p-5">
                            <h3 className="font-semibold">
                                Fluent
                            </h3>

                            <p className="text-gray-500 text-sm mt-2">
                                توانایی صحبت کردن یا نوشتن روان و بدون مکث.
                            </p>
                        </div>

                    </div>

                </section>

            </div>

            <Footer/>
        </>
    )
}
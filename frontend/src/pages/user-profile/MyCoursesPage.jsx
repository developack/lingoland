import { PanelHeader } from "../../features/user-panel/components/PanelHeader"
import { PanelSidebar } from "../../features/user-panel/components/PanelSidebar"


export function MyCoursesPage() {
    return (
        <div className="flex min-h-screen">

            <PanelSidebar />

            <div className="flex-1 flex flex-col">

                <PanelHeader />

                <div className="p-6 container">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                            <p className="text-slate-500 text-sm">کل دوره‌ها</p>
                            <h3 className="text-3xl font-bold mt-2">12</h3>
                        </div>

                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                            <p className="text-slate-500 text-sm">در حال یادگیری</p>
                            <h3 className="text-3xl font-bold mt-2 text-indigo-600">5</h3>
                        </div>

                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                            <p className="text-slate-500 text-sm">تکمیل شده</p>
                            <h3 className="text-3xl font-bold mt-2 text-emerald-600">7</h3>
                        </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                        <div
                            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition">

                            <img
                                src="https://placehold.co/600x350"
                                alt=""
                                className="w-full h-48 object-cover"/>

                            <div className="p-5">

                                <div
                                    className="inline-flex px-3 py-1 rounded-full text-xs bg-indigo-100 text-indigo-700 mb-4">
                                    در حال یادگیری
                                </div>

                                <h3 className="font-bold text-lg text-slate-900 mb-3">
                                    آموزش جامع React
                                </h3>

                                <p className="text-slate-500 text-sm mb-5">
                                    یادگیری کامل React از مقدماتی تا پیشرفته همراه با پروژه
                                </p>

                                <div className="mb-4">
                                    <div
                                        className="flex justify-between text-sm mb-2 text-slate-600">
                                        <span>پیشرفت</span>
                                        <span>65%</span>
                                    </div>

                                    <div className="h-2 bg-slate-100 rounded-full">
                                        <div
                                            className="h-2 bg-indigo-600 rounded-full w-[65%]">
                                        </div>
                                    </div>
                                </div>

                                <button
                                    className="w-full bg-slate-900 hover:bg-black text-white py-3 rounded-xl transition">
                                    ادامه یادگیری
                                </button>

                            </div>

                        </div>

                        <div
                            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition">

                            <img src="https://placehold.co/600x350" alt="" className="w-full h-48 object-cover"/>

                            <div className="p-5">

                                <div
                                    className="inline-flex px-3 py-1 rounded-full text-xs bg-emerald-100 text-emerald-700 mb-4">
                                    تکمیل شده
                                </div>

                                <h3 className="font-bold text-lg text-slate-900 mb-3">
                                    آموزش Tailwind CSS
                                </h3>

                                <p className="text-slate-500 text-sm mb-5">
                                    طراحی رابط کاربری مدرن با Tailwind CSS
                                </p>

                                <div className="mb-4">
                                    <div
                                        className="flex justify-between text-sm mb-2 text-slate-600">
                                        <span>پیشرفت</span>
                                        <span>100%</span>
                                    </div>

                                    <div className="h-2 bg-slate-100 rounded-full">
                                        <div
                                            className="h-2 bg-emerald-500 rounded-full w-full">
                                        </div>
                                    </div>
                                </div>

                                <button
                                    className="w-full border border-slate-200 py-3 rounded-xl hover:bg-slate-50 transition">
                                    مشاهده گواهی
                                </button>

                            </div>

                        </div>

                        <div
                            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition">

                            <img src="https://placehold.co/600x350" alt="" className="w-full h-48 object-cover"/>

                            <div className="p-5">

                                <div
                                    className="inline-flex px-3 py-1 rounded-full text-xs bg-orange-100 text-orange-700 mb-4">
                                    در حال یادگیری
                                </div>

                                <h3 className="font-bold text-lg text-slate-900 mb-3">
                                    آموزش Next.js
                                </h3>

                                <p className="text-slate-500 text-sm mb-5">
                                    ساخت پروژه‌های حرفه‌ای با Next.js
                                </p>

                                <div className="mb-4">
                                    <div
                                        className="flex justify-between text-sm mb-2 text-slate-600">
                                        <span>پیشرفت</span>
                                        <span>28%</span>
                                    </div>

                                    <div className="h-2 bg-slate-100 rounded-full">
                                        <div
                                            className="h-2 bg-orange-500 rounded-full w-[28%]">
                                        </div>
                                    </div>
                                </div>

                                <button
                                    className="w-full bg-slate-900 hover:bg-black text-white py-3 rounded-xl transition">
                                    ادامه یادگیری
                                </button>

                            </div>

                        </div>

                    </div>
                </div>

            </div>

        </div>

    )
}
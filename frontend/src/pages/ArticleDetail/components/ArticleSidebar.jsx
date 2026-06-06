

export function ArticleSidebar() {
    return (
        <aside className="hidden lg:block lg:col-span-3">

            <div className="sticky top-8 space-y-6">

                <div className="bg-white rounded-3xl p-6 shadow-sm">
                    <h3 className="font-bold text-lg mb-4">
                        فهرست مطالب
                    </h3>

                    <nav className="space-y-3 text-sm">

                        <a href="#" className="block text-slate-600 hover:text-blue-600">
                            مقدمه
                        </a>

                        <a href="#" className="block text-slate-600 hover:text-blue-600">
                            چرا React؟
                        </a>

                        <a href="#" className="block text-slate-600 hover:text-blue-600">
                            نصب پروژه
                        </a>

                        <a href="#" className="block text-slate-600 hover:text-blue-600">
                            ساخت کامپوننت‌ها
                        </a>

                        <a href="#" className="block text-slate-600 hover:text-blue-600">
                            جمع‌بندی
                        </a>

                    </nav>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm">
                    <div className="flex items-center gap-4">

                        <img
                            src="/avatar.png"
                            className="w-14 h-14 rounded-full"
                        />

                        <div>
                            <h4 className="font-semibold">
                                علی محمدی
                            </h4>

                            <p className="text-sm text-slate-500">
                                Frontend Developer
                            </p>
                        </div>

                    </div>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm">

                    <h3 className="font-bold mb-4">
                        مقالات مرتبط
                    </h3>

                    <div className="space-y-4">

                        <a href="#" className="block">
                            <h4 className="font-medium hover:text-blue-600">
                                آموزش TailwindCSS
                            </h4>
                        </a>

                        <a href="#" className="block">
                            <h4 className="font-medium hover:text-blue-600">
                                ساخت پروژه با Next.js
                            </h4>
                        </a>

                        <a href="#" className="block">
                            <h4 className="font-medium hover:text-blue-600">
                                مدیریت State در React
                            </h4>
                        </a>

                    </div>

                </div>

            </div>

        </aside>
    )
}
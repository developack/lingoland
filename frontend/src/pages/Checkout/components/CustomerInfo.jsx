

export function CustomerInfo() {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-bold text-xl mb-6">
                اطلاعات خریدار
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

                <div>
                    <label className="block mb-2 text-sm font-medium">
                        نام و نام خانوادگی
                    </label>

                    <input
                        type="text"
                        value="علی محمدی"
                        className="w-full border border-border rounded-xl px-4 py-3"
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium">
                        شماره موبایل
                    </label>

                    <input
                        type="text"
                        value="09123456789"
                        className="w-full border border-border rounded-xl px-4 py-3"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block mb-2 text-sm font-medium">
                        ایمیل
                    </label>

                    <input
                        type="email"
                        value="ali@example.com"
                        className="w-full border border-border rounded-xl px-4 py-3"
                    />
                </div>

            </div>
        </div>
    )
}
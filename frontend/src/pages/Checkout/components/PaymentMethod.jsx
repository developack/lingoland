

export function PaymentMethod() {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-bold text-xl mb-6">
                روش پرداخت
            </h2>

            <div className="space-y-4">

                <label className="flex items-center gap-4 border border-border rounded-xl p-4 cursor-pointer">
                    <input
                        type="radio"
                        checked
                        readOnly
                    />

                    <div>
                        <p className="font-medium">
                            پرداخت آنلاین
                        </p>

                        <span className="text-sm text-gray-500">
                                    پرداخت از طریق درگاه بانکی
                                </span>
                    </div>
                </label>

                <label className="flex items-center gap-4 border border-border rounded-xl p-4 cursor-pointer">
                    <input
                        type="radio"
                        readOnly
                    />

                    <div>
                        <p className="font-medium">
                            کیف پول
                        </p>

                        <span className="text-sm text-gray-500">
                                    موجودی کیف پول: 850,000 تومان
                                </span>
                    </div>
                </label>

            </div>
        </div>
    )
}
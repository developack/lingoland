

export function OnlinePaymentSection() {
    return (
        <section className="container grid grid-cols-2 items-center mt-40 bg-secondary/5 p-5 rounded-xl">
            <figure className="flex justify-start">
                <img className="w-[80%]" src="/img/payment.png" alt="assignment image"/>
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
                            تمام پرداخت های خود رو به صورت آنلاین و طریق درگاه های امن و سریع انجام دهید و
                            تاریخچه
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
    )
}
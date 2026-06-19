

export function CoursesPageCard() {
    return (
        <div className="grid grid-rows-[200px_auto] bg-white w-full h-[436px] rounded-xl relative">
            <div className="skeleton w-full rounded-b-none"></div>
            <div className="p-4 flex flex-col justify-between h-full">
                <div>
                    <div className="skeleton h-4.5 w-[80%] mb-4"></div>
                    <div className="flex flex-col gap-2">
                        <div className="skeleton h-3.5"></div>
                        <div className="skeleton h-3.5"></div>
                        <div className="skeleton h-3.5 w-[50%]"></div>
                    </div>
                </div>
                <div className="flex items-end justify-between">
                    <div className="skeleton h-10 w-[118px]"></div>
                    <div className="skeleton h-5 w-[80px]"></div>
                </div>
            </div>
        </div>
    )
}
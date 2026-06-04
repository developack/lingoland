export function PanelHeader() {
    return (
        <header className="bg-white shadow p-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">داشبورد</h2>

            <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">سلام، کاربر 👋</span>
                <div className="w-10 h-10 bg-gray-300 rounded-full">
                    <img className="rounded-full" src="/avatar.png" alt=""/>
                </div>
            </div>
        </header>
    )
}
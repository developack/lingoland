import { PanelHeader } from "../../features/user-panel/components/PanelHeader"
import { PanelSidebar } from "../../features/user-panel/components/PanelSidebar"


export function DashboardPage() {
    return (
        <div className="flex min-h-screen">

            <PanelSidebar />

            <div className="flex-1 flex flex-col">

                <PanelHeader />

                <main className="p-6 container">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        <div className="bg-white p-5 rounded-xl shadow">
                            <h3 className="text-gray-500">دوره‌های فعال</h3>
                            <p className="text-2xl font-bold mt-2">3</p>
                        </div>

                        <div className="bg-white p-5 rounded-xl shadow">
                            <h3 className="text-gray-500">تکمیل شده</h3>
                            <p className="text-2xl font-bold mt-2">7</p>
                        </div>

                        <div className="bg-white p-5 rounded-xl shadow">
                            <h3 className="text-gray-500">درصد پیشرفت کلی</h3>
                            <p className="text-2xl font-bold mt-2">65%</p>
                        </div>

                    </div>

                    <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-4">دوره‌های اخیر</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div className="bg-white p-5 rounded-xl shadow">
                                <h4 className="font-bold">React از صفر تا پیشرفته</h4>
                                <p className="text-gray-500 text-sm mt-1">پیشرفت: 40%</p>
                                <div className="w-full bg-gray-200 h-2 rounded mt-3">
                                    <div className="bg-blue-500 h-2 rounded" style={{width: "70%"}}></div>
                                </div>
                            </div>

                            <div className="bg-white p-5 rounded-xl shadow">
                                <h4 className="font-bold">JavaScript عمیق</h4>
                                <p className="text-gray-500 text-sm mt-1">پیشرفت: 70%</p>
                                <div className="w-full bg-gray-200 h-2 rounded mt-3">
                                    <div className="bg-green-500 h-2 rounded" style={{width: "70%"}}></div>
                                </div>
                            </div>

                        </div>
                    </div>

                </main>
            </div>

        </div>
    )
}
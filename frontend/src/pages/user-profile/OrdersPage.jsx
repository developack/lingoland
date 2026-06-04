import { PanelHeader } from "../../features/user-panel/components/PanelHeader"
import { PanelSidebar } from "../../features/user-panel/components/PanelSidebar"


export function OrdersPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex">

            <PanelSidebar/>

            <div className="flex-1 flex flex-col">

                <PanelHeader/>

                <div className="container p-6">

                    <div className="mb-6">
                        <h1 className="text-2xl font-bold">My Orders</h1>
                        <p className="text-gray-500">Track all your purchases and subscriptions</p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">

                        <div className="bg-white border rounded-xl p-4">
                            <p className="text-sm text-gray-500">Total Orders</p>
                            <p className="text-2xl font-bold">12</p>
                        </div>

                        <div className="bg-white border rounded-xl p-4">
                            <p className="text-sm text-gray-500">Completed</p>
                            <p className="text-2xl font-bold text-green-600">9</p>
                        </div>

                        <div className="bg-white border rounded-xl p-4">
                            <p className="text-sm text-gray-500">Pending</p>
                            <p className="text-2xl font-bold text-yellow-500">3</p>
                        </div>

                    </div>

                    <div className="bg-white border rounded-xl overflow-hidden">

                        <div className="grid grid-cols-5 bg-gray-100 text-sm font-medium text-gray-600 p-3">
                            <div>Order ID</div>
                            <div>Product</div>
                            <div>Date</div>
                            <div>Status</div>
                            <div className="text-right">Price</div>
                        </div>

                        <div className="grid grid-cols-5 p-3 border-t items-center">
                            <div className="text-sm">#ORD-1001</div>
                            <div className="text-sm font-medium">React Course</div>
                            <div className="text-sm text-gray-500">2026/05/21</div>
                            <div>
          <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">
            Completed
          </span>
                            </div>
                            <div className="text-right font-semibold">$49</div>
                        </div>

                        <div className="grid grid-cols-5 p-3 border-t items-center">
                            <div className="text-sm">#ORD-1002</div>
                            <div className="text-sm font-medium">Next.js Course</div>
                            <div className="text-sm text-gray-500">2026/05/18</div>
                            <div>
          <span className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-700">
            Pending
          </span>
                            </div>
                            <div className="text-right font-semibold">$39</div>
                        </div>

                        <div className="grid grid-cols-5 p-3 border-t items-center">
                            <div className="text-sm">#ORD-1003</div>
                            <div className="text-sm font-medium">Node.js Course</div>
                            <div className="text-sm text-gray-500">2026/05/10</div>
                            <div>
          <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-700">
            Cancelled
          </span>
                            </div>
                            <div className="text-right font-semibold">$29</div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}
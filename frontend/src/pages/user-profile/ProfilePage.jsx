import { PanelHeader } from "../../features/user-panel/components/PanelHeader"
import { PanelSidebar } from "../../features/user-panel/components/PanelSidebar"


export function ProfilePage() {
    return (
        <div className="min-h-screen bg-gray-50 flex">

            <PanelSidebar/>

            <div className="flex-1 flex flex-col">

                <PanelHeader/>

                <div className="container p-6">

                    <div className="mb-6">
                        <h1 className="text-2xl font-bold">Account Settings</h1>
                        <p className="text-gray-500">Update your personal information</p>
                    </div>

                    <div className="bg-white border rounded-xl p-6 max-w-3xl">

                        <div className="flex items-center gap-4 mb-6">
                            <img src="/avatar.png" className="w-20 h-20 rounded-full object-cover border" alt="profile"/>

                            <div>
                                <button
                                    className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                                    Change Photo
                                </button>
                                <p className="text-xs text-gray-500 mt-2">
                                    JPG, PNG up to 2MB
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">

                            <div>
                                <label className="text-sm text-gray-600">First Name</label>
                                <input
                                    type="text"
                                    value="Ali"
                                    className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600">Last Name</label>
                                <input
                                    type="text"
                                    value="Ahmadi"
                                    className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600">Username</label>
                                <input
                                    type="text"
                                    value="ali_ahmadi"
                                    className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600">Phone</label>
                                <input
                                    type="text"
                                    value="+44 7700 900123"
                                    className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="text-sm text-gray-600">Email</label>
                                <input
                                    type="email"
                                    value="ali@example.com"
                                    className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
                                Cancel
                            </button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                Save Changes
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}
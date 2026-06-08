import { PanelHeader } from "../../../features/user-panel/components/PanelHeader.jsx"
import { PanelSidebar } from "../../../features/user-panel/components/PanelSidebar.jsx"
import { useState, useEffect } from "react"


export function CommentsPage() {
    // my-comments
    const authToken = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY)
    const [comments, setComments] = useState([])
    const statusClasses = {
      Approved: "bg-green-100 text-green-700",
      Unapproved: "bg-yellow-100 text-yellow-700",
      Spam: "bg-red-100 text-red-700",
    };

    useEffect(() => {
        const fetchUserCommentsData = async () => {
            try{
                const response = await fetch('/api/my-comments/', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${authToken}`
                    }
                })

                const data = await response.json()
                console.log(data)
                setComments(data)

            } catch (error) {
                console.log(error)
            }
        }

        void fetchUserCommentsData()
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex">

            <PanelSidebar />

            <div className="flex-1 flex flex-col">

                <PanelHeader />

                <div className="p-6 container">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold">My Comments</h1>
                        <p className="text-gray-500">All comments you have posted on courses</p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-xl border border-border">
                            <p className="text-gray-500 text-sm">Total Comments</p>
                            <p className="text-2xl font-bold">24</p>
                        </div>

                        <div className="bg-white p-4 rounded-xl border border-border">
                            <p className="text-gray-500 text-sm">Approved</p>
                            <p className="text-2xl font-bold text-green-600">18</p>
                        </div>

                        <div className="bg-white p-4 rounded-xl border border-border">
                            <p className="text-gray-500 text-sm">Pending</p>
                            <p className="text-2xl font-bold text-yellow-500">6</p>
                        </div>
                    </div>

                    <div className="space-y-4">

                        {comments.map((comment, index) => (
                            <div key={index} className="bg-white border border-border rounded-xl p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold">{comment.item_object.object_title}</h3>
                                    <span className={`text-xs px-2 py-1 rounded ${statusClasses[comment.status] || 'bg-gray-100 text-gray-700'}`}>
                                        {comment.status}
                                    </span>
                                </div>
                                <p className="text-gray-700 mb-3">
                                    {comment.text}
                                </p>

                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>{comment.created}</span>
                                </div>
                            </div>
                        ))}

          {/*              <div className="bg-white border border-border rounded-xl p-4">*/}
          {/*                  <div className="flex justify-between items-start mb-2">*/}
          {/*                      <h3 className="font-semibold">Node.js Course</h3>*/}
          {/*                      <span className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-700">*/}
          {/*  Pending*/}
          {/*</span>*/}
          {/*                  </div>*/}

          {/*                  <p className="text-gray-700 mb-3">*/}
          {/*                      هنوز کامل ندیدم ولی تا اینجا خوب بوده.*/}
          {/*                  </p>*/}

          {/*                  <div className="flex justify-between text-sm text-gray-500">*/}
          {/*                      <span>2026/05/18</span>*/}
          {/*                      <div className="space-x-2">*/}
          {/*                          <button className="hover:text-blue-600">Edit</button>*/}
          {/*                          <button className="hover:text-red-600">Delete</button>*/}
          {/*                      </div>*/}
          {/*                  </div>*/}
          {/*              </div>*/}

          {/*              <div className="bg-white border border-border rounded-xl p-4">*/}
          {/*                  <div className="flex justify-between items-start mb-2">*/}
          {/*                      <h3 className="font-semibold">Next.js Course</h3>*/}
          {/*                      <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-700">*/}
          {/*  Rejected*/}
          {/*</span>*/}
          {/*                  </div>*/}

          {/*                  <p className="text-gray-700 mb-3">*/}
          {/*                      کیفیت صدا پایین بود و بعضی قسمت‌ها واضح نبود.*/}
          {/*                  </p>*/}

          {/*                  <div className="flex justify-between text-sm text-gray-500">*/}
          {/*                      <span>2026/05/10</span>*/}
          {/*                      <div className="space-x-2">*/}
          {/*                          <button className="hover:text-blue-600">Edit</button>*/}
          {/*                          <button className="hover:text-red-600">Delete</button>*/}
          {/*                      </div>*/}
          {/*                  </div>*/}
          {/*              </div>*/}

                    </div>
                </div>
            </div>
        </div>
    )
}
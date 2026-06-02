

export function LearningHeader({ user, step }) {
    return (
        <header className="flex items-center justify-between border-b bg-white px-6 py-4">
            <div>
                <h1 className="text-lg font-bold">Course Player</h1>
                <p className="text-sm text-slate-500">
                    Welcome {user.name}
                </p>
            </div>

            <div className="w-72">
                <div className="mb-1 flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{step.progress_percentage}%</span>
                </div>

                <div className="h-2 w-full rounded-full bg-slate-200">
                    <div
                        className="h-2 rounded-full bg-indigo-500"
                        style={{width: `${step.progress_percentage}%`}}
                    />
                </div>
            </div>
        </header>
    )
}
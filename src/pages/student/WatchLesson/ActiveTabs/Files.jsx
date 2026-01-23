export default function Files() {
    return (
        <div>
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Attach Files (01)</h3>
            <div className="bg-gray-50 p-4 rounded-lg border flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">📄</span>
                    <div>
                        <p className="font-medium text-slate-800 text-sm">Create account on webflow.pdf</p>
                        <p className="text-xs text-gray-400">12.4 MB</p>
                    </div>
                </div>
                <button className="bg-emerald-600 text-white px-4 py-2 rounded text-sm hover:bg-emerald-700">
                    Download File
                </button>
            </div>
        </div>
    );
}
import { FileText, Download } from 'lucide-react'; 

export default function Files() {
  return (
    <div className="w-full max-w-[1012px] animate-fadeIn">

      <h3 className="text-lg md:text-xl font-bold text-[#08332e] mb-6">
        Attach Files (01)
      </h3>

      <div className="bg-[#fcfdfd] p-4 md:p-5 rounded-xl border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-md transition-shadow">
        
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
            <FileText className="text-[#176D69]" size={24} />
          </div>
          <div className="overflow-hidden">
            <p className="font-semibold text-[#08332e] text-sm md:text-base truncate max-w-[200px] md:max-w-none">
              Create account on webflow.pdf
            </p>
            <p className="text-xs text-gray-400 mt-1">12.4 MB</p>
          </div>
        </div>
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1b5e54] text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-[#14453d] transition-colors shadow-sm active:scale-95">
          <Download size={18} />
          <span>Download File</span>
        </button>
      </div>
    </div>
  );
}
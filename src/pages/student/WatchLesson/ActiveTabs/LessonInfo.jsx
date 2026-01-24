export default function LessonInfo({ title }) {
  const imgs = [
    { img: '../../../../image/A1.PNG' },
    { img: '../../../../image/A2.PNG' },
    { img: '../../../../image/A3.PNG' },
    { img: '../../../../image/A4.PNG' },
    { img: '../../../../image/A5.PNG' },
  ];

  return (
    <div className="w-full max-w-[1012px] mb-6">
      <h1 className="text-xl md:text-2xl font-bold text-[#08332e] mb-4 leading-tight">
        {title}
      </h1>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-sm text-gray-500 border-b border-gray-100 pb-6">
        
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2 shrink-0">
            {imgs.map((item, index) => (
              <div 
                key={index} 
                className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm"
              >
                <img src={item.img} alt="User" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <span className="text-[13px] md:text-sm">
            <strong className="text-slate-800">512</strong> Students watching
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 md:gap-8">
          <div className="flex items-center gap-1">
            <span className="shrink-0">Last updated:</span>
            <span className="text-slate-800 font-semibold whitespace-nowrap">Oct 26, 2020</span>
          </div>
          
          <div className="flex items-center gap-1">
            <span>Comments:</span>
            <span className="text-slate-800 font-semibold">154</span>
          </div>
        </div>

      </div>
    </div>
  );
}
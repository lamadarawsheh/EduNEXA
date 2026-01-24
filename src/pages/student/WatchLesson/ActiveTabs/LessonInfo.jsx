export default function LessonInfo() {
   const imgs = [
    { img: '../../../../image/A1.PNG' },
    { img: '../../../../image/A2.PNG' },
    { img: '../../../../image/A3.PNG' },
    { img: '../../../../image/A4.PNG' },
    { img: '../../../../image/A5.PNG' },
  ];

  return (
        <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800 mb-4">
            2. Importance of User-Centered Design
            </h1>
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-500 pb-4">
            <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                {imgs.map((item, index) => (
                    <div key={index} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden">
                    <img src={item.img} alt="User" className="w-full h-full object-cover" />
                    </div>
                ))}
                </div>
                <span><strong className="text-slate-700">512</strong> Students watching</span>
            </div>

            <div className="flex gap-4">
                <span>Last updated: <span className="text-slate-700 font-medium">Oct 26, 2020</span></span>
                <span>Comments: <span className="text-slate-700 font-medium">154</span></span>
            </div>
            </div>
        </div>
  
  );
};

 
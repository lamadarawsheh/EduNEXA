import React from "react";

export default function PublishCourse({ register }) {
  return (
    <div className="flex items-center justify-center py-10 sm:py-20">
      <div className="max-w-2xl w-full">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="w-24 h-24 bg-[#EBF5F4] rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <span className="text-5xl">🎓</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-black text-[#093332] mb-4">The Finish Line</h3>
          <p className="text-[#176D69] font-medium text-base sm:text-lg">
            Add a final congratulations for your students. This message appears as soon as they complete the final lesson.
          </p>
        </div>

        {/* End Message Section */}
        <div className="bg-white p-6 sm:p-10 rounded-[40px] border-2 border-[#176D69]/10 shadow-xl shadow-[#176D69]/5">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#176D69] text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg shadow-[#176D69]/20">
                ✨
              </div>
              <div>
                <h4 className="font-black text-[#093332] text-xl">Congratulations Message</h4>
                <p className="text-[#176D69] text-xs font-bold uppercase tracking-widest opacity-70">Course Completion Message</p>
              </div>
            </div>

            <textarea
              {...register("publish.congratsMessage", { required: "Please enter a message for your graduates" })}
              placeholder="e.g. Mastered it! You've successfully completed the course. Keep building great things! 🎉"
              className="w-full bg-[#FBFCFD] border border-[#176D69]/20 focus:border-[#176D69] focus:bg-white rounded-[24px] text-[#093332] p-6 text-base sm:text-lg min-h-[220px] outline-none transition-all shadow-inner leading-relaxed"
            />

            <div className="flex items-center gap-3 px-4 py-3 bg-[#EBF5F4]/50 rounded-2xl border border-[#176D69]/10">
              <span className="text-lg">☁️</span>
              <p className="text-[10px] sm:text-xs text-[#176D69] font-black uppercase tracking-widest">
                Linked to EduNexa Cloud publish API
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

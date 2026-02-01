import React from "react";
import { Wrench } from "lucide-react";

const UnderDevelopmentPopup = ({
  isOpen,
  onClose,
  title = "Under Development",
  message = "This feature is currently under development and will be available soon.",
  actionLabel = "Got it"
}) => {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all scale-100 animate-in zoom-in-95 duration-300">

        <div className="p-6 text-center bg-[#FFF7E6]">

          <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-sm bg-white text-[#E8A317]">
            <Wrench className="w-10 h-10" />
          </div>

          <h3 className="text-xl font-bold mb-2 text-[#8A5A00]">
            {title}
          </h3>

          <p className="text-gray-600 text-sm leading-relaxed">
            {message}
          </p>

        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl font-bold text-white
              bg-[#E8A317] hover:bg-[#d49712]
              shadow-lg shadow-[#E8A317]/20
              transform transition-all hover:-translate-y-0.5 active:scale-95 duration-200"
          >
            {actionLabel}
          </button>
        </div>

      </div>
    </div>
  );
};

export default UnderDevelopmentPopup;

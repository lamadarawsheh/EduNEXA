export default function Notes({ content }) {
  return (
    <div className="w-full max-w-[1012px] animate-fadeIn">
      <h3 className="text-lg md:text-xl font-bold text-[#08332e] mb-6">
        Lecture Notes
      </h3>

      <div className="space-y-6">
        {content ? (
          <div className="text-[14px] md:text-[15px] leading-[1.8] text-gray-600 whitespace-pre-wrap">
            {content}
          </div>
        ) : (
          <p className="italic text-gray-400">No notes available for this lecture.</p>
        )}
      </div>
    </div>
  );
}
export default function Description({ content }) {
  return (
    <div className="w-full max-w-[1012px] animate-fadeIn">
      <h3 className="text-lg md:text-xl font-bold text-[#08332e] mb-4">
        Lectures Description
      </h3>
      <div className="space-y-4 text-gray-600 leading-[1.8]">
        {content ? (
           <p className="text-[14px] md:text-[15px]">{content}</p>
        ) : (
           <p className="italic">No description provided for this lecture.</p>
        )}
      </div>
    </div>
  );
}
export default function Description() {
  return (
    <div className="w-full max-w-[1012px] animate-fadeIn">
      {/* العنوان: حجم خط متجاوب */}
      <h3 className="text-lg md:text-xl font-bold text-[#08332e] mb-4">
        Lectures Description
      </h3>

      {/* الفقرات: تحسين تباعد الأسطر والألوان */}
      <div className="space-y-4">
        <p className="text-[14px] md:text-[15px] leading-[1.8] text-gray-600">
          We cover everything you need to build your first website. From creating your first page through to uploading
          your website to the internet. We’ll use the world’s most popular (and free) web design tool called <span className="font-semibold text-[#1b5e54]">Visual Studio Code</span>.
        </p>

        <p className="text-[14px] md:text-[15px] leading-[1.8] text-gray-600">
          There are exercise files you can download and then work along with me. At the end of each video I have 
          a downloadable version of where we are in the process so that you can compare your project with mine.
          This will enable you to see easily where you might have a problem. We will delve into all the good stuff 
          such as how to create your very own <span className="italic underline decoration-[#1b5e54]/30">mobile burger menu</span> from scratch learning some basic JavaScript and jQuery.
        </p>

        <div className="bg-[#f8fdfc] p-4 rounded-lg border-l-4 border-[#1b5e54]">
           <p className="text-[14px] md:text-[15px] leading-[1.8] text-[#1b5e54] font-medium">
            If that all sounds a little too fancy - don’t worry, this course is aimed at people new to web design and who have never coded before. We’ll start right at the beginning and work our way through step by step.
           </p>
        </div>
      </div>
    </div>
  );
}
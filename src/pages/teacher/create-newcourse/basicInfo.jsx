export default function BasicInfo({ register, watch, errors }) {
  const title = watch("title", "");
  const subtitle = watch("subtitle", "");

  return (
    <>
      {/* Title */}
      <div className="mb-5 w-full">
        <label className="label text-[#093332] font-normal">Title</label>
        <div className="relative">
          <input
            {...register("title", { required: true, maxLength: 80 })}
            placeholder="Your course title"
            className="input border border-[#1E8A85]  w-full text-[#1E8A85] font-[14px] p-2"
          />
          <span className="char-count">{title.length}/80</span>
        </div>
      </div>

      {/* Subtitle */}
      <div className="mb-5 w-full">
        <label className="label text-[#093332] font-normal">Subtitle</label>
        <div className="relative">
          <input
            {...register("subtitle", { maxLength: 120 })}
            placeholder="Your course subtitle"
            className="input border border-[#1E8A85]  w-full text-[#1E8A85] font-[14px] p-2"
          />
          <span className="char-count">{subtitle.length}/120</span>
        </div>
      </div>

      {/* Category */}
      <div className="grid grid-cols-2 gap-6 mb-5 w-full">
        <div>
          <label className="label text-[#093332] font-normal">
            Course Category
          </label>
          <select
            {...register("category")}
            className="input border border-[#1E8A85]  w-full text-[#1E8A85] font-[14px] p-2"
          >
            <option>Select...</option>
            <option>Development</option>
            <option>Design</option>
          </select>
        </div>

        <div>
          <label className="label text-[#093332] font-normal">
            Course Sub-category
          </label>
          <select
            {...register("subCategory")}
            className="input border border-[#1E8A85]  w-full text-[#1E8A85] font-[14px] p-2"
          >
            <option>Select...</option>
          </select>
        </div>
      </div>

      {/* Topic */}
      <div className="mb-5">
        <label className="label text-[#093332] font-normal">Course Topic</label>
        <input
          {...register("topic")}
          placeholder="What is primarily taught in your course?"
          className="input border border-[#1E8A85]  w-full text-[#1E8A85] font-[14px] p-2"
        />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-4 gap-6">
        <select
          {...register("language")}
          className="input border border-[#1E8A85]  w-full text-[#1E8A85] font-[14px] p-2"
        >
          <option>Course Language</option>
        </select>

        <select
          {...register("price")}
          className="input border border-[#1E8A85]  w-full text-[#1E8A85] font-[14px] p-2"
        >
          <option>Course Price</option>
        </select>

        <select
          {...register("level")}
          className="input border border-[#1E8A85]  w-full text-[#1E8A85] font-[14px] p-2"
        >
          <option>Course Level</option>
        </select>

        <select
          {...register("duration")}
          className="input border border-[#1E8A85]  w-full text-[#1E8A85] font-[14px] p-2"
        >
          <option>Course Duration</option>
        </select>
      </div>
    </>
  );
}


export default function BasicInfo({ register, watch,
   errors ,categories=[],
   subcategories=[],categoryLoading=false,subCategoryLoading =false}) {
 
 
 
    const title = watch("title", "");
  const subtitle = watch("subtitle", "");
  const selectedCategory = watch("category", "");

  return (
    <>
      {/* Title */}
      <div className="mb-5 w-full">
        <label className="label text-[#093332] font-normal text-sm sm:text-base">Title</label>
        <div className="relative">
          <input
            {...register("title", { required: true, maxLength: 80 , message: "Max 80 characters"})}
            placeholder="Your course title"
            className="input border border-[#1E8A85]  w-full text-[#1E8A85] text-sm sm:text-base p-3 pr-14"
          />
          <span className="char-count">{title.length}/80</span>
        </div>
         {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Subtitle */}
      <div className="mb-5 w-full">
        <label className="label text-[#093332] font-normal">Subtitle</label>
        <div className="relative">
          <input
            {...register("subtitle", { maxLength: 120,message: "Max 120 characters" })}
            placeholder="Your course subtitle"
            className="input border border-[#1E8A85]  w-full text-[#1E8A85] text-sm sm:text-base pr-14 p-2"
          />
          <span className="char-count">{subtitle.length}/120</span>
        </div>
         {errors.subtitle && (
          <p className="text-red-500 text-sm mt-1">{errors.subtitle.message}</p>
        )}
      </div>

      {/* Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-5 w-full">
        <div>
          <label className="label text-[#093332] font-normal">
            Course Category
          </label>
          <select
            {...register("category",{required: "Category is required"})}
            
            className="input border border-[#1E8A85]  w-full text-[#1E8A85] text-sm sm:text-base p-2"
          >
            {/* <option>Select...</option>
            <option>Development</option>
            <option>Design</option> */}
             <option value="">
              {categoryLoading ? "Loading..." : "Select..."}
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        <div>
          <label className="label text-[#093332] font-normal">
            Course Sub-category
          </label>
          <select
            {...register("subCategory",{required: "Sub-category is required"})}
            className="input border border-[#1E8A85]  w-full text-[#1E8A85] font-[14px] p-2"
          >
            {/* <option>Select...</option> */}
             <option value="">
              {subcategories.length === 0 ? "Select category first..." : "Select..."}
            </option>
            {subcategories.map((subCat) => (
              <option key={subCat.id} value={subCat.id}>
                {subCat.name}
              </option>
            ))}
          </select>
           {errors.subCategory && (
            <p className="text-red-500 text-sm">
              {errors.subCategory.message}
            </p>
           )}
        </div>
      </div>

      {/* Topic */}
      <div className="mb-5">
        <label className="label text-[#093332] font-normal  text-sm sm:text-base">Course Topic</label>
        <input
          {...register("topic",{ required: "Course topic is required",
            minLength: {
              value: 3,
              message: "Topic is too short",
            },})}
         
          placeholder="What is primarily taught in your course?"
          className="input border border-[#1E8A85]  w-full text-[#1E8A85] font-[14px] p-2"
        />
         {errors.topic && (
          <p className="text-red-500 text-sm">{errors.topic.message}</p>
        )}
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <select
          {...register("language")}
          className="input border border-[#1E8A85]  w-full text-[#1E8A85] font-[14px] p-2"
        >
            <option value="">Course Language</option>
            <option value="english">English</option>
            <option value="arabic">Arabic</option>
            <option value="french">French</option>
            <option value="spanish">Spanish</option>
            <option value="german">German</option>
        </select>

        <select
          {...register("price")}
          className="input border border-[#1E8A85]  w-full text-[#1E8A85] text-sm sm:text-base p-3 "
        >
            <option value="">Course Price</option>
            <option value="free">Free</option>
            <option value="19.99">$19.99</option>
            <option value="29.99">$29.99</option>
            <option value="49.99">$49.99</option>
            <option value="79.99">$79.99</option>
            <option value="99.99">$99.99</option>
            <option value="149.99">$149.99</option>
            <option value="199.99">$199.99</option>
        </select>

        <select
          {...register("level")}
          className="input border border-[#1E8A85]  w-full text-[#1E8A85] text-sm sm:text-base p-3 "
        >
            <option value="">Course Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="all-levels">All Levels</option>        </select>

        <select
          {...register("duration")}
          className="input border border-[#1E8A85]  w-full text-[#1E8A85] text-sm sm:text-base p-3 "
        >
                     <option value="">Course Duration</option>
            <option value="0-2">0-2 hours</option>
            <option value="2-5">2-5 hours</option>
            <option value="5-10">5-10 hours</option>
            <option value="10-20">10-20 hours</option>
            <option value="20+">20+ hours</option>
        </select>
        {errors[name] && (
              <p className="text-red-500 text-sm">
                {errors[name].message}
              </p>
            )}
      </div>
    </>
  );
}

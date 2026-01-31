
export default function BasicInfo({ register, watch,
  errors, categories = [],
  subcategories = [], categoryLoading = false, subCategoryLoading = false }) {



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
            {...register("title", { required: true, maxLength: 80, message: "Max 80 characters" })}
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
            {...register("subtitle", { maxLength: 120, message: "Max 120 characters" })}
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
            {...register("category", { required: "Category is required" })}

            className="input border border-[#1E8A85]  w-full text-[#1E8A85] text-sm sm:text-base p-2"
          >
            {/* <option>Select...</option>
            <option>Development</option>
            <option>Design</option> */}
            <option value="">
              {categoryLoading ? "Loading..." : "Select..."}
            </option>
            {categories.map((cat, index) => (
              <option key={cat.id || index} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        <div>
          <label className="label text-[#093332] font-normal flex flex-wrap items-center gap-1">
            Course Sub-category
            {!selectedCategory && (
              <span className="text-[10px] sm:text-xs opacity-60">(Select category first)</span>
            )}
          </label>
          <select
            {...register("subCategory", { required: "Sub-category is required" })}
            className="input border border-[#1E8A85]  w-full text-[#1E8A85] font-[14px] p-2"
            disabled={!selectedCategory || subCategoryLoading}
          >
            <option value="">
              {subCategoryLoading ? "Loading subcategories..." : (selectedCategory ? "Select Subcategory..." : "Choose Category first")}
            </option>
            {subcategories.map((subCat, index) => (
              <option key={subCat.id || index} value={subCat.id}>
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
          {...register("topic", {
            required: "Course topic is required",
            minLength: {
              value: 3,
              message: "Topic is too short",
            },
          })}

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
          {...register("language", { required: "Language is required" })}
          className="input border border-[#1E8A85]  w-full text-[#1E8A85] font-[14px] p-2"
        >
          <option value="" disabled hidden>Select Language</option>
          <option value="0">English</option>
          <option value="1">Arabic</option>
          <option value="2">French</option>
          <option value="3">Spanish</option>
          <option value="4">German</option>
        </select>

        <select
          {...register("price", { required: "Price is required" })}
          className="input border border-[#1E8A85]  w-full text-[#1E8A85] text-sm sm:text-base p-3 "
        >
          <option value="" disabled hidden>Select Price</option>
          <option value="0">Free</option>
          <option value="19.99">$19.99</option>
          <option value="29.99">$29.99</option>
          <option value="49.99">$49.99</option>
          <option value="79.99">$79.99</option>
          <option value="99.99">$99.99</option>
          <option value="149.99">$149.99</option>
          <option value="199.99">$199.99</option>
        </select>

        <select
          {...register("level", { required: "Level is required" })}
          className="input border border-[#1E8A85]  w-full text-[#1E8A85] text-sm sm:text-base p-3 "
        >
          <option value="" disabled hidden>Select Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
          <option value="All Levels">All Levels</option>
        </select>

        <select
          {...register("duration", { required: "Duration is required" })}
          className="input border border-[#1E8A85]  w-full text-[#1E8A85] text-sm sm:text-base p-3 "
        >
          <option value="" disabled hidden>Select Duration</option>
          <option value="0-2 hrs">0-2 hours</option>
          <option value="2-5 hrs">2-5 hours</option>
          <option value="5-10 hrs">5-10 hours</option>
          <option value="10-20 hrs">10-20 hours</option>
          <option value="20+ hrs">20+ hours</option>
        </select>
        {errors.duration && (
          <p className="text-red-500 text-sm">
            {errors.duration.message}
          </p>
        )}
      </div>
    </>
  );
}

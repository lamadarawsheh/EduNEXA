import React from "react";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { fetchCategory, fetchAllCategories } from "../../../ReduxToolkit/Slices/CreateNewCourses/CategorySlice";
import { addSubCategory, fetchAllSubCategories } from "../../../ReduxToolkit/Slices/CreateNewCourses/SubCategorySlice";

export default function BasicInfo({ register, watch,
  errors, categories = [],
  subcategories = [], categoryLoading = false, subCategoryLoading = false }) {

  const dispatch = useDispatch();
  const title = watch("title", "");
  const subtitle = watch("subtitle", "");
  const selectedCategory = watch("category", "");

  const handleAddCategory = async () => {
    const { value: categoryName } = await Swal.fire({
      title: 'Add New Category',
      input: 'text',
      inputLabel: 'Category Name',
      inputPlaceholder: 'e.g. Marketing',
      showCancelButton: true,
      confirmButtonColor: '#1E8A85',
      inputValidator: (value) => {
        if (!value) return 'You need to write something!'
      }
    });

    if (categoryName) {
      try {
        Swal.fire({ title: 'Processing...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
        await dispatch(fetchCategory({ name: categoryName })).unwrap();
        await dispatch(fetchAllCategories());
        Swal.fire({ icon: 'success', title: 'Category added!', showConfirmButton: false, timer: 1500 });
      } catch (err) {
        Swal.fire({ icon: 'error', title: 'Oops...', text: 'Failed to add category' });
      }
    }
  };

  const handleAddSubCategory = async () => {
    if (!selectedCategory) {
      Swal.fire({ icon: 'warning', title: 'Select Category First', text: 'You must select a parent category before adding a sub-category.' });
      return;
    }

    const parentCat = categories.find(c => String(c.id) === String(selectedCategory));
    const parentName = parentCat ? parentCat.name : "";

    const { value: subCategoryName } = await Swal.fire({
      title: 'Add New Sub-category',
      input: 'text',
      inputLabel: `New sub-category for ${parentName}`,
      inputPlaceholder: 'e.g. HR',
      showCancelButton: true,
      confirmButtonColor: '#1E8A85',
      inputValidator: (value) => {
        if (!value) return 'You need to write something!'
      }
    });

    if (subCategoryName) {
      try {
        Swal.fire({ title: 'Processing...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
        await dispatch(addSubCategory({
          name: subCategoryName,
          catName: parentName,
          categoryId: selectedCategory
        })).unwrap();
        await dispatch(fetchAllSubCategories());
        Swal.fire({ icon: 'success', title: 'Sub-category added!', showConfirmButton: false, timer: 1500 });
      } catch (err) {
        Swal.fire({ icon: 'error', title: 'Oops...', text: 'Failed to add sub-category' });
      }
    }
  };

  return (
    <>
      {/* Title */}
      <div className="mb-5 w-full font-inter">
        <label className="label text-[#093332] font-semibold text-sm sm:text-base">Title</label>
        <div className="relative">
          <input
            {...register("title", { required: true, maxLength: 80, message: "Max 80 characters" })}
            placeholder="Your course title"
            className="input border border-[#1E8A85]  w-full text-[#1E8A85] text-sm sm:text-base p-3 pr-14 rounded-xl"
          />
          <span className="char-count absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 font-bold">{title.length}/80</span>
        </div>
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Subtitle */}
      <div className="mb-5 w-full font-inter">
        <label className="label text-[#093332] font-semibold">Subtitle</label>
        <div className="relative">
          <input
            {...register("subtitle", { maxLength: 120, message: "Max 120 characters" })}
            placeholder="Your course subtitle"
            className="input border border-[#1E8A85]  w-full text-[#1E8A85] text-sm sm:text-base pr-14 p-3 rounded-xl"
          />
          <span className="char-count absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 font-bold">{subtitle.length}/120</span>
        </div>
        {errors.subtitle && (
          <p className="text-red-500 text-sm mt-1">{errors.subtitle.message}</p>
        )}
      </div>

      {/* Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-5 w-full font-inter">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="label text-[#093332] font-semibold mb-0">
              Course Category
            </label>
            <button
              type="button"
              onClick={handleAddCategory}
              className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-[#1E8A85] hover:text-[#093332] transition-colors"
            >
              <Plus size={12} strokeWidth={3} /> Add New
            </button>
          </div>
          <select
            {...register("category", { required: "Category is required" })}
            className="input border border-[#1E8A85] w-full text-[#1E8A85] text-sm sm:text-base p-3 rounded-xl bg-white focus:ring-2 focus:ring-[#1E8A85]/20"
          >
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
            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="label text-[#093332] font-semibold mb-0 flex items-center gap-2">
              Course Sub-category
              {!selectedCategory && (
                <span className="text-[10px] opacity-40 font-bold">(Select category first)</span>
              )}
            </label>
            <button
              type="button"
              onClick={handleAddSubCategory}
              disabled={!selectedCategory}
              className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest transition-all ${selectedCategory ? "text-[#1E8A85] hover:text-[#093332]" : "text-gray-300 cursor-not-allowed"}`}
            >
              <Plus size={12} strokeWidth={3} /> Add New
            </button>
          </div>
          <select
            {...register("subCategory", { required: "Sub-category is required" })}
            className="input border border-[#1E8A85] w-full text-[#1E8A85] text-sm sm:text-base p-3 rounded-xl bg-white disabled:bg-gray-50 focus:ring-2 focus:ring-[#1E8A85]/20"
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
            <p className="text-red-500 text-sm mt-1">
              {errors.subCategory.message}
            </p>
          )}
        </div>
      </div>

      {/* Topic */}
      <div className="mb-5 font-inter">
        <label className="label text-[#093332] font-semibold text-sm sm:text-base">Course Topic</label>
        <input
          {...register("topic", {
            required: "Course topic is required",
            minLength: {
              value: 3,
              message: "Topic is too short",
            },
          })}
          placeholder="What is primarily taught in your course?"
          className="input border border-[#1E8A85]  w-full text-[#1E8A85] text-sm sm:text-base p-3 rounded-xl"
        />
        {errors.topic && (
          <p className="text-red-500 text-sm mt-1">{errors.topic.message}</p>
        )}
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 font-inter">
        <div>
          <label className="label text-[#093332] font-semibold text-sm">Language</label>
          <select
            {...register("language", { required: "Language is required" })}
            className="input border border-[#1E8A85] w-full text-[#1E8A85] text-sm p-3 rounded-xl"
          >
            <option value="" disabled hidden>Select Language</option>
            <option value="0">English</option>
            <option value="1">Arabic</option>
            <option value="2">French</option>
            <option value="3">Spanish</option>
            <option value="4">German</option>
          </select>
        </div>

        <div>
          <label className="label text-[#093332] font-semibold text-sm">Pricing</label>
          <select
            {...register("price", { required: "Price is required" })}
            className="input border border-[#1E8A85] w-full text-[#1E8A85] text-sm p-3 rounded-xl"
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
        </div>

        <div>
          <label className="label text-[#093332] font-semibold text-sm">Difficulty</label>
          <select
            {...register("level", { required: "Level is required" })}
            className="input border border-[#1E8A85] w-full text-[#1E8A85] text-sm p-3 rounded-xl"
          >
            <option value="" disabled hidden>Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="All Levels">All Levels</option>
          </select>
        </div>

        <div>
          <label className="label text-[#093332] font-semibold text-sm">Duration</label>
          <select
            {...register("duration", { required: "Duration is required" })}
            className="input border border-[#1E8A85] w-full text-[#1E8A85] text-sm p-3 rounded-xl"
          >
            <option value="" disabled hidden>Select Duration</option>
            <option value="0-2 hrs">0-2 hours</option>
            <option value="2-5 hrs">2-5 hours</option>
            <option value="5-10 hrs">5-10 hours</option>
            <option value="10-20 hrs">10-20 hours</option>
            <option value="20+ hrs">20+ hours</option>
          </select>
          {errors.duration && (
            <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>
          )}
        </div>
      </div>
    </>
  );
}

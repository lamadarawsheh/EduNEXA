import { useFieldArray } from "react-hook-form";
import DynamicList from "./dynamicList";
import image1 from "../images/download 1.svg";
import image2 from "../images/images 1.svg";
import { useState, useEffect } from "react";

export default function AdvanceInfo({ register, control, watch }) {

  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [trailerPreview, setTrailerPreview] = useState(null);


  const learnList = useFieldArray({
    control,
    name: "learnItems",
  });

  const audienceList = useFieldArray({
    control,
    name: "audience",
  });

  const requirementsList = useFieldArray({
    control,
    name: "requirements",
  });

  const thumbnailFile = watch("thumbnail");
  const trailerFile = watch("trailer");

  // Handle Thumbnail preview update
  useEffect(() => {
    if (thumbnailFile && thumbnailFile[0]) {
      const file = thumbnailFile[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setThumbnailPreview(null);
    }
  }, [thumbnailFile]);

  // Handle Trailer preview update
  useEffect(() => {
    if (trailerFile && trailerFile[0]) {
      const file = trailerFile[0];
      const url = URL.createObjectURL(file);
      setTrailerPreview(url);

      // Cleanup URL on unmount or change
      return () => URL.revokeObjectURL(url);
    } else {
      setTrailerPreview(null);
    }
  }, [trailerFile]);

  return (
    <div className="space-y-10 bg-[#FFFFFF] ">
      {/* Upload Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
        {/* Thumbnail */}
        <div className="flex flex-col gap-4 sm:gap-6 w-full">
          <h4 className="font-black text-[#093332] text-lg sm:text-2xl">
            Course Thumbnail
          </h4>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-full sm:w-64 shrink-0">
              <img
                src={thumbnailPreview || image1}
                alt="Thumbnail"
                className="w-full h-32 sm:h-40 object-cover rounded-2xl shadow-md border border-gray-100"
              />
            </div>

            <div className="flex-1 border-2 border-dashed border-[#176D69]/20 rounded-2xl p-4 sm:p-6 text-center sm:text-left bg-[#FBFCFD]">
              <p className="text-[#176D69] font-medium mb-4 text-xs sm:text-sm leading-relaxed">
                Upload your course thumbnail here. <br className="hidden sm:block" />
                <span className="text-[#093332] font-black">Guidelines:</span> 1200x800px or 12:8 Ratio. Supported:
                <span className="text-[#093332] font-bold italic block sm:inline mt-1 sm:mt-0"> .jpg, .jpeg, .png</span>
              </p>
              <input
                type="file"
                {...register("thumbnail")}
                className="hidden"
                id="thumbnail"
              />
              <label
                htmlFor="thumbnail"
                className="w-full sm:w-auto inline-flex items-center justify-center btn-light px-6 py-3 cursor-pointer font-black bg-[#EBF5F4] text-[#176D69] rounded-xl hover:bg-[#176D69] hover:text-white transition-all text-sm"
              >
                {thumbnailFile && thumbnailFile.length > 0
                  ? "Change Image"
                  : "Upload Image"}
              </label>
              {thumbnailFile && thumbnailFile.length > 0 && (
                <p className="text-[10px] text-green-600 mt-2 font-bold uppercase tracking-tight">
                  ✓ {thumbnailFile[0].name}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Trailer */}
        <div className="flex flex-col gap-4 sm:gap-6 w-full">
          <h4 className="font-black text-[#093332] text-lg sm:text-2xl">Course Trailer</h4>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-full sm:w-64 shrink-0">
              {trailerPreview ? (
                <video
                  src={trailerPreview}
                  className="w-full h-32 sm:h-40 object-cover rounded-2xl shadow-md border border-gray-100 bg-black"
                  controls
                />
              ) : (
                <img
                  src={image2}
                  alt="Trailer Placeholder"
                  className="w-full h-32 sm:h-40 object-cover rounded-2xl shadow-md border border-gray-100"
                />
              )}
            </div>
            <div className="flex-1 border-2 border-dashed border-[#176D69]/20 rounded-2xl p-4 sm:p-6 text-center sm:text-left bg-[#FBFCFD]">
              <p className="text-[#176D69] mb-4 font-medium text-xs sm:text-sm leading-relaxed">
                Students who watch a well-made promo video are <span className="text-[#093332] font-black underline">5X more likely</span> to
                enroll. High quality promos can increase this to <span className="text-[#093332] font-bold">10X!</span>
              </p>
              <input
                type="file"
                {...register("trailer")}
                className="hidden"
                id="trailer"
              />
              <label
                htmlFor="trailer"
                className="w-full sm:w-auto inline-flex items-center justify-center btn-light cursor-pointer px-6 py-3 font-black bg-[#EBF5F4] text-[#176D69] rounded-xl hover:bg-[#176D69] hover:text-white transition-all text-sm"
              >
                {trailerFile && trailerFile.length > 0
                  ? "Change Video"
                  : "Upload Video"}
              </label>
              {trailerFile && trailerFile.length > 0 && (
                <p className="text-[10px] text-green-600 mt-2 font-bold uppercase tracking-tight">
                  ✓ {trailerFile[0].name}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="border border-b-[#176D69] pb-4">
        <h4 className="font-medium mb-2 text-[#093332]">Course Description</h4>
        <textarea
          {...register("description")}
          rows={5}
          placeholder="Enter your course description"
          className="input text-[#176D69] w-full p-2 border border-[#176D69]"
        />
      </div>

      {/* What you will learn */}

      <DynamicList
        title="What you will teach in this course(4/8)"
        fieldArray={learnList}
        register={register}
        name="learnItems"
        placeholder="What you will teach in this course..."
      />

      {/* Target Audience */}
      <DynamicList
        title="Target Audience"
        fieldArray={audienceList}
        register={register}
        name="audience"
        placeholder="Who this course is for..."
      />

      {/* Requirements */}
      <DynamicList
        title="Course Requirements"
        fieldArray={requirementsList}
        register={register}
        name="requirements"
        placeholder="What are the course requirements..."
      />
    </div>
  );
}

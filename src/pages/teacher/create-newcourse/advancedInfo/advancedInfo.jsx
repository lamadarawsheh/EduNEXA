import { useFieldArray } from "react-hook-form";
import DynamicList from "./dynamicList";
import image1 from "../images/download 1.svg";
import image2 from "../images/images 1.svg";

export default function AdvanceInfo({ register, control }) {
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

  return (
    <div className="space-y-10 bg-[#FFFFFF] ">
      {/* Upload Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 ">
        {/* Thumbnail */}
        <div className="flex flex-col items-center sm:items-start gap-4 sm:gap-6 w-full lg:mt-4">
          <h4 className="font-medium mb-2 text-[#093332] text-left">
            Course Thumbnail
          </h4>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <img
              src={image1}
              alt="Thumbnail"
              className="w-full sm:w-56 h-40 object-cover lg:mt-8"
            />

            <div className="border border-dashed rounded p-3 sm:p-4 text-center">
              <p className="text-[#176D69] font-light mb-3  text-sm sm:text-base">
                Upload your course thumbnail here{" "}
                <strong className="text-[#093332]">
                  important guidelines:
                </strong>{" "}
                1200*800 pixles or 12:8Ratio.supported format .
                <span className="text-[#093332]">jpg,jpeg or png</span>
              </p>
              <input
                type="file"
                {...register("thumbnail")}
                className="hidden"
                id="thumbnail"
              />
              <label
                htmlFor="thumbnail"
                className="inline-block w-full btn-light px-6 py-2 cursor-pointer font-semibold bg-[#A6E5E35C] text-[#176D69] sm:w-auto"
              >
                Upload Image
              </label>
            </div>
          </div>
        </div>

        {/* Trailer */}
        <div className="flex flex-col items-center sm:items-start gap-4 sm:gap-6 w-full lg:mt-4">
          <h4 className="font-medium   text-[#093332] ">Course Trailer</h4>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
            <img
              src={image2}
              alt="Thumbnail"
              className="w-full sm:w-56 h-40 object-cover lg:mb-4 "
            />
            <div className="border border-dashed rounded p-4 sm:p-6 text-center">
              <p className="text-[#176D69] mb-3 font-light  text-sm sm:text-base leading-relaxed">
                Students who watch a well-made promo video are 5X more likely to
                enroll in your course. We've seen that statistic go up to 10X
                for exceptionally awesome videos.
              </p>
              <input
                type="file"
                {...register("trailer")}
                className="hidden"
                id="trailer"
              />
              <label
                htmlFor="trailer"
                className="inline-block w-full sm:w-auto text-center btn-light cursor-pointer px-6 py-2 font-semibold bg-[#A6E5E35C] text-[#176D69]"
              >
                Upload Video
              </label>
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

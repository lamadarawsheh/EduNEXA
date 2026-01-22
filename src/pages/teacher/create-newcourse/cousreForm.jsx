import { useForm } from "react-hook-form";
import { useState } from "react";
import StepNavbar from "./StepNavbar";
import BasicInfo from "./basicInfo";
import AdvanceInfo from "./advancedInfo/advancedInfo";
import Curriculum from "./curriculum/curriculum";
import PublishCourse from "./publishCourse";

const STEPS = [
  "Basic Information",
  "Advance Information",
  "Curriculum",
  "Publish Course",
];
export default function CourseForm() {
  const [step, setStep] = useState(0);
  const isLastStep = step === STEPS.length - 1;
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      learnItems: [{ value: "" }],
      audience: [{ value: "" }],
      requirements: [{ value: "" }],
      curriculum: [
        {
          title: "",
          lectures: [],
        },
      ],
    },
  });

  const onSubmit = (data) => {
    console.log("Course Data:", data);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 bg-[#FFFFFF]">
      <div>
        <h4 className="text-[#1E8A85] font-medium text-sm sm:text-base mb-8">Good Morning Ali </h4>
        <h3 className="text-[#093332] font-semibold text-lg sm:text-xl">Create a new course</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-[#FFFFFF] p-8">
        <StepNavbar step={step} setStep={setStep} />

        {/* 🔹 STEP HEADER */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 border-b-[#E9EAF0] w-full pb-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#093332]">
            {STEPS[step]}
          </h2>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              type="button"
              className=" bg-[#A6E5E35C] text-[#093332] font-semibold px-6 py-2 cursor-pointer"
            >
              Save
            </button>
            <button
              type="button"
              className="btn-light text-[#093332] font-semibold  cursor-pointer "
            >
              Save & Preview
            </button>
          </div>
        </div>

        {/* 🔹 STEP CONTENT */}
        {step === 0 && (
          <BasicInfo register={register} watch={watch} errors={errors} />
        )}
        {step === 1 && <AdvanceInfo register={register} control={control} />}
        {step === 2 && <Curriculum register={register} control={control} />}
        {step === 3 && (
          <PublishCourse
            register={register}
            control={control}
            setStep={setStep}
          />
        )}

        {/* 🔹 FOOTER BUTTONS */}
        <div className="flex flex-col gap-2 mt-10 md:flex-row md:justify-between">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="btn-outline border border-[#176D69] text-[#176D69] font-semibold px-6 py-2 cursor-pointer"
            >
              {isLastStep ? "Prev Step" : "Cancel"}
            </button>
          )}

          {/* RIGHT BUTTON */}
          {!isLastStep && (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="btn-primary text-[#FFFFFF] bg-[#176D69] font-semibold  px-4 py-1.5
      sm:px-6 sm:py-2
      w-full sm:w-auto
      cursor-pointer
      sm:ml-2
      transition"
            >
              Save & Next
            </button>
          )}

          {isLastStep && (
            <button
              type="submit"
              className="btn-primary text-[#FFFFFF] bg-[#176D69] font-semibold px-6 py-2 cursor-pointer"
            >
              Submit For Review
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

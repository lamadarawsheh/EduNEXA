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
    <div className="p-10 bg-[#FFFFFF]">
      <div>
        <h4 className="text-[#1E8A85] font-medium ">Good Morning Ali </h4>
        <h3 className="text-[#093332] font-semibold">Create a new course</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-[#FFFFFF] p-8">
        <StepNavbar step={step} setStep={setStep} />

        {/* 🔹 STEP HEADER (DYNAMIC) */}
        <div className="flex items-center justify-between mb-6 border-b-[#E9EAF0] w-full">
          <h2 className="text-2xl font-semibold text-[#093332]">
            {STEPS[step]}
          </h2>

          <div className="flex gap-3">
            <button
              type="button"
              className=" bg-[#A6E5E35C] text-[#093332] font-semibold px-6 py-2 cursor-pointer"
            >
              Save
            </button>
            <button
              type="button"
              className="btn-light text-[#093332] font-semibold ml-2 cursor-pointer"
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
        <div className="flex justify-between mt-10">
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
              className="btn-primary text-[#FFFFFF] bg-[#176D69] font-semibold px-6 py-2 cursor-pointer"
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

const steps = [
  "Basic Information",
  "Advance Information",
  "Curriculum",
  "Publish Course",
];

export default function StepNavbar({ step, setStep, isEditing }) {
  return (
    <div className="border-b mb-8">
      <div className=" flex gap-4 text-sm
          overflow-x-auto whitespace-nowrap
          sm:justify-between sm:overflow-visible">
        {steps.map((label, index) => {
          const isDisabled = isEditing && index < 2;
          return (
            <button
              key={label}
              type="button"
              disabled={isDisabled}
              onClick={() => index <= step && !isDisabled && setStep(index)}
              className={`pb-3 px-2 border-b-2 transition font-medium flex-shrink-0
                ${step === index
                  ? "border-[#093332] text-[#093332] font-semibold"
                  : "border-transparent text-[#176D69] "
                }
                ${isDisabled ? "opacity-30 cursor-not-allowed" : ""}
              `}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

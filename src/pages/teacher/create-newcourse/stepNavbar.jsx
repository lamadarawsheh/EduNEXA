const steps = [
  "Basic Information",
  "Advance Information",
  "Curriculum",
  "Publish Course",
];

export default function StepNavbar({ step, setStep }) {
  return (
    <div className="border-b mb-8">
      <div className="flex justify-between text-sm">
        {steps.map((label, index) => (
          <button
            key={label}
            type="button"
            onClick={() => index <= step && setStep(index)}
            className={`pb-3 px-2 border-b-2 transition font-medium
              ${
                step === index
                 ? "border-[#093332] text-[#093332] font-semibold"
                  :"border-transparent text-[#176D69] "
                 
              }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

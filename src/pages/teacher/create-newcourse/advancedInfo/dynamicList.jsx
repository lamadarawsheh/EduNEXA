export default function DynamicList({
  title,
  fieldArray,
  register,
  name,
  placeholder,
  max = 8,
}) {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-[#093332]">
          {title} ({fieldArray.fields.length}/{max})
        </h4>

        {fieldArray.fields.length < max && (
          <button
            type="button"
            onClick={() => fieldArray.append({ value: "" })}
            className="text-sm text-[#093332] font-semibold"
          >
            + Add new
          </button>
        )}
      </div>

      {/* Inputs */}
      <div className="space-y-3">
      
        {fieldArray.fields.map((item, index) => (
          <>
          <span>{item.id}</span>
          <input
            key={item.id}
            {...register(`${name}.${index}.value`)}
            placeholder={placeholder}
            className="input border border-[#176D69] w-full text-[#176D69] p-2"
          />
          </>
        ))}
      </div>
    </div>
  );
}

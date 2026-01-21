import { useFieldArray } from "react-hook-form";

export default function CurriculumStep({ control, register }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "curriculum",
  });

  return (
    <div className="space-y-10">
      {fields.map((item, index) => (
        <div
          key={item.id}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 border rounded-xl  p-4 sm:p-6"
        >
          {/* ===== Section Name ===== */}
          <div>
            <div className="flex justify-between mb-2 border border-b-gray-300 pb-2">
              <h4 className="font-medium text-[#093332] text-sm sm:text-base ">Edit Section Name</h4>
              <button
                className="text-[#093332] cursor-pointer shrink-0"
                onClick={() => remove(index)}
              >
                ✕
              </button>
            </div>
            <p className="font-light text-[#093332] mt-3 ">Section</p>
            <input
              {...register(`curriculum.${index}.sectionTitle`)}
              placeholder="Write your section name here..."
              className="input w-full border border-[#176D69] text-[#176D69] p-2 mt-1 text-sm sm:text-base"
            />

            <div className="flex gap-3 mt-6 justify-between">
              <button
                type="button"
                className="btn-light  bg-[#A6E5E35C] text-[#093332] font-semibold px-6 py-2 cursor-pointer sm:w-auto "
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-primary  text-[#FFFFFF] bg-[#176D69] font-semibold px-4 py-2 cursor-pointer sm:w-auto "
              >
                Save Changes
              </button>
            </div>
          </div>

          {/* ===== Lecture Video ===== */}
          <div>
            <div className="flex justify-between mb-2 border border-b-gray-300 pb-2">
              <h4 className="font-medium  text-[#093332]">Lecture Video</h4>
              <button
                className="text-[#093332] cursor-pointer"
                onClick={() => remove(index)}
              >
                ✕
              </button>
            </div>

            <div className="relative w-full">
              {/* hidden file input */}
              <input
                type="file"
                {...register(`curriculum.${index}.video`)}
                id={`video-${index}`}
                className="hidden text-sm sm:text-base"
              />

              {/* fake input */}
              <div className="flex items-center  border border-[#176D69] text-[#176D69] overflow-hidden sm:w-auto ">
                <div className="flex-1 px-4 py-3 text-sm text-gray-400">
                  Upload Files
                </div>

                <label
                  htmlFor={`video-${index}`}
                  className="px-4 py-3 bg-[#A6E5E35C] text-sm font-medium cursor-pointer text-[#093332] sm:w-auto "
                >
                  Upload File
                </label>
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-2">
              Note: All files should be at least 720p and less than 4.0 GB.
            </p>

            <div className="flex gap-3 mt-4 justify-between">
              <button
                type="button"
                className="btn-light bg-[#A6E5E35C] text-[#093332] font-semibold px-6 py-2 cursor-pointer sm:w-auto "
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-primary bg-[#176D69] text-[#FFFFFF] font-semibold px-4 py-2 cursor-pointer sm:w-auto "
              >
                Upload Video
              </button>
            </div>
          </div>

          {/* ===== Attach File ===== */}
          <div>
            <div className="flex justify-between mb-2 border border-b-gray-300 pb-2">
              <h4 className="font-medium text-[#093332]">Attach File</h4>
              <button
                className="text-[#093332] cursor-pointer"
                onClick={() => remove(index)}
              >
                ✕
              </button>
            </div>
            <input
              type="file"
              {...register(`curriculum.${index}.attachment`)}
              className="input w-full border border-[#176D69] text-[#176D69] p-10 text-sm sm:text-base"
              placeholder="Attach File here..."
            />
            <div className="flex gap-3 mt-4 justify-between">
              <button
                type="button"
                className="btn-light bg-[#A6E5E35C] text-[#093332] font-semibold px-6 py-2 cursor-pointer sm:w-auto "
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-primary bg-[#176D69] text-[#FFFFFF] font-semibold px-4 py-2 cursor-pointer sm:w-auto "
              >
                Attach File
              </button>
            </div>
          </div>

          {/* ===== Caption ===== */}
          <div>
            <div className="flex justify-between mb-2 border border-b-gray-300 pb-2">
              <h4 className="font-medium  text-[#093332]">
                {" "}
                AddLecture Caption
              </h4>
              <button
                className="text-[#093332] cursor-pointer"
                onClick={() => remove(index)}
              >
                ✕
              </button>
            </div>
            <p className="font-light text-[#093332] mt-3 ">Caption</p>
            <input
              {...register(`curriculum.${index}.caption`)}
              placeholder="Write your lecture caption here..."
              className="input w-full border border-[#176D69] text-[#176D69] p-2 mt-1 text-sm sm:text-base"
            />
            <div className="flex gap-3 mt-4 justify-between">
              <button
                type="button"
                className="btn-light bg-[#A6E5E35C] text-[#093332] font-semibold px-6 py-2 cursor-pointer sm:w-auto "
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-primary bg-[#176D69] text-[#FFFFFF] font-semibold px-4 py-2 cursor-pointer sm:w-auto "
              >
                Attach File
              </button>
            </div>
          </div>

          {/* ===== Description ===== */}
          <div>
      <div className="flex justify-between mb-2 border border-b-gray-300 pb-2">
              <h4 className="font-medium text-[#093332]">Add Lecture Description</h4>
              <button
                className="text-[#093332] cursor-pointer"
                onClick={() => remove(index)}
              >
                ✕
              </button>
            </div>          
              <textarea
              {...register(`curriculum.${index}.description`)}
              className="textarea w-full  border border-[#176D69] text-[#176D69] text-sm sm:text-base"
              rows={4}
                placeholder="Write your lecture description here..."
            />
               <div className="flex gap-3 mt-4 justify-between">
              <button
                type="button"
                className="btn-light bg-[#A6E5E35C] text-[#093332] font-semibold px-6 py-2 cursor-pointer sm:w-auto "
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-primary bg-[#176D69] text-[#FFFFFF] font-semibold px-4 py-2 cursor-pointer sm:w-auto "
              >
                Attach File
              </button>
            </div>
          </div>

          {/* ===== Notes ===== */}
          <div>
            <div className="flex justify-between mb-2 border border-b-gray-300 pb-2">
              <h4 className="font-medium text-[#093332]">Add Lecture Notes</h4>
              <button
                className="text-[#093332] cursor-pointer"
                onClick={() => remove(index)}
              >
                ✕
              </button>
            </div>

             <p className="font-light text-[#093332] mt-3 ">Notes</p>
            <textarea
              {...register(`curriculum.${index}.notes`)}
              className="textarea w-full border border-[#176D69] text-[#176D69] text-sm sm:text-base"
              rows={4}
            />
              <div className="flex gap-3 mt-4 justify-between">
              <button
                type="button"
                className="btn-light bg-[#A6E5E35C] text-[#093332] font-semibold px-6 py-2 cursor-pointer sm:w-auto "
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-primary bg-[#176D69] text-[#FFFFFF] font-semibold px-4 py-2 cursor-pointer sm:w-auto "
              >
                Add Notes
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

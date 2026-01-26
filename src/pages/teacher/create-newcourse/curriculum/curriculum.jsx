import { useFieldArray } from "react-hook-form";
import { useState } from "react";

export default function CurriculumStep({ control, register, watch }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "curriculum",
  });

  // Add new section
  const addNewSection = () => {
    append({
      sectionTitle: "",
      video: null,
      attachment: null,
      caption: "",
      description: "",
      notes: "",
    });
  };

  return (
    <div className="space-y-10">
      {/* Add Section Button */}
      {fields.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 mb-4">No sections added yet</p>
          <button
            type="button"
            onClick={addNewSection}
            className="btn-primary bg-[#176D69] text-white px-6 py-2 rounded font-semibold"
          >
            Add Your First Section
          </button>
        </div>
      )}

      {fields.map((item, index) => {
        const videoFile = watch(`curriculum.${index}.video`);
        const attachmentFile = watch(`curriculum.${index}.attachment`);

        return (
          <div
            key={item.id}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 border rounded-xl p-4 sm:p-6"
          >
            {/* ===== Section Name ===== */}
            <div>
              <div className="flex justify-between mb-2 border border-b-gray-300 pb-2">
                <h4 className="font-medium text-[#093332] text-sm sm:text-base">
                  Edit Section Name
                </h4>
                <button
                  type="button"
                  className="text-[#093332] cursor-pointer shrink-0"
                  onClick={() => remove(index)}
                >
                  ✕
                </button>
              </div>
              <p className="font-light text-[#093332] mt-3">Section</p>
              <input
                {...register(`curriculum.${index}.sectionTitle`)}
                placeholder="Write your section name here..."
                className="input w-full border border-[#176D69] text-[#176D69] p-2 mt-1 text-sm sm:text-base"
              />

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
                <button
                  type="button"
                  className="btn-light bg-[#A6E5E35C] text-[#093332] font-semibold px-6 py-2 cursor-pointer sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-primary text-[#FFFFFF] bg-[#176D69] font-semibold px-4 py-2 cursor-pointer sm:w-auto"
                >
                  Save Changes
                </button>
              </div>
            </div>

            {/* ===== Lecture Video ===== */}
            <div>
              <div className="flex justify-between mb-2 border border-b-gray-300 pb-2">
                <h4 className="font-medium text-[#093332]">Lecture Video</h4>
                <button
                  type="button"
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
                  accept="video/mp4,video/avi,video/mov,video/wmv"
                  id={`video-${index}`}
                  className="hidden text-sm sm:text-base"
                />

                {/* fake input */}
                <div className="flex items-center border border-[#176D69] text-[#176D69] overflow-hidden sm:w-auto mt-6">
                  <div className="flex-1 px-4 py-3 text-sm text-gray-400">
                    {videoFile && videoFile.length > 0
                      ? videoFile[0].name
                      : "Upload Files"}
                  </div>

                  <label
                    htmlFor={`video-${index}`}
                    className="px-4 py-3 bg-[#A6E5E35C] text-sm font-medium cursor-pointer text-[#093332] sm:w-auto "
                  >
                    {videoFile && videoFile.length > 0
                      ? "Change File"
                      : "Upload File"}
                  </label>
                </div>
              </div>

              <p className="text-xs text-gray-400 mt-2">
                Note: All files should be at least 720p and less than 4.0 GB.
              </p>
              {videoFile && videoFile.length > 0 && (
                <p className="text-xs text-green-600 mt-1">
                   Video selected ({(videoFile[0].size / (1024 * 1024)).toFixed(2)} MB)
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
                <button
                  type="button"
                  className="btn-light bg-[#A6E5E35C] text-[#093332] font-semibold px-6 py-2 cursor-pointer sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-primary bg-[#176D69] text-[#FFFFFF] font-semibold px-4 py-2 cursor-pointer sm:w-auto"
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
                  type="button"
                  className="text-[#093332] cursor-pointer"
                  onClick={() => remove(index)}
                >
                  ✕
                </button>
              </div>
              <input
                type="file"
                {...register(`curriculum.${index}.attachment`)}
                accept=".pdf,.doc,.docx,.ppt,.pptx,.zip"
                className="input w-full border border-[#176D69] text-[#176D69] p-10 text-sm sm:text-base mt-5"
                placeholder="Attach File here..."
              />
              {attachmentFile && attachmentFile.length > 0 && (
                <p className="text-xs text-green-600 mt-2">
                  ✓ {attachmentFile[0].name}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
                <button
                  type="button"
                  className="btn-light bg-[#A6E5E35C] text-[#093332] font-semibold px-6 py-2 cursor-pointer sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-primary bg-[#176D69] text-[#FFFFFF] font-semibold px-4 py-2 cursor-pointer sm:w-auto"
                >
                  Attach File
                </button>
              </div>
            </div>

            {/* ===== Caption ===== */}
            <div>
              <div className="flex justify-between mb-2 border border-b-gray-300 pb-2">
                <h4 className="font-medium text-[#093332]">
                  Add Lecture Caption
                </h4>
                <button
                  type="button"
                  className="text-[#093332] cursor-pointer"
                  onClick={() => remove(index)}
                >
                  ✕
                </button>
              </div>
              <p className="font-light text-[#093332] mt-3">Caption</p>
              <input
                {...register(`curriculum.${index}.caption`)}
                placeholder="Write your lecture caption here..."
                className="input w-full border border-[#176D69] text-[#176D69] p-2 mt-1 text-sm sm:text-base"
              />
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
                <button
                  type="button"
                  className="btn-light bg-[#A6E5E35C] text-[#093332] font-semibold px-6 py-2 cursor-pointer sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-primary bg-[#176D69] text-[#FFFFFF] font-semibold px-4 py-2 cursor-pointer sm:w-auto"
                >
                  Save Caption
                </button>
              </div>
            </div>

            {/* ===== Description ===== */}
            <div>
              <div className="flex justify-between mb-2 border border-b-gray-300 pb-2">
                <h4 className="font-medium text-[#093332]">
                  Add Lecture Description
                </h4>
                <button
                  type="button"
                  className="text-[#093332] cursor-pointer"
                  onClick={() => remove(index)}
                >
                  ✕
                </button>
              </div>
              <textarea
                {...register(`curriculum.${index}.description`)}
                className="textarea w-full border border-[#176D69] text-[#176D69] text-sm sm:text-base p-2 mt-5"
                rows={4}
                placeholder="Write your lecture description here..."
              />
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
                <button
                  type="button"
                  className="btn-light bg-[#A6E5E35C] text-[#093332] font-semibold px-6 py-2 cursor-pointer sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-primary bg-[#176D69] text-[#FFFFFF] font-semibold px-4 py-2 cursor-pointer sm:w-auto"
                >
                  Save Description
                </button>
              </div>
            </div>

            {/* ===== Notes ===== */}
            <div>
              <div className="flex justify-between mb-2 border border-b-gray-300 pb-2">
                <h4 className="font-medium text-[#093332]">Add Lecture Notes</h4>
                <button
                  type="button"
                  className="text-[#093332] cursor-pointer"
                  onClick={() => remove(index)}
                >
                  ✕
                </button>
              </div>

              <p className="font-light text-[#093332] mt-3">Notes</p>
              <textarea
                {...register(`curriculum.${index}.notes`)}
                className="textarea w-full border border-[#176D69] text-[#176D69] text-sm sm:text-base p-2"
                rows={4}
                placeholder="Add lecture notes here..."
              />
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
                <button
                  type="button"
                  className="btn-light bg-[#A6E5E35C] text-[#093332] font-semibold px-6 py-2 cursor-pointer sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-primary bg-[#176D69] text-[#FFFFFF] font-semibold px-4 py-2 cursor-pointer sm:w-auto"
                >
                  Add Notes
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {/* Add Another Section Button */}
      {fields.length > 0 && (
        <button
          type="button"
          onClick={addNewSection}
          className="w-full border border-[#176D69] text-[#176D69] py-4  font-semibold hover:bg-[#A6E5E35C] transition"
        >
          + Add New Section
        </button>
      )}
    </div>
  );
}

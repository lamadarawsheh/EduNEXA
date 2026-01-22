import { useFieldArray } from "react-hook-form";
import { useState } from "react";

export default function PublishCourse({ register, control }) {
  const [search, setSearch] = useState("");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "publish.instructors",
  });

  const addInstructor = () => {
    if (!search.trim()) return;

    append({
      username: search,
      role: "UI/UX Designer",
    });

    setSearch("");
  };

  return (
    <div className="space-10">
      {/* ===== Messages ===== */}
      <div>
        <h4 className="font-medium mb-4 text-[#093332]">Message</h4>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <p className="text-[#093332]">Welcome Message</p>
            <textarea
              {...register("publish.welcomeMessage")}
              placeholder="Enter course starting message here..."
              className="textarea w-full border border-[#176D69] text-[#176D69] p-2 mt-1"
              rows={4}
            />
          </div>
          <div>
            <p className="text-[#093332]">Congratulations Message</p>
            <textarea
              {...register("publish.congratsMessage")}
              placeholder="Enter your course completed message here..."
              className="textarea w-full border border-[#176D69] text-[#176D69] p-2 mt-1"
              rows={4}
            />
          </div>
        </div>
      </div>

      {/* ===== Add Instructor ===== */}
      <div>
        <h4 className="font-medium mb-4 text-[#093332]">
          Add Instructor ({fields.length})
        </h4>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Search */}
          <div className="flex gap-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by username"
              className="input w-full border border-[#176D69] text-[#176D69] p-2 mt-1"
            />
            <button
              type="button"
              onClick={addInstructor}
              className="btn-primary"
            >
              Add
            </button>
          </div>

          {/* Selected instructors */}
          <div className="flex flex-wrap gap-3">
            {fields.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center gap-3 bg-[#E6F4F3] px-4 py-3 rounded-lg"
              >
                <div className=" bg-[#A6E5E35C] text-[#093332] font-semibold  ">
                  <p className="text-sm font-medium text-[#093332]  ">
                    {/* {item.username} */}
                    user Name
                  </p>
                  <p className="text-xs text-[#093332]">
                    {/* {item.role} */}
                    ux ui
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-[#093332] font-semibold"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

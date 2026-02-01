import { useFieldArray } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddSection, fetchSectionsByCourseId } from "../../../../ReduxToolkit/Slices/CreateNewCourses/SectionSlice";
import { addLecture, fetchLecturesBySectionId } from "../../../../ReduxToolkit/Slices/CreateNewCourses/LectureSlice";

export default function CurriculumStep({ control, register, watch, createdCourseId, showNotification }) {
  const dispatch = useDispatch();
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "curriculum",
  });

  const [sectionIds, setSectionIds] = useState({}); // Map index to section ID from API
  const [loadingStates, setLoadingStates] = useState({});
  const [isSyncing, setIsSyncing] = useState(false);

  // 🔄 Sync from Backend on Mount
  const syncWithBackend = useCallback(async () => {
    if (!createdCourseId) return;

    setIsSyncing(true);
    try {
      console.log("🔄 SYNCING CURRICULUM FROM BACKEND...");
      const sections = await dispatch(fetchSectionsByCourseId(createdCourseId)).unwrap();
      const rawSections = Array.isArray(sections) ? sections : (sections?.data || sections?.$values || []);

      const syncedFields = [];
      const syncedIds = {};

      for (let i = 0; i < rawSections.length; i++) {
        const s = rawSections[i];
        const sId = s.id || s.sectionId || s.$id;

        syncedIds[i] = sId;
        syncedFields.push({
          sectionTitle: s.title || s.name || "",
          sectionDescription: s.description || "",
          video: null, // Files can't be fetched back into input
          caption: "",
          isSynced: true // Flag to show it's already on DB
        });
      }

      if (syncedFields.length > 0) {
        replace(syncedFields);
        setSectionIds(syncedIds);
        console.log("✅ SYNC COMPLETE. Sections found:", syncedFields.length);
      }
    } catch (err) {
      console.error("❌ SYNC FAILED:", err);
    } finally {
      setIsSyncing(false);
    }
  }, [createdCourseId, dispatch, replace]);

  useEffect(() => {
    syncWithBackend();
  }, [syncWithBackend]);

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

  const handleSaveSection = async (index) => {
    const title = watch(`curriculum.${index}.sectionTitle`);
    const description = watch(`curriculum.${index}.sectionDescription`) || "No description provided";
    if (!title) {
      showNotification("Please enter a section title", "warning");
      return;
    }

    console.log("📤 DISPATCHING ADD SECTION...", { createdCourseId, title });

    setLoadingStates(prev => ({ ...prev, [`section-${index}`]: true }));
    try {
      // Exactly matching the Postman example that works
      const sectionData = {
        title: title,
        description: description,
        orderIndex: index + 1,
        courseId: createdCourseId,
        lectures: [],
        quizzes: []
      };

      console.log("🛠️ SAVING SECTION TO DB (FULL PAYLOAD):", sectionData);

      const result = await dispatch(AddSection({
        courseId: createdCourseId,
        sectionData: sectionData
      })).unwrap();

      console.log("⭐ SECTION SAVED SUCCESSFULLY:", result);

      const newId = result.id || result.sectionId || result.$id;
      setSectionIds(prev => ({ ...prev, [index]: newId }));
      showNotification("Section Created Successfully! 🎉 Now you can add lectures.");
    } catch (error) {
      console.error("🔥 SECTION DISPATCH FAILED:", error);
      showNotification("Failed to create section", "error");
    } finally {
      setLoadingStates(prev => ({ ...prev, [`section-${index}`]: false }));
    }
  };

  const handleUploadLecture = async (index) => {
    const sectionId = sectionIds[index];
    if (!sectionId) {
      showNotification("Please save the section first!", "warning");
      return;
    }

    const video = watch(`curriculum.${index}.video`);
    const title = watch(`curriculum.${index}.caption`) || "Lecture " + (index + 1);
    const description = watch(`curriculum.${index}.description`) || "Lecture content description";

    if (!video || !video[0]) {
      showNotification("Please select a video or image file", "warning");
      return;
    }

    // Dynamic type: 0 for video, 1 for anything else (image/doc)
    const mimeType = video[0].type || "";
    const typeValue = mimeType.startsWith("video") ? "video" : "image";

    setLoadingStates(prev => ({ ...prev, [`lecture-${index}`]: true }));
    try {
      await dispatch(addLecture({
        sectionId: sectionId,
        lectureData: {
          video: video,
          title: title,
          description: description,
          type: typeValue, // Slice will convert this to int 0 or 1
          orderIndex: 1
        }
      })).unwrap();
      showNotification("Lecture Uploaded Successfully! 🎥✨");
    } catch (error) {
      console.error("🔥 LECTURE UPLOAD FAILED:", error);
      showNotification("Failed to upload lecture", "error");
    } finally {
      setLoadingStates(prev => ({ ...prev, [`lecture-${index}`]: false }));
    }
  };

  return (
    <div className="space-y-10 relative">
      {/* 🔄 SYNCING INDICATOR */}
      {isSyncing && (
        <div className="bg-[#EBF5F4] p-4 rounded-xl flex items-center justify-center gap-3 animate-pulse border border-[#176D69]/20">
          <div className="w-5 h-5 border-2 border-[#176D69] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#176D69] font-bold text-sm tracking-tight text-center">Syncing Live Curriculum...</p>
        </div>
      )}

      {/* 📚 EMPTY STATE (Show only when not syncing and no fields) */}
      {/* 📚 EMPTY STATE (Show only when not syncing and no fields) */}
      {!isSyncing && fields.length === 0 && (
        <div className="text-center py-12 sm:py-20 bg-[#FBFCFD] border-2 border-dashed border-[#176D69]/20 rounded-[32px] sm:rounded-[40px] flex flex-col items-center px-4">
          <div className="w-16 h-16 sm:w-24 sm:h-24 bg-[#EBF5F4] rounded-full flex items-center justify-center text-3xl sm:text-4xl mb-6">📚</div>
          <h3 className="text-xl sm:text-2xl font-black text-[#093332] mb-2">No sections added yet</h3>
          <p className="text-[#176D69] mb-8 font-medium text-sm sm:text-base">Add Your First Section to start building your course.</p>
          <button
            type="button"
            onClick={addNewSection}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#176D69] text-white px-8 sm:px-10 py-3 sm:py-4 rounded-2xl font-black shadow-xl shadow-[#176D69]/20 hover:scale-105 transition-all active:scale-95 text-sm sm:text-base"
          >
            <span className="text-xl font-bold">+</span> Add Your First Section
          </button>
        </div>
      )}

      {/* 🧩 SECTIONS LIST */}
      <div className="space-y-6">
        {fields.map((item, index) => {
          const videoFile = watch(`curriculum.${index}.video`);
          const sectionId = sectionIds[index];
          const isSectionLoading = loadingStates[`section-${index}`];
          const isLectureLoading = loadingStates[`lecture-${index}`];

          return (
            <div
              key={item.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 border rounded-xl p-4 sm:p-6 transition-all ${sectionId ? 'border-green-200 bg-green-50/20' : 'border-gray-200 shadow-sm'}`}
            >
              {/* ===== Section Name ===== */}
              <div className="bg-white p-4 sm:p-5 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
                  <h4 className="font-bold text-[#093332] text-sm sm:text-base flex items-center gap-2">
                    {sectionId ? <span className="text-green-500">✅ Section Created</span> : "Step 1: Create Section"}
                  </h4>
                  <button
                    type="button"
                    className="text-[#093332] hover:bg-rose-50 p-2 rounded-lg transition-colors cursor-pointer shrink-0"
                    onClick={() => remove(index)}
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold text-[#093332]/60 uppercase tracking-wider mb-1">Section Title</p>
                    <input
                      {...register(`curriculum.${index}.sectionTitle`)}
                      disabled={!!sectionId}
                      placeholder="e.g. Introduction to React"
                      className="w-full border border-[#176D69]/30 focus:border-[#176D69] rounded-xl text-[#093332] p-3 text-sm sm:text-base disabled:opacity-50 transition-all outline-none"
                    />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-[#093332]/60 uppercase tracking-wider mb-1">Description</p>
                    <textarea
                      {...register(`curriculum.${index}.sectionDescription`)}
                      disabled={!!sectionId}
                      placeholder="What will students learn in this section?"
                      className="w-full border border-[#176D69]/30 focus:border-[#176D69] rounded-xl text-[#093332] p-3 text-sm h-24 disabled:opacity-50 transition-all outline-none resize-none"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSaveSection(index)}
                    disabled={!!sectionId || isSectionLoading}
                    className="w-full bg-[#176D69] text-white font-bold py-3 px-4 rounded-xl disabled:bg-gray-200 disabled:text-gray-400 transition-all flex items-center justify-center gap-2"
                  >
                    {isSectionLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (sectionId ? "Section Saved" : "Create Section")}
                  </button>
                </div>
              </div>

              {/* ===== Lecture Video / Resource ===== */}
              <div className={`p-4 sm:p-5 rounded-lg shadow-sm bg-white border border-gray-50 ${!sectionId ? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
                  <h4 className="font-bold text-[#093332] text-sm sm:text-base">Step 2: Add Lecture Resource</h4>
                </div>

                <div className="space-y-5">
                  <div className="relative w-full">
                    <input
                      type="file"
                      {...register(`curriculum.${index}.video`)}
                      accept="video/*,image/*"
                      id={`video-${index}`}
                      className="hidden"
                    />

                    <div className="flex flex-col sm:flex-row items-stretch border border-dashed border-[#176D69]/40 rounded-xl overflow-hidden bg-[#A6E5E30A]">
                      <div className="flex-1 px-4 py-3 text-sm text-gray-400 truncate font-medium">
                        {videoFile && videoFile.length > 0
                          ? `Selected: ${videoFile[0].name}`
                          : "Choose Video or Image..."}
                      </div>
                      <label
                        htmlFor={`video-${index}`}
                        className="px-6 py-3 bg-[#A6E5E35C] text-sm font-black cursor-pointer text-[#093332] hover:bg-[#176D69] hover:text-white transition-all text-center"
                      >
                        Browse
                      </label>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-[#093332]/60 uppercase tracking-wider mb-1">Lecture Title</p>
                    <input
                      {...register(`curriculum.${index}.caption`)}
                      placeholder="e.g. Setting up your environment"
                      className="w-full border border-[#176D69]/30 focus:border-[#176D69] rounded-xl text-[#093332] p-3 text-sm outline-none"
                    />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-[#093332]/60 uppercase tracking-wider mb-1">Lecture Description</p>
                    <textarea
                      {...register(`curriculum.${index}.description`)}
                      placeholder="Describe what students will learn in this lecture..."
                      className="w-full border border-[#176D69]/30 focus:border-[#176D69] rounded-xl text-[#093332] p-3 text-sm outline-none h-20 resize-none"
                    />
                  </div>

                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => handleUploadLecture(index)}
                      disabled={!sectionId || isLectureLoading}
                      className="w-full bg-[#176D69] text-white font-black py-4 rounded-xl shadow-lg shadow-[#176D69]/10 disabled:bg-gray-100 disabled:text-gray-300 transition-all flex items-center justify-center gap-3"
                    >
                      {isLectureLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Uploading...</span>
                        </>
                      ) : "Upload Final Resource"}
                    </button>

                    {!sectionId && (
                      <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 rounded-lg border border-amber-100">
                        <span className="text-sm">💡</span>
                        <p className="text-[10px] text-amber-700 font-bold uppercase">Save Section to Enable Resource Upload</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Add Another Section Button */}
        {fields.length > 0 && (
          <button
            type="button"
            disabled={!createdCourseId}
            onClick={addNewSection}
            className="w-full border-2 border-dashed border-[#176D69]/40 text-[#176D69] py-5 rounded-2xl font-black hover:bg-[#176D69]/5 hover:border-[#176D69] transition-all flex items-center justify-center gap-2 disabled:opacity-30"
          >
            <span className="text-2xl">+</span> Add Another Section
          </button>
        )}
      </div>
    </div>
  );
}

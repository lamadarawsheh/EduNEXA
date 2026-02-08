import { useForm } from "react-hook-form";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import StepNavbar from "./stepNavbar";
import BasicInfo from "./basicInfo";
import AdvanceInfo from "./advancedInfo/advancedInfo";
import Curriculum from "./curriculum/curriculum";
import PublishCourse from "./publishCourse";
import { useDispatch, useSelector } from "react-redux";
import { addCourse, fetchCoursePreview, fetchAllCourses, publishCourse, resetCreatedCourseId } from '../../../ReduxToolkit/Slices/CreateNewCourses/CourseSlice'
import { fetchAllCategories } from "../../../ReduxToolkit/Slices/CreateNewCourses/CategorySlice";
import { fetchAllSubCategories } from '../../../ReduxToolkit/Slices/CreateNewCourses/SubCategorySlice'

const STEPS = [
  "Basic Information",
  "Advance Information",
  "Curriculum",
  "Publish Course",
];

export default function CourseForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editingId = searchParams.get("id");

  const [step, setStep] = useState(0);
  const isLastStep = step === STEPS.length - 1;

  const categoryState = useSelector((state) => state.category);
  const subCategoryState = useSelector((state) => state.subCategory);

  const categories = useMemo(() => {
    const rawData = categoryState?.categories;
    const arrayData = Array.isArray(rawData) ? rawData : (rawData?.data || rawData?.$values || []);
    return arrayData.map(cat => ({
      ...cat,
      id: cat.id || cat.Id || cat.ID || cat.categoryId || cat.$id
    }));
  }, [categoryState]);

  const allSubcategories = useMemo(() => {
    let rawData = subCategoryState?.subcategories;
    let subs = Array.isArray(rawData) ? rawData : (rawData?.data || rawData?.$values || []);

    let normalizedSubs = [];

    const findValidId = (s) => {
      if (s.subCategoryID && s.subCategoryID !== s.name) return s.subCategoryID;
      if (s.subCategoryId && s.subCategoryId !== s.name) return s.subCategoryId;
      if (s.id && s.id !== s.name) return s.id;
      if (s.Id && s.Id !== s.name) return s.Id;
      if (s.ID && s.ID !== s.name) return s.ID;
      return s.subCategoryID || s.subCategoryId || s.id || s.Id || s.ID || s.$id;
    };

    if (subs.length > 0) {
      normalizedSubs = subs.map(s => ({
        ...s,
        id: findValidId(s)
      }));
    }

    if (categories.length > 0) {
      categories.forEach(cat => {
        const catSubs = cat.subCategories || cat.SubCategories || cat.$values || cat.subcategories;
        if (Array.isArray(catSubs)) {
          catSubs.forEach(s => {
            const subId = findValidId(s);
            if (!normalizedSubs.find(ns => String(ns.id) === String(subId))) {
              normalizedSubs.push({
                ...s,
                id: subId,
                categoryId: cat.id || cat.Id || cat.ID || cat.categoryId
              });
            }
          });
        }
      });
    }
    return normalizedSubs;
  }, [subCategoryState, categories]);

  const { error: courseError, successMessage, createdCourseId, loading: courseLoading } = useSelector((state) => state.Course)
  const categoryLoading = categoryState?.loading;
  const subCategoryLoading = subCategoryState?.loading;

  const [showCreatedModal, setShowCreatedModal] = useState(false);
  const [showFinishedModal, setShowFinishedModal] = useState(false);
  const [errorModal, setErrorModal] = useState(null);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    getValues,
    setValue,
    reset,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      title: "",
      subtitle: "",
      category: "",
      subCategory: "",
      topic: "",
      language: "",
      price: "",
      level: "",
      duration: "",
      thumbnail: null,
      trailer: null,
      description: "",
      learnItems: [{ value: "" }],
      audience: [{ value: "" }],
      requirements: [{ value: "" }],
      curriculum: [],
      publish: {
        welcomeMessage: "",
        congratsMessage: "",
        instructors: [],
      },
    },
  });

  const selectedCategory = watch("category");
  const filteredSubcategories = useMemo(() => {
    if (!selectedCategory || !allSubcategories.length) return [];
    return allSubcategories.filter(subCat => {
      const catId = subCat.categoryId || subCat.categoryID || subCat.CategoryId;
      return String(catId) === String(selectedCategory);
    });
  }, [selectedCategory, allSubcategories]);

  useEffect(() => {
    dispatch(fetchAllCourses())
    dispatch(fetchAllCategories());
    dispatch(fetchAllSubCategories())
    if (editingId) setStep(2);
  }, [dispatch, editingId]);

  useEffect(() => {
    const draft = localStorage.getItem("courseDraft");
    if (draft) {
      try { reset(JSON.parse(draft)); } catch (e) { }
    }
  }, [reset]);

  const handleBack = () => {
    if (editingId && step === 2) {
      showNotification("You cannot go back to edit basic info in this mode.", "warning");
      return;
    }
    if (step > 0) setStep(step - 1);
  };

  const handleNext = async () => {
    const values = getValues();

    // Step 0: Basic Info
    if (step === 0) {
      if (!values.title || !values.category || !values.subCategory || !values.language) {
        showNotification("Please fill in all basic course details.", "warning");
        return;
      }
      setStep(editingId ? 2 : 1);
      return;
    }

    // Step 1: Advance Info
    if (step === 1) {
      // In Edit Mode, browsers don't pre-fill File inputs.
      // We only require files for NEW courses (!editingId).
      const isMediaMissing = !values.thumbnail?.[0] || !values.trailer?.[0];

      if (!values.description || (!editingId && isMediaMissing)) {
        const message = editingId ? "Description is required." : "Description and both media files are required.";
        showNotification(message, "warning");
        return;
      }

      if (!createdCourseId && !editingId) {
        try {
          console.log("🛠️ INITIATING COURSE CREATION...");
          const result = await dispatch(addCourse(values)).unwrap();
          console.log("✅ COURSE CREATED SUCCESSFULLY. SHOWING MODAL.");
          setShowCreatedModal(true);
        } catch (error) {
          console.error("❌ COURSE CREATION FAILED:", error);
          setErrorModal({
            title: "Creation Failed",
            message: error.errors ? Object.entries(error.errors).map(([f, m]) => `${f}: ${m.join(', ')}`).join('\n') : (error.title || error)
          });
        }
      } else {
        setStep(2);
      }
      return;
    }

    // Step 2: Curriculum Lab
    if (step === 2) {
      console.log("⏭️ MOVING TO PUBLISH FINALE...");
      setStep(3);
      return;
    }

    // Default increment
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    }
  };

  const onSubmit = async (data) => {
    // 🛑 STRICT GUARD: Only allow submission on the final step
    if (step !== 3) {
      console.log("⚠️ IGNORED SUBMISSION ATTEMPT ON STEP:", step);
      return;
    }

    try {
      const targetId = editingId || createdCourseId;
      if (!targetId) {
        showNotification("Identity missing. Return to earlier steps.", "warning");
        return;
      }

      console.log("🚀 FINAL SUBMISSION INITIATED FOR COURSE:", targetId);
      await dispatch(publishCourse({ courseId: targetId, publishData: data.publish })).unwrap();

      setShowFinishedModal(true);

      if (!editingId) {
        reset();
        localStorage.removeItem("courseDraft");
        dispatch(resetCreatedCourseId());
      }
    } catch (error) {
      console.error("🔥 PUBLISH FAILED:", error);
      showNotification("Failed to publish results to cloud.", "error");
    }
  };

  // Prevent "Enter" key from submitting the form unexpectedly
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
      e.preventDefault();
    }
  };

  return (
    <div className="p-3 sm:p-6 lg:p-10 bg-[#FBFCFD] relative min-h-screen">
      {courseLoading && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-md z-[200] flex flex-col items-center justify-center">
          <div className="w-20 h-20 border-4 border-t-[#176D69] border-[#EBF5F4] rounded-full animate-spin"></div>
          <h2 className="text-[#093332] font-black mt-8 text-xl">EduNexa Engine <span className="text-[#176D69]">Working...</span></h2>
        </div>
      )}

      {showCreatedModal && (
        <div className="fixed inset-0 bg-[#093332]/60 backdrop-blur-xl z-[210] flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] sm:rounded-[40px] p-6 sm:p-12 max-w-xl w-full text-center shadow-2xl">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#EBF5F4] rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl sm:text-4xl">🚀</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-[#093332] mb-4">Course Created! ✨</h3>
            <p className="text-[#176D69] font-medium mb-8 text-base sm:text-lg">Your course shell is ready. Now you can build out your curriculum with sections and lectures.</p>
            <button
              onClick={() => { setShowCreatedModal(false); setStep(2); }}
              className="w-full bg-[#176D69] text-white font-black py-4 sm:py-5 rounded-2xl shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Start Building Curriculum
            </button>
          </div>
        </div>
      )}

      {showFinishedModal && (
        <div className="fixed inset-0 bg-[#093332]/80 backdrop-blur-2xl z-[250] flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] sm:rounded-[48px] p-6 sm:p-10 max-w-lg w-full text-center shadow-2xl scale-in-center">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-[#EBF5F4] rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl sm:text-5xl">✅</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#093332] mb-3">Changes Saved!</h3>
            <p className="text-[#176D69] font-medium mb-8 text-sm sm:text-base">Your curriculum updates have been synced successfully with the EduNexa cloud.</p>
            <button
              onClick={() => navigate("/teacher/mycourses")}
              className="w-full bg-[#176D69] text-white font-black py-4 sm:py-5 rounded-2xl shadow-lg shadow-[#176D69]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Return to My Courses
            </button>
          </div>
        </div>
      )}

      {errorModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[220] flex items-center justify-center p-4 transition-opacity">
          <div className="bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 max-w-lg w-full shadow-2xl">
            <h3 className="text-xl sm:text-2xl font-black text-[#093332] mb-3">{errorModal.title}</h3>
            <p className="text-xs sm:text-sm bg-rose-50 p-4 rounded-xl text-rose-900 whitespace-pre-line mb-6 border border-rose-100">{errorModal.message}</p>
            <button onClick={() => setErrorModal(null)} className="w-full bg-[#176D69] text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-[#093332] transition-colors">Return</button>
          </div>
        </div>
      )}

      {notification && (
        <div className={`fixed bottom-4 left-4 right-4 sm:top-10 sm:right-10 sm:left-auto sm:bottom-auto z-[300] p-4 rounded-xl shadow-2xl text-white transform transition-all duration-300 animate-slide-in ${notification.type === 'error' ? 'bg-rose-600' : notification.type === 'warning' ? 'bg-amber-500' : 'bg-[#176D69]'}`}>
          <p className="font-bold text-sm sm:text-base flex items-center gap-2">
            {notification.type === 'error' ? '❌' : notification.type === 'warning' ? '⚠️' : '✅'}
            {notification.message}
          </p>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {editingId && (
          <div className="mb-6 bg-[#176D69]/5 border border-[#176D69]/20 p-6 rounded-3xl flex items-center justify-between shadow-sm">
            <div>
              <h2 className="text-[#093332] font-black text-xl">Curriculum Content Lab</h2>
              <p className="text-[#176D69] text-sm font-medium">Add sections and lectures to perfect your course structure.</p>
            </div>
            <span className="bg-[#176D69] text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-tighter">Edit & Build Only</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
          <StepNavbar step={step} setStep={setStep} isEditing={!!editingId} />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8 pb-4 border-b">
            <h2 className="text-xl sm:text-2xl font-black text-[#093332]">{STEPS[step]}</h2>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => showNotification("Preview mode is currently in development. ✨", "warning")}
                className="w-full sm:w-auto bg-[#EBF5F4] text-[#176D69] px-4 sm:px-6 py-2 rounded-xl font-bold text-sm sm:text-base border border-[#176D69]/10 hover:bg-[#176D69]/5 transition-all"
              >
                Preview
              </button>
              <button type="button" onClick={() => { localStorage.setItem("courseDraft", JSON.stringify(getValues())); showNotification("Draft Saved!"); }} className="w-full sm:w-auto bg-[#EBF5F4] text-[#176D69] px-4 sm:px-6 py-2 rounded-xl font-bold text-sm sm:text-base">Save Draft</button>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-8 rounded-[24px] sm:rounded-[32px] shadow-sm border border-gray-100 min-h-[400px] sm:min-h-[500px]">
            {step === 0 && <BasicInfo register={register} watch={watch} errors={errors} categories={categories} subcategories={filteredSubcategories} categoryLoading={categoryLoading} subCategoryLoading={subCategoryLoading} />}
            {step === 1 && <AdvanceInfo register={register} control={control} watch={watch} />}
            {step === 2 && <Curriculum register={register} control={control} watch={watch} createdCourseId={editingId || createdCourseId} showNotification={showNotification} />}
            {step === 3 && <PublishCourse register={register} control={control} setStep={setStep} watch={watch} isEditing={!!editingId} />}
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-10">
            {step > 0 && (
              <button type="button" onClick={handleBack} className="w-full sm:w-auto border-2 border-[#1E6B65] text-[#1E6B65] font-black px-6 sm:px-10 py-3 sm:py-4 rounded-2xl hover:bg-[#EBF5F4] transition-all text-sm sm:text-base">Back</button>
            )}
            {!isLastStep ? (
              <button
                key="next-btn"
                type="button"
                onClick={handleNext}
                className="w-full sm:w-auto bg-[#1E6B65] text-white font-black px-6 sm:px-10 py-3 sm:py-4 rounded-2xl hover:bg-[#154d4a] transition-all sm:ml-auto text-sm sm:text-base"
              >
                Next Step
              </button>
            ) : (
              <button
                key="submit-btn"
                type="submit"
                disabled={courseLoading}
                className="w-full sm:w-auto bg-[#1E6B65] text-white font-black px-6 sm:px-10 py-3 sm:py-4 rounded-2xl hover:bg-[#154d4a] transition-all sm:ml-auto text-sm sm:text-base disabled:opacity-50"
              >
                {editingId ? "Save & Exit Lab" : "Submit Course"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

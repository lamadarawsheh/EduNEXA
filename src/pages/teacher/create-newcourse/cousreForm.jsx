import { useForm } from "react-hook-form";
import { useState,useEffect } from "react";
import StepNavbar from "./StepNavbar";
import BasicInfo from "./basicInfo";
import AdvanceInfo from "./advancedInfo/advancedInfo";
import Curriculum from "./curriculum/curriculum";
import PublishCourse from "./publishCourse";
import { useDispatch,useSelector } from "react-redux";
import{addCourse,fetchCoursePreview,fetchAllCourses} from '../../../ReduxToolkit/Slices/CreateNewCourses/CourseSlice'
import { fetchAllCategories,fetchCoursesByCategory, } from "../../../ReduxToolkit/Slices/CreateNewCourses/CategorySlice";
import {fetchAllSubCategories} from '../../../ReduxToolkit/Slices/CreateNewCourses/SubCategorySlice'
import { useMemo } from "react";


const STEPS = [
  "Basic Information",
  "Advance Information",
  "Curriculum",
  "Publish Course",
];

export default function CourseForm() {
    const dispatch = useDispatch();

  const [step, setStep] = useState(0);
  const isLastStep = step === STEPS.length - 1;

  const{categories  ,loading:categoryLoading,CoursesByCategory}= useSelector((state)=>state.category)             
  const {subcategories:allSubcategories , loading:subCategoryLoading}= useSelector((state)=>state.subCategory)
  const {error:courseError,successMessage}=useSelector((state)=>state.Course)
  
  
  const {  
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    getValues,
    setValue,
    reset
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
    }
  });

    const selectedCategory = watch("category");
    const filteredSubcategories = useMemo(() => {
    if (!selectedCategory || !allSubcategories) return [];
    
    return allSubcategories.filter(
      (subCat) => subCat.categoryId === selectedCategory
    );
  }, [selectedCategory, allSubcategories]);

   // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchAllCourses())
    dispatch(fetchAllCategories());
    dispatch(fetchAllSubCategories())
  }, [dispatch]);


  // Fetch subcategories when category changes
  useEffect(() => {
    if (selectedCategory) {
      dispatch(fetchCoursesByCategory(selectedCategory));
    } 
  }, [selectedCategory, dispatch]);

  // Load draft from localStorage
  useEffect(() => {
    const draft = localStorage.getItem("courseDraft");
    if (draft) {
      try {
        const parsedDraft = JSON.parse(draft);
        reset(parsedDraft);
      } catch (error) {
        console.error("Failed to load draft:", error);
      }
    }
  }, [reset]);
  
  // Clear subcategory when category changes
  useEffect(() => {
    if (selectedCategory) {
      // Clear subcategory field when category changes
      const currentSubCategory = watch("subCategory");
      const isValidSubCategory = filteredSubcategories.some(
        (sub) => sub.id === currentSubCategory
      );
      
      if (!isValidSubCategory) {
        setValue("subCategory", "");
      }
    } else {
      setValue("subCategory", "");
    }
  }, [selectedCategory, filteredSubcategories, setValue, watch])
 
  // Show success message
  useEffect(() => {
    if (successMessage) {
      alert(successMessage);
      localStorage.removeItem("courseDraft");
      reset();
    }
  }, [successMessage, reset]);

// Show error message
  useEffect(() => {
    if (courseError) {
      alert(`Error: ${JSON.stringify(courseError)}`);
    }
  }, [courseError])

  // Handle Save (Draft)
  const handleSave = () => {
    const formData = getValues();
    localStorage.setItem("courseDraft", JSON.stringify(formData));
    alert("Course saved locally (draft) ✅");
  };


  // Handle Save & Preview
  const handleSaveAndPreview = async () => {
    const formData = getValues();
      localStorage.setItem("courseDraft", JSON.stringify(formData));
    try {
    const result = await dispatch(fetchCoursePreview(formData)).unwrap();
      // Fetch preview
      if (result?.id) {
        await dispatch(fetchCoursePreview(result.id)).unwrap();
        window.open(`/course-preview/${result.id}`, '_blank');
      }
    } catch (error) {
      console.error("Failed to save and preview:", error);
      alert("Failed to save and preview course. Please try again.");
    }
  };
 
  // Handle Final Submit
  const onSubmit = async (data) => {
    try {
      const result = await dispatch(addCourse(data)).unwrap();
      console.log("Course submitted for review:", result);
      alert("Course submitted for review successfully!");
    } catch (error) {
      console.error("Failed to submit course:", error);
      alert("Failed to submit course. Please try again.");
    }
  };

  //  const isLoading = categoryLoading || subcategoryLoading || courseLoading;

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
            onClick={handleSave}
              type="button"
              className=" bg-[#A6E5E35C] text-[#093332] font-semibold px-6 py-2 cursor-pointer"
            >
              Save
            </button>
            <button
            onClick={handleSaveAndPreview}
              type="button"
              className="btn-light text-[#093332] font-semibold  cursor-pointer "
            >
              Save & Preview
            </button>
          </div>
        </div>

        {/* 🔹 STEP CONTENT */}
        {step === 0 && (
          <BasicInfo register={register} 
          watch={watch} errors={errors}
          categories={categories}
          subcategories={filteredSubcategories}
          categoryLoading={categoryLoading}
       subcategoryLoading={subCategoryLoading}
  
          />
        )}
        {step === 1 && <AdvanceInfo register={register} control={control} watch={watch}/>}
        {step === 2 && <Curriculum register={register} control={control} watch={watch} />}
        {step === 3 && (
          <PublishCourse
            register={register}
            control={control}
            setStep={setStep}
            watch={watch}
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
              className="btn-primary text-[#FFFFFF] bg-[#176D69] font-semibold  px-6 py-2
      sm:px-6 sm:py-2
      w-full sm:w-auto
      cursor-pointer
      sm:ml-2"
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

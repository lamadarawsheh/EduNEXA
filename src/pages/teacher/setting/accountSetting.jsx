import { useFormContext } from "react-hook-form";
import image from "./images/Rectangle.svg";
import { useSelector, useDispatch } from "react-redux";
import { UpdateInstructorProfile } from "../../../ReduxToolkit/Slices/TeacherSettingSlice";

export default function AccountSettings() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.teacherSetting);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("username", data.username);
    formData.append("phone", data.phone);
    formData.append("title", data.title);
    formData.append("bio", data.bio);

    dispatch(UpdateInstructorProfile(formData));
  };
  return (
    <>
      <h2 className="text-[#093332] font-semibold mb-8">Account Settings</h2>
      {/* //error and loading addCase */}
      {loading && <p className="text-blue-600">Saving changes...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="col-span-8 md:order-1 order-2">
            <label className="text-[#093332] font-medium "> Full Name</label>
            <div className="row flex gap-4 w-full mt-4 mb-4">
              <input
                {...register("firstName")}
                placeholder="First name"
                className=" text-[#176D69] w-full p-2 border border-[#176D69]"
              />
              <input
                {...register("lastName")}
                placeholder="Last name"
                className=" text-[#176D69] w-full p-2 border border-[#176D69]"
              />
            </div>

            {/* Username */}
            <label className="text-[#093332] font-medium "> User Name</label>
            <input
              {...register("username", { required: "Username is required" })}
              placeholder="Enter your username"
              className=" text-[#176D69] w-full p-2 border border-[#176D69] mb-4 mt-2"
            />
            {errors.username && (
              <p className="error">{errors.username.message}</p>
            )}
          </div>
          <div className="border border-8-[#F5F7FA] col-span-4 md:order-2 order-1">
            <img src={image} alt="Profile Picture" className="object-cover" />
          </div>
        </div>
        {/* Phone */}
        <label className="text-[#093332] font-medium "> Phone Number</label>
        <input
          {...register("phone")}
          placeholder="+880 Your phone number"
          className=" text-[#176D69] w-full p-2 border border-[#176D69] mb-4 mt-2"
        />

        {/* Title */}
        <div className="field">
          <label className="text-[#093332] font-medium "> Title</label>
          <input
            {...register("title", { maxLength: 50 })}
            placeholder="Your title, profession or small biography"
            className=" text-[#176D69] w-full p-2 border border-[#176D69] mb-4 mt-2"
          />
          {/* <small>{titleValue.length}/50</small> */}
        </div>

        {/* Bio */}
        <label className="text-[#093332] font-medium "> Biography</label>
        <textarea
          {...register("bio")}
          placeholder="Your title, profession or small biography"
          className=" text-[#176D69] w-full p-2 border border-[#176D69] mb-4 mt-2"
        />

        <button type="submit"> {loading ? "Saving..." : "Save Changes"}</button>
      </form>
    </>
  );
}

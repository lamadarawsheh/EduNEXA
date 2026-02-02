import { useFormContext } from "react-hook-form";
import image from "./images/Rectangle.svg";

export default function AccountSettings() {
 

  const {
    register,
    formState: { errors },
    watch
  } = useFormContext();
   const profileImage = watch("profileImage");
  
  return (
    <>
      <h2 className="text-[#093332] font-semibold mb-8 text-2xl">Account Settings</h2>
   
        {/* Name */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="col-span-8 md:order-1 order-2">
            <label className="text-[#093332] font-medium "> Full Name</label>
            <div className="row flex gap-4 w-full mt-4 mb-4">
              <input
                {...register("firstName")}
                placeholder="First name"
                className=" text-[#176D69] w-full p-2 border border-[#176D69] rounded-2xl"
              />
              <input
                {...register("lastName")}
                placeholder="Last name"
                className=" text-[#176D69] w-full p-2 border border-[#176D69] rounded-2xl"
              />
            </div>

            {/* Username */}
            <label className="text-[#093332] font-medium "> User Name</label>
            <input
              {...register("username", { required: "Username is required" })}
              placeholder="Enter your username"
              className=" text-[#176D69] w-full p-2 border border-[#176D69] mb-4 mt-2 rounded-2xl"
            />
            {errors.username && (
              <p className="error">{errors.username.message}</p>
            )}
          </div>
          <div className="border border-8-[#F5F7FA] col-span-4 md:order-2 order-1">
            <img src={profileImage||image} 
            alt="Profile Picture" className="object-cover" />
          </div>
        </div>
        {/* Phone */}
        <label className="text-[#093332] font-medium "> Phone Number</label>
        <input
          {...register("phone")}
          placeholder="+880 Your phone number"
          className=" text-[#176D69] w-full p-2 border border-[#176D69] mb-4 mt-2 rounded-2xl"
        />

        {/* Title */}
        <div className="field">
          <label className="text-[#093332] font-medium "> Title</label>
          <input
            {...register("title", { maxLength: 50 })}
            placeholder="Your title, profession or small biography"
            className=" text-[#176D69] w-full p-2 border border-[#176D69] mb-4 mt-2 rounded-2xl"
          />
          {/* <small>{titleValue.length}/50</small> */}
        </div>

        {/* Bio */}
        <label className="text-[#093332] font-medium "> Biography</label>
        <textarea
          {...register("bio")}
          placeholder="Your title, profession or small biography"
          className=" text-[#176D69] w-full p-2 border border-[#176D69] mb-4 mt-2 rounded-2xl"
        />

    </>
  );
}

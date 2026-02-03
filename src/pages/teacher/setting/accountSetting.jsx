import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { User } from "lucide-react";

export default function AccountSettings() {

  const apiRoot = '/proxy';

  const {
    register,
    formState: { errors },
    watch
  } = useFormContext();
  const profileImage = watch("profileImage");
  const reduxProfileImage = useSelector((state) => state.teacherSetting.profileImage);

  // Resolve relative URLs to full URLs
  const resolveImageUrl = (value) => {
    if (!value || typeof value !== 'string') return '';
    const trimmed = value.trim();
    if (!trimmed) return '';
    if (!trimmed) return null; // Changed from '' to null
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('blob:')) {
      return trimmed;
    }
    return `${apiRoot}/${trimmed.replace(/^\//, '')}`;
  };

  // Use form value if available, otherwise use Redux state
  const rawImage = profileImage || reduxProfileImage;
  const finalizedImageUrl = resolveImageUrl(rawImage); // Renamed and simplified

  // Removed console.logs as they are no longer relevant to the new logic
  // console.log("AccountSettings - profileImage from watch:", profileImage);
  // console.log("AccountSettings - profileImage from Redux:", reduxProfileImage);
  // console.log("AccountSettings - resolved URL:", finalizedImageUrl);

  return (
    <>
      <h2 className="text-[#093332] font-semibold mb-8 text-2xl">Account Settings</h2>

      {/* Name and Profile Image Container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="col-span-12 md:col-span-8 order-2 md:order-1">
          <label className="text-[#093332] font-medium block"> Full Name</label>
          <div className="flex gap-4 w-full mt-2 mb-6">
            <input
              {...register("firstName")}
              placeholder="First name"
              className="text-[#176D69] w-full p-3 border border-[#176D69]/30 focus:border-[#176D69] outline-none rounded-xl transition-all"
            />
            <input
              {...register("lastName")}
              placeholder="Last name"
              className="text-[#176D69] w-full p-3 border border-[#176D69]/30 focus:border-[#176D69] outline-none rounded-xl transition-all"
            />
          </div>

          {/* Username */}
          <label className="text-[#093332] font-medium block"> User Name</label>
          <input
            {...register("username", { required: "Username is required" })}
            placeholder="Enter your username"
            className="text-[#176D69] w-full p-3 border border-[#176D69]/30 focus:border-[#176D69] outline-none rounded-xl mb-6 mt-2 transition-all"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
          )}
        </div>

        {/* Profile Image Column */}
        <div className="col-span-12 md:col-span-4 order-1 md:order-2 flex justify-center md:justify-center">
          <div className="relative group">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#F5F7FA] shadow-md overflow-hidden bg-gray-100 flex items-center justify-center">
              {finalizedImageUrl ? (
                <img
                  src={finalizedImageUrl}
                  alt="Profile"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#176D69]/10 text-[#176D69]">
                  <User size={64} strokeWidth={1.5} />
                </div>
              )}
            </div>
            {/* Optional: Add a subtle 'Change' overlay indicator if desired later */}
          </div>
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

import { useFormContext } from "react-hook-form";
import glope from "./images/globe.svg";
import face from "./images/Social (1).svg";
import linkedin from "./images/Linkedin.svg";
import twitter from "./images/Social (2).svg";
import whats from "./images/Social (3).svg";
import youtube from "./images/Social (4).svg";
import insta from "./images/Social.svg";
import { useSelector, useDispatch } from "react-redux";
import { UpdateInstructorProfile } from "../../../ReduxToolkit/Slices/TeacherSettingSlice";

export default function SocialSettings() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.teacherSetting);

  const { register, handleSubmit } = useFormContext();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("website", data.website);
    formData.append("facebook", data.facebook);
    formData.append("instagram", data.instagram);
    formData.append("linkedin", data.linkedin);
    formData.append("twitter", data.twitter);
    formData.append("whatsapp", data.whatsapp);
    formData.append("youtube", data.youtube);
    dispatch(UpdateInstructorProfile(formData));
  };

  return (
    <>
      <h2 className="text-[#093332] font-bold mb-8 text-2xl">Social Profile</h2>

      {/* //error and loading addCase */}
      {loading && <p className="text-blue-600">Saving changes...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="card">
        <label className="text-[#093332] font-medium "> Personal Website</label>
        <div className="relative w-full flex items-center">
          <img
            src={glope}
            alt="globe icon"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 mr-4 "
          />
          <input
            {...register("website")}
            placeholder="Personal website or portfolio url"
            className=" text-[#176D69] w-full p-2 pl-10 border border-[#176D69] mb-4 mt-2"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div className="w-full">
            <label className="text-[#093332] font-medium "> Facebook</label>
            <div className="relative w-full flex items-center">
              <img
                src={face}
                alt="facebook icon"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 mr-4 "
              />
              <input
                {...register("facebook")}
                placeholder="Facebook username"
                className=" text-[#176D69] w-full  p-2 pl-10 border border-[#176D69] mb-4 mt-2"
              />
            </div>
          </div>
          <div className="w-full">
            <label className="text-[#093332] font-medium "> Instagram</label>
            <div className="relative w-full flex items-center">
              <img
                src={insta}
                alt="instagram icon"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 mr-4 "
              />
              <input
                {...register("instagram")}
                placeholder="Instagram username"
                className=" text-[#176D69] w-full p-2 pl-10 border border-[#176D69] mb-4 mt-2"
              />
            </div>
          </div>
          <div className="w-full">
            <label className="text-[#093332] font-medium "> LinkedIn</label>
            <div className="relative w-full flex items-center">
              <img
                src={linkedin}
                alt="linkedin icon"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 mr-4 "
              />
              <input
                {...register("linkedin")}
                placeholder="LinkedIn username"
                className=" text-[#176D69] w-full p-2 pl-10 border border-[#176D69] mb-4 mt-2"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div className="w-full">
            <label className="text-[#093332] font-medium "> Twitter</label>
            <div className="relative w-full flex items-center">
              <img
                src={twitter}
                alt="twitter icon"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 mr-4 "
              />
              <input
                {...register("twitter")}
                placeholder="Twitter username"
                className=" text-[#176D69] w-full p-2 pl-10 border border-[#176D69] mb-4 mt-2"
              />
            </div>
          </div>
          <div className="w-full">
            <label className="text-[#093332] font-medium "> WhatsApp</label>
            <div className="relative w-full flex items-center">
              <img
                src={whats}
                alt="whatsapp icon"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 mr-4 "
              />
              <input
                {...register("whatsapp")}
                placeholder="Whatsapp number"
                className=" text-[#176D69] w-full p-2 pl-10 border border-[#176D69] mb-4 mt-2"
              />
            </div>
          </div>
          <div className="w-full">
            <label className="text-[#093332] font-medium "> YouTube</label>
            <div className="relative w-full flex items-center">
              <img
                src={youtube}
                alt="youtube icon"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 mr-4 "
              />
              <input
                {...register("youtube")}
                placeholder="Youtube username"
                className=" text-[#176D69] w-full p-2 pl-10 border border-[#176D69] mb-4 mt-2"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-[#093332] text-[white] px-4 py-4 mt-4"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </>
  );
}

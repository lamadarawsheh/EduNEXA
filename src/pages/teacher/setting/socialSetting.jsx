import { useFormContext } from "react-hook-form";
import glope from "./images/Globe.svg";
import face from "./images/Social (1).svg";
import linkedin from "./images/Linkedin.svg";
import twitter from "./images/Social (2).svg";
import whats from "./images/Social (3).svg";
import youtube from "./images/Social (4).svg";
import insta from "./images/Social.svg";

export default function SocialSettings() {

  const { register } = useFormContext();

  return (
    <>
      <h2 className="text-[#093332] font-bold mb-8 text-2xl">Social Profile</h2>
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
          className=" text-[#176D69] w-full p-2 pl-10 border border-[#176D69] mb-4 mt-2 rounded-2xl"
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
              className=" text-[#176D69] w-full  p-2 pl-10 border border-[#176D69] mb-4 mt-2 rounded-2xl"
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
              className=" text-[#176D69] w-full p-2 pl-10 border border-[#176D69] mb-4 mt-2 rounded-2xl"
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
              className=" text-[#176D69] w-full p-2 pl-10 border border-[#176D69] mb-4 mt-2 rounded-2xl"
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
              className=" text-[#176D69] w-full p-2 pl-10 border border-[#176D69] mb-4 mt-2 rounded-2xl"
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
              className=" text-[#176D69] w-full p-2 pl-10 border border-[#176D69] mb-4 mt-2 rounded-2xl"
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
              className=" text-[#176D69] w-full p-2 pl-10 border border-[#176D69] mb-4 mt-2 rounded-2xl"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <div className="w-full">
          <label className="text-[#093332] font-medium "> GitHub</label>
          <div className="relative w-full flex items-center">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 mr-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#176D69" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </div>
            <input
              {...register("github")}
              placeholder="GitHub profile url"
              className=" text-[#176D69] w-full p-2 pl-10 border border-[#176D69] mb-4 mt-2 rounded-2xl"
            />
          </div>
        </div>
      </div>

    </>
  );
}

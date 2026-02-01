import { FormProvider, useForm } from "react-hook-form";
import AccountSettings from "./accountSetting";
import SocialSettings from "./socialSetting";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchInstuctorProfile,
  AddSocialMedia,
  UpdateInstructorProfile,
} from "../../../ReduxToolkit/Slices/TeacherSettingSlice";

export default function TeacherSettings() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.teacherSetting);

  //pop up message
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const methods = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      fullName: "",
      username: "",
      phone: "",
      title: "",
      bio: "",
      website: "",
      facebook: "",
      instagram: "",
      linkedin: "",
      twitter: "",
      whatsapp: "",
      youtube: "",
      profileImage:"",
    },
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    dispatch(fetchInstuctorProfile()).then((res) => {
      if (res.meta.requestStatus === "fulfilled" && res.payload) {
        const socialMedia = res.payload.socialMedias?.[0] || {};
        const appUser =
          res.payload.socialMedias?.[0]?.instructor?.applicationUser || {};

        const formData = {
          firstName: appUser.firstName || "",
          lastName: appUser.lastName || "",
          username: appUser.userName || "",
          fullName: appUser.fullName || "",
          phone: appUser.phoneNumber || "",
          title: res.payload.specialization || "",
          bio: res.payload.biography || "",
          website: socialMedia.personalWebsiteUrl || "",
          profileImage:appUser.imageUrl || "",
          //social
          facebook: socialMedia.facebookUrl || "",
          instagram: socialMedia.instagramUrl || "",
          linkedin: socialMedia.linkedInUrl || "",
          twitter: socialMedia.twitterUrl || "",
          whatsapp: socialMedia.whatsAppUrl || "",
          youtube: socialMedia.youTubeUrl || "",
        };
        reset(formData);
      }
    });
  }, [dispatch, reset]);

  const onSubmit = async (data) => {
    try {
      const profileData = {
        firstName: data.fullName,
        lastName: data.fullName,
        userName: data.username,
        phone: data.phone,
        title: data.title,
        biography: data.bio,
        website: data.website,
        profileImage :data.imageUrl

      };
      // console.log(data.firstName)
      const socialMediaData = {
        facebook: data.facebook,
        instagram: data.instagram,
        linkedin: data.linkedin,
        twitter: data.twitter,
        whatsapp: data.whatsapp,
        youtube: data.youTubeUrl,
      };

      // await dispatch(fetchInstuctorProfile(profileData)).unwrap();
      await dispatch(AddSocialMedia(socialMediaData)).unwrap();

      // pop up
      // const profileRes = await dispatch(AddSocialMedia(socialMediaData)).unwrap();
      const profileRes = await dispatch(
        UpdateInstructorProfile(profileData),
      ).unwrap();

      if (profileRes?.message) {
        setPopupMessage( "Profile saved successfully!");
        setShowPopup(true);

        setTimeout(() => setShowPopup(false), 2500);
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      setPopupMessage("Failed to save profile.");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2500);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container p-10 relative">
          <AccountSettings />
          <SocialSettings />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#093332] text-[white] px-4 py-4 mt-4 cursor-pointer"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>

      {/* Popup */}
      {showPopup && (
        <div
          className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-lg  "
          style={{ zIndex: 9999 }}
        >
          {popupMessage}
        </div>
      )}
    </FormProvider>
  );
}

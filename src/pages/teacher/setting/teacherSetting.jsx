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
      specialization: "",
      bio: "",
      website: "",
      facebook: "",
      instagram: "",
      linkedin: "",
      twitter: "",
      whatsapp: "",
      youtube: "",
      profileImage: "",
    },
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    dispatch(fetchInstuctorProfile()).then((res) => {
      if (res.meta.requestStatus === "fulfilled" && res.payload) {
        const p = res.payload;
        // Ensure socialMedias is an array and has elements, otherwise default to an empty object
        const socialMedia = (p.socialMedias && p.socialMedias.length > 0) ? p.socialMedias[0] : {};
        // Prioritize instructor from socialMedia if available, otherwise use p
        const instructor = socialMedia.instructor || p;
        // Prioritize applicationUser from instructor if available, otherwise use an empty object
        const appUser = instructor.applicationUser || {};

        const getVal = (obj, ...keys) => {
          for (const key of keys) {
            if (obj && obj[key] !== undefined && obj[key] !== null) return obj[key];
          }
          return "";
        };

        const formData = {
          firstName: getVal(appUser, 'firstName', 'FirstName'),
          lastName: getVal(appUser, 'lastName', 'LastName'),
          username: getVal(appUser, 'userName', 'UserName', 'username'),
          fullName: getVal(appUser, 'fullName', 'FullName'),
          phone: getVal(appUser, 'phoneNumber', 'PhoneNumber', 'phone'),
          specialization: getVal(p, 'specialization', 'Specialization', 'Spetialization', 'title') || getVal(instructor, 'specialization', 'Specialization', 'Spetialization'),
          bio: getVal(p, 'biography', 'Biography', 'bio'),
          website: getVal(socialMedia, 'personalWebsiteUrl', 'website'),
          profileImage: getVal(p, 'imageUrl', 'ImageUrl', 'image'),
          birthdate: (getVal(p, 'birthdate', 'Birthdate', 'birthDate', 'BirthDate') || "").split('T')[0],
          gender: getVal(p, 'gender', 'Gender'),
          //social
          facebook: getVal(socialMedia, 'facebookUrl', 'facebook'),
          instagram: getVal(socialMedia, 'instagramUrl', 'instagram'),
          linkedin: getVal(socialMedia, 'linkedInUrl', 'linkedin'),
          twitter: getVal(socialMedia, 'twitterUrl', 'twitter'),
          whatsapp: getVal(socialMedia, 'whatsAppUrl', 'whatsapp'),
          youtube: getVal(socialMedia, 'youTubeUrl', 'youtube'),
          github: getVal(socialMedia, 'gitHubUrl', 'github'),
        };
        reset(formData);
      }
    });
  }, [dispatch, reset]);

  const onSubmit = async (data) => {
    try {
      // 1. Prepare FormData for Instructor Profile Update
      const profileFormData = new FormData();
      profileFormData.append("firstName", data.firstName);
      profileFormData.append("lastName", data.lastName);
      profileFormData.append("specialization", data.specialization);
      profileFormData.append("Specialization", data.specialization);
      profileFormData.append("biography", data.bio);
      profileFormData.append("birthdate", data.birthdate);
      profileFormData.append("gender", data.gender);

      // Only append image if it's a new file (not a string URL)
      if (data.profileImage instanceof File) {
        profileFormData.append("image", data.profileImage);
      }

      // 2. Prepare JSON for Social Media Update
      const socialMediaData = {
        facebookUrl: data.facebook,
        instagramUrl: data.instagram,
        linkedInUrl: data.linkedin,
        twitterUrl: data.twitter,
        whatsAppUrl: data.whatsapp,
        youTubeUrl: data.youtube,
        gitHubUrl: data.github,
        personalWebsiteUrl: data.website,
      };

      // Execute both updates
      await dispatch(AddSocialMedia(socialMediaData)).unwrap();
      const profileRes = await dispatch(UpdateInstructorProfile(profileFormData)).unwrap();

      setPopupMessage("Profile and social media updated successfully!");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2500);

    } catch (error) {
      console.error("Failed to update profile:", error);
      setPopupMessage(error?.message || "Failed to save profile.");
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
            className="bg-[#093332] text-[white] px-4 py-4 mt-4 cursor-pointer rounded-3xl"
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

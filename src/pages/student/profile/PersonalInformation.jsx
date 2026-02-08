import React, { useEffect, useState } from "react";
import { Calendar, Mail, Phone, Upload, User } from "lucide-react";
import api from "../../../services/api";
import { getStudentProfile, updateStudentProfile } from "../../../services/personalInformationService";
import { getStudentIdFromStorage } from "../../../utils/auth";
import "./Profile.css";
import {
  resolveImageUrl,
  extractProfileData,
  getStoredProfileImage
} from "../../../utils/profileUtils";

const PersonalInformation = () => {
  const [formData, setFormData] = useState(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const data = user.user || user;
    return {
      firstName: data.firstName || data.first_name || data.firstname || "",
      lastName: data.lastName || data.last_name || data.lastname || "",
      imageUrl: data.imageUrl || data.imageURL || data.avatarUrl || data.profileImage || data.profileImageUrl || "",
      userName: data.userName || data.user_name || data.username || "",
      email: data.email || "",
      phoneNumber: data.phoneNumber || data.phone || "",
      birthDate: data.birthDate ? data.birthDate.split('T')[0] : "",
    };
  });

  const [imagePreview, setImagePreview] = useState(() => getStoredProfileImage());
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [localPreviewUrl, setLocalPreviewUrl] = useState("");
  const [serverImageUrl, setServerImageUrl] = useState("");
  const [profileId, setProfileId] = useState("");

  useEffect(() => {
    return () => {
      if (localPreviewUrl) {
        URL.revokeObjectURL(localPreviewUrl);
      }
    };
  }, [localPreviewUrl]);

  useEffect(() => {
    let isActive = true;

    const normalizeDate = (value) => {
      if (!value) {
        return "";
      }

      if (value instanceof Date) {
        return value.toISOString().split("T")[0];
      }

      if (typeof value === "string") {
        return value.split("T")[0];
      }

      return "";
    };

    const extractProfileId = (profile) => {
      if (!profile || typeof profile !== "object") {
        return "";
      }
      return (
        profile.personalInformationId ||
        profile.personalInformationID ||
        profile.PersonalInformationId ||
        profile.PersonalInformationID ||
        profile.personalInfoId ||
        profile.personalInfoID ||
        profile.profileId ||
        profile.profileID ||
        profile.personalInfo?.id ||
        profile.applicationUserId ||
        profile.studentId ||
        profile.userId ||
        profile.applicationUser?.id ||
        profile.applicationUser?.userId ||
        profile.applicationUser?.studentId ||
        profile.user?.id ||
        profile.user?.userId ||
        profile.user?.studentId ||
        ""
      );
    };

    const loadProfile = async () => {
      try {
        const response = await getStudentProfile(getStudentIdFromStorage());
        if (!isActive) {
          return;
        }

        const data = extractProfileData(response?.data);
        if (!data || typeof data !== "object") {
          setIsLoading(false);
          return;
        }

        const resolvedProfileId = extractProfileId(data);
        if (resolvedProfileId) {
          setProfileId(resolvedProfileId);
        } else {
          console.warn("PersonalInformation id was not found in the profile response.");
        }

        const rawImageUrl =
          data.imageUrl || data.imageURL || data.avatarUrl || data.profileImage || data.profileImageUrl || data.avatar || "";
        const resolvedImage = resolveImageUrl(rawImageUrl);

        setFormData((prev) => ({
          ...prev,
          firstName: data.firstName ?? data.first_name ?? data.firstname ?? prev.firstName,
          lastName: data.lastName ?? data.last_name ?? data.lastname ?? prev.lastName,
          imageUrl: rawImageUrl || prev.imageUrl,
          userName: data.userName ?? data.user_name ?? data.username ?? prev.userName,
          email: data.email ?? prev.email,
          phoneNumber: data.phoneNumber ?? data.phone ?? data.phoneNo ?? prev.phoneNumber,
          birthDate: normalizeDate(
            data.birthDate ?? data.dateOfBirth ?? data.dob ?? prev.birthDate
          ),
        }));

        if (resolvedImage) {
          if (localPreviewUrl) {
            URL.revokeObjectURL(localPreviewUrl);
            setLocalPreviewUrl("");
          }
          setServerImageUrl(resolvedImage);
          setImagePreview(resolvedImage);
          localStorage.setItem("profileImageUrl", resolvedImage);
          window.dispatchEvent(new CustomEvent("profile-image-updated", { detail: { url: resolvedImage } }));
        }
      } catch (error) {
        if (isActive) {
          console.error("Failed to load student profile:", error);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      isActive = false;
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("Image is too large. Please choose a file under 5MB.");
      event.target.value = "";
      return;
    }

    if (isLoading) {
      alert("Please wait for profile data to load, then try again.");
      event.target.value = "";
      return;
    }

    if (localPreviewUrl) {
      URL.revokeObjectURL(localPreviewUrl);
    }

    const previewUrl = URL.createObjectURL(file);
    setLocalPreviewUrl(previewUrl);
    setImagePreview(previewUrl);
    setImageFile(file);

    try {
      setIsUploadingImage(true);
      await updateStudentProfile(profileId, formData, file);
      window.dispatchEvent(new CustomEvent("profile-image-updated", { detail: { url: previewUrl } }));
      if (!previewUrl.startsWith("blob:")) {
        localStorage.setItem("profileImageUrl", previewUrl);
      }
      setImageFile(null);
    } catch (error) {
      console.error("Failed to update profile image:", error);
      alert("Failed to update profile image. Please try again.");
      setImagePreview(serverImageUrl || "");
      setImageFile(null);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleRemoveImage = () => {
    if (localPreviewUrl) {
      URL.revokeObjectURL(localPreviewUrl);
      setLocalPreviewUrl("");
    }
    setImageFile(null);
    setImagePreview(serverImageUrl || "");
    if (serverImageUrl) {
      window.dispatchEvent(new CustomEvent("profile-image-updated", { detail: { url: serverImageUrl } }));
      localStorage.setItem("profileImageUrl", serverImageUrl);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsSaving(true);
      await updateStudentProfile(profileId, formData, imageFile);
      alert("Profile updated successfully.");
    } catch (error) {
      console.error("Failed to update student profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="profile-section">
      <div className="profile-section-header">
        <h2 className="profile-section-title">Personal information</h2>
        <p className="profile-section-subtitle">Update your name, email, and contact details.</p>
      </div>

      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            <User className="profile-icon" aria-hidden="true" />
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Enter your first name"
          />
        </div>

        <div className="form-group">
          <label>
            <User className="profile-icon" aria-hidden="true" />
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Enter your last name"
          />
        </div>

        <div className="form-group">
          <label>
            <User className="profile-icon" aria-hidden="true" />
            Profile Photo
          </label>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-50">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-6 w-6 text-gray-400" aria-hidden="true" />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label
                className={`inline-flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:border-teal-600 hover:text-teal-700 ${isUploadingImage ? "cursor-not-allowed opacity-60" : ""
                  }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={isUploadingImage}
                />
                <Upload className="h-4 w-4" />
                {isUploadingImage ? "Uploading..." : "Upload Photo"}
              </label>
              {imageFile ? (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="w-fit text-xs font-semibold text-gray-500 hover:text-gray-700"
                >
                  Remove
                </button>
              ) : (
                <span className="text-xs text-gray-400">PNG or JPG, up to 5MB.</span>
              )}
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>
            <User className="profile-icon" aria-hidden="true" />
            User Name
          </label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label>
            <Mail className="profile-icon" aria-hidden="true" />
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label>
            <Phone className="profile-icon" aria-hidden="true" />
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="Enter your phone"
          />
        </div>

        <div className="form-group">
          <label>
            <Calendar className="profile-icon" aria-hidden="true" />
            Date Of Birth
          </label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="submit"
          className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isSaving || isLoading || isUploadingImage}
        >
          {isLoading ? "Loading..." : isSaving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default PersonalInformation;

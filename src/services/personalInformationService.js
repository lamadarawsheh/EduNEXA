import api from "./api";
import { getStudentIdCandidates } from "../utils/auth";

const requestWithIdFallback = async (studentId, requestFn) => {
  const candidates = getStudentIdCandidates(studentId);
  if (!candidates.length) {
    throw new Error("Missing student id.");
  }

  let lastError = null;
  for (const id of candidates) {
    try {
      return await requestFn(id);
    } catch (error) {
      const status = error?.response?.status;
      if (status === 404) {
        lastError = error;
        continue;
      }
      throw error;
    }
  }
  throw lastError;
};

export const getStudentProfile = (studentId) =>
  requestWithIdFallback(studentId, (id) => api.get(`/PersonalInformation/${id}`));

const buildProfileFormData = (profileData, fileKey, imageFile) => {
  const formData = new FormData();
  const normalizedData = {
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    userName: profileData.userName,
    email: profileData.email,
    phoneNumber: profileData.phoneNumber,
    birthDate: profileData.birthDate,
    imageUrl: profileData.imageUrl,
  };

  Object.entries(normalizedData).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      formData.append(key, value);
    }
  });

  if (imageFile && fileKey) {
    formData.append(fileKey, imageFile);
  }

  return formData;
};

export const updateStudentProfile = (studentId, profileData, imageFile) =>
  requestWithIdFallback(studentId, async (id) => {
    if (!imageFile) {
      return api.put(`/PersonalInformation/${id}`, profileData);
    }

    const fileKeys = ["image", "Image", "imageFile", "ImageFile", "file", "File"];
    let lastError = null;

    for (const key of fileKeys) {
      try {
        const formData = buildProfileFormData(profileData, key, imageFile);
        return await api.put(`/PersonalInformation/${id}`, formData);
      } catch (error) {
        const status = error?.response?.status;
        if (status === 400 || status === 415) {
          lastError = error;
          continue;
        }
        throw error;
      }
    }

    throw lastError;
  });


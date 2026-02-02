import api from "./api";
import { getStudentIdCandidates } from "../utils/auth";

const createProfileFormData = (payload, imageFile) => {
  const formData = new FormData();
  formData.append("firstName", payload?.firstName ?? "");
  formData.append("lastName", payload?.lastName ?? "");
  formData.append("email", payload?.email ?? "");
  formData.append("userName", payload?.userName ?? "");
  formData.append("phoneNumber", payload?.phoneNumber ?? "");
  formData.append("birthDate", payload?.birthDate ?? "");

  if (imageFile) {
    formData.append("ImageUrl", imageFile);
  }

  return formData;
};

const putProfile = (endpoint, payload, imageFile) =>
  api.put(endpoint, createProfileFormData(payload, imageFile), {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getStudentProfile = async (profileId) => {
  try {
    return await api.get("/PersonalInformation");
  } catch (error) {
    if (error?.response?.status !== 404) {
      throw error;
    }
  }

  const candidates = getStudentIdCandidates(profileId);
  if (!candidates.length) {
    throw new Error("Missing profile id.");
  }

  let lastError = null;
  for (const id of candidates) {
    try {
      return await api.get(`/PersonalInformation/${id}`);
    } catch (error) {
      if (error?.response?.status === 404) {
        lastError = error;
        continue;
      }
      throw error;
    }
  }

  throw lastError || new Error("Failed to load student profile.");
};

export const updateStudentProfile = async (profileId, payload, imageFile) => {
  const candidates = getStudentIdCandidates(profileId);

  let lastError = null;
  for (const id of candidates) {
    try {
      return await putProfile(`/PersonalInformation/${id}`, payload, imageFile);
    } catch (error) {
      if (error?.response?.status === 404) {
        lastError = error;
        continue;
      }
      throw error;
    }
  }

  try {
    return await putProfile("/PersonalInformation", payload, imageFile);
  } catch (error) {
    if (lastError) {
      throw lastError;
    }
    throw error;
  }
};

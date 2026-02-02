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

export const updateStudentProfile = (studentId, profileData) =>
  requestWithIdFallback(studentId, (id) =>
    api.put(`/PersonalInformation/${id}`, profileData)
  );



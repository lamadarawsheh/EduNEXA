import api from "./api";
import { getStudentIdCandidates } from "../utils/auth";

const requestWithIdFallback = async (studentId, requestFn, options = {}) => {
  const candidates = getStudentIdCandidates(studentId);
  if (!candidates.length) {
    throw new Error("Missing student id.");
  }
  const retryOnStatuses = Array.isArray(options.retryOnStatuses)
    ? options.retryOnStatuses
    : [404];

  let lastError = null;
  for (const id of candidates) {
    try {
      return await requestFn(id);
    } catch (error) {
      const status = error?.response?.status;
      if (retryOnStatuses.includes(status)) {
        lastError = error;
        continue;
      }
      throw error;
    }
  }
  throw lastError;
};

const patchWithContentTypeFallback = async (url, jsonPayload, textPayload) => {
  try {
    return await api.patch(url, jsonPayload, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const status = error?.response?.status;
    if (status !== 400 && status !== 415) {
      throw error;
    }
  }

  return api.patch(url, textPayload, {
    headers: { "Content-Type": "text/plain" },
  });
};

export const getStudentSettings = async (studentId) => {
  try {
    return await requestWithIdFallback(studentId, (id) => api.get(`/Setting/${id}`));
  } catch (error) {
    if (error?.response?.status !== 404) {
      throw error;
    }
  }

  return api.get("/Setting");
};

export const getAvailableLanguages = () =>
  api.get("/Setting/available-languages");

export const updateLanguage = async (studentId, languageCode) =>
  requestWithIdFallback(studentId, (id) =>
    patchWithContentTypeFallback(
      `/Setting/${id}/language`,
      JSON.stringify(languageCode),
      String(languageCode)
    )
  );

export const updateNotifications = async (studentId, enabled) =>
  requestWithIdFallback(studentId, (id) =>
    patchWithContentTypeFallback(
      `/Setting/${id}/notifications`,
      JSON.stringify(Boolean(enabled)),
      Boolean(enabled) ? "true" : "false"
    )
  );

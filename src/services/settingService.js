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

export const getStudentSettings = (studentId) =>
  requestWithIdFallback(studentId, (id) => api.get(`/Setting/${id}`));

export const getAvailableLanguages = () =>
  api.get("/Setting/available-languages");

const patchWithPayloads = async (url, payloads) => {
  let lastError = null;
  for (const payload of payloads) {
    try {
      const config = payload.config || (payload.headers ? { headers: payload.headers } : undefined);
      return await api.patch(url, payload.data, config);
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
};

export const updateLanguage = async (studentId, languageCode) =>
  requestWithIdFallback(
    studentId,
    (id) => {
      const normalized = String(languageCode || "").trim();
    const url = `/Setting/${id}/language`;
    return patchWithPayloads(url, [
      { data: { languageCode: normalized }, headers: { "Content-Type": "application/json" } },
      { data: { language: normalized }, headers: { "Content-Type": "application/json" } },
      { data: { code: normalized }, headers: { "Content-Type": "application/json" } },
      { data: JSON.stringify(normalized), headers: { "Content-Type": "application/json" } },
      { data: normalized, headers: { "Content-Type": "text/plain" } },
      {
        data: new URLSearchParams({ languageCode: normalized }),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      },
      {
        data: new URLSearchParams({ language: normalized }),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      },
      {
        data: new URLSearchParams({ code: normalized }),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      },
      { data: null, config: { params: { languageCode: normalized } } },
      { data: null, config: { params: { language: normalized } } },
      { data: null, config: { params: { code: normalized } } },
      { data: null, config: { params: { LanguageCode: normalized } } },
      { data: null, config: { params: { Language: normalized } } },
    ]);
  },
    { retryOnStatuses: [404, 400] }
  );

export const updateNotifications = async (studentId, enabled) =>
  requestWithIdFallback(
    studentId,
    (id) => {
      const normalized = Boolean(enabled);
    const url = `/Setting/${id}/notifications`;
    return patchWithPayloads(url, [
      { data: { notificationsEnabled: normalized }, headers: { "Content-Type": "application/json" } },
      { data: { enabled: normalized }, headers: { "Content-Type": "application/json" } },
      { data: JSON.stringify(normalized), headers: { "Content-Type": "application/json" } },
      { data: String(normalized), headers: { "Content-Type": "text/plain" } },
      {
        data: new URLSearchParams({ notificationsEnabled: String(normalized) }),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      },
      {
        data: new URLSearchParams({ enabled: String(normalized) }),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      },
      {
        data: new URLSearchParams({ value: String(normalized) }),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      },
      { data: null, config: { params: { notificationsEnabled: normalized } } },
      { data: null, config: { params: { enabled: normalized } } },
      { data: null, config: { params: { value: normalized } } },
      { data: null, config: { params: { NotificationsEnabled: normalized } } },
      { data: null, config: { params: { Enabled: normalized } } },
    ]);
  },
    { retryOnStatuses: [404, 400] }
  );

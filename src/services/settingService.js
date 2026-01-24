import api from "./api";

export const getStudentSettings = (studentId) =>
  api.get(`/Setting/${studentId}`);

export const getAvailableLanguages = () =>
  api.get("/Setting/available-languages");

export const updateLanguage = (studentId, languageCode) =>
  api.patch(
    `/Setting/${studentId}/language`,
    JSON.stringify(languageCode),
    { headers: { "Content-Type": "application/json" } }
  );

export const updateNotifications = (studentId, enabled) =>
  api.patch(
    `/Setting/${studentId}/notifications`,
    JSON.stringify(enabled),
    { headers: { "Content-Type": "application/json" } }
  );

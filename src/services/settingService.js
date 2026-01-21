import api from "./api";

export const getStudentSettings = (studentId) =>
  api.get(`/Setting/${studentId}`);

export const updateLanguage = (studentId, languageCode) =>
  api.patch(
    `/Setting/${studentId}/language`,
    JSON.stringify(languageCode),
    { headers: { "Content-Type": "application/json" } }
  );

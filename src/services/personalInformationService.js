import api from "./api";

export const updateStudentProfile = (studentId, profileData) =>
  api.put(`/PersonalInformation/${studentId}`, profileData);

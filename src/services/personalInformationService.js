import api from "./api";

export const getStudentProfile = (studentId) =>
  api.get(`/PersonalInformation/${studentId}`);

export const updateStudentProfile = (studentId, profileData) =>
  api.put(`/PersonalInformation/${studentId}`, profileData);

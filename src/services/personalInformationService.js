import api from "./api";
import { getStudentIdCandidates } from "../utils/auth";

const requestWithEndpointFallback = async (studentId, requestFns, options = {}) => {
  const candidates = getStudentIdCandidates(studentId);
  const retryOnStatuses = Array.isArray(options.retryOnStatuses)
    ? options.retryOnStatuses
    : [404, 405, 400];

  const ids = candidates.length ? candidates : [null];
  let lastError = null;

  for (const id of ids) {
    for (const request of requestFns) {
      if (request.requiresId && !id) {
        continue;
      }
      try {
        return await request.run(id);
      } catch (error) {
        const status = error?.response?.status;
        if (retryOnStatuses.includes(status)) {
          lastError = error;
          continue;
        }
        throw error;
      }
    }
  }

  throw lastError;
};

export const getStudentProfile = (studentId) =>
  requestWithEndpointFallback(
    studentId,
    [
      { requiresId: true, run: (id) => api.get(`/PersonalInformation/${id}`) },
      { requiresId: true, run: (id) => api.get(`/PersonalInformation`, { params: { studentId: id } }) },
      { requiresId: true, run: (id) => api.get(`/PersonalInformation`, { params: { id } }) },
      { requiresId: false, run: () => api.get(`/PersonalInformation`) },
    ],
    { retryOnStatuses: [404, 405, 400] }
  );

const buildProfileFormData = (profileData, fileKey, imageFile, id) => {
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

  if (id) {
    formData.append("studentId", id);
    formData.append("StudentId", id);
    formData.append("id", id);
  }

  if (imageFile && fileKey) {
    formData.append(fileKey, imageFile);
  }

  return formData;
};

const buildProfilePayload = (profileData, id) => ({
  ...profileData,
  ...(id ? { studentId: id, id } : {}),
});

export const updateStudentProfile = (studentId, profileData, imageFile) =>
  requestWithEndpointFallback(
    studentId,
    [
      {
        requiresId: true,
        run: (id) => api.put(`/PersonalInformation/${id}`, buildProfilePayload(profileData, id)),
      },
      {
        requiresId: true,
        run: (id) => api.put(`/PersonalInformation`, buildProfilePayload(profileData, id)),
      },
      {
        requiresId: false,
        run: () => api.put(`/PersonalInformation`, profileData),
      },
      ...(imageFile
        ? ["image", "Image", "imageFile", "ImageFile", "file", "File"].flatMap((key) => [
          {
            requiresId: true,
            run: (id) => api.put(`/PersonalInformation/${id}`, buildProfileFormData(profileData, key, imageFile, id)),
          },
          {
            requiresId: true,
            run: (id) => api.put(`/PersonalInformation`, buildProfileFormData(profileData, key, imageFile, id)),
          },
          {
            requiresId: false,
            run: () => api.put(`/PersonalInformation`, buildProfileFormData(profileData, key, imageFile)),
          },
        ])
        : []),
    ],
    { retryOnStatuses: [404, 405, 400, 415] }
  );

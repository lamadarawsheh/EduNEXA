import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BaseURL = "/proxy";

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
// console.log(localStorage.getItem("token"));

//Update instructor profile
export const UpdateInstructorProfile = createAsyncThunk(
  "instructor/UpdateInstructorProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BaseURL}/api/Instructor`,
        formData,
        getAuthHeader(),
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
//add Social Media Instructor
export const AddSocialMedia = createAsyncThunk(
  "instructor/AddSocialMedia",
  async (socialMediaData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BaseURL}/api/SocialMedia`,
        socialMediaData,
        {
          headers: {
            ...getAuthHeader().headers,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// get instuctor profile
export const fetchInstuctorProfile = createAsyncThunk(
  "instructor/fetchInstuctorProfile ",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BaseURL}/api/Instructor`,
        getAuthHeader(),
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const teacherSettingSlice = createSlice({
  name: "teacherSetting",
  initialState: {
    firstName: "",
    fullName: "",
    lastName: "",
    userName: "",
    phone: "",
    specialization: "",
    bio: "",
    website: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    whatsapp: "",
    youtube: "",
    profileImage: "",
    gender: "",
    birthDate: "",
    error: null,
    loading: false,
  },
  reducers: {
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setSpecialization: (state, action) => {
      state.specialization = action.payload;
    },
    setBio: (state, action) => {
      state.bio = action.payload;
    },
    setWebsite: (state, action) => {
      state.website = action.payload;
    },
    setFacebook: (state, action) => {
      state.facebook = action.payload;
    },
    setInstgram: (state, action) => {
      state.instagram = action.payload;
    },
    setLinkedin: (state, action) => {
      state.linkedin = action.payload;
    },
    setTwitter: (state, action) => {
      state.twitter = action.payload;
    },
    setWhatsapp: (state, action) => {
      state.whatsapp = action.payload;
    },
    setYoutube: (state, action) => {
      state.youtube = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setFullName: (state, action) => {
      state.fullName = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(UpdateInstructorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(UpdateInstructorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload) {
          const getVal = (obj, ...keys) => {
            if (!obj) return null;
            for (const key of keys) {
              if (obj[key] !== undefined && obj[key] !== null) return obj[key];
            }
            return null;
          };

          const p = action.payload;
          state.firstName = getVal(p, 'firstName', 'FirstName') || state.firstName;
          state.lastName = getVal(p, 'lastName', 'LastName') || state.lastName;
          state.bio = getVal(p, 'biography', 'Biography', 'bio') || state.bio;
          state.profileImage = getVal(p, 'imageUrl', 'ImageUrl', 'image') || state.profileImage;
          state.gender = getVal(p, 'gender', 'Gender') || state.gender;
          state.birthDate = getVal(p, 'birthdate', 'Birthdate', 'birthDate', 'BirthDate') || state.birthDate;
          state.specialization = getVal(p, 'specialization', 'Specialization', 'Spetialization', 'title') ||
            getVal(p.instructor, 'specialization', 'Specialization', 'Spetialization') ||
            state.specialization;

          state.message = "Profile updated successfully";

          // Update localStorage and notify components (like Navbar)
          if (state.profileImage) {
            localStorage.setItem('profileImageUrl', state.profileImage);
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            user.imageUrl = state.profileImage;
            localStorage.setItem('user', JSON.stringify(user));

            // Dispatch event to update Navbar and other listeners
            window.dispatchEvent(new CustomEvent('profile-image-updated', {
              detail: { url: state.profileImage }
            }));
          }

          // Update social media fields if they're in the response
          if (p.socialMedias && p.socialMedias.length > 0) {
            const socialMedia = p.socialMedias[0];
            state.facebook = socialMedia.facebookUrl || state.facebook;
            state.instagram = socialMedia.instagramUrl || state.instagram;
            state.linkedin = socialMedia.linkedInUrl || state.linkedin;
            state.twitter = socialMedia.twitterUrl || state.twitter;
            state.whatsapp = socialMedia.whatsAppUrl || state.whatsapp;
            state.youtube = socialMedia.youTubeUrl || state.youtube;
            state.website = socialMedia.personalWebsiteUrl || state.website;
            state.github = socialMedia.gitHubUrl || state.github;
          }
        }
      })

      .addCase(UpdateInstructorProfile.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
        state.message = null;
      })
      .addCase(AddSocialMedia.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(AddSocialMedia.fulfilled, (state, action) => {
        state.loading = false;
        state.message =
          action.payload.message || "Profile updated successfully";
      })
      .addCase(AddSocialMedia.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
        state.message = null;
      })
      .addCase(fetchInstuctorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstuctorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload) {
          // Robust extraction for both PascalCase and camelCase
          const getVal = (obj, ...keys) => {
            if (!obj) return null;
            for (const key of keys) {
              if (obj[key] !== undefined && obj[key] !== null) return obj[key];
            }
            return null;
          };

          const p = action.payload;
          const socialMedia = (p.socialMedias && p.socialMedias.length > 0) ? p.socialMedias[0] : {};
          const instructor = socialMedia.instructor || p;
          const appUser = instructor.applicationUser || {};

          state.firstName = getVal(appUser, 'firstName', 'FirstName') || state.firstName;
          state.lastName = getVal(appUser, 'lastName', 'LastName') || state.lastName;
          state.userName = getVal(appUser, 'userName', 'UserName', 'username') || state.userName;
          state.fullName = getVal(appUser, 'fullName', 'FullName') || state.fullName;
          state.phone = getVal(appUser, 'phoneNumber', 'PhoneNumber', 'phone') || state.phone;

          state.specialization = getVal(p, 'specialization', 'Specialization', 'Spetialization', 'title') ||
            getVal(instructor, 'specialization', 'Specialization', 'Spetialization') ||
            state.specialization;
          state.bio = getVal(p, 'biography', 'Biography', 'bio') || state.bio;
          state.profileImage = getVal(p, 'imageUrl', 'ImageUrl', 'image') || state.profileImage;
          state.gender = getVal(p, 'gender', 'Gender') || state.gender;
          state.birthDate = getVal(p, 'birthdate', 'Birthdate', 'birthDate', 'BirthDate') || state.birthDate;

          if (socialMedia && Object.keys(socialMedia).length > 0) {
            state.facebook = socialMedia.facebookUrl || "";
            state.instagram = socialMedia.instagramUrl || "";
            state.linkedin = socialMedia.linkedInUrl || "";
            state.twitter = socialMedia.twitterUrl || "";
            state.whatsapp = socialMedia.whatsAppUrl || "";
            state.youtube = socialMedia.youTubeUrl || "";
            state.website = socialMedia.personalWebsiteUrl || "";
            state.github = socialMedia.gitHubUrl || "";
          }

          // Sync localStorage and notify listeners
          if (state.profileImage) {
            localStorage.setItem('profileImageUrl', state.profileImage);
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            user.imageUrl = state.profileImage;
            localStorage.setItem('user', JSON.stringify(user));

            // Dispatch event to update Navbar and other listeners
            window.dispatchEvent(new CustomEvent('profile-image-updated', {
              detail: { url: state.profileImage }
            }));
          }
        }
      })
      .addCase(fetchInstuctorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export const {
  setBio,
  setFacebook,
  setInstgram,
  setLinkedin,
  setTwitter,
  setWhatsapp,
  setYoutube,
  setFirstName,
  setLastName,
  setUserName,
  setPhone,
  setTitle,
  setWebsite,
  setFullName,
} = teacherSettingSlice.actions;

export default teacherSettingSlice.reducer;

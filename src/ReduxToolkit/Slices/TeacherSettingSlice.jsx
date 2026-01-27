import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BaseURL = "http://edunexa.runasp.net";

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
        getAuthHeader(),
        { "Content-Type": "application/json" },
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
    title: "",
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
    setTitle: (state, action) => {
      state.title = action.payload;
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
        if (action.payload) {
          state.firstName = action.payload.fullName || state.firstName;
          state.lastName = action.payload.lastName || state.lastName;
          state.bio = action.payload.biography || state.bio;
          state.message =
            action.payload.message || "Profile updated successfully";
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
        if (action.payload) {
          state.firstName = action.payload.fullName || state.firstName;
          state.lastName = action.payload.lastName || state.lastName;
          state.userName = action.payload.userName || state.userName;
          state.fullName = action.payload.fullName || state.fullName;
          state.phone = action.payload.phone || state.phone;
          state.title = action.payload.title || state.title;
          state.bio = action.payload.biography || state.bio;
          state.website = action.payload.website || state.website;
          state.profileImage =
            action.payload.profileImage || state.profileImage;
          state.gender = action.payload.gender || state.gender;
          // Update social media fields if they're in the response
          if (action.payload.socialMedia) {
            state.facebook =
              action.payload.socialMedia.facebook || state.facebook;
            state.instagram =
              action.payload.socialMedia.instagram || state.instagram;
            state.linkedin =
              action.payload.socialMedia.linkedin || state.linkedin;
            state.twitter = action.payload.socialMedia.twitter || state.twitter;
            state.whatsapp =
              action.payload.socialMedia.whatsapp || state.whatsapp;
            state.youtube = action.payload.socialMedia.youtube || state.youtube;
          }
        }
      })
      .addCase(fetchInstuctorProfile.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
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

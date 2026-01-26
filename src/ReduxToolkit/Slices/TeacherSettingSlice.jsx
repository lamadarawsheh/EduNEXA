import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BaseURL = "http://edunexa.runasp.net";

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

//Update instructor profile
export const UpdateInstructorProfile = createAsyncThunk(
  "instructor/UpdateInstructorProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
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

const teacherSettingSlice = createSlice({
  name: "teacherSetting",
  initialState: {
    firstName: "",
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
      state.website = action.payload;
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
  },
  extraReducers: (builder) =>
    builder
      .addCase(UpdateInstructorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateInstructorProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.firstName = action.payload.firstName || state.firstName;
          state.lastName = action.payload.lastName || state.lastName;
          state.bio = action.payload.biography || state.bio;
        }
      })

      .addCase(UpdateInstructorProfile.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
      })
      .addCase(AddSocialMedia.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddSocialMedia.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(AddSocialMedia.rejected, (state, action) => {
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
} = teacherSettingSlice.actions;

export default teacherSettingSlice.reducer;

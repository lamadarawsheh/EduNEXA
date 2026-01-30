import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const BaseURL = "http://edunexa.runasp.net/api";

export const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

/* ======================
   Default (Fallback Data)
====================== */
const defaultProfile = {
  name: "Ali Ahmed",
  title: "Ui Ux Designer & Web Designer",
  image: null,
  website: "",
  socials: {
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
    whatsapp: "",
  },
};

/* ======================
   Thunks
====================== */

// 👤 Instructor Profile
export const fetchInstructorProfile = createAsyncThunk(
  "profile/fetchInstructorProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BaseURL}/Instructor`,
        getAuthHeader()
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 📚 Approved Courses
export const fetchApprovedCourses = createAsyncThunk(
  "profile/fetchApprovedCourses",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BaseURL}/courses/approved`,
        getAuthHeader()
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// 📚 Reviews
export const fetchReviews = createAsyncThunk(
  "profile/fetchReviews",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BaseURL}/InstructorReview/GetInstructorReviews/DE2E2F10-9E91-4391-5938-08DE4AEF4B97`,
        getAuthHeader()
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/* ======================
   Slice
====================== */
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: defaultProfile,
    courses: [],
    loadingProfile: false,
    loadingCourses: false,
    errorProfile: null,
    errorCourses: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      /* ===== Profile ===== */
      .addCase(fetchInstructorProfile.pending, (state) => {
        state.loadingProfile = true;
      })

      .addCase(fetchInstructorProfile.fulfilled, (state, action) => {
        const apiData = action.payload;
        const socials = apiData?.socialMedias?.[0] || {};

        state.data = {
          name: apiData?.fullName || defaultProfile.name,
          title: apiData?.specialization || defaultProfile.title,
          image: apiData?.imageUrl || defaultProfile.image,
          courses: apiData?.courses,
          website:
            socials.personalWebsiteUrl || defaultProfile.website,

          socials: {
            facebook: socials.facebookUrl || "",
            twitter: socials.twitterUrl || "",
            instagram: socials.instagramUrl || "",
            youtube: socials.youTubeUrl || "",
            whatsapp: socials.whatsAppUrl || "",
          },
        };

        state.loadingProfile = false;
      })

      .addCase(fetchInstructorProfile.rejected, (state, action) => {
        state.loadingProfile = false;
        state.errorProfile = action.payload;
        state.data = defaultProfile;
      })

      /* ===== Courses ===== */
      .addCase(fetchApprovedCourses.pending, (state) => {
        state.loadingCourses = true;
      })

      .addCase(fetchApprovedCourses.fulfilled, (state, action) => {
        state.courses = action.payload || [];
        state.loadingCourses = false;
      })

      .addCase(fetchApprovedCourses.rejected, (state, action) => {
        state.loadingCourses = false;
        state.errorCourses = action.payload;
        state.courses = [];
      })

      /* ===== Reviews ===== */
      .addCase(fetchReviews.pending, (state) => {
        state.loadingReviews = true;
      })

      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload || [];
        state.loadingReviews = false;
      })

      .addCase(fetchReviews.rejected, (state, action) => {
        state.loadingReviews = false;
        state.errorReviews = action.payload;
        state.reviews = [];
      })
  },
});

export default profileSlice.reducer;

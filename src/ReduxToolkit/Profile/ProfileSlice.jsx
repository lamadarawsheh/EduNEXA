import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const BaseURL = "/proxy/api";

export const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

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

// Instructor Profile
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

// Approved Courses
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
// Reviews
export const fetchReviews = createAsyncThunk(
  "profile/fetchReviews",
  async (instructorId, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BaseURL}/InstructorReview/GetInstructorReviews/${instructorId}`,
        getAuthHeader()
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// Earnings
export const fetchEarnings = createAsyncThunk(
  "profile/fetchEarnings",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BaseURL}/Earnings`,
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
    reviews: [],
    loadingProfile: false,
    loadingCourses: false,
    loadingReviews: false,
    loadingEarnings: false,
    errorProfile: null,
    errorCourses: null,
    errorReviews: null,
    errorEarnings: null,
    earnings: [],
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
          id: apiData?.id || apiData?.Id,
          name: apiData?.fullName || apiData?.FullName || defaultProfile.name,
          title: apiData?.specialization || apiData?.Specialization || defaultProfile.title,
          image: apiData?.imageUrl || apiData?.ImageUrl || apiData?.imagePath || apiData?.ImagePath || apiData?.image || apiData?.Image || defaultProfile.image,
          courses: apiData?.courses || apiData?.Courses,
          website:
            socials.personalWebsiteUrl || socials.PersonalWebsiteUrl || defaultProfile.website,

          socials: {
            facebook: socials.facebookUrl || socials.FacebookUrl || "",
            twitter: socials.twitterUrl || socials.TwitterUrl || "",
            instagram: socials.instagramUrl || socials.InstagramUrl || "",
            youtube: socials.youTubeUrl || socials.YouTubeUrl || "",
            whatsapp: socials.whatsAppUrl || socials.WhatsAppUrl || "",
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
        // Handle $values wrapper if present, or just use the array
        const rawReviews = Array.isArray(action.payload)
          ? action.payload
          : (action.payload?.$values || []);

        state.reviews = rawReviews.map(rev => ({
          id: rev.id || rev.Id || Math.random(), // Fallback ID
          name: rev.studentName || rev.Name || "Anonymous Student",
          avatar: rev.studentImageUrl || rev.avatar || "https://ui-avatars.com/api/?name=" + (rev.studentName || "A"),
          rating: rev.rating || rev.Rating || 5,
          comment: rev.comment || rev.Comment || rev.text || "",
          createdAt: rev.createdAt || rev.CreatedAt || rev.date || new Date().toISOString()
        }));
        state.loadingReviews = false;
      })

      .addCase(fetchReviews.rejected, (state, action) => {
        state.loadingReviews = false;
        state.errorReviews = action.payload;
        state.reviews = [];
      })
      /* ===== Earnings ===== */
      .addCase(fetchEarnings.pending, (state) => {
        state.loadingEarnings = true;
      })

      .addCase(fetchEarnings.fulfilled, (state, action) => {
        state.earnings = action.payload || [];
        state.loadingEarnings = false;
      })

      .addCase(fetchEarnings.rejected, (state, action) => {
        state.loadingEarnings = false;
        state.errorEarnings = action.payload;
        state.earnings = [];
      })
  },
});

export default profileSlice.reducer;

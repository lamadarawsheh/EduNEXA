import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

// get all courses (Filtered for the current instructor)
export const fetchAllCourses = createAsyncThunk(
  "courses/fetchAllCourses",
  async (_, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const currentUserId = user.id || "";

      const response = await api.get("/courses");

      // If we are an instructor, only show our own courses
      const allCourses = response.data || [];
      const myCourses = Array.isArray(allCourses)
        ? allCourses.filter(c => c.instructorId === currentUserId)
        : (allCourses?.$values || []).filter(c => c.instructorId === currentUserId);

      return myCourses;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// add course
export const addCourse = createAsyncThunk(
  "course/addCourse",
  async (courseData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // Get instructor info from localStorage
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const instructorId = user.id || "";

      const now = new Date().toISOString();

      // Helper to map duration range to TimeSpan format (HH:mm:ss)
      const mapDuration = (range) => {
        const mapping = {
          "0-2 hrs": "02:00:00",
          "2-5 hrs": "05:00:00",
          "5-10 hrs": "10:00:00",
          "10-20 hrs": "20:00:00",
          "20+ hrs": "40:00:00"
        };
        return mapping[range] || "01:00:00";
      };

      // Mapping to EXACT keys provided by user
      formData.append('title', courseData.title);
      formData.append('description', courseData.description || '');
      formData.append('shortDescription', courseData.subtitle || '');
      formData.append('price', courseData.price || "0");
      formData.append('createdAt', now);
      formData.append('publishedAt', now);
      formData.append('instructorId', instructorId);
      formData.append('subCategoryID', courseData.subCategory);
      formData.append('prerequisites', (courseData.requirements || []).map(r => typeof r === 'object' ? r.value : r).join(', '));
      formData.append('estimatedDuration', mapDuration(courseData.duration));
      formData.append('courseTopics', courseData.topic || '');
      formData.append('language', courseData.language || "0");
      formData.append('whatYouWillTeach', (courseData.learnItems || []).map(i => typeof i === 'object' ? i.value : i).join(', '));
      formData.append('targetAudience', (courseData.audience || []).map(a => typeof a === 'object' ? a.value : a).join(', '));

      // Handling files with EXACT keys
      if (courseData.thumbnail && courseData.thumbnail[0]) {
        formData.append('Thumbnail', courseData.thumbnail[0]);
      }
      if (courseData.trailer && courseData.trailer[0]) {
        formData.append('TrailerVideo', courseData.trailer[0]);
      }

      console.log("🚀 SENDING COURSE DATA TO BACKEND (PASCAL CASE):");
      for (let pair of formData.entries()) {
        console.log(`   ${pair[0]}:`, pair[1] instanceof File ? `File [${pair[1].name}]` : pair[1]);
      }

      const response = await api.post("/courses", formData);
      console.log("✅ BACKEND RESPONSE:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ BACKEND ERROR:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// course preview
export const fetchCoursePreview = createAsyncThunk(
  "course/fetchCoursePreview",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/courses/${courseId}/preview`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Publish course
export const publishCourse = createAsyncThunk(
  "course/publish",
  async ({ courseId, publishData }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/courses/${courseId}/publish`,
        {
          welcomeMessage: publishData.welcomeMessage,
          congratulationsMessage: publishData.congratsMessage,
          submitForReview: true
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const extractUniqueValues = (courses, field) => {
  const values = courses
    .map(course => course[field])
    .filter(value => value !== null && value !== undefined);

  return [...new Set(values)];
};

const CourseSlice = createSlice({
  name: "Course",
  initialState: {
    courses: [],
    loading: false,
    error: null,
    successMessage: null,
    currentCourse: null,
    createdCourseId: null,
  },
  reducers: {
    clearCourseError: (state) => {
      state.error = null;
    },
    clearCurrentCourse: (state) => {
      state.currentCourse = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
    resetCreatedCourseId: (state) => {
      state.createdCourseId = null;
    }

  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAllCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
        state.levels = extractUniqueValues(action.payload, 'level');
        state.priceTiers = extractUniqueValues(action.payload, 'price');
        state.durations = extractUniqueValues(action.payload, 'estimatedDuration');
        const languageMap = {
          0: 'English',
          1: 'Arabic',
          2: 'French',
          3: 'Spanish',
          4: 'German'
        };
        const uniqueLanguageCodes = extractUniqueValues(action.payload, 'language');
        state.languages = uniqueLanguageCodes.map(code => ({
          id: code,
          code: code,
          name: languageMap[code] || `Language ${code}`
        }));
      })
      .addCase(fetchAllCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.createdCourseId = action.payload.id || action.payload.courseId;
        state.successMessage = "Course base created! Now add some content.";
      })
      .addCase(addCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCoursePreview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoursePreview.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCoursePreview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(publishCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(publishCourse.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = "Course successfully submitted for review!";
      })
      .addCase(publishCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

})

export const {
  clearCourseError,
  clearSuccessMessage,
  clearCurrentCourse,
  resetCreatedCourseId

} = CourseSlice.actions;

export default CourseSlice.reducer;
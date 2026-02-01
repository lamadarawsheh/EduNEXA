// store/courseSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCourse = createAsyncThunk(
  "course/fetchCourse",
  async (courseId) => {
    const res = await fetch(`/api/courses/${courseId}`);
    return res.json();
  }
);

export const completeLecture = createAsyncThunk(
  "course/completeLecture",
  async (lectureId) => {
    await fetch(`/api/lectures/${lectureId}/complete`, {
      method: "POST",
    });
    return lectureId;
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState: {
    course: null,
    sections: [],
    currentLessonTitle: null, // 👈 المهم
    loading: false,
  },
  reducers: {
    setCurrentLessonTitle: (state, action) => {
      state.currentLessonTitle = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.course = action.payload.course;
        state.sections = action.payload.sections;

        // أول درس تلقائي
        state.currentLessonTitle =
          action.payload.sections?.[0]?.lectures?.[0]?.title || null;
      })

      .addCase(completeLecture.fulfilled, (state, action) => {
        const lectureId = action.payload;

        state.sections.forEach(section => {
          section.lectures.forEach(lecture => {
            if (lecture.id === lectureId) {
              lecture.isCompleted = true;
            }
          });
        });
      });
  },
});

export const { setCurrentLessonTitle } = courseSlice.actions;
export default courseSlice.reducer;

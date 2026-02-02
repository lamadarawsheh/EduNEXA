import { createSlice } from '@reduxjs/toolkit';

const lessonSlice = createSlice({
  name: 'lessons',
  initialState: {
    activeLesson: null, 
    courseSections: [], 
    loading: false
  },
  reducers: {
    selectLesson: (state, action) => {
      state.activeLesson = action.payload;
    },
    setCourseContent: (state, action) => {
      state.courseSections = action.payload;
    }
  }
});

export const { selectLesson, setCourseContent } = lessonSlice.actions;
export default lessonSlice.reducer;
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useAppSelector } from "..";
import { api } from "../../libs/axios";

interface Course {
  id: number;
  modules: Array<{
    id: number;
    title: string;
    lessons: Array<{
      id: string;
      title: string;
      duration: string;
    }>;
  }>;
}

export const loadCourse = createAsyncThunk(
  "player/load",
  async () => (await api.get("/courses/1")).data
);

interface PlayerState {
  course: Course | null;
  currentModuleIndex: number;
  currentLeasonIndex: number;
  isLoading: boolean;
}

const initialState: PlayerState = {
  currentModuleIndex: 0,
  course: null,
  currentLeasonIndex: 0,
  isLoading: true,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    play: (state, action: PayloadAction<[number, number]>) => {
      state.currentModuleIndex = action.payload[0];
      state.currentLeasonIndex = action.payload[1];
    },
    next: (state) => {
      const nextLessonsIndex = state.currentLeasonIndex + 1;
      const nextLesson =
        state.course?.modules[state.currentModuleIndex].lessons[
          nextLessonsIndex
        ];
      if (!!nextLesson) {
        state.currentLeasonIndex = nextLessonsIndex;
      } else {
        const nextModuleIndex = state.currentModuleIndex + 1;
        const nextModule = state.course?.modules[nextModuleIndex];
        if (!!nextModule) {
          state.currentModuleIndex = nextModuleIndex;
          state.currentLeasonIndex = 0;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCourse.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loadCourse.fulfilled, (state, action) => {
      state.course = action.payload;
      state.isLoading = false;
    });
  },
});

export const player = playerSlice.reducer;
export const { play, next } = playerSlice.actions;

export const useCurrentLeason = () => {
  return useAppSelector((state) => {
    const { currentLeasonIndex, currentModuleIndex } = state.player;
    const currentModule = state.player.course?.modules[currentModuleIndex];
    const currentLeason = currentModule?.lessons[currentLeasonIndex];
    return { currentModule, currentLeason };
  });
};

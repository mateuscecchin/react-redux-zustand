import { create } from "zustand";
import { api } from "../libs/axios";

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

interface PlayerState {
  course: Course | null;
  currentModuleIndex: number;
  currentLeasonIndex: number;
  isLoading: boolean;
  play: (moduleAndLessonIndex: [number, number]) => void;
  next: () => void;
  load: () => Promise<void>;
}

export const useStore = create<PlayerState>((set, get) => {
  return {
    currentModuleIndex: 0,
    course: null,
    currentLeasonIndex: 0,
    isLoading: true,

    load: async () => {
      set({ isLoading: true });
      const res = await api.get("/courses/1");
      set({ course: res.data });
      set({ isLoading: false });
    },

    play: (moduleAndLessonIndex: [number, number]) => {
      const [currentModuleIndex, currentLeasonIndex] = moduleAndLessonIndex;

      set({ currentModuleIndex, currentLeasonIndex });
    },
    next: () => {
      const { course, currentLeasonIndex, currentModuleIndex } = get();

      const nextLessonsIndex = currentLeasonIndex + 1;
      const nextLesson =
        course?.modules[currentModuleIndex].lessons[nextLessonsIndex];
      if (!!nextLesson) {
        set({ currentLeasonIndex: nextLessonsIndex });
      } else {
        const nextModuleIndex = currentModuleIndex + 1;
        const nextModule = course?.modules[nextModuleIndex];
        if (!!nextModule) {
          set({ currentModuleIndex: nextModuleIndex, currentLeasonIndex: 0 });
        }
      }
    },
  };
});

export const useCurrentLeason = () => {
  return useStore((state) => {
    const { currentLeasonIndex, currentModuleIndex } = state;
    const currentModule = state.course?.modules[currentModuleIndex];
    const currentLeason = currentModule?.lessons[currentLeasonIndex];
    return { currentModule, currentLeason };
  });
};

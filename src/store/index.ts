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
    course: {
      id: 1,
      modules: [
        {
          id: 1,
          title: "Iniciando com React",
          lessons: [
            {
              id: "Jai8w6K_GnY",
              title: "CSS Modules",
              duration: "13:45",
            },
            {
              id: "w-DW4DhDfcw",
              title: "Estilização do Post",
              duration: "10:05",
            },
            {
              id: "D83-55LUdKE",
              title: "Componente: Header",
              duration: "06:33",
            },
            {
              id: "W_ATsETujaY",
              title: "Componente: Sidebar",
              duration: "09:12",
            },
            {
              id: "Pj8dPeameYo",
              title: "CSS Global",
              duration: "03:23",
            },
            {
              id: "8KBq2vhwbac",
              title: "Form de comentários",
              duration: "11:34",
            },
          ],
        },
        {
          id: 2,
          title: "Estrutura da aplicação",
          lessons: [
            {
              id: "gE48FQXRZ_o",
              title: "Componente: Comment",
              duration: "13:45",
            },
            {
              id: "Ng_Vk4tBl0g",
              title: "Responsividade",
              duration: "10:05",
            },
            {
              id: "h5JA3wfuW1k",
              title: "Interações no JSX",
              duration: "06:33",
            },
            {
              id: "1G0vSTqWELg",
              title: "Utilizando estado",
              duration: "09:12",
            },
          ],
        },
      ],
    },
    currentLeasonIndex: 0,
    isLoading: false,

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

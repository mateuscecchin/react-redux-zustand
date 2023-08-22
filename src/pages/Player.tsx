import { MessageCircle } from "lucide-react";
import { Header } from "../components/Header";
import { Video } from "../components/Video";
import { Module } from "../components/Module";
import { useAppDispatch, useAppSelector } from "../store";
import { useEffect } from "react";
import { loadCourse } from "../store/slices/player";

export function Player() {
  const dispatch = useAppDispatch();
  const modules = useAppSelector((state) => state.player.course?.modules);

  useEffect(() => {
    dispatch(loadCourse());
  }, []);

  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex max-w-[1100px] w-full flex-col gap-6">
        <div className="flex items-center justify-between">
          <Header />
          <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600">
            <MessageCircle className="w-4 h-4" /> Deixar feedback
          </button>
        </div>
        <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80">
          <Video />
          <aside className="absolute top-0 bottom-0 right-0 w-80 border-l border-zinc-800 bg-zinc-900 overflow-y-scroll divide-y-2 divide-zinc-900 scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
            {modules?.map((m, index) => {
              return (
                <Module
                  key={m.id}
                  moduleIndex={index}
                  title={m.title}
                  amountOfLessons={m.lessons.length}
                />
              );
            })}
          </aside>
        </main>
      </div>
    </div>
  );
}

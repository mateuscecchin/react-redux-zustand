import { MessageCircle } from "lucide-react";
import { Header } from "../components/Header";
import { Video } from "../components/Video";
import { Module } from "../components/Module";
import { useEffect } from "react";
import { useCurrentLeason, useStore } from "../store";

export function Player() {
  const { course, load } = useStore((store) => {
    return {
      course: store.course,
      load: store.load,
    };
  });
  const { currentLeason } = useCurrentLeason();

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (currentLeason) {
      document.title = `Assistindo: ${currentLeason.title}`;
    }
  }, [currentLeason]);

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
            {course?.modules?.map((m, index) => {
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

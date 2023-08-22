import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import { Lesson } from "./Lesson";
import { useAppDispatch, useAppSelector } from "../store";
import { useDispatch } from "react-redux";
import { play } from "../store/slices/player";

interface Props {
  title: string;
  moduleIndex: number;
  amountOfLessons: number;
}

export function Module({ amountOfLessons, title, moduleIndex }: Props) {
  const dispatch = useAppDispatch();

  const { currentLeasonIndex, currentModuleIndex } = useAppSelector((state) => {
    const { currentLeasonIndex, currentModuleIndex } = state.player;
    return { currentLeasonIndex, currentModuleIndex };
  });

  const lessons = useAppSelector(
    (state) => state.player.course?.modules[moduleIndex].lessons
  );

  return (
    <Collapsible.Root className="group" defaultOpen={moduleIndex == 0}>
      <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
        <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
          {moduleIndex + 1}
        </div>
        <div className="flex flex-col gap-1 text-left">
          <strong className="text-sm">{title}</strong>
          <span className="text-xs text-zinc-400">{amountOfLessons} aulas</span>
        </div>
        <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform ease-in-out duration-300" />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <nav className="relative flex flex-col gap-4 p-6">
          {lessons?.map((l, i) => {
            const isCurrent =
              currentModuleIndex === moduleIndex && currentLeasonIndex === i;
            return (
              <Lesson
                key={l.id}
                title={l.title}
                duration={l.duration}
                onPlay={() => dispatch(play([moduleIndex, i]))}
                isCurrent={isCurrent}
              />
            );
          })}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

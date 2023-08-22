import { Video, PlayCircle } from "lucide-react";

interface Props {
  title: string;
  onPlay: () => void;
  isCurrent: boolean;
  duration: string;
}

export function Lesson({ duration, title, onPlay, isCurrent = false }: Props) {
  return (
    <button
      onClick={onPlay}
      data-active={isCurrent}
      disabled={isCurrent}
      className="flex items-center gap-3 text-sm text-zinc-400 data-[active=true]:text-emerald-400 enabled:hover:text-zinc-100"
    >
      {!isCurrent && <Video className="h-4 w-4 text-zinc-500" />}
      {isCurrent && <PlayCircle className="h-4 w-4 text-emerald-400" />}
      <span>{title}</span>
      <span className="ml-auto font-mono text-xs text-zinc-500">
        {duration}
      </span>
    </button>
  );
}

import ReactPlayer from "react-player";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { useCurrentLeason, useStore } from "../store";

export function Video() {
  const { currentLeason } = useCurrentLeason();
  const { isLoading, next } = useStore((store) => {
    return {
      isLoading: store.isLoading,
      next: store.next,
    };
  });

  function handlePlayNext() {
    next();
  }

  useEffect(() => {
    document.title = `Assistindo ${currentLeason?.title}`;
  }, [currentLeason]);

  return (
    <div className="flex-1">
      <div className="w-full bg-zinc-950 aspect-video">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Loader className="w-6 h-6 text-zinc-400 animate-spin" />
          </div>
        ) : (
          <ReactPlayer
            width="100%"
            height="100%"
            controls
            playing
            onEnded={handlePlayNext}
            url={`https://youtube.com/watch?v=${currentLeason?.id}`}
          />
        )}
      </div>
    </div>
  );
}

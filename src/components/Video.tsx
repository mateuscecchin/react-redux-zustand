import ReactPlayer from "react-player";
import { useAppDispatch, useAppSelector } from "../store";
import { useEffect } from "react";
import { ReactReduxContext, useDispatch } from "react-redux";
import { next, useCurrentLeason } from "../store/slices/player";
import { Loader } from "lucide-react";

export function Video() {
  const dispatch = useAppDispatch();
  const { currentLeason } = useCurrentLeason();
  const isCourseLoading = useAppSelector((state) => state.player.isLoading);

  function handlePlayNext() {
    dispatch(next());
  }

  useEffect(() => {
    document.title = `Assistindo ${currentLeason?.title}`;
  }, [currentLeason]);

  return (
    <div className="flex-1">
      <div className="w-full bg-zinc-950 aspect-video">
        {isCourseLoading ? (
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

"use client";
import MuxPlayer from "@mux/mux-player-react";
import { cn } from "@/lib/utils";
import { Loader2, Lock } from "lucide-react";
import { useState } from "react";

type Props = {
  courseId: string;
  chapterId: string;
  title: string;
  nextChapterId?: string;
  playbackId?: string | null;
  isLocked: boolean;
  completeOnEnd: boolean;
};

const VideoPlayer = ({
  courseId,
  chapterId,
  title,
  nextChapterId,
  playbackId,
  isLocked,
  completeOnEnd
}: Props) => {
  const [isReady, setIsReady] = useState<boolean>(false);
  console.log(isReady);
  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800  rounded-md">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary  rounded-md">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This chapter is locked</p>
        </div>
      )}
      {!isLocked && (
        <MuxPlayer
          title={title}
          className={cn(!isReady && "hidden")}
          onCanPlay={() => {
            console.log(true);
            setIsReady(true);
          }}
          onEnded={() => {}}
          autoPlay
          playbackId={playbackId || ""}
        />
      )}
    </div>
  );
};

export default VideoPlayer;

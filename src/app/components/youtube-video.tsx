"use client";

import { useState } from "react";

type Props = {
  id: string,     // the video's YouTube id, from its address: watch?v=<id>
  title: string,  // what it is, for the play button and the player
  poster: string, // a frame from it, kept in public/ so the page asks nothing of YouTube until played
};

// A YouTube video that loads only when played: a still frame with a play button until then, so the
// page stays quick and sends nothing to YouTube for visitors who never press play. Played, it opens
// YouTube's privacy-enhanced player, which sets no cookies until the video starts, with captions on
export default function YouTubeVideo({ id, title, poster }: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full border border-quiet-rule bg-quiet-ink">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&cc_load_policy=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 block h-full w-full cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- a plain still, shown at its own size */}
          <img src={poster} alt="" className="h-full w-full object-cover" />
          {/* A play button in the site's green, turning to ink on hover like the other buttons */}
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center bg-quiet-link text-quiet-paper group-hover:bg-quiet-ink">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

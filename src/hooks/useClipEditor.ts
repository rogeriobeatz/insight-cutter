import { useCallback, useMemo, useState } from "react";

import type { CaptionSettings, Clip, ClipLayoutSettings } from "@/types";

/** Local editor state. No persistence yet — ready to be lifted to a mutation. */
export function useClipEditor(clip: Clip) {
  const [captions, setCaptions] = useState<CaptionSettings>(clip.captions);
  const [layout, setLayout] = useState<ClipLayoutSettings>(clip.layout);
  const [inSec, setInSec] = useState(clip.inSec);
  const [outSec, setOutSec] = useState(clip.outSec);
  const [playheadSec, setPlayheadSec] = useState(clip.inSec + (clip.outSec - clip.inSec) * 0.35);
  const [isPlaying, setIsPlaying] = useState(false);
  const [dirty, setDirty] = useState(false);

  const updateCaptions = useCallback((patch: Partial<CaptionSettings>) => {
    setCaptions((current) => ({ ...current, ...patch }));
    setDirty(true);
  }, []);

  const updateLayout = useCallback((patch: Partial<ClipLayoutSettings>) => {
    setLayout((current) => ({ ...current, ...patch }));
    setDirty(true);
  }, []);

  const seek = useCallback(
    (seconds: number) => setPlayheadSec(Math.min(outSec, Math.max(inSec, seconds))),
    [inSec, outSec],
  );

  const setIn = useCallback(
    (seconds: number) => {
      setInSec(Math.min(seconds, outSec - 3));
      setDirty(true);
    },
    [outSec],
  );

  const setOut = useCallback(
    (seconds: number) => {
      setOutSec(Math.max(seconds, inSec + 3));
      setDirty(true);
    },
    [inSec],
  );

  const durationSec = useMemo(() => outSec - inSec, [inSec, outSec]);

  return {
    captions,
    layout,
    inSec,
    outSec,
    durationSec,
    playheadSec,
    isPlaying,
    dirty,
    updateCaptions,
    updateLayout,
    seek,
    setIn,
    setOut,
    togglePlay: () => setIsPlaying((value) => !value),
    markSaved: () => setDirty(false),
  };
}

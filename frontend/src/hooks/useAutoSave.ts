'use client';

import { useEffect, useRef, useState } from 'react';

// <T> is a generic — a placeholder type filled in by whatever calls this
// hook. That's what makes this hook reusable for ANY data shape later
// (a different form elsewhere in the app), not hardcoded to SoapNote.
export function useAutoSave<T>(data: T, delayMs: number = 1500) {
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRun = useRef(true);

  useEffect(() => {
    // Don't "save" on the very first render — the user hasn't typed
    // anything yet, there's nothing to save.
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    // This is debouncing: every time `data` changes (every keystroke),
    // cancel whatever save was previously scheduled, then schedule a new
    // one. The save only actually fires once the user PAUSES typing for
    // `delayMs` — not on every single character.
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      // A real app would call an API here to persist `data`.
      // For now, just record when it "saved".
      setLastSavedAt(new Date());
    }, delayMs);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [data, delayMs]);

  return lastSavedAt;
}
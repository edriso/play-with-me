import { useEffect } from 'react';
import { usePlayStore } from '@/store/play-store';

/** Reflects the theme and accent onto <html>. */
export function useApplyTheme(): void {
  const theme = usePlayStore((state) => state.settings.theme);
  const accent = usePlayStore((state) => state.settings.accent);
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.style.setProperty('--accent', accent);
  }, [theme, accent]);
}

import type { CSSProperties, ReactElement } from 'react';

export type IconName =
  | 'battery0'
  | 'battery1'
  | 'battery2'
  | 'heart'
  | 'heartFill'
  | 'refresh'
  | 'clock'
  | 'back'
  | 'x'
  | 'check'
  | 'box'
  | 'sparkles';

interface IconProps {
  name: IconName;
  size?: number;
  stroke?: number;
  style?: CSSProperties;
}

/** The inline-SVG icon set, ported from the prototype. Decorative by default. */
export function Icon({ name, size = 22, stroke = 1.8, style }: IconProps): ReactElement {
  const p = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: stroke,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  const paths: Record<IconName, ReactElement> = {
    battery0: (
      <>
        <rect {...p} x="3" y="8" width="16" height="8" rx="2.2" />
        <path {...p} d="M21 11v2" />
        <rect x="5" y="10" width="2.5" height="4" rx="1" fill="currentColor" stroke="none" />
      </>
    ),
    battery1: (
      <>
        <rect {...p} x="3" y="8" width="16" height="8" rx="2.2" />
        <path {...p} d="M21 11v2" />
        <rect x="5" y="10" width="7" height="4" rx="1" fill="currentColor" stroke="none" />
      </>
    ),
    battery2: (
      <>
        <rect {...p} x="3" y="8" width="16" height="8" rx="2.2" />
        <path {...p} d="M21 11v2" />
        <rect x="5" y="10" width="12" height="4" rx="1" fill="currentColor" stroke="none" />
      </>
    ),
    heart: (
      <path {...p} d="M12 20.5S4 15.5 4 9.8A4 4 0 0 1 12 7a4 4 0 0 1 8 2.8c0 5.7-8 10.7-8 10.7Z" />
    ),
    heartFill: (
      <path
        d="M12 20.5S4 15.5 4 9.8A4 4 0 0 1 12 7a4 4 0 0 1 8 2.8c0 5.7-8 10.7-8 10.7Z"
        fill="currentColor"
      />
    ),
    refresh: (
      <>
        <path {...p} d="M5 12a7 7 0 0 1 12-4.9L20 10" />
        <path {...p} d="M19 12a7 7 0 0 1-12 4.9L4 14" />
        <path {...p} d="M20 5v5h-5M4 19v-5h5" />
      </>
    ),
    clock: (
      <>
        <circle {...p} cx="12" cy="12" r="8.5" />
        <path {...p} d="M12 7.5V12l3 1.8" />
      </>
    ),
    back: <path {...p} d="M14.5 6l-6 6 6 6" />,
    x: <path {...p} d="M6.5 6.5 17.5 17.5M17.5 6.5 6.5 17.5" />,
    check: <path {...p} d="M5 12.5 9.5 17 19 7" />,
    box: <path {...p} d="M4 8l8-4 8 4-8 4-8-4ZM4 8v8l8 4 8-4V8M12 12v8" />,
    sparkles: (
      <>
        <path {...p} d="M12 4l1.4 3.8L17 9l-3.6 1.2L12 14l-1.4-3.8L7 9l3.6-1.2Z" />
        <path {...p} d="M18 14l.7 1.9L21 16l-2.3.7L18 19l-.7-2.3L15 16l2.3-.1Z" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" width={size} height={size} style={style} aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

import type { ReactNode } from 'react';
import { Overlay } from '@/components/overlay';
import { usePlayStore } from '@/store/play-store';
import { ACCENTS } from '@/types/domain';

/** Settings: the "why" line, exact-energy match, theme, and accent. */
export function SettingsOverlay({ onClose }: { onClose: () => void }) {
  const settings = usePlayStore((state) => state.settings);
  const setShowWhy = usePlayStore((state) => state.setShowWhy);
  const setMatchExact = usePlayStore((state) => state.setMatchExact);
  const setTheme = usePlayStore((state) => state.setTheme);
  const setAccent = usePlayStore((state) => state.setAccent);

  return (
    <Overlay ariaLabel="Settings" onClose={onClose}>
      <div
        style={{
          width: '100%',
          maxWidth: 380,
          background: 'var(--surface)',
          border: '1.5px solid var(--line)',
          borderRadius: 24,
          padding: '24px 24px 26px',
          color: 'var(--ink)',
          boxShadow: 'var(--shadow)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <span style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 19 }}>
            Settings
          </span>
          <button
            onClick={onClose}
            className="pl-icon pl-tap"
            type="button"
            aria-label="Close"
            style={{ width: 36, height: 36 }}
          >
            ✕
          </button>
        </div>

        <Field label="Ideas">
          <Toggle
            on={settings.showWhy}
            label="Show 'why this helps'"
            onChange={() => setShowWhy(!settings.showWhy)}
          />
          <Toggle
            on={settings.matchExact}
            label="Match my energy exactly"
            hint="Off also offers easier ideas."
            onChange={() => setMatchExact(!settings.matchExact)}
          />
        </Field>

        <Field label="Theme">
          <div role="group" style={{ display: 'flex', gap: 10 }}>
            {(['day', 'night'] as const).map((option) => (
              <Pill
                key={option}
                selected={settings.theme === option}
                onClick={() => setTheme(option)}
                label={option === 'day' ? 'Day' : 'Night'}
              />
            ))}
          </div>
        </Field>

        <Field label="Accent">
          <div role="group" aria-label="Accent" style={{ display: 'flex', gap: 12 }}>
            {ACCENTS.map((color) => {
              const selected = settings.accent === color;
              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => setAccent(color)}
                  aria-pressed={selected}
                  aria-label={color}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    cursor: 'pointer',
                    background: color,
                    border: `2.5px solid ${selected ? 'var(--ink)' : 'transparent'}`,
                    boxShadow: '0 0 0 1px var(--line)',
                  }}
                />
              );
            })}
          </div>
        </Field>
      </div>
    </Overlay>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div
        style={{
          fontFamily: 'var(--ui)',
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--faint)',
          marginBottom: 12,
        }}
      >
        {label}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>{children}</div>
    </div>
  );
}

function Pill({
  selected,
  onClick,
  label,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className="pl-tap"
      style={{
        padding: '9px 18px',
        borderRadius: 999,
        cursor: 'pointer',
        fontFamily: 'var(--display)',
        fontSize: 15,
        fontWeight: 600,
        background: selected ? 'var(--accent-soft)' : 'transparent',
        color: selected ? 'var(--accent)' : 'var(--dim)',
        border: `1.5px solid ${selected ? 'var(--accent)' : 'var(--line)'}`,
      }}
    >
      {label}
    </button>
  );
}

function Toggle({
  on,
  label,
  hint,
  onChange,
}: {
  on: boolean;
  label: string;
  hint?: string;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={on}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        padding: 0,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--ink)',
        fontFamily: 'var(--ui)',
        fontSize: 15,
        textAlign: 'start',
      }}
    >
      <span>
        <span style={{ display: 'block' }}>{label}</span>
        {hint && <span style={{ fontSize: 12.5, color: 'var(--faint)' }}>{hint}</span>}
      </span>
      <span
        aria-hidden="true"
        style={{
          width: 44,
          height: 26,
          borderRadius: 999,
          flexShrink: 0,
          background: on ? 'var(--accent)' : 'var(--surface-2)',
          border: '1px solid var(--line)',
          position: 'relative',
          transition: 'background .25s ease',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 2,
            insetInlineStart: on ? 20 : 2,
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: on ? 'var(--on-accent)' : 'var(--faint)',
            transition: 'inset-inline-start .25s ease',
          }}
        />
      </span>
    </button>
  );
}

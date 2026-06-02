import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from '@/App';
import { IDEAS } from '@/lib/ideas';
import { createDefaultState } from '@/lib/repository';
import { usePlayStore } from '@/store/play-store';

function reset() {
  localStorage.clear();
  const defaults = createDefaultState();
  usePlayStore.setState({ settings: defaults.settings, favs: defaults.favs });
}

beforeEach(reset);
afterEach(() => {
  vi.useRealTimers();
});

function ideaText(container: HTMLElement): string {
  return container.querySelector('.pl-idea')?.textContent ?? '';
}

describe('pick screen', () => {
  it('renders the three energy levels and is visible (no opacity-freeze)', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { name: /Your kid wants to play/ });
    expect(heading).toBeVisible();
    expect(getComputedStyle(heading).opacity).not.toBe('0');
    expect(screen.getByRole('button', { name: /Running on empty/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /A little left/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /I.?m good/ })).toBeInTheDocument();
  });
});

describe('one idea', () => {
  it('shows exactly one idea card after choosing a level', () => {
    const { container } = render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /A little left/ }));
    expect(container.querySelectorAll('.pl-idea')).toHaveLength(1);
  });

  it('"Another idea" swaps to a different idea', () => {
    const { container } = render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /A little left/ }));
    const first = ideaText(container);
    fireEvent.click(screen.getByRole('button', { name: /Another idea/ }));
    expect(ideaText(container)).not.toBe(first);
  });

  it('the empty tier shows the reassurance line and only low-energy ideas', () => {
    const { container } = render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /Running on empty/ }));
    expect(screen.getByText(/without getting up/)).toBeInTheDocument();

    const emptyTexts = new Set(IDEAS.filter((i) => i.energy === 'empty').map((i) => i.text));
    for (let n = 0; n < 6; n += 1) {
      expect(emptyTexts.has(ideaText(container))).toBe(true);
      fireEvent.click(screen.getByRole('button', { name: /Another idea/ }));
    }
  });
});

describe('favourites', () => {
  it('hearts an idea and shows it in the favourites view', () => {
    const { container } = render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /A little left/ }));
    const text = ideaText(container);
    fireEvent.click(screen.getByRole('button', { name: 'Love it' }));
    expect(usePlayStore.getState().favs).toHaveLength(1);

    fireEvent.click(screen.getByRole('button', { name: 'Favourites' }));
    expect(screen.getByRole('heading', { name: 'Saved ideas' })).toBeInTheDocument();
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});

describe('timer', () => {
  it('counts down', () => {
    vi.useFakeTimers();
    const { container } = render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /A little left/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Start timer' }));

    const before = container.querySelector('.pl-timer-time')?.textContent ?? '';
    expect(before).toMatch(/^\d{2}:\d{2}$/);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(container.querySelector('.pl-timer-time')?.textContent).not.toBe(before);
  });
});

describe('settings', () => {
  it('toggles the theme on the document element', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Settings' }));
    fireEvent.click(screen.getByRole('button', { name: 'Night' }));
    expect(usePlayStore.getState().settings.theme).toBe('night');
    expect(document.documentElement.getAttribute('data-theme')).toBe('night');
  });
});

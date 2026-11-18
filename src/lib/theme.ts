import { useState } from 'react';

export const THEMES = [
  { id: 'aurore', name: 'Aurore', c: ['#F1F3FF', '#5B5BF0', '#2FD6A3'] },
  { id: 'minuit', name: 'Minuit', c: ['#0E1022', '#7C83FF', '#34E0B0'] },
  { id: 'ocean', name: 'Océan', c: ['#E8F7F8', '#0891B2', '#34D399'] },
  { id: 'sunset', name: 'Crépuscule', c: ['#FFF3EA', '#F2542D', '#FBBF24'] },
  { id: 'foret', name: 'Forêt', c: ['#EEF4EA', '#2F7D4F', '#A3E635'] },
  { id: 'bonbon', name: 'Bonbon', c: ['#FFF0F7', '#DB2777', '#67E8F9'] },
  { id: 'graphite', name: 'Graphite', c: ['#111111', '#F5F5F5', '#FACC15'] },
];
const saved = () => { try { return localStorage.getItem('theme') || 'aurore'; } catch { return 'aurore'; } };
export function applyTheme(id: string) {
  document.documentElement.dataset.theme = id;
  document.querySelector('meta[name=theme-color]')?.setAttribute('content', THEMES.find((t) => t.id === id)?.c[0] ?? '#F1F3FF');
  try { localStorage.setItem('theme', id); } catch { /* ignoré */ }
}
export const initTheme = () => applyTheme(saved());
export function useTheme() {
  const [id, set] = useState(saved());
  return [id, (x: string) => { applyTheme(x); set(x); }] as const;
}

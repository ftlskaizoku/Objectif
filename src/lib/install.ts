import { useEffect, useState } from 'react';

type BIP = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };
let deferred: BIP | null = null;
let installed = false;
const subs = new Set<() => void>();
const emit = () => subs.forEach((f) => f());

/** À appeler tout de suite au démarrage : l'événement peut arriver avant le rendu React. */
export function initInstall() {
  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferred = e as BIP; emit(); });
  window.addEventListener('appinstalled', () => { deferred = null; installed = true; emit(); });
}
export const isStandalone = () =>
  matchMedia('(display-mode: standalone)').matches || (navigator as Navigator & { standalone?: boolean }).standalone === true;
export const isIOS = () =>
  /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

export function useInstall() {
  const [, tick] = useState(0);
  useEffect(() => {
    const f = () => tick((n) => n + 1);
    subs.add(f);
    return () => { subs.delete(f); };
  }, []);
  return {
    installed: installed || isStandalone(),
    ios: isIOS(),
    canPrompt: !!deferred,
    install: async () => { if (!deferred) return; await deferred.prompt(); await deferred.userChoice; deferred = null; emit(); },
  };
}

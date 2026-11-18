const P: Record<string, JSX.Element> = {
  today: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  calendar: <><rect x="3" y="4" width="18" height="18" rx="3" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
  goals: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /></>,
  themes: <><circle cx="12" cy="12" r="9" /><path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
};
export default function Icon({ n, size = 24 }: { n: string; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{P[n]}</svg>;
}

const f = (d: string) => <path d={d} fill="currentColor" fillOpacity=".16" stroke="none" />;
const P: Record<string, JSX.Element> = {
  today: <>{f('M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z')}<circle cx="12" cy="12" r="4" /><path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4L6 18M18 6l1.4-1.4" /></>,
  calendar: <>{f('M6 4h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3z')}<rect x="3" y="4" width="18" height="18" rx="3" /><path d="M16 2v4M8 2v4M3 10h18M8.5 15.5l2 2 4-4" /></>,
  goals: <>{f('M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z')}<circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1" fill="currentColor" /><path d="M12 12l7-7M19 5v3.5M19 5h-3.5" /></>,
  settings: <>{f('M4 4h16v16H4z')}<path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1" /><circle cx="15" cy="6" r="2" /><circle cx="9" cy="12" r="2" /><circle cx="17" cy="18" r="2" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  flame: <>{f('M12 3c1 3.5 5 5.5 5 10.5a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5 0 2 .8 3 2 3 0-3.5-1.5-5.5 1-9z')}<path d="M12 3c1 3.5 5 5.5 5 10.5a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5 0 2 .8 3 2 3 0-3.5-1.5-5.5 1-9z" /></>,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" strokeWidth="2.6" />,
  trophy: <>{f('M8 4h8v5a4 4 0 0 1-8 0z')}<path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H5v1a3 3 0 0 0 3 3M16 6h3v1a3 3 0 0 1-3 3M12 13v4M9 20h6M10 17h4" /></>,
  download: <>{f('M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3z')}<path d="M12 4v11M7.5 11l4.5 4.5 4.5-4.5M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" /></>,
  share: <><path d="M12 15V3M8 7l4-4 4 4M7 10H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-1" /></>,
  addbox: <>{f('M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z')}<rect x="3" y="3" width="18" height="18" rx="3" /><path d="M12 8v8M8 12h8" /></>,
  palette: <>{f('M12 3a9 9 0 1 0 0 18c1.6 0 2-1 1.5-2s0-2 1.5-2h2a4 4 0 0 0 4-4c0-5-4-10-9-10z')}<path d="M12 3a9 9 0 1 0 0 18c1.6 0 2-1 1.5-2s0-2 1.5-2h2a4 4 0 0 0 4-4c0-5-4-10-9-10z" /><circle cx="8" cy="11" r="1.2" fill="currentColor" /><circle cx="12" cy="7.5" r="1.2" fill="currentColor" /><circle cx="16" cy="10" r="1.2" fill="currentColor" /></>,
  user: <>{f('M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8z')}<circle cx="12" cy="8" r="4" /><path d="M4 20.5a8 8 0 0 1 16 0" /></>,
  logout: <path d="M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3M15 8l4 4-4 4M19 12H9" />,
  chevron: <path d="M9 6l6 6-6 6" />,
};
export default function Icon({ n, size = 24 }: { n: string; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{P[n]}</svg>;
}

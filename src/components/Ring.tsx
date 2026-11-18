export default function Ring({ pct, size = 72, label }: { pct: number; size?: number; label?: string }) {
  const r = size / 2 - 7, c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} role="img" aria-label={`${Math.round(pct * 100)} % accompli`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#DCE0FA" strokeWidth="7" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#5B5BF0" strokeWidth="7" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - Math.min(pct, 1))} style={{ transition: 'stroke-dashoffset .5s' }} />
      </svg>
      <span className="absolute inset-0 grid place-items-center font-display text-sm font-extrabold">{label ?? `${Math.round(pct * 100)}%`}</span>
    </div>
  );
}

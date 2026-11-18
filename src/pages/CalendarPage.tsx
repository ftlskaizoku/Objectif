import { useState } from 'react';
import { colorOf, dueOn, toggleDay, type Goal } from '../lib/goals';
import { fmt, parse, today } from '../lib/dates';

export default function CalendarPage({ goals, uid }: { goals: Goal[]; uid: string }) {
  const t = today();
  const [m, setM] = useState(() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); });
  const [sel, setSel] = useState(t);
  const lead = (m.getDay() + 6) % 7;
  const n = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
  const days = Array.from({ length: n }, (_, i) => fmt(new Date(m.getFullYear(), m.getMonth(), i + 1)));
  const shift = (k: number) => setM(new Date(m.getFullYear(), m.getMonth() + k, 1));
  const selDue = dueOn(goals, sel);
  return (
    <>
      <h1 className="mb-4 font-display text-4xl font-extrabold">Calendrier</h1>
      <div className="rounded-[28px] bg-card p-4">
        <div className="mb-3 flex items-center justify-between">
          <button onClick={() => shift(-1)} aria-label="Mois précédent" className="h-10 w-10 rounded-full bg-ink/10">‹</button>
          <h2 className="font-display text-lg font-extrabold capitalize">{m.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</h2>
          <button onClick={() => shift(1)} aria-label="Mois suivant" className="h-10 w-10 rounded-full bg-ink/10">›</button>
        </div>
        <div className="grid grid-cols-7 gap-1.5 text-center text-xs text-muted">{['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => <span key={i}>{d}</span>)}</div>
        <div className="mt-1.5 grid grid-cols-7 gap-1.5">
          {Array.from({ length: lead }, (_, i) => <span key={'b' + i} />)}
          {days.map((d) => {
            const due = dueOn(goals, d), ok = due.filter((g) => g.completedDays.includes(d));
            const all = due.length > 0 && ok.length === due.length;
            return (
              <button key={d} onClick={() => setSel(d)} aria-label={d}
                className={`flex aspect-square flex-col items-center justify-center gap-0.5 rounded-2xl text-sm font-bold ${all ? 'bg-mint text-onmint' : 'bg-ink/5'} ${d === sel ? 'ring-2 ring-iris' : ''} ${d === t && !all ? 'text-iris' : ''}`}>
                {parse(d).getDate()}
                <span className="flex h-1.5 gap-0.5">
                  {!all && due.slice(0, 4).map((g) => <i key={g.id} className="h-1.5 w-1.5 rounded-full" style={{ background: g.completedDays.includes(d) ? colorOf(g.id) : 'transparent', border: `1.5px solid ${colorOf(g.id)}` }} />)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <h2 className="mt-6 mb-3 font-display text-xl font-extrabold capitalize">{parse(sel).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</h2>
      {!selDue.length && <p className="rounded-3xl bg-card p-5 text-muted">Aucun objectif ce jour-là.</p>}
      <div className="flex flex-col gap-3">
        {selDue.map((g) => {
          const ok = g.completedDays.includes(sel);
          return (
            <div key={g.id} className="flex items-center gap-3 rounded-3xl bg-card p-3 pl-4">
              <span className="h-8 w-1.5 rounded-full" style={{ background: colorOf(g.id) }} />
              <p className="flex-1 truncate font-bold">{g.title}</p>
              {sel === t
                ? <button onClick={() => toggleDay(uid, g, sel)} aria-pressed={ok} className={`rounded-2xl px-4 py-2.5 text-sm font-bold ${ok ? 'bg-mint text-onmint' : 'bg-iris text-onacc'}`}>{ok ? '✓ Fait' : 'Cocher'}</button>
                : <span className={`rounded-2xl px-3 py-2 text-sm font-bold ${ok ? 'bg-mint text-onmint' : sel < t ? 'bg-rose/50' : 'bg-ink/10 text-muted'}`}>{ok ? '✓ Fait' : sel < t ? 'Manqué' : 'À venir'}</span>}
            </div>
          );
        })}
      </div>
    </>
  );
}

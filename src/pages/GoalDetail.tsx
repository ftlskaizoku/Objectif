import type { Goal } from '../lib/goals';
import type { User } from 'firebase/auth';
import { statusOf, streakOf, toggleDay, removeGoal } from '../lib/goals';
import { addDays, parse, prettyDate, today } from '../lib/dates';
import Ring from '../components/Ring';
import type { View } from '../App';

export default function GoalDetail({ user, goals, id, go }: { user: User; goals: Goal[]; id: string; go: (v: View) => void }) {
  const g = goals.find((x) => x.id === id);
  if (!g) return <button onClick={() => go({ name: 'home' })} className="text-iris">‹ Retour</button>;
  const t = today(), st = statusOf(g);
  const days = Array.from({ length: g.durationDays }, (_, i) => addDays(g.startDate, i));
  const lead = (parse(g.startDate).getDay() + 6) % 7; // semaine commençant le lundi
  return (
    <>
      <button onClick={() => go({ name: 'home' })} className="mb-4 text-sm font-medium text-iris">‹ Retour</button>
      <h1 className="font-display text-4xl font-extrabold leading-tight">{g.title}</h1>
      <p className="mt-1 text-muted">Du {prettyDate(g.startDate)} au {prettyDate(g.endDate)}</p>
      <div className="my-6 flex items-center gap-5 rounded-[28px] bg-card p-5">
        <Ring size={96} pct={g.completedDays.length / g.durationDays} />
        <div>
          <p className="font-display text-2xl font-extrabold">{g.completedDays.length} / {g.durationDays} jours</p>
          <p className="text-muted">Série en cours : {streakOf(g)} jour{streakOf(g) > 1 ? 's' : ''}</p>
          <p className="text-sm font-medium text-iris">{st === 'completed' ? 'Objectif atteint 🎉' : st === 'failed' ? 'Échéance dépassée' : 'En cours'}</p>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center text-xs text-muted">{['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => <span key={i}>{d}</span>)}</div>
      <div className="mt-2 grid grid-cols-7 gap-2">
        {Array.from({ length: lead }, (_, i) => <span key={'b' + i} />)}
        {days.map((d) => {
          const done = g.completedDays.includes(d), isToday = d === t, missed = d < t && !done;
          const cls = done ? 'bg-mint text-onmint' : missed ? 'bg-rose/50 text-muted' : isToday ? 'bg-card ring-2 ring-iris' : 'bg-card/60 text-muted';
          return (
            <button key={d} disabled={!isToday} onClick={() => toggleDay(user.uid, g, d)} aria-label={`${prettyDate(d)}${done ? ', fait' : ''}`}
              className={`aspect-square rounded-2xl text-sm font-bold ${cls} ${isToday ? 'active:scale-95' : ''}`}>{parse(d).getDate()}</button>
          );
        })}
      </div>
      <p className="mt-3 text-sm text-muted">Seul le jour d’aujourd’hui peut être coché.</p>
      <button onClick={() => { if (confirm('Supprimer cet objectif ?')) { removeGoal(user.uid, g.id); go({ name: 'home' }); } }}
        className="mt-10 text-sm font-medium text-red-600">Supprimer l’objectif</button>
    </>
  );
}

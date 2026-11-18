import { statusOf, type Goal } from '../lib/goals';
import { prettyDate, today } from '../lib/dates';
import Ring from './Ring';

export default function GoalCard({ g, onOpen }: { g: Goal; onOpen: () => void }) {
  const st = statusOf(g);
  const sub = st === 'completed' ? 'Objectif atteint' : st === 'failed' ? `Terminé le ${prettyDate(g.endDate)}`
    : today() < g.startDate ? `Commence le ${prettyDate(g.startDate)}` : `${g.completedDays.length} / ${g.durationDays} jours · fin le ${prettyDate(g.endDate)}`;
  return (
    <button onClick={onOpen} className="flex w-full items-center gap-4 rounded-[28px] bg-card p-4 text-left shadow-sm active:scale-[.99]">
      <Ring pct={g.completedDays.length / g.durationDays} color={st === 'failed' ? 'var(--miss)' : st === 'completed' ? 'var(--done)' : 'var(--accent)'} />
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-display text-lg font-extrabold">{g.title}</h3>
        <p className="text-sm text-muted">{sub}</p>
      </div>
    </button>
  );
}

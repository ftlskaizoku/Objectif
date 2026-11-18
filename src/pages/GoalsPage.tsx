import { useState } from 'react';
import { statusOf, type Goal, type Status } from '../lib/goals';
import GoalCard from '../components/GoalCard';
import type { View } from '../App';

const TABS: [Status, string][] = [['active', 'En cours'], ['completed', 'Atteints'], ['failed', 'Échoués']];
export default function GoalsPage({ goals, go }: { goals: Goal[]; go: (v: View) => void }) {
  const [f, setF] = useState<Status>('active');
  const list = goals.filter((g) => statusOf(g) === f);
  return (
    <>
      <h1 className="mb-4 font-display text-4xl font-extrabold">Objectifs</h1>
      <div className="mb-5 flex gap-2">
        {TABS.map(([k, l]) => <button key={k} onClick={() => setF(k)} aria-pressed={f === k} className={`rounded-full px-4 py-2 text-sm font-bold ${f === k ? 'bg-iris text-onacc' : 'bg-card text-muted'}`}>{l} · {goals.filter((g) => statusOf(g) === k).length}</button>)}
      </div>
      {!list.length && <p className="rounded-3xl bg-card p-5 text-muted">Rien ici pour l’instant.</p>}
      <div className="flex flex-col gap-3">{list.map((g) => <GoalCard key={g.id} g={g} onOpen={() => go({ name: 'goal', id: g.id })} />)}</div>
    </>
  );
}

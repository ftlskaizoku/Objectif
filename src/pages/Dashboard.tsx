import type { User } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useGoals, statusOf, toggleDay, type Goal } from '../lib/goals';
import { today, prettyDate } from '../lib/dates';
import Ring from '../components/Ring';
import type { View } from '../App';

function Card({ g, uid, go }: { g: Goal; uid: string; go: (v: View) => void }) {
  const t = today(), st = statusOf(g), done = g.completedDays.includes(t);
  const inRange = t >= g.startDate && t <= g.endDate;
  return (
    <article className="rounded-[28px] bg-white p-4 shadow-[0_8px_30px_-12px_rgba(91,91,240,.35)]">
      <button onClick={() => go({ name: 'goal', id: g.id })} className="flex w-full items-center gap-4 text-left">
        <Ring pct={g.completedDays.length / g.durationDays} />
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-display text-xl font-extrabold">{g.title}</h3>
          <p className="text-sm text-ink/60">
            {st === 'completed' ? 'Objectif atteint 🎉' : st === 'failed' ? `Terminé le ${prettyDate(g.endDate)}` : t < g.startDate ? `Commence le ${prettyDate(g.startDate)}` : `${g.completedDays.length} / ${g.durationDays} jours`}
          </p>
        </div>
      </button>
      {st === 'active' && inRange && (
        <button onClick={() => toggleDay(uid, g, t)} aria-pressed={done}
          className={`mt-4 w-full rounded-2xl py-3.5 font-bold transition active:scale-[.98] ${done ? 'bg-mint text-ink' : 'bg-iris text-white'}`}>
          {done ? '✓ Fait aujourd’hui' : 'Marquer comme fait'}
        </button>
      )}
    </article>
  );
}

export default function Dashboard({ user, go }: { user: User; go: (v: View) => void }) {
  const goals = useGoals(user.uid);
  const active = goals?.filter((g) => statusOf(g) === 'active') ?? [];
  const past = goals?.filter((g) => statusOf(g) !== 'active') ?? [];
  return (
    <>
      <header className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-ink/60">{new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
          <h1 className="font-display text-4xl font-extrabold">Aujourd’hui</h1>
        </div>
        <button onClick={() => signOut(auth)} className="text-sm font-medium text-ink/60">Déconnexion</button>
      </header>
      {goals === null && <p className="text-ink/60">Chargement…</p>}
      {goals?.length === 0 && <p className="rounded-3xl bg-white p-6 text-ink/70">Aucun objectif pour l’instant. Crée le premier : choisis une date de début et une durée.</p>}
      <div className="flex flex-col gap-4">{active.map((g) => <Card key={g.id} g={g} uid={user.uid} go={go} />)}</div>
      {past.length > 0 && <>
        <h2 className="mt-9 mb-3 font-display text-xl font-extrabold">Historique</h2>
        <div className="flex flex-col gap-4 opacity-80">{past.map((g) => <Card key={g.id} g={g} uid={user.uid} go={go} />)}</div>
      </>}
      <button onClick={() => go({ name: 'new' })} aria-label="Nouvel objectif"
        className="fixed bottom-6 right-6 grid h-16 w-16 place-items-center rounded-full bg-ink text-3xl text-white shadow-xl active:scale-95">+</button>
    </>
  );
}

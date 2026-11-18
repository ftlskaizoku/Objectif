import { statusOf, streakOf, dueOn, colorOf, toggleDay, type Goal } from '../lib/goals';
import { addDays, parse, today } from '../lib/dates';
import Ring from '../components/Ring';
import Icon from '../components/Icon';
import InstallCard from '../components/InstallCard';
import type { View } from '../App';

export default function Dashboard({ goals, uid, name, go }: { goals: Goal[]; uid: string; name: string | null; go: (v: View) => void }) {
  const t = today();
  const due = dueOn(goals, t).filter((g) => statusOf(g) !== 'failed');
  const done = due.filter((g) => g.completedDays.includes(t)).length;
  const pct = due.length ? done / due.length : 0;
  const active = goals.filter((g) => statusOf(g) === 'active');
  const completed = goals.filter((g) => statusOf(g) === 'completed').length;
  const failed = goals.filter((g) => statusOf(g) === 'failed').length;
  const best = Math.max(0, ...active.map(streakOf));
  const rate = completed + failed ? Math.round((completed / (completed + failed)) * 100) : null;
  const week = Array.from({ length: 7 }, (_, i) => addDays(t, i - 6));
  const msg = !due.length ? 'Rien de prévu aujourd’hui.' : done === due.length ? 'Journée parfaite !' : `Encore ${due.length - done} à cocher.`;
  const tile = 'flex flex-col items-center rounded-3xl bg-card p-4';
  return (
    <>
      <p className="text-sm text-muted">{new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
      <h1 className="mb-5 font-display text-4xl font-extrabold">Bonjour{name ? `, ${name.split(' ')[0]}` : ''}</h1>
      <InstallCard banner />

      <section className="flex items-center gap-5 rounded-[32px] bg-gradient-to-br from-iris to-iris2 p-6 text-onacc shadow-lg">
        <Ring size={104} pct={pct} label={`${done}/${due.length}`} color="currentColor" track="rgb(255 255 255 / .25)" />
        <div>
          <p className="font-display text-2xl font-extrabold leading-tight">{msg}</p>
          <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-sm font-medium"><Icon n="flame" size={16} />{best} jour{best > 1 ? 's' : ''} de série</p>
        </div>
      </section>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <div className={tile}><span className="text-iris"><Icon n="goals" size={22} /></span><p className="font-display text-3xl font-extrabold">{active.length}</p><p className="text-xs text-muted">en cours</p></div>
        <div className={tile}><span className="text-iris"><Icon n="trophy" size={22} /></span><p className="font-display text-3xl font-extrabold">{completed}</p><p className="text-xs text-muted">atteints</p></div>
        <div className={tile}><span className="text-iris"><Icon n="check" size={22} /></span><p className="font-display text-3xl font-extrabold">{rate === null ? '–' : `${rate}%`}</p><p className="text-xs text-muted">réussite</p></div>
      </div>

      <div className="mt-4 flex justify-between rounded-3xl bg-card p-4" aria-label="7 derniers jours">
        {week.map((d) => {
          const dd = dueOn(goals, d), n = dd.filter((g) => g.completedDays.includes(d)).length;
          const full = dd.length > 0 && n === dd.length;
          return (
            <div key={d} className="flex flex-col items-center gap-1.5">
              <span className="text-[11px] text-muted">{parse(d).toLocaleDateString('fr-FR', { weekday: 'narrow' })}</span>
              <span className={`grid h-8 w-8 place-items-center rounded-full text-xs font-bold ${full ? 'bg-mint text-onmint' : n > 0 ? 'bg-mint/40' : 'bg-ink/10 text-muted'} ${d === t ? 'ring-2 ring-iris' : ''}`}>{parse(d).getDate()}</span>
            </div>
          );
        })}
      </div>

      <h2 className="mt-7 mb-3 font-display text-xl font-extrabold">À faire aujourd’hui</h2>
      {!goals.length && <p className="rounded-3xl bg-card p-5 text-muted">Aucun objectif pour l’instant. Touche le bouton + pour créer le premier.</p>}
      {goals.length > 0 && !due.length && <p className="rounded-3xl bg-card p-5 text-muted">Aucun objectif à cocher aujourd’hui.</p>}
      <div className="flex flex-col gap-3">
        {due.map((g) => {
          const ok = g.completedDays.includes(t);
          return (
            <div key={g.id} className="flex items-center gap-3 rounded-3xl bg-card p-3 pl-4">
              <span className="h-10 w-1.5 rounded-full" style={{ background: colorOf(g.id) }} />
              <button onClick={() => go({ name: 'goal', id: g.id })} className="min-w-0 flex-1 text-left">
                <p className="truncate font-bold">{g.title}</p>
                <p className="text-xs text-muted">Jour {Math.min(g.durationDays, Math.round((parse(t).getTime() - parse(g.startDate).getTime()) / 864e5) + 1)} / {g.durationDays} · série {streakOf(g)}</p>
              </button>
              <button onClick={() => toggleDay(uid, g, t)} aria-pressed={ok} aria-label={ok ? 'Décocher' : 'Cocher'}
                className={`grid h-12 w-12 place-items-center rounded-2xl text-xl font-bold transition ${ok ? 'pop bg-mint text-onmint' : 'bg-ink/10 text-ink/25'}`}><Icon n="check" size={24} /></button>
            </div>
          );
        })}
      </div>
    </>
  );
}

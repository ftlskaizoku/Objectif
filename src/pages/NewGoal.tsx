import { useState } from 'react';
import type { User } from 'firebase/auth';
import { createGoal } from '../lib/goals';
import { addDays, prettyDate, today } from '../lib/dates';
import type { View } from '../App';

export default function NewGoal({ user, go }: { user: User; go: (v: View) => void }) {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState(today());
  const [days, setDays] = useState(30);
  const valid = title.trim() && days >= 1 && days <= 365;
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    createGoal(user.uid, title.trim(), start, days); // sans await : fonctionne aussi hors-ligne
    go({ name: 'home' });
  };
  const field = 'mt-1.5 w-full rounded-2xl bg-white px-4 py-3.5';
  return (
    <form onSubmit={submit}>
      <button type="button" onClick={() => go({ name: 'home' })} className="mb-4 text-sm font-medium text-iris">‹ Retour</button>
      <h1 className="mb-6 font-display text-4xl font-extrabold">Nouvel objectif</h1>
      <label className="block font-medium">Que veux-tu accomplir ?
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex. Lire 20 pages" className={field} maxLength={60} />
      </label>
      <label className="mt-5 block font-medium">Date de début
        <input type="date" value={start} onChange={(e) => setStart(e.target.value)} className={field} />
      </label>
      <label className="mt-5 block font-medium">Durée (en jours)
        <input type="number" inputMode="numeric" min={1} max={365} value={days} onChange={(e) => setDays(Number(e.target.value))} className={field} />
      </label>
      {days >= 1 && <p className="mt-5 rounded-2xl bg-iris/10 p-4 text-iris">Échéance : <b>{prettyDate(addDays(start, days - 1))}</b></p>}
      <button disabled={!valid} className="mt-8 w-full rounded-2xl bg-iris py-4 font-bold text-white disabled:opacity-40 active:scale-[.98]">Créer l’objectif</button>
    </form>
  );
}

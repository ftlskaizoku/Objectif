import { signOut, type User } from 'firebase/auth';
import { auth } from '../firebase';
import { THEMES, useTheme } from '../lib/theme';

export default function Settings({ user }: { user: User }) {
  const [cur, set] = useTheme();
  return (
    <>
      <h1 className="mb-1 font-display text-4xl font-extrabold">Thèmes</h1>
      <p className="mb-5 text-muted">Choisis l’ambiance de l’app. Elle est gardée sur cet appareil.</p>
      <div className="grid grid-cols-2 gap-3">
        {THEMES.map((t) => (
          <button key={t.id} onClick={() => set(t.id)} aria-pressed={cur === t.id}
            className={`rounded-3xl p-3 text-left ${cur === t.id ? 'ring-[3px] ring-iris' : 'ring-1 ring-ink/10'}`} style={{ background: t.c[0] }}>
            <div className="flex -space-x-2">{t.c.map((c, i) => <span key={i} className="h-8 w-8 rounded-full border-2" style={{ background: c, borderColor: t.c[0] }} />)}</div>
            <p className="mt-3 font-display font-extrabold" style={{ color: t.id === 'minuit' || t.id === 'graphite' ? '#fff' : '#14173A' }}>{t.name}{cur === t.id ? ' ✓' : ''}</p>
          </button>
        ))}
      </div>
      <div className="mt-8 rounded-3xl bg-card p-5">
        <p className="text-sm text-muted">Connecté avec</p>
        <p className="font-bold">{user.email}</p>
        <button onClick={() => signOut(auth)} className="mt-4 rounded-2xl bg-ink/10 px-4 py-2.5 text-sm font-bold">Se déconnecter</button>
      </div>
    </>
  );
}

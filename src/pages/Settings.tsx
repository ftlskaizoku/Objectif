import { signOut, type User } from 'firebase/auth';
import { auth } from '../firebase';
import { THEMES, useTheme } from '../lib/theme';
import InstallCard from '../components/InstallCard';
import Icon from '../components/Icon';

export default function Settings({ user }: { user: User }) {
  const [cur, set] = useTheme();
  const h = 'mt-7 mb-3 flex items-center gap-2 font-display text-xl font-extrabold';
  return (
    <>
      <h1 className="mb-1 font-display text-4xl font-extrabold">Réglages</h1>
      <p className="mb-5 text-muted">Installation, ambiance et compte.</p>

      <h2 className={h.replace('mt-7', 'mt-0')}><Icon n="download" size={22} />Application</h2>
      <InstallCard />

      <h2 className={h}><Icon n="palette" size={22} />Thèmes</h2>
      <div className="grid grid-cols-2 gap-3">
        {THEMES.map((t) => (
          <button key={t.id} onClick={() => set(t.id)} aria-pressed={cur === t.id}
            className={`rounded-3xl p-3 text-left ${cur === t.id ? 'ring-[3px] ring-iris' : 'ring-1 ring-ink/10'}`} style={{ background: t.c[0] }}>
            <div className="flex -space-x-2">{t.c.map((c, i) => <span key={i} className="h-8 w-8 rounded-full border-2" style={{ background: c, borderColor: t.c[0] }} />)}</div>
            <p className="mt-3 font-display font-extrabold" style={{ color: t.id === 'minuit' || t.id === 'graphite' ? '#fff' : '#14173A' }}>{t.name}{cur === t.id ? ' ✓' : ''}</p>
          </button>
        ))}
      </div>

      <h2 className={h}><Icon n="user" size={22} />Compte</h2>
      <div className="rounded-3xl bg-card p-5">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-iris to-iris2 font-display text-lg font-extrabold text-onacc">{(user.displayName || user.email || '?')[0].toUpperCase()}</span>
          <div className="min-w-0"><p className="truncate font-bold">{user.displayName || 'Mon compte'}</p><p className="truncate text-sm text-muted">{user.email}</p></div>
        </div>
        <button onClick={() => signOut(auth)} className="mt-4 flex items-center gap-2 rounded-2xl bg-ink/10 px-4 py-2.5 text-sm font-bold"><Icon n="logout" size={18} />Se déconnecter</button>
      </div>
    </>
  );
}

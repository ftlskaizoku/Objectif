import { useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from './firebase';
import { useGoals } from './lib/goals';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CalendarPage from './pages/CalendarPage';
import GoalsPage from './pages/GoalsPage';
import Settings from './pages/Settings';
import NewGoal from './pages/NewGoal';
import GoalDetail from './pages/GoalDetail';
import Icon from './components/Icon';

export type View = { name: 'home' | 'calendar' | 'goals' | 'settings' | 'new' } | { name: 'goal'; id: string };

function Shell({ user }: { user: User }) {
  const { goals, error } = useGoals(user.uid);
  const [view, setView] = useState<View>(() => (new URLSearchParams(location.search).has('new') ? { name: 'new' } : { name: 'home' }));
  const go = setView;
  const tab = (name: 'home' | 'calendar' | 'goals' | 'settings', icon: string, label: string) => (
    <button onClick={() => go({ name })} aria-current={view.name === name} className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-medium ${view.name === name ? 'text-iris' : 'text-muted'}`}>
      <Icon n={icon} size={22} />{label}
    </button>
  );
  const full = view.name === 'new' || view.name === 'goal';
  return (
    <main className="mx-auto min-h-screen max-w-md px-5 pb-32 pt-6">
      {error && <p role="alert" className="mb-4 rounded-2xl bg-rose/40 p-4 text-sm font-medium">{error}</p>}
      {goals === null ? <p className="text-muted">Chargement…</p> : <>
        {view.name === 'home' && <Dashboard goals={goals} uid={user.uid} name={user.displayName} go={go} />}
        {view.name === 'calendar' && <CalendarPage goals={goals} uid={user.uid} />}
        {view.name === 'goals' && <GoalsPage goals={goals} go={go} />}
        {view.name === 'settings' && <Settings user={user} />}
        {view.name === 'new' && <NewGoal user={user} go={go} />}
        {view.name === 'goal' && <GoalDetail user={user} goals={goals} id={view.id} go={go} />}
      </>}
      {!full && (
        <nav className="fixed inset-x-4 bottom-4 mx-auto flex max-w-md items-center rounded-[28px] bg-card/90 px-2 shadow-xl backdrop-blur" style={{ marginBottom: 'env(safe-area-inset-bottom)' }}>
          {tab('home', 'today', 'Aujourd’hui')}{tab('calendar', 'calendar', 'Calendrier')}
          <button onClick={() => go({ name: 'new' })} aria-label="Nouvel objectif" className="-mt-7 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-iris to-iris2 text-onacc shadow-lg active:scale-95"><Icon n="plus" size={28} /></button>
          {tab('goals', 'goals', 'Objectifs')}{tab('settings', 'settings', 'Réglages')}
        </nav>
      )}
    </main>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  useEffect(() => onAuthStateChanged(auth, setUser), []);
  if (user === undefined) return <div className="grid min-h-screen place-items-center text-iris">Chargement…</div>;
  return user ? <Shell user={user} /> : <Login />;
}

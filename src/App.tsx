import { useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from './firebase';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NewGoal from './pages/NewGoal';
import GoalDetail from './pages/GoalDetail';

export type View = { name: 'home' } | { name: 'new' } | { name: 'goal'; id: string };

export default function App() {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [view, setView] = useState<View>({ name: 'home' });
  useEffect(() => onAuthStateChanged(auth, setUser), []);

  if (user === undefined) return <div className="grid min-h-screen place-items-center text-iris">Chargement…</div>;
  if (!user) return <Login />;
  return (
    <main className="mx-auto min-h-screen max-w-md px-5 pb-10 pt-6">
      {view.name === 'home' && <Dashboard user={user} go={setView} />}
      {view.name === 'new' && <NewGoal user={user} go={setView} />}
      {view.name === 'goal' && <GoalDetail user={user} id={view.id} go={setView} />}
    </main>
  );
}

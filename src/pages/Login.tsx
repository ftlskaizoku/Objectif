import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, google } from '../firebase';

const messages: Record<string, string> = {
  'auth/invalid-credential': 'Email ou mot de passe incorrect.',
  'auth/email-already-in-use': 'Cet email a déjà un compte. Connecte-toi.',
  'auth/weak-password': 'Choisis un mot de passe de 6 caractères minimum.',
  'auth/invalid-email': 'Cet email n’est pas valide.',
};

export default function Login() {
  const [signup, setSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const run = async (fn: () => Promise<unknown>) => {
    setError('');
    try { await fn(); } catch (e: any) { setError(messages[e.code] ?? 'Connexion impossible. Réessaie dans un instant.'); }
  };

  return (
    <main className="relative mx-auto flex min-h-screen max-w-md flex-col justify-center overflow-hidden px-6">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-iris/30 blur-3xl" />
      <h1 className="font-display text-6xl font-extrabold leading-none tracking-tight">Objectif</h1>
      <p className="mt-3 mb-10 text-lg text-muted">Fixe une échéance. Coche chaque jour. Va au bout.</p>
      <button onClick={() => run(() => signInWithPopup(auth, google))}
        className="rounded-2xl bg-ink px-5 py-4 font-bold text-paper active:scale-[.98]">Continuer avec Google</button>
      <p className="my-5 text-center text-sm text-muted">ou avec ton email</p>
      <form onSubmit={(e) => { e.preventDefault(); run(() => (signup ? createUserWithEmailAndPassword : signInWithEmailAndPassword)(auth, email, password)); }}
        className="flex flex-col gap-3">
        <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-2xl bg-card px-4 py-3.5" />
        <input type="password" required placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-2xl bg-card px-4 py-3.5" />
        {error && <p role="alert" className="text-sm font-medium text-red-600">{error}</p>}
        <button className="rounded-2xl bg-iris px-5 py-4 font-bold text-onacc active:scale-[.98]">{signup ? 'Créer mon compte' : 'Se connecter'}</button>
      </form>
      <button onClick={() => setSignup(!signup)} className="mt-5 text-sm font-medium text-iris">
        {signup ? 'J’ai déjà un compte' : 'Pas encore de compte ? Inscris-toi'}
      </button>
    </main>
  );
}

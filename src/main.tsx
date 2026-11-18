import { createRoot } from 'react-dom/client';
import './index.css';
import { initTheme } from './lib/theme';

initTheme();
const root = createRoot(document.getElementById('root')!);
if (!import.meta.env.VITE_FIREBASE_API_KEY) {
  root.render(
    <div className="mx-auto max-w-md p-8">
      <h1 className="font-display text-3xl font-extrabold">Configuration manquante</h1>
      <p className="mt-3 text-muted">Ajoute VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID et VITE_FIREBASE_APP_ID dans Vercel (Settings, Environment Variables), puis redéploie.</p>
    </div>,
  );
} else {
  import('./App').then((m) => root.render(<m.default />));
}

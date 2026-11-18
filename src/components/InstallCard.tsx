import { useState } from 'react';
import { useInstall } from '../lib/install';
import Icon from './Icon';

const KEY = 'install-dismissed';
const seen = () => { try { return localStorage.getItem(KEY) === '1'; } catch { return false; } };

export default function InstallCard({ banner = false }: { banner?: boolean }) {
  const { installed, ios, canPrompt, install } = useInstall();
  const [hidden, setHidden] = useState(banner && seen());
  if (hidden || (banner && (installed || (!canPrompt && !ios)))) return null;
  const close = () => { try { localStorage.setItem(KEY, '1'); } catch { /* ignoré */ } setHidden(true); };
  const step = (i: number, icon: string, txt: React.ReactNode) => (
    <li className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-iris/15 text-iris"><Icon n={icon} size={20} /></span><span className="text-sm"><b>{i}.</b> {txt}</span></li>
  );
  return (
    <section className={`${banner ? 'mb-5' : ''} rounded-3xl bg-card p-5 ring-1 ring-iris/20`}>
      <div className="flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-iris to-iris2 text-onacc"><Icon n={installed ? 'check' : 'download'} size={24} /></span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg font-extrabold leading-tight">{installed ? 'Application installée' : 'Installe Objectif'}</p>
          <p className="text-sm text-muted">{installed ? 'Tu l’utilises en mode application.' : 'Accès direct depuis ton écran d’accueil, plein écran, même hors connexion.'}</p>
        </div>
        {banner && <button onClick={close} aria-label="Fermer" className="px-1 text-xl leading-none text-muted">×</button>}
      </div>
      {!installed && canPrompt && <button onClick={install} className="mt-4 w-full rounded-2xl bg-gradient-to-br from-iris to-iris2 py-3 font-bold text-onacc active:scale-95">Installer l’application</button>}
      {!installed && !canPrompt && ios && (
        <ol className="mt-4 flex flex-col gap-3">
          {step(1, 'share', <>Dans <b>Safari</b>, touche le bouton Partager</>)}
          {step(2, 'addbox', <>Choisis « Sur l’écran d’accueil »</>)}
          {step(3, 'check', <>Touche « Ajouter »</>)}
        </ol>
      )}
      {!installed && !canPrompt && !ios && (
        <p className="mt-4 rounded-2xl bg-ink/5 p-3 text-sm text-muted">Sur Chrome ou Edge, clique sur l’icône d’installation dans la barre d’adresse. Sur Android : menu ⋮ puis « Installer l’application ». Sur Safari (Mac) : Fichier puis « Ajouter au Dock ».</p>
      )}
    </section>
  );
}

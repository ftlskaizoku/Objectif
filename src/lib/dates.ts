// Toutes les dates sont des chaînes "YYYY-MM-DD" en heure LOCALE du téléphone.
export const fmt = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
export const parse = (s: string) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
export const today = () => fmt(new Date());
export const addDays = (s: string, n: number) => { const d = parse(s); d.setDate(d.getDate() + n); return fmt(d); };
export const prettyDate = (s: string) => parse(s).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });

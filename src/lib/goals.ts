import { useEffect, useState } from 'react';
import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { addDays, today } from './dates';

export type Goal = { id: string; title: string; startDate: string; durationDays: number; endDate: string; completedDays: string[] };
export type Status = 'active' | 'completed' | 'failed';

export function useGoals(uid: string) {
  const [s, setS] = useState<{ goals: Goal[] | null; error: string }>({ goals: null, error: '' });
  useEffect(() => onSnapshot(
    query(collection(db, 'users', uid, 'goals'), orderBy('createdAt', 'desc')),
    (snap) => setS({ goals: snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Goal), error: '' }),
    (err) => setS({ goals: [], error: err.code === 'permission-denied'
      ? 'Accès refusé : publie les règles Firestore (fichier firestore.rules).'
      : `Impossible de charger tes objectifs (${err.code}). Vérifie que la base Firestore est créée.` }),
  ), [uid]);
  return s;
}

export const dueOn = (goals: Goal[], day: string) => goals.filter((g) => day >= g.startDate && day <= g.endDate);
export const colorOf = (id: string) => {
  let h = 0; for (const c of id) h = (h * 31 + c.charCodeAt(0)) % 360;
  return `hsl(${h} 70% 55%)`;
};

export const createGoal = (uid: string, title: string, startDate: string, durationDays: number) =>
  addDoc(collection(db, 'users', uid, 'goals'), {
    title, startDate, durationDays, endDate: addDays(startDate, durationDays - 1), completedDays: [], createdAt: serverTimestamp(),
  });

export const toggleDay = (uid: string, g: Goal, day: string) =>
  updateDoc(doc(db, 'users', uid, 'goals', g.id), {
    completedDays: g.completedDays.includes(day) ? arrayRemove(day) : arrayUnion(day),
  });

export const removeGoal = (uid: string, id: string) => deleteDoc(doc(db, 'users', uid, 'goals', id));

export const statusOf = (g: Goal): Status =>
  g.completedDays.length >= g.durationDays ? 'completed' : today() > g.endDate ? 'failed' : 'active';

export function streakOf(g: Goal) {
  let d = today();
  if (!g.completedDays.includes(d)) d = addDays(d, -1);
  let n = 0;
  while (g.completedDays.includes(d)) { n++; d = addDays(d, -1); }
  return n;
}

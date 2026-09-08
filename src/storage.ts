import type { Task } from './types';

const STORAGE_KEY = 'taskflow.tasks.v1';

function makeId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function seedTasks(): Task[] {
  const now = Date.now();
  return [
    {
      id: makeId(),
      title: 'Wire up the drag-and-drop columns',
      notes: 'Use native HTML5 drag events, no external library.',
      status: 'done',
      priority: 'medium',
      dueDate: null,
      createdAt: now - 300000,
    },
    {
      id: makeId(),
      title: 'Add priority filter to the board',
      notes: 'Should combine with the text search without conflicting.',
      status: 'progress',
      priority: 'high',
      dueDate: null,
      createdAt: now - 200000,
    },
    {
      id: makeId(),
      title: 'Write the project README',
      notes: 'Cover setup, tech stack, and a couple of screenshots.',
      status: 'todo',
      priority: 'low',
      dueDate: null,
      createdAt: now - 100000,
    },
    {
      id: makeId(),
      title: 'Deploy to Vercel and link it from the resume',
      notes: '',
      status: 'todo',
      priority: 'high',
      dueDate: null,
      createdAt: now,
    },
  ];
}

export function loadTasks(): Task[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seeded = seedTasks();
      saveTasks(seeded);
      return seeded;
    }
    const parsed = JSON.parse(raw) as Task[];
    if (!Array.isArray(parsed)) throw new Error('corrupt store');
    return parsed;
  } catch {
    const seeded = seedTasks();
    saveTasks(seeded);
    return seeded;
  }
}

export function saveTasks(tasks: Task[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // Storage can fail (private browsing, quota). The board still works
    // in-memory for the session even if persistence silently fails.
  }
}

export { makeId };

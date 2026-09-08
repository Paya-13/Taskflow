export type Status = 'todo' | 'progress' | 'done';

export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  notes: string;
  status: Status;
  priority: Priority;
  dueDate: string | null; // ISO date string, e.g. "2026-09-15"
  createdAt: number;
}

export const STATUS_LABELS: Record<Status, string> = {
  todo: 'To do',
  progress: 'In progress',
  done: 'Done',
};

export const STATUS_ORDER: Status[] = ['todo', 'progress', 'done'];

export const PRIORITY_LABELS: Record<Priority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

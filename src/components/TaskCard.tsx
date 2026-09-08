import type { Task } from '../types';
import { PRIORITY_LABELS } from '../types';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onToggleDone: (id: string) => void;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  isDragging: boolean;
}

function formatDueDate(iso: string): string {
  const date = new Date(iso + 'T00:00:00');
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

function isOverdue(iso: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(iso + 'T00:00:00');
  return due.getTime() < today.getTime();
}

export function TaskCard({
  task,
  onDelete,
  onToggleDone,
  onDragStart,
  onDragEnd,
  isDragging,
}: TaskCardProps) {
  const overdue = task.dueDate ? isOverdue(task.dueDate) && task.status !== 'done' : false;

  return (
    <div
      className={`task-card${isDragging ? ' dragging' : ''}`}
      style={{ ['--priority-border' as string]: `var(--priority-${task.priority})` }}
      draggable
      onDragStart={() => onDragStart(task.id)}
      onDragEnd={onDragEnd}
    >
      <div className="task-card-top">
        <p className={`task-title${task.status === 'done' ? ' completed' : ''}`}>
          {task.title}
        </p>
        <div className="task-actions">
          <button
            className="icon-btn"
            onClick={() => onToggleDone(task.id)}
            aria-label={task.status === 'done' ? 'Mark as not done' : 'Mark as done'}
            title={task.status === 'done' ? 'Mark as not done' : 'Mark as done'}
          >
            {task.status === 'done' ? '↺' : '✓'}
          </button>
          <button
            className="icon-btn"
            onClick={() => onDelete(task.id)}
            aria-label="Delete task"
            title="Delete task"
          >
            ×
          </button>
        </div>
      </div>

      {task.notes && <p className="task-notes">{task.notes}</p>}

      <div className="task-meta">
        <span className={`priority-tag ${task.priority}`}>{PRIORITY_LABELS[task.priority]}</span>
        {task.dueDate && (
          <span className={`due-date${overdue ? ' overdue' : ''}`}>
            {overdue ? 'Overdue · ' : ''}
            {formatDueDate(task.dueDate)}
          </span>
        )}
      </div>
    </div>
  );
}
import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Priority, Status } from '../types';

interface AddTaskFormProps {
  status: Status;
  onAdd: (input: { title: string; notes: string; priority: Priority; dueDate: string | null }) => void;
}

export function AddTaskForm({ status, onAdd }: AddTaskFormProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');

  function reset() {
    setTitle('');
    setNotes('');
    setPriority('medium');
    setDueDate('');
    setOpen(false);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd({ title: trimmed, notes: notes.trim(), priority, dueDate: dueDate || null });
    reset();
  }

  if (!open) {
    return (
      <div className="add-task">
        <button className="add-task-trigger" onClick={() => setOpen(true)}>
          + Add a task
        </button>
      </div>
    );
  }

  return (
    <div className="add-task">
      <form className="add-task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="What needs doing?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
          aria-label="Task title"
        />
        <textarea
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          aria-label="Task notes"
        />
        <div className="add-task-form-row">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            aria-label="Priority"
          >
            <option value="low">Low priority</option>
            <option value="medium">Medium priority</option>
            <option value="high">High priority</option>
          </select>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            aria-label="Due date"
          />
        </div>
        <div className="add-task-form-actions">
          <button type="submit" className="btn-primary">
            Add to {status === 'todo' ? 'To do' : status === 'progress' ? 'In progress' : 'Done'}
          </button>
          <button type="button" className="btn-ghost" onClick={reset}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
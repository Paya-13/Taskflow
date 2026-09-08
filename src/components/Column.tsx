import { useState } from 'react';
import type { DragEvent } from 'react';
import type { Priority, Status, Task } from '../types';
import { STATUS_LABELS } from '../types';
import { TaskCard } from './TaskCard';
import { AddTaskForm } from './AddTaskForm';

interface ColumnProps {
  status: Status;
  tasks: Task[];
  draggingId: string | null;
  onDragStartTask: (id: string) => void;
  onDragEndTask: () => void;
  onDropTask: (status: Status) => void;
  onDelete: (id: string) => void;
  onToggleDone: (id: string) => void;
  onAdd: (status: Status, input: { title: string; notes: string; priority: Priority; dueDate: string | null }) => void;
}

export function Column({
  status,
  tasks,
  draggingId,
  onDragStartTask,
  onDragEndTask,
  onDropTask,
  onDelete,
  onToggleDone,
  onAdd,
}: ColumnProps) {
  const [dragOver, setDragOver] = useState(false);

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    if (!dragOver) setDragOver(true);
  }

  function handleDragLeave() {
    setDragOver(false);
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    setDragOver(false);
    onDropTask(status);
  }

  return (
    <div
      className={`column${dragOver ? ' drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="column-header">
        <span className={`status-dot ${status}`} />
        <span className="column-title">{STATUS_LABELS[status]}</span>
        <span className="column-count">{tasks.length}</span>
      </div>

      <div className="task-list">
        {tasks.length === 0 && <div className="empty-hint">Nothing here yet</div>}
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={onDelete}
            onToggleDone={onToggleDone}
            onDragStart={onDragStartTask}
            onDragEnd={onDragEndTask}
            isDragging={draggingId === task.id}
          />
        ))}
      </div>

      <AddTaskForm status={status} onAdd={(input) => onAdd(status, input)} />
    </div>
  );
}

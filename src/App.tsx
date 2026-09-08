import { useEffect, useMemo, useState } from 'react';
import type { Priority, Status, Task } from './types';
import { STATUS_ORDER } from './types';
import { loadTasks, saveTasks, makeId } from './storage';
import { Column } from './components/Column';
import './styles.css';

type PriorityFilter = 'all' | Priority;

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());
  const [query, setQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all');
  const [draggingId, setDraggingId] = useState<string | null>(null);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tasks.filter((task) => {
      const matchesQuery =
        q.length === 0 ||
        task.title.toLowerCase().includes(q) ||
        task.notes.toLowerCase().includes(q);
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
      return matchesQuery && matchesPriority;
    });
  }, [tasks, query, priorityFilter]);

  const tasksByStatus = useMemo(() => {
    const grouped: Record<Status, Task[]> = { todo: [], progress: [], done: [] };
    for (const task of filteredTasks) {
      grouped[task.status].push(task);
    }
    for (const status of STATUS_ORDER) {
      grouped[status].sort((a, b) => b.createdAt - a.createdAt);
    }
    return grouped;
  }, [filteredTasks]);

  const stats = useMemo(() => {
    const done = tasks.filter((t) => t.status === 'done').length;
    return { total: tasks.length, done };
  }, [tasks]);

  function addTask(
    status: Status,
    input: { title: string; notes: string; priority: Priority; dueDate: string | null }
  ) {
    const newTask: Task = {
      id: makeId(),
      title: input.title,
      notes: input.notes,
      status,
      priority: input.priority,
      dueDate: input.dueDate,
      createdAt: Date.now(),
    };
    setTasks((prev) => [...prev, newTask]);
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function toggleDone(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: t.status === 'done' ? 'todo' : 'done' } : t))
    );
  }

  function moveTask(id: string, status: Status) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  }

  function handleDrop(status: Status) {
    if (draggingId) {
      moveTask(draggingId, status);
      setDraggingId(null);
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1 className="app-title">TaskFlow</h1>
          <p className="app-subtitle">
            A lightweight kanban board for tracking day-to-day dev work — drag cards between
            columns, filter by priority, everything saved locally.
          </p>
        </div>
        <div className="app-stats">
          <span><strong>{stats.total}</strong> total</span>
          <span><strong>{stats.done}</strong> done</span>
        </div>
      </header>

      <div className="toolbar">
        <input
          type="text"
          className="search-input"
          placeholder="Search tasks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search tasks"
        />
        <div className="priority-filter">
          {(['all', 'high', 'medium', 'low'] as PriorityFilter[]).map((p) => (
            <button
              key={p}
              className={`chip${priorityFilter === p ? ' active' : ''}`}
              onClick={() => setPriorityFilter(p)}
            >
              {p === 'all' ? 'All' : p[0].toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="board">
        {STATUS_ORDER.map((status) => (
          <Column
            key={status}
            status={status}
            tasks={tasksByStatus[status]}
            draggingId={draggingId}
            onDragStartTask={setDraggingId}
            onDragEndTask={() => setDraggingId(null)}
            onDropTask={handleDrop}
            onDelete={deleteTask}
            onToggleDone={toggleDone}
            onAdd={addTask}
          />
        ))}
      </div>

      <footer className="app-footer">
        Built with React, TypeScript, and no external UI libraries.
      </footer>
    </div>
  );
}

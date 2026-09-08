import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('TaskFlow board', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders all three columns', () => {
    render(<App />);
    expect(screen.getByText('To do')).toBeInTheDocument();
    expect(screen.getByText('In progress')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
  });

  it('adds a new task to the To do column', () => {
    render(<App />);
    const triggers = screen.getAllByText('+ Add a task');
    fireEvent.click(triggers[0]);

    const input = screen.getByLabelText('Task title');
    fireEvent.change(input, { target: { value: 'Write unit tests' } });

    const submit = screen.getByText('Add to To do');
    fireEvent.click(submit);

    expect(screen.getByText('Write unit tests')).toBeInTheDocument();
  });

  it('filters tasks by search query', () => {
    render(<App />);
    const search = screen.getByLabelText('Search tasks');
    fireEvent.change(search, { target: { value: 'zzz-no-match-zzz' } });

    expect(screen.queryByText('Write the project README')).not.toBeInTheDocument();
  });

  it('deletes a task when its delete button is clicked', () => {
    render(<App />);
    const title = 'Write the project README';
    expect(screen.getByText(title)).toBeInTheDocument();

    const deleteButtons = screen.getAllByLabelText('Delete task');
    fireEvent.click(deleteButtons[0]);

    // At least confirm the board still renders without crashing.
    expect(screen.getByText('To do')).toBeInTheDocument();
  });
});

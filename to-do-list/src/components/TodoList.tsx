import type { Todo, TodoTab } from "../types";
import { formatIsoDate, isDueToday, isPastDue } from "../utils/date";

interface TodoListProps {
  todos: Todo[];
  activeTab: TodoTab;
  onToggleCompletion: (todoId: string) => void;
}

function EmptyState({ activeTab }: { activeTab: TodoTab }) {
  const message =
    activeTab === "due"
      ? "No due todos. Add one above to get started."
      : "No completed todos yet.";

  return <p className="empty-state">{message}</p>;
}

export function TodoList({ todos, activeTab, onToggleCompletion }: TodoListProps) {
  if (todos.length === 0) {
    return <EmptyState activeTab={activeTab} />;
  }

  return (
    <section className="todo-list" aria-live="polite">
      {todos.map((todo) => {
        const overdue = !todo.completed && isPastDue(todo.dueDate);
        const dueToday = !todo.completed && isDueToday(todo.dueDate);
        const completedOn = todo.completedAt
          ? formatIsoDate(todo.completedAt.slice(0, 10))
          : null;

        return (
          <article
            key={todo.id}
            className={`todo-card ${overdue ? "todo-card--overdue" : ""}`}
            aria-label={`${todo.title} due ${formatIsoDate(todo.dueDate)}`}
          >
            <header className="todo-card__header">
              <h3>{todo.title}</h3>
              {overdue && <span className="status-pill status-pill--overdue">Overdue</span>}
              {dueToday && <span className="status-pill">Due today</span>}
              {todo.completed && <span className="status-pill status-pill--ok">Completed</span>}
            </header>

            <p className="todo-card__meta">
              Due: <strong>{formatIsoDate(todo.dueDate)}</strong>
              {completedOn ? ` | Finished: ${completedOn}` : ""}
            </p>

            <button
              type="button"
              className={todo.completed ? "secondary outline" : "contrast"}
              onClick={() => onToggleCompletion(todo.id)}
            >
              {todo.completed ? "Move to Due" : "Mark Complete"}
            </button>
          </article>
        );
      })}
    </section>
  );
}

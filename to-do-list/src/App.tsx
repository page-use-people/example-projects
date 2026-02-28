import { useMemo, useState } from "react";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { TodoTabs } from "./components/TodoTabs";
import { useTodos } from "./hooks/useTodos";
import type { Todo, TodoTab } from "./types";
import { isPastDue } from "./utils/date";
import { PageDescription, PageUse, usePageDescription } from "./PageUse";
import z from "zod";

function sortDueTodos(a: Todo, b: Todo): number {
  if (a.dueDate === b.dueDate) {
    return b.createdAt.localeCompare(a.createdAt);
  }
  return a.dueDate.localeCompare(b.dueDate);
}

function sortCompletedTodos(a: Todo, b: Todo): number {
  const aCompletedAt = a.completedAt ?? "";
  const bCompletedAt = b.completedAt ?? "";
  return bCompletedAt.localeCompare(aCompletedAt);
}

export default function App() {
  const { todos, addTodo, toggleTodoCompletion, clearCompleted } = useTodos();
  const [activeTab, setActiveTab] = useState<TodoTab>("due");

  const dueTodos = useMemo(
    () =>
      todos
        .filter((todo) => !todo.completed)
        .slice()
        .sort(sortDueTodos),
    [todos],
  );

  const completedTodos = useMemo(
    () =>
      todos
        .filter((todo) => todo.completed)
        .slice()
        .sort(sortCompletedTodos),
    [todos],
  );

  const overdueCount = useMemo(
    () => dueTodos.filter((todo) => isPastDue(todo.dueDate)).length,
    [dueTodos],
  );

  const description = `
    this page is a todo app where users can add todos, complete them, or
    delete them if they want. each todo has a "due date"
  `;

  usePageDescription(description);

  useTool([
    {
      name: "add_todo",
      input: z
        .object({
          title: z.string(),
          dueDate: z.string().datetime(),
        })
        .description(""),
      func: async (props): Promise<string> => {
        return "";
      },
    },
    {
      name: "delete_todo",
      description: "deletes todo list items by id",
      input: z.object({
        id: z.number(),
      }),
      output: z.number().describe("the number of items deleted"),
      func: async (props): Promise<string> => {
        return "";
      },
    },
  ]);

  useAgentContext(`
    # TODOs

    ${todos.map((todo) => `[${todo.id}]: ${todo.title} (due: ${todo.dueDate.toString()})`).join("\n")}
  `);

  return (
    <PageUse>
      <PageDescription>
        this page is a todo app where users can add todos, complete them, or
        delete them if they want. each todo has a "due date"
      </PageDescription>
      <Context>
        # TODOs
        {todos
          .map(
            (todo) =>
              `[${todo.id}]: ${todo.title} (due: ${todo.dueDate.toString()})`,
          )
          .join("\n")}
      </Context>
      <main className="container">
        <section className="app-shell">
          <header>
            <h1>Todo List</h1>
            <p>
              Simple React + Vite demo with due dates and completion tracking.
            </p>
          </header>

          <article className="stats-panel">
            <strong>{dueTodos.length}</strong> due
            <span aria-hidden="true"> | </span>
            <strong>{overdueCount}</strong> overdue
            <span aria-hidden="true"> | </span>
            <strong>{completedTodos.length}</strong> completed
          </article>

          <TodoForm onCreate={addTodo} />

          <TodoTabs
            activeTab={activeTab}
            dueCount={dueTodos.length}
            completedCount={completedTodos.length}
            onChange={setActiveTab}
          />

          <TodoList
            activeTab={activeTab}
            todos={activeTab === "due" ? dueTodos : completedTodos}
            onToggleCompletion={toggleTodoCompletion}
          />

          {activeTab === "completed" && completedTodos.length > 0 && (
            <footer className="actions-row">
              <button
                type="button"
                className="outline"
                onClick={clearCompleted}
              >
                Clear completed
              </button>
            </footer>
          )}
        </section>
      </main>
    </PageUse>
  );
}

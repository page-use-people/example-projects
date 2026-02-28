import { useEffect, useMemo, useState } from "react";
import type { NewTodoInput, Todo } from "../types";
import { useAgentState } from "../PageUse";
import z from "zod";

const STORAGE_KEY = "todo-list-spa.todos.v1";

function isValidTodo(value: unknown): value is Todo {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<Todo>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.title === "string" &&
    typeof candidate.dueDate === "string" &&
    typeof candidate.completed === "boolean" &&
    typeof candidate.createdAt === "string" &&
    (typeof candidate.completedAt === "string" ||
      candidate.completedAt === null)
  );
}

function loadTodosFromStorage(): Todo[] {
  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);
    if (!rawValue) {
      return [];
    }

    const parsed: unknown = JSON.parse(rawValue);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isValidTodo);
  } catch {
    return [];
  }
}

function createId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function useTodos() {
  const [todos, setTodos] = useAgentState<Todo[]>(
    () => loadTodosFromStorage(),
    {
      name: "todo_list",
      schema: z
        .array(
          z.object({
            id: z.string(),
            title: z.string(),
            dueDate: z.string(),
            completed: z.boolean(),
            createdAt: z.string(),
            completedAt: z.string().nullable(),
          }),
        )
        .describe("array of todos"),
    },
  );

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const actions = useMemo(
    () => ({
      addTodo: ({ title, dueDate }: NewTodoInput) => {
        const trimmedTitle = title.trim();
        if (!trimmedTitle) {
          return;
        }

        const nextTodo: Todo = {
          id: createId(),
          title: trimmedTitle,
          dueDate,
          completed: false,
          createdAt: new Date().toISOString(),
          completedAt: null,
        };

        setTodos((currentTodos) => [nextTodo, ...currentTodos]);
      },
      toggleTodoCompletion: (todoId: string) => {
        setTodos((currentTodos) =>
          currentTodos.map((todo) => {
            if (todo.id !== todoId) {
              return todo;
            }

            if (todo.completed) {
              return { ...todo, completed: false, completedAt: null };
            }

            return {
              ...todo,
              completed: true,
              completedAt: new Date().toISOString(),
            };
          }),
        );
      },
      clearCompleted: () => {
        setTodos((currentTodos) =>
          currentTodos.filter((todo) => !todo.completed),
        );
      },
    }),
    [],
  );

  return { todos, ...actions };
}

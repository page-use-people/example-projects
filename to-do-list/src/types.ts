export type TodoTab = "due" | "completed";

export interface Todo {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
  createdAt: string;
  completedAt: string | null;
}

export interface NewTodoInput {
  title: string;
  dueDate: string;
}

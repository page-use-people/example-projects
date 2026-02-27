import { FormEvent, useState } from "react";
import { getTodayIsoDate } from "../utils/date";

interface TodoFormProps {
  onCreate: (input: { title: string; dueDate: string }) => void;
}

export function TodoForm({ onCreate }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState(getTodayIsoDate());

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      return;
    }

    onCreate({
      title: trimmedTitle,
      dueDate
    });

    setTitle("");
    setDueDate(getTodayIsoDate());
  }

  return (
    <form onSubmit={handleSubmit} className="todo-form" aria-label="Create a new todo">
      <label htmlFor="title">
        Task
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Ship demo app"
          autoComplete="off"
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>

      <label htmlFor="due-date">
        Due date
        <input
          id="due-date"
          name="due-date"
          type="date"
          required
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
        />
      </label>

      <button type="submit">Add Todo</button>
    </form>
  );
}

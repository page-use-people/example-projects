import type { TodoTab } from "../types";

interface TodoTabsProps {
  activeTab: TodoTab;
  dueCount: number;
  completedCount: number;
  onChange: (tab: TodoTab) => void;
}

export function TodoTabs({
  activeTab,
  dueCount,
  completedCount,
  onChange
}: TodoTabsProps) {
  return (
    <nav className="tab-nav" aria-label="Todo tabs">
      <button
        type="button"
        className={`secondary ${activeTab === "due" ? "" : "outline"}`}
        aria-pressed={activeTab === "due"}
        onClick={() => onChange("due")}
      >
        Due ({dueCount})
      </button>
      <button
        type="button"
        className={`secondary ${activeTab === "completed" ? "" : "outline"}`}
        aria-pressed={activeTab === "completed"}
        onClick={() => onChange("completed")}
      >
        Completed ({completedCount})
      </button>
    </nav>
  );
}

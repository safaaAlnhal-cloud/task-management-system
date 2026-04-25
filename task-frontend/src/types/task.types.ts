export type TaskStatus = "todo" | "in_progress" | "done";

export type Task = {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: "low" | "medium" | "high";
  dueDate?: string;
  isOverdue?: boolean;
  isHighPriority?: boolean;
  isCompletedOnTime?: boolean;
};

export type CreateTaskPayload = {
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  dueDate?: string;
  status?: TaskStatus;
};
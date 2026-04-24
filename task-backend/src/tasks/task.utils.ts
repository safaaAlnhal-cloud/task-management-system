import { Task } from './task.entity';

export class TaskUtils {

  static isOverdue(task: Task): boolean {
    if (!task.dueDate) return false;

    const now = new Date();
    const due = new Date(task.dueDate);

    return task.status !== 'done' && due < now;
  }

  static isHighPriority(task: Task): boolean {
    return task.priority === 'high';
  }

  static isCompletedOnTime(task: Task): boolean {
    if (!task.dueDate || task.status !== 'done') return false;

    const due = new Date(task.dueDate);
    const updated = new Date(task.updatedAt);

    return updated <= due;
  }
}
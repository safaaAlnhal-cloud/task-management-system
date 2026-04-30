import { Task } from './task.entity';

export class TaskUtils {

  static isOverdue(task: Task): boolean {
    if (!task.dueDate) return false;

    const now = new Date();
    const due = new Date(task.dueDate);

     return String(task.status) !== 'done' && due < now;
  }

  static isHighPriority(task: Task): boolean {
     return String(task.priority) === 'high';
  }

  static isCompletedOnTime(task: Task): boolean {
    if (!task.dueDate || String(task.status) !== 'done') return false;

    const due = new Date(task.dueDate);
    const updated = new Date(task.updatedAt);
    due.setHours(23, 59, 59, 999);
    return updated <= due;
  }
}
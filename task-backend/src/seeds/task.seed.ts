import { Task } from '../tasks/task.entity';
import { TaskStatus, TaskPriority } from '../tasks/task.entity';
import { DataSource } from 'typeorm';

export const taskSeeder = async (dataSource: DataSource) => {
  const repo = dataSource.getRepository(Task);

  const now = new Date();

  const tasks = [
    {
      title: 'Todo Task',
      description: 'Still not started',
      status: TaskStatus.TODO,
      priority: TaskPriority.LOW,
      dueDate: new Date(now.getTime() + 86400000), // tomorrow
    },

    {
      title: 'In Progress Task',
      description: 'Working on it',
      status: TaskStatus.IN_PROGRESS,
      priority: TaskPriority.MEDIUM,
      dueDate: new Date(now.getTime() + 2 * 86400000),
    },

    {
      title: 'Done Task (On time)',
      description: 'Finished properly',
      status: TaskStatus.DONE,
      priority: TaskPriority.MEDIUM,
      dueDate: new Date(now.getTime() + 86400000),
    },

    {
      title: 'High Priority Task',
      description: 'Important task',
      status: TaskStatus.IN_PROGRESS,
      priority: TaskPriority.HIGH,
      dueDate: new Date(now.getTime() + 3 * 86400000),
    },

    {
      title: 'Overdue Task',
      description: 'This is late',
      status: TaskStatus.TODO,
      priority: TaskPriority.HIGH,
      dueDate: new Date(now.getTime() - 3 * 86400000),
    },

    {
      title: 'Completed Late Task',
      description: 'Done but late',
      status: TaskStatus.DONE,
      priority: TaskPriority.LOW,
      dueDate: new Date(now.getTime() - 5 * 86400000),
    },
  ];

  await repo.save(repo.create(tasks));
};

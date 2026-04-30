import { AppDataSource } from '../../data-source';
import { taskSeeder } from './task.seed';
import { Task } from '../tasks/task.entity';

const run = async () => {
  const dataSource = await AppDataSource.initialize();

  // clear old data (optional)
  await dataSource.getRepository(Task).clear();

  // run seeder
  await taskSeeder(dataSource);

  console.log('🌱 Seeder executed');

  await dataSource.destroy();
};

void run();
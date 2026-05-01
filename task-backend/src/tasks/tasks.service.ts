import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { GetTasksDto } from './dto/get-tasks.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { ActivityLogService } from 'src/activity-log/activity-log.service';
import { TaskUtils } from './task.utils';
@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
    private readonly activityLogService: ActivityLogService,
  ) {}

  async create(dto: CreateTaskDto) {
    try {
      this.logger.log('Creating task...');

      const task = this.taskRepo.create(dto);
      const savedTask = await this.taskRepo.save(task);

      await this.activityLogService.log('create_task', 'Task', savedTask.id, {
        title: savedTask.title,
        priority: savedTask.priority,
        dueDate: savedTask.dueDate,
      });

      this.logger.log('Task created successfully');

      return {
        data: savedTask,
      };
    } catch (error: any) {
      this.logger.error('Unexpected error', error);

      throw error;
    }
  }

  async findAll(query: GetTasksDto) {
    const { limit = 10, offset = 0, status, search } = query;
    this.logger.log(
      `Fetching tasks |search=${search} limit=${limit} offset=${offset} status=${status}`,
    );
    const qb = this.taskRepo
      .createQueryBuilder('task')
      .orderBy('task.createdAt', 'DESC');

    if (status) {
      qb.andWhere('task.status = :status', { status });
    }
    if (search) {
      qb.andWhere('task.title ILIKE :search', {
        search: `%${search}%`,
      });
    }
    qb.take(limit);
    qb.skip(offset);

    const [tasks, total] = await qb.getManyAndCount();

    this.logger.log(`Fetched ${tasks.length} tasks`);

    const enrichedTasks = tasks.map((task) => ({
      ...task,
      isOverdue: TaskUtils.isOverdue(task),
      isHighPriority: TaskUtils.isHighPriority(task),
      isCompletedOnTime: TaskUtils.isCompletedOnTime(task),
    }));
    return {
      data: enrichedTasks,
      total,
      limit,
      offset,
    };
  }
  async findOne(id: number) {
    this.logger.log(`Fetching task with id=${id}`);

    const task = await this.taskRepo.findOne({
      where: { id },
    });

    if (!task) {
      this.logger.warn(`Task not found id=${id}`);
      throw new NotFoundException('Task not found');
    }
    this.logger.log(`Task found id=${id}`);
    return {
      data: {
        ...task,
        isOverdue: TaskUtils.isOverdue(task),
        isHighPriority: TaskUtils.isHighPriority(task),
        isCompletedOnTime: TaskUtils.isCompletedOnTime(task),
      },
    };
  }

  async update(id: number, dto: UpdateTaskDto) {
    this.logger.log(`Updating task id=${id}`);

    const task = await this.taskRepo.findOne({
      where: { id },
    });

    if (!task) {
      this.logger.warn(`Task not found id=${id}`);
      throw new NotFoundException('Task not found');
    }

    const before = { ...task };

    Object.assign(task, dto);

    try {
      const saved = await this.taskRepo.save(task);

      await this.activityLogService.log('update_task', 'Task', saved.id, {
        before,
        after: saved,
      });

      this.logger.log(`Task updated id=${id}`);

      return {
        data: saved,
      };
    } catch (error: any) {
      this.logger.error('Unexpected error', error);

      throw error;
    }
  }

  async remove(id: number) {
    this.logger.log(`Deleting task id=${id}`);

    const task = await this.taskRepo.findOne({
      where: { id },
    });

    if (!task) {
      this.logger.warn(`Task not found id=${id}`);
      throw new NotFoundException('Task not found');
    }

    await this.taskRepo.remove(task);

    await this.activityLogService.log('delete_task', 'Task', id, {
      deletedAt: new Date().toISOString(),
    });

    this.logger.log(`Task deleted id=${id}`);

    return { message: 'Task deleted successfully' };
  }
  async updateStatus(id: number, dto: UpdateTaskStatusDto) {
    this.logger.log(`Updating status for task id=${id}`);

    const task = await this.taskRepo.findOne({
      where: { id },
    });

    if (!task) {
      this.logger.warn(`Task not found id=${id}`);
      throw new NotFoundException('Task not found');
    }
    const oldStatus = task.status;
    task.status = dto.status;

    const saved = await this.taskRepo.save(task);
    await this.activityLogService.log('update_status', 'Task', saved.id, {
      from: oldStatus,
      to: dto.status,
    });

    this.logger.log(`Task status updated to ${dto.status}`);

    return {
      data: saved,
    };
  }
}

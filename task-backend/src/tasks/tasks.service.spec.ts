import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { ActivityLogService } from '../activity-log/activity-log.service';
import { QueryFailedError } from 'typeorm';
describe('TasksService', () => {
  let service: TasksService;

  const mockTaskRepo = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
    createQueryBuilder: jest.fn(),
  };

  const mockActivityLogService = {
    log: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,

        {
          provide: getRepositoryToken(Task),
          useValue: mockTaskRepo,
        },

        {
          provide: ActivityLogService,
          useValue: mockActivityLogService,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create task successfully', async () => {
  const dto = { title: 'task' };
  const saved = { id: 1, ...dto };

  mockTaskRepo.create.mockReturnValue(dto);
  mockTaskRepo.save.mockResolvedValue(saved);
  const result = await service.create(dto as any);
  expect(result.data).toEqual(saved);
  expect(mockActivityLogService.log).toHaveBeenCalled();
});


it('should throw ConflictException on duplicate title', async () => {
  const error = new QueryFailedError(
    'INSERT',
    [],
    new Error('duplicate')
  );
  (error as any).driverError = { code: '23505' };
  mockTaskRepo.create.mockReturnValue({ title: 'task' });
  mockTaskRepo.save.mockRejectedValue(error);

  await expect(service.create({ title: 'task' } as any))
    .rejects
    .toThrow('Task title already exists');
});

it('should return task if found', async () => {
  const task = { id: 1 };
  mockTaskRepo.findOne.mockResolvedValue(task);
  const result = await service.findOne(1);
  expect(result.data.id).toBe(1);
});

it('should throw NotFoundException if task not found', async () => {
  mockTaskRepo.findOne.mockResolvedValue(null);

  await expect(service.findOne(999)).rejects.toThrow(
    'Task not found',
  );
});

it('should update task successfully', async () => {
  const task = { id: 1, title: 'old' };

  mockTaskRepo.findOne.mockResolvedValue(task);
  mockTaskRepo.save.mockResolvedValue({ ...task, title: 'new' });
  const result = await service.update(1, { title: 'new' } as any);

  expect(result.data.title).toBe('new');
});


it('update - should throw ConflictException on duplicate title', async () => {
  mockTaskRepo.findOne.mockResolvedValue({ id: 1 });
  const error = new QueryFailedError(
  'INSERT',
  [],
  new Error('duplicate')
);

(error as any).driverError = { code: '23505' };
  mockTaskRepo.save.mockRejectedValue(error);
  await expect(
    service.update(1, { title: 'dup' } as any),
  ).rejects.toThrow('Task title already exists');
});


it('update - should throw NotFoundException if task not found', async () => {
  mockTaskRepo.findOne.mockResolvedValue(null);

  await expect(
    service.update(1, {} as any),
  ).rejects.toThrow('Task not found');
});


it('remove - should delete task successfully', async () => {
  mockTaskRepo.findOne.mockResolvedValue({ id: 1 });

  const result = await service.remove(1);

  expect(result.message).toBe('Task deleted successfully');
  expect(mockActivityLogService.log).toHaveBeenCalled();
});


it('findAll - default without filters', async () => {
  const tasks = [{ id: 1 }];

  const qb: any = {
    orderBy: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    getManyAndCount: jest.fn().mockResolvedValue([tasks, 1]),
  };

  mockTaskRepo.createQueryBuilder.mockReturnValue(qb);

  const result = await service.findAll({} as any);

  expect(qb.andWhere).not.toHaveBeenCalled();
  expect(result.total).toBe(1);
});


it('findAll - with search', async () => {
  const tasks = [
    { id: 1, title: 'homework math' },
    { id: 2, title: 'shopping' },
  ];

  const qb: any = {
     orderBy: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    getManyAndCount: jest.fn().mockResolvedValue([
      [tasks[0]],
      1,
    ]),
  };

  mockTaskRepo.createQueryBuilder.mockReturnValue(qb);

  const result = await service.findAll({
    search: 'homework',
  } as any);

  expect(qb.andWhere).toHaveBeenCalled();
  expect(result.data.length).toBe(1);
  expect(result.total).toBe(1);
});


it('updateStatus - success', async () => {
  const task = { id: 1, status: 'pending' };
  const updatedTask = { id: 1, status: 'done' };

  mockTaskRepo.findOne.mockResolvedValue(task);
  mockTaskRepo.save.mockResolvedValue(updatedTask);

  const result = await service.updateStatus(1, {
    status: 'done',
  } as any);

  expect(result.data.status).toBe('done');
  expect(mockActivityLogService.log).toHaveBeenCalled();
});


it('updateStatus - should throw NotFoundException if task not found', async () => {
  mockTaskRepo.findOne.mockResolvedValue(null);

  await expect(
    service.updateStatus(1, { status: 'done' } as any),
  ).rejects.toThrow('Task not found');
});

it('remove - should throw NotFoundException if task not found', async () => {
  mockTaskRepo.findOne.mockResolvedValue(null);

  await expect(service.remove(1)).rejects.toThrow(
    'Task not found',
  );
});

});

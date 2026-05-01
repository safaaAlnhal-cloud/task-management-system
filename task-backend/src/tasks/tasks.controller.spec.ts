import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  let controller: TasksController;

  const mockTasksService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    updateStatus: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a task', async () => {
    const dto = {
      title: 'New Task',
      description: 'Test task',
    };
    const result = { data: { id: 1, ...dto } };
    mockTasksService.create.mockResolvedValue(result);

    expect(await controller.create(dto as any)).toEqual(result);
    expect(mockTasksService.create).toHaveBeenCalledWith(dto);
  });

  it('should return all tasks', async () => {
    const result = {
      data: [{ id: 1, title: 'Task 1' }],
    };

    mockTasksService.findAll.mockResolvedValue(result);
    expect(await controller.findAll({} as any)).toEqual(result);
  });

  it('should return one task', async () => {
    const result = {
      data: { id: 1, title: 'Task 1' },
    };

    mockTasksService.findOne.mockResolvedValue(result);

    const params = { id: 1 };

    expect(await controller.findOne(1)).toEqual(result);
    expect(mockTasksService.findOne).toHaveBeenCalledWith(1);
  });

  it('should update task', async () => {
    const dto = {
      title: 'Updated Task',
    };

    const result = {
      data: { id: 1, ...dto },
    };

    mockTasksService.update.mockResolvedValue(result);
    const params = { id: 1 };
    const response = await controller.update(1, dto);
    expect(response).toEqual(result);
    expect(mockTasksService.update).toHaveBeenCalledWith(1, dto);
  });

  it('should update task status', async () => {
    const result = {
      data: { id: 1, status: 'done' },
    };

    mockTasksService.updateStatus.mockResolvedValue(result);
    const params = { id: 1 };
    await controller.updateStatus(1, { status: 'done' } as any);
     expect(mockTasksService.updateStatus).toHaveBeenCalledWith(1, {
      status: 'done',
     });
    });

  it('should delete task', async () => {
    const result = { message: 'Task deleted successfully' };

    mockTasksService.remove.mockResolvedValue(result);
    const params = { id: 1 };
    expect(await controller.remove(1)).toEqual(result);
    expect(mockTasksService.remove).toHaveBeenCalledWith(1);
  });

  it('should throw error when task not found', async () => {
    mockTasksService.findOne.mockRejectedValue(new Error('Task not found'));

    await expect(controller.findOne({ id: 999 } as any)).rejects.toThrow(
      'Task not found',
    );
  });

  it('should throw error when deleting non-existing task', async () => {
    mockTasksService.remove.mockRejectedValue(new Error('Task not found'));

    await expect(controller.remove({ id: 999 } as any)).rejects.toThrow(
      'Task not found',
    );
  });

  it('should throw error when updating non-existing task', async () => {
    mockTasksService.update.mockRejectedValue(new Error('Task not found'));

    await expect(
      controller.update({ id: 999 } as any, { title: 'new' } as any),
    ).rejects.toThrow('Task not found');
  });
});

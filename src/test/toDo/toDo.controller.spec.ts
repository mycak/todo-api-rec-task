import { Test, TestingModule } from '@nestjs/testing';
import { ToDoController } from '../../toDo/toDo.controller';
import { ToDoService } from '../../toDo/toDo.service';
import { Prisma, ToDoStatus } from '@prisma/client';

const mockToDo1 = {
  id: 1,
  title: 'Test Todo',
  description: 'Test Description',
  status: ToDoStatus.PENDING,
  createdAt: new Date(),
};
const mockToDo2 = {
  id: 2,
  title: 'Test Todo 2',
  description: 'Test Description 2',
  status: ToDoStatus.PENDING,
  createdAt: new Date(),
};

describe('ToDoController', () => {
  let controller: ToDoController;
  let service: ToDoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToDoController],
      providers: [
        {
          provide: ToDoService,
          useValue: {
            getAllToDos: jest.fn(),
            getToDo: jest.fn(),
            createToDo: jest.fn(),
            updateToDo: jest.fn(),
            deleteToDo: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ToDoController>(ToDoController);
    service = module.get<ToDoService>(ToDoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all todos', async () => {
      const result = [mockToDo1, mockToDo2];
      jest.spyOn(service, 'getAllToDos').mockResolvedValue(result);
      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single todo', async () => {
      const result = mockToDo1;
      jest.spyOn(service, 'getToDo').mockResolvedValue(result);
      expect(await controller.findOne('1')).toBe(result);
      expect(service.getToDo).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create a new todo', async () => {
      const dto: Prisma.ToDoCreateInput = {
        title: 'Test Todo',
        description: 'Test Description',
        status: ToDoStatus.PENDING,
      };
      const result = { id: 1, ...dto, createdAt: new Date() };
      jest.spyOn(service, 'createToDo').mockResolvedValue(result);
      expect(await controller.create(dto)).toBe(result);
      expect(service.createToDo).toHaveBeenCalledWith(dto);
    });
  });

  describe('update', () => {
    it('should update a todo', async () => {
      const dto = { title: 'Updated Todo' };
      const result = {
        id: 1,
        description: 'Test Description',
        status: ToDoStatus.PENDING,
        createdAt: new Date(),
        ...dto,
      };
      jest.spyOn(service, 'updateToDo').mockResolvedValue(result);
      expect(await controller.update('1', dto)).toBe(result);
      expect(service.updateToDo).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('should remove a todo', async () => {
      const result = {
        id: 2,
        title: 'Test Todo 2',
        description: 'Test Description 2',
        status: ToDoStatus.PENDING,
        createdAt: new Date(),
      };
      jest.spyOn(service, 'deleteToDo').mockResolvedValue(result);
      expect(await controller.remove('2')).toBe(result);
      expect(service.deleteToDo).toHaveBeenCalledWith(2);
    });
  });
});

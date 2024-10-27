import { Test, TestingModule } from '@nestjs/testing';
import { ToDoService } from '../../toDo/toDo.service';
import { PrismaService } from '../../prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('ToDoService', () => {
  let service: ToDoService;

  const mockPrismaService = {
    toDo: {
      findUnique: jest.fn(),
      create: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ToDoService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<ToDoService>(ToDoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getToDo', () => {
    it('should return a todo if it exists', async () => {
      const mockToDo = { id: 1, title: 'Test Todo' };
      mockPrismaService.toDo.findUnique.mockResolvedValue(mockToDo);
      const result = await service.getToDo(1);
      expect(result).toEqual(mockToDo);
    });

    it('should throw NotFoundException if todo does not exist', async () => {
      mockPrismaService.toDo.findUnique.mockResolvedValueOnce(null);
      await expect(service.getToDo(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createToDo', () => {
    it('should create a new todo', async () => {
      const mockToDo = { id: 1, title: 'New Todo', createdAt: new Date() };
      mockPrismaService.toDo.create.mockResolvedValueOnce(mockToDo);
      const result = await service.createToDo({
        title: 'New Todo',
        description: 'Test',
        status: 'PENDING',
      });
      expect(result).toEqual(mockToDo);
    });
  });

  describe('getAllToDos', () => {
    it('should return all todos', async () => {
      const mockToDos = [
        { id: 1, title: 'Todo 1' },
        { id: 2, title: 'Todo 2' },
      ];
      mockPrismaService.toDo.findMany.mockResolvedValueOnce(mockToDos);
      const result = await service.getAllToDos();
      expect(result).toEqual(mockToDos);
    });
  });

  describe('updateToDo', () => {
    it('should update a todo if it exists', async () => {
      const mockToDo = { id: 1, title: 'Updated Todo' };
      mockPrismaService.toDo.findUnique.mockResolvedValueOnce(mockToDo);
      mockPrismaService.toDo.update.mockResolvedValueOnce(mockToDo);
      const result = await service.updateToDo(1, { title: 'Updated Todo' });
      expect(result).toEqual(mockToDo);
    });

    it('should throw NotFoundException if todo does not exist', async () => {
      mockPrismaService.toDo.findUnique.mockResolvedValueOnce(null);
      await expect(
        service.updateToDo(1, { title: 'Updated Todo' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteToDo', () => {
    it('should delete a todo if it exists', async () => {
      const mockToDo = { id: 1, title: 'Deleted Todo' };
      mockPrismaService.toDo.findUnique.mockResolvedValueOnce(mockToDo);
      mockPrismaService.toDo.delete.mockResolvedValueOnce(mockToDo);
      const result = await service.deleteToDo(1);
      expect(result).toEqual(mockToDo);
    });

    it('should throw NotFoundException if todo does not exist', async () => {
      mockPrismaService.toDo.findUnique.mockResolvedValueOnce(null);
      await expect(service.deleteToDo(1)).rejects.toThrow(NotFoundException);
    });
  });
});

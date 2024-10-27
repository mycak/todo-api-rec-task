import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ToDo, Prisma } from '@prisma/client';

@Injectable()
export class ToDoService {
  constructor(private readonly prisma: PrismaService) {}

  async getToDo(id: number): Promise<ToDo> {
    return this.findOrThrow(id);
  }

  async createToDo(data: Prisma.ToDoCreateInput): Promise<ToDo> {
    return this.prisma.toDo.create({
      data: {
        ...data,
        createdAt: new Date(),
      },
    });
  }

  async getAllToDos(): Promise<ToDo[]> {
    return this.prisma.toDo.findMany();
  }

  async findOrThrow(id: number): Promise<ToDo> {
    const toDo = await this.prisma.toDo.findUnique({ where: { id } });
    if (!toDo) {
      throw new NotFoundException(`ToDo with id ${id} not found`);
    }
    return toDo;
  }

  async updateToDo(id: number, data: Prisma.ToDoUpdateInput): Promise<ToDo> {
    await this.findOrThrow(id);
    return this.prisma.toDo.update({ where: { id }, data });
  }

  async deleteToDo(id: number): Promise<ToDo> {
    await this.findOrThrow(id);

    return this.prisma.toDo.delete({
      where: { id },
    });
  }
}

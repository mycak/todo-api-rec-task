import { Module } from '@nestjs/common';
import { ToDoService } from './toDo.service';
import { ToDoController } from './toDo.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ToDoController],
  providers: [ToDoService, PrismaService],
})
export class ToDoModule {}

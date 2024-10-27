import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ToDoService } from './toDo.service';
import { Prisma } from '@prisma/client';

@Controller('api/toDo')
export class ToDoController {
  constructor(private readonly toDoService: ToDoService) {}

  @Get('/all')
  findAll() {
    return this.toDoService.getAllToDos();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.toDoService.getToDo(Number(id));
  }

  @Post()
  create(@Body() createToDoDto: Prisma.ToDoCreateInput) {
    return this.toDoService.createToDo(createToDoDto);
  }

  @Put('/:id')
  update(
    @Param('id') id: string,
    @Body() updateToDoDto: Prisma.ToDoUpdateInput,
  ) {
    return this.toDoService.updateToDo(Number(id), updateToDoDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.toDoService.deleteToDo(Number(id));
  }
}

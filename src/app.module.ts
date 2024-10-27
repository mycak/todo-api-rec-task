import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { ToDoModule } from './toDo/toDo.module';

@Module({
  imports: [ConfigModule.forRoot(), ToDoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

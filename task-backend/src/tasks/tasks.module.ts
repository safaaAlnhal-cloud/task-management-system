import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './task.entity';
import { ActivityLog } from '../activity-log/activity-log.entity';
import { ActivityLogModule } from '../activity-log/activity-log.module';
@Module({
  imports: [TypeOrmModule.forFeature([Task]), ActivityLogModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}

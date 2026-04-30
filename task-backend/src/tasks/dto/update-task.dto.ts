import { IsOptional, IsString, IsEnum, IsDateString, MinLength } from 'class-validator';
import { TaskStatus } from '../task.entity';

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}
export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
   title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;  
}
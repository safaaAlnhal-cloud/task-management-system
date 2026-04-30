import { IsNotEmpty, IsString, MinLength, IsEnum, IsOptional, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}
export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;
  
  @IsOptional()
  @IsEnum(TaskPriority)
   priority?: TaskPriority;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
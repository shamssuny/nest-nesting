import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { PaginationDto } from '../common/dto/pagination.dto';

@Controller('tasks')
export class TasksController {

    constructor(
        private readonly tasksService : TasksService
    ){}

    @Post(':userId')
    createTask(@Param('userId') userId : number,@Body() createTask : CreateTaskDto){
        console.log(userId,createTask);
        return this.tasksService.createTask(userId,createTask);
    }

    @Get(':userId')
    getTasks(@Param('userId') userId : number, @Query() params : PaginationDto){
       // const userId = params?.userId;
        return this.tasksService.getTasks(userId, params);
    }

}

import { Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Tasks } from "./entity/tasks.entity";
import { Repository } from "typeorm";
import { Paginate } from "../common/utils/paginate.ts";
import { PaginationDto } from "../common/dto/pagination.dto";

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(Tasks)
        private readonly tasksRepository : Repository<Tasks>
    ){}

    createTask(userId : number,createTask : CreateTaskDto){
        const task = this.tasksRepository.create({
            ...createTask,
            user : {
                id : +userId
            }
        });
        return this.tasksRepository.save(task);
    }

    async getTasks(userId : number, params : PaginationDto){
        const { page, limit } = params;
        const [tasks, total] = await this.tasksRepository.findAndCount({
            where : {
                user : {
                    id : +userId
                }
            },
            skip : (page - 1) * limit,
            take : limit
        });

        return Paginate(tasks, page, limit, total);
    }
}

import { Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Tasks } from "./entity/tasks.entity";
import { Repository } from "typeorm";

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

    getTasks(userId : number){
        return this.tasksRepository.find({
            where : {
                user : {
                    id : +userId
                }
            }
        });
    }
}

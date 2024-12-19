import { TaskDto } from './task.dto';
import { TaskService } from './task.service';
export declare class TaskController {
    private readonly usersService;
    constructor(usersService: TaskService);
    create(response: any, taskDto: TaskDto): Promise<any>;
    delete(response: any, id: any): Promise<any>;
    update(response: any, id: any, taskDto: TaskDto): Promise<any>;
    getAll(response: any): Promise<any>;
    getOne(response: any, id: any): Promise<any>;
}

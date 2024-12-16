import { TaskService } from './task.service';
import { TaskDto } from './task.dto';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    getTasks(response: any): Promise<any>;
    getOneTask(response: any, id: any): Promise<any>;
    createTask(response: any, taskDto: TaskDto): Promise<any>;
    editTask(response: any, taskDto: TaskDto, id: any): Promise<any>;
    deleteTask(response: any, id: any): Promise<any>;
}

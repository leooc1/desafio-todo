import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskDto } from './task.dto';
export declare class TaskService {
    private readonly taskRepository;
    constructor(taskRepository: Repository<Task>);
    getTasks(): Promise<Task[]>;
    getOneTask(id: number): Promise<(string | number)[] | (number | Task[])[]>;
    createTask(task: TaskDto): Promise<(string | number)[] | (number | (TaskDto & Task))[]>;
    editTask(id: number, task: TaskDto): Promise<(string | number)[] | (number | import("typeorm").UpdateResult)[]>;
    deleteTask(id: number): Promise<(string | number)[] | (number | import("typeorm").DeleteResult)[]>;
}

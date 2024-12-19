import { Repository } from 'typeorm';
import { TaskDto } from './task.dto';
import { Task } from './task.entity';
export declare class TaskService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<Task>);
    create(taskDto: TaskDto): Promise<(number | (TaskDto & Task))[]>;
    delete(id: string): Promise<(number | import("typeorm").DeleteResult)[] | (string | number)[]>;
    update(id: string, taskDto: TaskDto): Promise<(string | number)[] | (number | import("typeorm").UpdateResult)[]>;
    getAll(): Promise<(number | Task[])[]>;
    getOne(id: any): Promise<(number | Task[])[]>;
}

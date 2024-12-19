import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskController } from "./Task.controller";
import { Task } from "./task.entity";
import { TaskService } from "./task.service";
@Module({
    imports:[
        TypeOrmModule.forFeature([Task])
    ],
    providers:[TaskService],
    controllers:[TaskController]
})
export class TaskModule{}
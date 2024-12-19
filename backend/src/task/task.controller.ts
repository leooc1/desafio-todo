import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { TaskDto } from './task.dto';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
    constructor(private readonly usersService: TaskService) { }

    @Post()
    async create(@Res() response, @Body() taskDto: TaskDto) {
        const created = await this.usersService.create(taskDto)
        return response.status(created[0]).json(created[1])
    }

    @Delete(':id')
    async delete(@Res() response, @Param('id') id) {
        const deleted = await this.usersService.delete(id)
        return response.status(deleted[0]).json(deleted[1])
    }

    @Put(':id')
    async update(@Res() response, @Param('id') id, @Body() taskDto: TaskDto) {
        const updated = await this.usersService.update(id, taskDto)
        return response.status(updated[0]).json(updated[1])
    }

    @Get()
    async getAll(@Res() response) {
        const tasks = await this.usersService.getAll()
        return response.status(tasks[0]).json(tasks[1])

    }

    @Get(':id')
    async getOne(@Res() response, @Param('id') id) {
        const task = await this.usersService.getOne(id)
        return response.status(task[0]).json(task[1])
    }
}
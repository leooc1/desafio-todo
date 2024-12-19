const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskDto } from './task.dto';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private readonly usersRepository: Repository<Task>
    ) { }

    async create(taskDto: TaskDto) {
        const created = await this.usersRepository.save(taskDto)
        return [201, created]
    }
    async delete(id: string) {
        const deleted = await this.usersRepository.delete(id)
        if (deleted.affected >= 1)
            return [204, deleted]
        else return [404, "Não possivel excluir essa tarefa."]
    }
    async update(id: string, taskDto: TaskDto) {
        const updated = await this.usersRepository.update(id,
            {
                titulo: taskDto.titulo,
                descricao: taskDto.descricao,
                status: taskDto.status
            }
        )
        if (updated.affected >= 1)
            return [200, updated]
        else return [404, "Não possivel editar essa tarefa."]
    }
    async getAll() {
        const tasks = await this.usersRepository.find({ relations: ['user'] })
        return [200, tasks]
    }
    async getOne(id) {
        const tasks = await this.usersRepository.find(
            {
                where: { id: id },
                relations: ['user']
            }
        )
        return [200, tasks]
    }

}
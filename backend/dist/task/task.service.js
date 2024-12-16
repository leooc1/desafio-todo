"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("./task.entity");
let TaskService = class TaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async getTasks() {
        const tasks = await this.taskRepository.find({ relations: ['user'] });
        return tasks;
    }
    async getOneTask(id) {
        const task = await this.taskRepository.find({ where: { id: id } });
        if (task.length <= 0)
            return [404, 'Nada foi encontrado'];
        return [200, task];
    }
    async createTask(task) {
        if (task.descricao.length <= 0 || task.titulo.length <= 0) {
            return [400, 'Dados incorretos!'];
        }
        const created = await this.taskRepository.save(task);
        return [201, created];
    }
    async editTask(id, task) {
        const updated = await this.taskRepository.update(id, {
            status: task.status,
            descricao: task.descricao,
            titulo: task.titulo,
        });
        if (updated.affected == 0)
            return [404, 'Tarefa não encontrada para edição'];
        return [200, updated];
    }
    async deleteTask(id) {
        const deleted = await this.taskRepository.delete(id);
        if (deleted.affected == 0)
            return [404, 'Tarefa não encontrada para exclusão'];
        return [200, deleted];
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TaskService);
//# sourceMappingURL=task.service.js.map
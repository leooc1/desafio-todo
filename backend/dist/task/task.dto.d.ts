import { Users } from "src/users/users.entity";
export declare class TaskDto {
    id?: number;
    titulo: string;
    descricao: string;
    status: string;
    user: Users;
    data_criacao: string;
}

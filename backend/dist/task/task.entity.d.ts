import { Users } from "src/users/users.entity";
export declare class Task {
    id: number;
    titulo: string;
    descricao: string;
    status: string;
    create_date: string;
    user: Users;
}

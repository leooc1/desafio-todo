import { Repository } from 'typeorm';
import { UsersDto } from './users.dto';
import { Users } from './users.entity';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<Users>);
    create(user: UsersDto): Promise<(string | number)[] | (number | ({
        nome: string;
        email: string;
        senha: any;
    } & Users))[]>;
    login(login: {
        email: string;
        senha: string;
    }): Promise<any[]>;
    decodedToken(token: string): Promise<unknown>;
}

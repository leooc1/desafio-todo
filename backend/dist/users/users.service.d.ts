import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { UsersDto } from './users.dto';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<Users>);
    create(user: UsersDto): Promise<(string | number)[] | (number | ({
        email: string;
        nome: string;
        senha: any;
    } & Users))[]>;
    login(login: {
        email: string;
        senha: string;
    }): Promise<any[]>;
    decodedToken(token: string): Promise<unknown>;
}

import { UsersDto } from './users.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(response: any, userDTO: UsersDto): Promise<any>;
    login(response: any, login: {
        email: string;
        senha: string;
    }): Promise<any>;
    decodedToken(response: any, token: any): Promise<any>;
}

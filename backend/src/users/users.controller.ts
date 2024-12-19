import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UsersDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }


    @Post('register')
    async createUser(@Res() response, @Body() userDTO: UsersDto) {
        const createdUsers = await this.usersService.create(userDTO)
        return response.status(createdUsers[0]).json(createdUsers[1])
    }

    @Post()
    async login(@Res() response, @Body() login: { email: string, senha: string }) {
        const userLogin = await this.usersService.login(login)
        return response.status(userLogin[0]).json(userLogin[1])
    }

    @Get('token/:token')
    async decodedToken(@Res() response, @Param('token') token) {
        const decoded = await this.usersService.decodedToken(token)
        return response.status(decoded[0]).json(decoded[1])
    }
}
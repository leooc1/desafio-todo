const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersDto } from './users.dto';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>
    ) { }

    async create(user: UsersDto) {
        const hash = await bcrypt.hash(user.senha, 10)
        const verifyEmail = await this.usersRepository.find({
            where: {
                email: user.email
            }
        })
        if (verifyEmail.length > 0) {
            return [400, 'Email já cadastrado!']
        }
        else {
            const createdUser = await this.usersRepository.save({
                "nome": user.nome,
                "email": user.email,
                "senha": hash

            })
            return [201, createdUser]
        }
    }

    async login(login: { email: string, senha: string }) {
        const userLogin = await this.usersRepository.find({
            where: {
                email: login.email
            },
        })

        let userLoged: UsersDto | null = null
        for (const u of userLogin) {
            if (await bcrypt.compare(login.senha, u.senha)) {
                userLoged = u
                break
            }
        }

        if (userLoged) {
            const token = await jwt.sign({ id: userLoged.id, nome: userLoged.nome, idUsu: userLoged.id }, 'defaultSecretKey', { expiresIn: 60 * 60 * 24 * 10 })
            return [200, token]
        }
        else return [404, "Usuário não encontrado!"]
    }

    async decodedToken(token: string) {

        return new Promise((resolve, reject) => {
            jwt.verify(token, 'defaultSecretKey', function (err: any, decoded: { id: string, }) {
                if (err)
                    reject([404, err])
                else
                    resolve([200, { id: decoded.id }])
            })
        })
    }


}
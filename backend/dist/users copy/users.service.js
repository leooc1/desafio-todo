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
exports.UsersService = void 0;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_entity_1 = require("./users.entity");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(user) {
        const hash = await bcrypt.hash(user.senha, 10);
        const verifyEmail = await this.usersRepository.find({
            where: {
                email: user.email
            }
        });
        if (verifyEmail.length > 0) {
            return [400, 'Email já cadastrado!'];
        }
        else {
            const createdUser = await this.usersRepository.save({
                "nome": user.nome,
                "email": user.email,
                "senha": hash
            });
            return [201, createdUser];
        }
    }
    async login(login) {
        const userLogin = await this.usersRepository.find({
            where: {
                email: login.email
            },
        });
        let userLoged = null;
        for (const u of userLogin) {
            if (await bcrypt.compare(login.senha, u.senha)) {
                userLoged = u;
                break;
            }
        }
        if (userLoged) {
            const token = await jwt.sign({ id: userLoged.id, nome: userLoged.nome, idUsu: userLoged.id }, 'defaultSecretKey', { expiresIn: 60 * 60 * 24 * 10 });
            return [200, token];
        }
        else
            return [404, "Usuário não encontrado!"];
    }
    async decodedToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, 'defaultSecretKey', function (err, decoded) {
                if (err)
                    reject([404, err]);
                else
                    resolve([200, { id: decoded.id }]);
            });
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map
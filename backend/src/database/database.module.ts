import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            username: 'postgres',
            password: 'loc35516766',
            database: 'todo',
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: true,
        })
    ]
})
export class DatabaseModule { }
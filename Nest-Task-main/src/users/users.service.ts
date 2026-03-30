import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private repo: Repository<User>,
    ) { }

    async create(dto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = this.repo.create({
            ...dto,
            password: hashedPassword,
        });

        return this.repo.save(user);
    }

    findAll() {
        return this.repo.find();
    }

    async update(id: number, dto: UpdateUserDto) {
        await this.repo.update(id, dto);
        return this.repo.findOneBy({ id });
    }

    softDelete(id: number) {
        return this.repo.softDelete(id);
    }

    hardDelete(id: number) {
        return this.repo.delete(id);
    }

    findByEmail(email: string) {
        return this.repo.findOne({ where: { email } });
    }
}
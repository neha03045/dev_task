import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../common/guards/jwt.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    getUsers() {
        return this.usersService.findAll();
    }

    @Post()
    createUser(@Body() dto: CreateUserDto) {
        return this.usersService.create(dto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    updateUser(@Param('id') id: number, @Body() dto: UpdateUserDto) {
        return this.usersService.update(id, dto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete('soft/:id')
    softDelete(@Param('id') id: number) {
        return this.usersService.softDelete(id);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete('hard/:id')
    hardDelete(@Param('id') id: number) {
        return this.usersService.hardDelete(id);
    }
}
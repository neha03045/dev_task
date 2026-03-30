import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../common/guards/jwt.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto.email, dto.password);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMe(@Req() req: Request) {
        return (req as any).user;
    }
}
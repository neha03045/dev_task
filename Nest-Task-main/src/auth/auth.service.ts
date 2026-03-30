import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignJWT, jwtVerify } from 'jose';
import * as bcrypt from 'bcrypt';

const SECRET = new TextEncoder().encode('MY_SECRET');

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async login(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);

        if (!user) throw new UnauthorizedException();

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new UnauthorizedException();

        const token = await new SignJWT({ sub: String(user.id), email })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('1h')
            .sign(SECRET);

        return { access_token: token };
    }

    async verify(token: string) {
        const { payload } = await jwtVerify(token, SECRET);
        return payload;
    }
}
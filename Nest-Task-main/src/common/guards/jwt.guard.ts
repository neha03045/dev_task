import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode('MY_SECRET');

@Injectable()
export class JwtAuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        const authHeader = request.headers.authorization;
        if (!authHeader) throw new UnauthorizedException();

        const token = authHeader.split(' ')[1];
        if (!token) throw new UnauthorizedException();

        try {
            const { payload } = await jwtVerify(token, SECRET);
            request.user = payload;
            return true;
        } catch {
            throw new UnauthorizedException();
        }
    }
}
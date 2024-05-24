import {
ConflictException,
Injectable,
InternalServerErrorException,
UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/schema/user.schema';
import { JwtPayload } from './model/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ) {}

async register(user: User): Promise<void> {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);

    try {
        await this.userService.create(user);
    } catch (err) {
        if (err.code === '23505') {
            throw new ConflictException('Username already exists');
        } else {
            throw new InternalServerErrorException();
        }
    }
}

async login(inputUser: User): Promise<{ accessToken: string, userId: string }> {
    const inputUsername: string = inputUser.username;
    const user: User = await this.userService.findUserAuth(inputUsername);
    const inputPassword: string = inputUser.password;

    if(user && await bcrypt.compare(inputPassword, user.password)) {
        const payload: JwtPayload = { username: inputUsername };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken: accessToken, userId: user._id};
    } else {
        throw new UnauthorizedException('Please make sure your login credentials is correct.');
    }
} 
}

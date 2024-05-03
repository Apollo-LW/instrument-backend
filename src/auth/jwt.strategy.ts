import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Inject, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { JwtPayload } from "./model/jwt-payload.interface";
import { User } from "src/user/schema/user.schema";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject(UserService) private readonly userService: UserService) {
        super({
            secretOrKey: 'aacb8b50e986b2cca1033ac79150',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const user: User = await this.userService.findUserAuth(payload.username);

        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
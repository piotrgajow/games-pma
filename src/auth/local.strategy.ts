import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users.service';

const CONFIG = {
    usernameField: "login"
};

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    private readonly usersService: UsersService;

    constructor(usersService: UsersService) {
        super(CONFIG);

        this.usersService = usersService;
    }

    async validate(login: string, password: string): Promise<any> {
        const user = await this.usersService.validateUser(login, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}

import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ILoginDTO } from 'src/DTO/ILoginDTO';
import { IUserDTO } from 'src/DTO/IUserDTO';
import { UsersService } from 'src/services/users/users.service';

@Controller('users')
export class UsersController {

    constructor (private usersService: UsersService) {}

    @Post('/register')
    @HttpCode(201)
    createUser (@Body() userDTO: IUserDTO) {
        return this.usersService.createUser(userDTO)
    }

    @Post('/login')
    @HttpCode(202)
    login(@Body() loginDTO: ILoginDTO) {
        return this.usersService.login(loginDTO)
    }
}

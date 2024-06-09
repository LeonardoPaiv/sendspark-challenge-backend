import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ILoginDTO } from 'src/DTO/ILoginDTO';
import { IUserDTO } from 'src/DTO/IUserDTO';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('auth')
export class AuthController {

    constructor (private authService: AuthService) {}

    @Post('/register')
    @HttpCode(201)
    createUser (@Body() userDTO: IUserDTO) {
        return this.authService.createUser(userDTO)
    }

    @Post('/login')
    @HttpCode(202)
    login(@Body() loginDTO: ILoginDTO) {
        return this.authService.login(loginDTO)
    }
}

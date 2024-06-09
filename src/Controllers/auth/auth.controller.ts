import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ILoginDTO } from 'src/DTO/ILoginDTO';
import { IUserDTO } from 'src/DTO/IUserDTO';
import { CreateUserDto } from 'src/Swagget/CreateUserDto';
import { LoginDto } from 'src/Swagget/LoginDTO';
import { AuthService } from 'src/services/auth/auth.service';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor (private authService: AuthService) {}

    @Post('/register')
    @HttpCode(201)
    @ApiBody({type: CreateUserDto})
    createUser (@Body() userDTO: IUserDTO) {
        return this.authService.createUser(userDTO)
    }

    @Post('/login')
    @HttpCode(202)
    @ApiBody({type: LoginDto})
    login(@Body() loginDTO: ILoginDTO) {
        return this.authService.login(loginDTO)
    }
}

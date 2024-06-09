import { HttpException, Injectable, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserDTO } from 'src/DTO/IUserDTO';
import {hash, compareSync, genSalt} from 'bcrypt'
import { User } from 'src/Entities/User';
import { toEntity } from 'src/Mappers/UserMap';
import { Repository } from 'typeorm';
import { ILoginDTO } from 'src/DTO/ILoginDTO';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService,
        private userService: UsersService
      ) {}
    
      async createUser (newUser: IUserDTO) {
        const user = await this.userService.findByEmail(newUser.workEmail)
        if (user) {
          throw new HttpException('Email Already Registered', HttpStatus.BAD_REQUEST)
        }
    
        const salt = await genSalt(10)
        const hashedPassword = await hash(newUser.password, salt)
        const userEntity: User = toEntity({...newUser, password: hashedPassword});
    
        const createdUser = await this.usersRepository.save(userEntity);
        const payload = {sub: createdUser.id, createdUsername: createdUser.workEmail}
    
        return {access_token: await this.jwtService.signAsync(payload), firstName: createdUser.firstName}
      }
    
      async login (loginDTO: ILoginDTO) {
        const user = await this.userService.findByEmail(loginDTO.email)
    
        if (user && compareSync(loginDTO.password, user.password)) {
          const payload = {sub: user.id, username: user.workEmail}
          return {access_token: await this.jwtService.signAsync(payload), firstName: user.firstName}
        }
        
        throw new UnauthorizedException();
      }
}

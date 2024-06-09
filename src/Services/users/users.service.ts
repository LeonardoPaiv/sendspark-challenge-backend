import { HttpException, Injectable, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserDTO } from 'src/DTO/IUserDTO';
import {hash, compareSync} from 'bcrypt'
import { User } from 'src/Entities/User';
import { toEntity } from 'src/Mappers/UserMap';
import { Repository } from 'typeorm';
import { ILoginDTO } from 'src/DTO/ILoginDTO';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

  private salt = 10 

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  private async findByEmail (email: string) {
    const user = await this.usersRepository.findOne({
      where: {
        workEmail: email
      }
    })
    return user
  }

  async createUser (newUser: IUserDTO) {
    const user = await this.findByEmail(newUser.workEmail)
    if (user) {
      throw new HttpException('Email Already Registered', HttpStatus.BAD_REQUEST)
    }

    const hashedPassword = await hash(newUser.password, this.salt)
    const userEntity: User = toEntity({...newUser, password: hashedPassword});

    const createdUser = await this.usersRepository.save(userEntity);
    const payload = {sub: createdUser.id, createdUsername: createdUser.workEmail}

    return {access_token: await this.jwtService.signAsync(payload)}
  }

  async login (loginDTO: ILoginDTO) {
    const user = await this.findByEmail(loginDTO.email)

    if (user && compareSync(loginDTO.password, user.password)) {
      const payload = {sub: user.id, username: user.workEmail}
      return {access_token: await this.jwtService.signAsync(payload)}
    }
    
    throw new UnauthorizedException();
  }
}

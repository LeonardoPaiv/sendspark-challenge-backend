import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from './services/users/users.service';
import { UsersController } from './Controllers/users/users.controller';
import { User } from './Entities/User';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
      synchronize: false,
      entities: [User]
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: 'test',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}

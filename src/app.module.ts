import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from './services/users/users.service';
import { UsersController } from './Controllers/users/users.controller';
import { User } from './Entities/User';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthGuard } from './guards/logged/logged.guard';

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
      secret: process.env.SECRET,
      signOptions: { expiresIn: '10m' },
    }),
  ],
  controllers: [UsersController, AuthController],
  providers: [UsersService, AuthService, AuthGuard],
})
export class AppModule {}

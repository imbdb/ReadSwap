import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [UsersModule, PassportModule, DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}

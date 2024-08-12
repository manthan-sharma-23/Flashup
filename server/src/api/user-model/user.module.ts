import { Module } from '@nestjs/common';
import DatabaseService from 'src/engine/database/database.service';
import { BcryptService } from 'src/engine/services/Bcrypt.service';
import { JwtService } from 'src/engine/services/JwtService.service';
import UserService from './user.service';
import UserController from './user.controller';

@Module({
  providers: [UserService, DatabaseService, BcryptService, JwtService],
  controllers: [UserController],
})
export default class UserModule {}

import { Module } from '@nestjs/common';
import DatabaseService from 'src/engine/database/database.service';
import { BcryptService } from 'src/engine/services/Bcrypt.service';
import UserService from './user.service';
import UserController from './user.controller';
import { JwtService } from 'src/engine/services/Jwt.service';

@Module({
  providers: [UserService, DatabaseService, BcryptService, JwtService],
  controllers: [UserController],
})
export default class UserModule {}

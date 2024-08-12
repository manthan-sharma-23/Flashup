import { Module } from '@nestjs/common';
import DatabaseService from 'src/engine/database/database.service';
import { JwtService } from 'src/engine/services/Jwt.service';
import { BcryptService } from 'src/engine/services/Bcrypt.service';
import TopicController from './topic.controller';
import TopicService from './topic.service';

@Module({
  controllers: [TopicController],
  providers: [TopicService, DatabaseService, JwtService, BcryptService],
})
export default class TopicModule {}

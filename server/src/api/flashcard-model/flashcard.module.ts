import { Module } from '@nestjs/common';
import FlashCardService from './flashcard.service';
import DatabaseService from 'src/engine/database/database.service';
import FlashCardController from './flashcard.controller';
import { JwtService } from 'src/engine/services/Jwt.service';
import { BcryptService } from 'src/engine/services/Bcrypt.service';

@Module({
  controllers: [FlashCardController],
  providers: [FlashCardService, DatabaseService, JwtService, BcryptService],
})
export default class FlashCardModule {}

import { Module } from '@nestjs/common';
import UserModule from './api/user-model/user.module';
import FlashCardModule from './api/flashcard-model/flashcard.module';

@Module({
  imports: [UserModule, FlashCardModule],
})
export class AppModule {}

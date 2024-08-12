import { Module } from '@nestjs/common';
import UserModule from './api/user-model/user.module';
import FlashCardModule from './api/flashcard-model/flashcard.module';
import TopicModule from './api/topic-model/topic.module';

@Module({
  imports: [UserModule, FlashCardModule, TopicModule],
})
export class AppModule {}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import DatabaseService from 'src/engine/database/database.service';
import { TopicValidator } from 'src/lib/types/validators/topic.validators';

@Injectable()
export default class TopicService {
  constructor(private databaseService: DatabaseService) {}

  async create_topic(req: Request) {
    const { userId } = req.user;
    const input = TopicValidator.parse(req.body);

    const topic = await this.databaseService.topic.create({
      data: {
        name: input.name,
        description: input.description,
        userId,
      },
    });

    return topic;
  }

  async get_user_topics(req: Request) {
    const { userId } = req.user;

    const topics = await this.databaseService.topic.findMany({
      where: {
        AND: [{ userId }, { isActive: true }],
      },
    });

    return topics;
  }

  async get_topic_flashcard(topicId: string, req: Request) {
    const { userId } = req.user;
    await this.is_topic_owned(userId, topicId);

    const topic = await this.databaseService.topic.findUnique({
      where: {
        id: topicId,
      },
      include: {
        flashcards: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    return topic;
  }

  async is_topic_owned(userId: string, topicId: string) {
    const topic = await this.databaseService.topic.findFirstOrThrow({
      where: {
        id: topicId,
      },
    });

    if (topic.userId !== userId)
      throw new UnauthorizedException('Topic is not authorized to user');

    return true;
  }
}

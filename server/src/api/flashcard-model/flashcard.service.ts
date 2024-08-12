import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import DatabaseService from 'src/engine/database/database.service';
import { FlashCardInputValidator } from 'src/lib/types/validators/flashcard.validator';

@Injectable()
export default class FlashCardService {
  constructor(private databaseService: DatabaseService) {}

  async get_flash_cards() {
    const flashCards = this.databaseService.flashcard.findMany({
      where: {
        isActive: true,
      },
      include: {
        User: true,
        Topic: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return flashCards;
  }

  async get_flash_card(flashCardId: string) {
    const flashCard = await this.databaseService.flashcard.findFirstOrThrow({
      where: {
        id: flashCardId,
      },
      include: {
        User: true,
        Bookmark: false,
        Topic: true,
      },
    });

    if (!flashCard.isActive) {
      throw new UnauthorizedException("Flash card isn't active any more");
    }
    return flashCard;
  }

  async create_flash_card(req: Request) {
    const input = FlashCardInputValidator.parse(req.body);
    const { userId } = req.user;

    const flashcard = await this.databaseService.flashcard.create({
      data: {
        question: input.question,
        answer: input.answer,
        isTopic: input.isTopic,
        userId,
        topicId: input.topicId || null,
      },
    });

    return flashcard;
  }

  async delete_flash_card(flashCardId: string, req: Request) {
    const { userId } = req.user;

    await this.is_flash_card_owner(flashCardId, userId);

    await this.databaseService.flashcard.update({
      where: {
        id: flashCardId,
      },
      data: {
        isActive: false,
      },
    });
    return true;
  }

  async update_flash_card(flashCardId: string, req: Request) {
    await this.is_flash_card_owner(flashCardId, req.user.userId);

    const input = FlashCardInputValidator.parse(req.body);

    const flashCard = await this.databaseService.flashcard.update({
      where: {
        id: flashCardId,
      },
      data: {
        question: input.question,
        answer: input.answer,
      },
    });

    return flashCard;
  }

  async bookmark_flash_card(flashCardId: string, req: Request) {
    const { userId } = req.user;

    const bookmark = await this.databaseService.bookmark.create({
      data: {
        userId,
        flashcardId: flashCardId,
      },
    });

    return bookmark;
  }

  async is_flash_card_owner(flashCardId: string, userId: string) {
    const flashCard = await this.databaseService.flashcard.findFirstOrThrow({
      where: {
        id: flashCardId,
      },
    });

    if (flashCard.userId !== userId) {
      throw new UnauthorizedException("User doesn't own the flash card");
    }
    return true;
  }
}

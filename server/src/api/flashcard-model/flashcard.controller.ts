import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import AuthenticateJWTToken from 'src/engine/guards/authenticateJwt.guard';
import FlashCardService from './flashcard.service';

@Controller('/v1/flashcard')
export default class FlashCardController {
  constructor(private flashCardService: FlashCardService) {}

  @Post('/create')
  @UseGuards(AuthenticateJWTToken)
  async create_flash_card(@Req() req: Request) {
    return await this.flashCardService.create_flash_card(req);
  }

  @Post('/delete-flashcard/:flashCardId')
  @UseGuards(AuthenticateJWTToken)
  async delete_flash_card(
    @Param() { flashCardId }: { flashCardId: string },
    @Req() req: Request,
  ) {
    return await this.flashCardService.delete_flash_card(flashCardId, req);
  }
}

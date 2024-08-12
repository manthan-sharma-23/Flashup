import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import AuthenticateJWTToken from 'src/engine/guards/authenticateJwt.guard';
import FlashCardService from './flashcard.service';

@Controller('/v1/flashcard')
export default class FlashCardController {
  constructor(private flashCardService: FlashCardService) {}

  @Get('/:flashCardId')
  @UseGuards(AuthenticateJWTToken)
  async get_flash_card(@Param() { flashCardId }: { flashCardId: string }) {
    return await this.flashCardService.get_flash_card(flashCardId);
  }

  @Get('/all')
  @UseGuards(AuthenticateJWTToken)
  async get_all_cards() {
    return await this.flashCardService.get_flash_cards();
  }

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

  @Put('/update-flashcard/:flashCardId')
  @UseGuards(AuthenticateJWTToken)
  async update_flash_card(
    @Param() { flashCardId }: { flashCardId: string },
    @Req() req: Request,
  ) {
    return await this.flashCardService.update_flash_card(flashCardId, req);
  }
}

import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import TopicService from './topic.service';
import AuthenticateJWTToken from 'src/engine/guards/authenticateJwt.guard';
import { Request } from 'express';

@Controller('/v1/topics')
export default class TopicController {
  constructor(private topicService: TopicService) {}

  @Post('/create')
  @UseGuards(AuthenticateJWTToken)
  async create_topic(@Req() req: Request) {
    return await this.topicService.create_topic(req);
  }

  @Get('/topics')
  @UseGuards(AuthenticateJWTToken)
  async get_user_topics(@Req() req: Request) {
    return await this.topicService.get_user_topics(req);
  }
  @Get('/all')
  @UseGuards(AuthenticateJWTToken)
  async get_all_topics() {
    return await this.topicService.get_all_topics();
  }

  @Get('/topic/:topicId')
  @UseGuards(AuthenticateJWTToken)
  async get_topic_flash_cards(
    @Param() { topicId }: { topicId: string },
    @Req() req: Request,
  ) {
    return await this.topicService.get_topic_flashcard(topicId, req);
  }
}

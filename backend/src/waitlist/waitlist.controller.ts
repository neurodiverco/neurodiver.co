import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { WaitlistService } from './waitlist.service';
import { WaitlistDto } from './dto/waitlist.dto';

@Controller('waitlist')
export class WaitlistController {
  constructor(private readonly waitlistService: WaitlistService) {}

  /**
   * GET /api/waitlist/count
   * One-shot count, used as the initial value before the SSE stream connects.
   */
  @Get('count')
  getCount() {
    return this.waitlistService.getCount();
  }

  /**
   * GET /api/waitlist/count-stream
   * Server-Sent Events stream — sends a `count` event whenever the
   * Firestore waitlist collection changes.
   */
  @Get('count-stream')
  @Header('Content-Type', 'text/event-stream')
  @Header('Cache-Control', 'no-cache')
  @Header('X-Accel-Buffering', 'no') // disable nginx proxy buffering
  async countStream(@Res() res: Response) {
    res.flushHeaders();

    // Send the current count immediately so the client doesn't wait for
    // the first Firestore change event.
    const { count: initial } = await this.waitlistService.getCount();
    res.write(`data: ${JSON.stringify({ count: initial })}\n\n`);

    // Forward every Firestore update to this client.
    const sub = this.waitlistService.count$.subscribe((count) => {
      res.write(`data: ${JSON.stringify({ count })}\n\n`);
    });

    // Clean up when the browser closes the connection.
    res.on('close', () => {
      sub.unsubscribe();
      res.end();
    });
  }

  /**
   * POST /api/waitlist/join
   */
  @Post('join')
  @HttpCode(HttpStatus.CREATED)
  join(@Body() dto: WaitlistDto) {
    return this.waitlistService.join(dto);
  }
}

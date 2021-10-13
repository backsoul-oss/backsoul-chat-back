import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WsService } from './ws/ws.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, WsService],
})
export class AppModule {}

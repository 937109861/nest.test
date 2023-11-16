import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TksController } from './tks/tks.controller';
import { TksService } from './tks/tks.service';
import { TksModule } from './tks/tks.module';

@Module({
  imports: [TksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
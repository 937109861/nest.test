import { Module } from '@nestjs/common';
import { TksController } from './tks.controller';
import { TksService } from './tks.service';

@Module({controllers:[TksController],providers:[TksService]})
export class TksModule {

}

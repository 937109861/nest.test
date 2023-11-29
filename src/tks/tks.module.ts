import { Module } from '@nestjs/common';
import { TksController } from './tks.controller';
import { TksService } from './tks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/tks.entity';
import { Flavor } from './entity/flavor.entity/flavor.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Coffee,Flavor,Event])],
    controllers:[TksController],
    providers:[TksService]})
export class TksModule {

}

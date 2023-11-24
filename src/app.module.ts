import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TksController } from './tks/tks.controller';
import { TksService } from './tks/tks.service';
import { TksModule } from './tks/tks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TksModule,TypeOrmModule.forRoot(
    {
      type:'postgres',
      host:'localhost',
      port:5432,
      username:'postgres',
      password:'123123',
      database:'postgres',
      autoLoadEntities:true,
      synchronize:true,
    }
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { response } from 'express';
import { TksService } from 'src/tks/tks.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';

@Controller('tks')
export class TksController {
    constructor(private readonly tksService:TksService) {}


    @Get()
    findAll(@Query() paginationQuery){
        //const {limit,offset}=paginationQuery;
        return this.tksService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        console.log(typeof id);
        return this.tksService.findOne(id);
    }

    @Post()
    create (@Body() createCoffeeDto:CreateCoffeeDto)
    {
        console.log(createCoffeeDto instanceof CreateCoffeeDto);
        return this.tksService.create(createCoffeeDto);
    }

    @Patch(':id')
    update(@Param('id') id: string,@Body() updateCoffeeDto:UpdateCoffeeDto){
        return this.tksService.update(id,updateCoffeeDto);
    }

    @Delete(':id')
    remove(@Param('id') id:string){
        return this.tksService.remove(id);
    }

}

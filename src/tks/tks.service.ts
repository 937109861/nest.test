import { HttpException, HttpStatus, Injectable, NotFoundException, UnsupportedMediaTypeException } from '@nestjs/common';
import { Coffee } from './entities/tks.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { Flavor } from './entity/flavor.entity/flavor.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { Event } from 'src/events/entities/event.eneity/event.eneity';
import { query } from 'express';

@Injectable()
export class TksService {

    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository:Repository<Coffee>,
        @InjectRepository(Flavor)
        private readonly flavorRepository:Repository<Flavor>,
        private readonly datasource:DataSource,
    ){}

    findAll(paginationQuery:PaginationQueryDto){
        const{limit,offset}=paginationQuery;
        return this.coffeeRepository.find({
            relations:['flavors'],
            skip:offset,
            take:limit,
        });
    }

    async findOne(id:string){
        const coffee = await this.coffeeRepository.findOne(
            {where:{id:+id},relations:['flavors']}
            );
        if(!coffee){
            throw new NotFoundException(`Coffee #${id} not found`);
        }
        return coffee;
    }

    async create(createCoffeeDto:CreateCoffeeDto){
        const flavors = await Promise.all(
            createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
            );
        
        const coffee = this.coffeeRepository.create({

            ...createCoffeeDto,
            flavors,
        });
        return this.coffeeRepository.save(coffee);
    }

    async update(id:string,updateCoffeeDto:UpdateCoffeeDto){
        const flavors= 
        updateCoffeeDto.flavors&&
        (await Promise.all(
            updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
        ));

        const coffee = await this.coffeeRepository.preload({//preload会根据传入的对象创建一个新实体，会检测数据库中是否存在此实体
            id:+id,
            ...updateCoffeeDto,
            flavors,
        });
        if(!coffee){
            throw new NotFoundException(`Coffee #${id} not found`);
        }
        return this.coffeeRepository.save(coffee);
    }

    async remove(id:string){
        const coffee = await this.findOne(id);
        return this.coffeeRepository.remove(coffee);
    }

    async recommendCoffee(coffee:Coffee)
    {
        const queryRunner= this.datasource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try{
            coffee.recommendations++;

            const recommendEvent = new Event();
            recommendEvent.name='recommend_coffee';
            recommendEvent.type='coffee';
            recommendEvent.payload={coffeeID: coffee.id};

            await queryRunner.manager.save(coffee);
            await queryRunner.manager.save(recommendEvent);

            await queryRunner.commitTransaction();
            }
            catch(err){
                await queryRunner.rollbackTransaction();
            }
            finally{
                await queryRunner.release();
            }
    }

    private async preloadFlavorByName(name:string):Promise<Flavor>{
        const existingFlavor= await this.flavorRepository.findOne({where:{name:name}});
        if(existingFlavor)
        {
            return existingFlavor;
        }
        return this.flavorRepository.create({name});
    }
}

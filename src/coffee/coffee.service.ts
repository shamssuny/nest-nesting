import { Injectable } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Repository } from 'typeorm';
import { Flavor } from './entities/flavor.entity';

@Injectable()
export class CoffeeService {

    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository : Repository<Coffee>,

        @InjectRepository(Flavor)
        private readonly flavorRepository : Repository<Flavor>
    ){}

    public coffees = ["capacinno","mocha","latte"]

    findAll(){
        // return null;
        return this.coffeeRepository.find({
            relations : ['flavors']
        });
    }

    async findOneCoffee(id : string){
        const data = await this.coffeeRepository.findOne({
            where: {
                id : +id
            },
            relations : ['flavors']
        });
        return data;
    }

    async createCoffee(createCoffeeDto : CreateCoffeeDto){
        const flavors = await Promise.all(
            createCoffeeDto.flavors?.map(name => this.preloadFlavorByName(name))
        )
        const data =  this.coffeeRepository.create({
            ...createCoffeeDto,
            flavors
        });
        return this.coffeeRepository.save(data);
    }

    private async preloadFlavorByName(name :  string): Promise<Flavor> {
        const existingFlavor = await this.flavorRepository.findOneBy({name})

        if(existingFlavor){
            return existingFlavor;
        }

        return this.flavorRepository.create({name});
    }
}

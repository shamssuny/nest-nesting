import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { updateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffee')
export class CoffeeController {

    constructor(
        public readonly coffeeService : CoffeeService
    ){}

    @Get()
    findAll(@Query() pagination){
        const {limit, offset} = pagination;
        const data = this.coffeeService.findAll();

        if(!data){
            throw new HttpException('Data not found', HttpStatus.NOT_FOUND)
        }
       
        return data;
        // return `all coffees ${limit} ${offset}`;
    }

    @Get(':id')
    findOne(@Param('id') id : string){
        return this.coffeeService.findOneCoffee(id);
    }

    @Post()
    create(@Body() createCoffeeDto : CreateCoffeeDto,@Res() res){
        //console.log(createCoffeeDto)
        this.coffeeService.createCoffee(createCoffeeDto);
        res.status(200).send(createCoffeeDto);
    }


    @Patch()
    update(@Body() updateCoffeeDto : updateCoffeeDto,@Res() res){
        console.log(updateCoffeeDto)
        res.status(200).send(updateCoffeeDto);
    }

}

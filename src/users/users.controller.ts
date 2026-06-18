import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private readonly userService : UsersService
    ){}

    @Get('')
    getAll(){
        return this.userService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id){
        //console.log(typeof id)
        if(id == 'err'){
            throw new HttpException('DJ PANKAZ',HttpStatus.BAD_REQUEST)
        }
        return "user id: "+id;
    }

    @Post('')
    create(@Body() body){
        return body
    }
}

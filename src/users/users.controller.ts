import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
    create(@Body() createUserDto : CreateUserDto){
        return createUserDto
    }

    @Patch('')
    update(@Body() updateUserDto : UpdateUserDto){
        return updateUserDto
    }

    
}

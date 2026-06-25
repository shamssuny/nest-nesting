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
        return this.userService.findOneUser(id);
    }

    @Post('')
    create(@Body() createUserDto : CreateUserDto){
        return this.userService.createUser(createUserDto)
    }

    @Patch(':id')
    update(@Param('id') id,@Body() updateUserDto : UpdateUserDto){
        return this.userService.updateUser(id,updateUserDto)
    }

    @Delete(':id')
    deleteOne(@Param('id') id){
        return this.userService.deleteOneUser(id)
    }

    
}

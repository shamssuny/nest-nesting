import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsersService {

    //INIT DB REPOSITORY IN THE SERVICE
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository : Repository<Users>
    ){}

    getAll(){
        return this.usersRepository.find({
            relations : ['tasks']
        })
    }

    async createUser(createUserDto : CreateUserDto){

        const user = await this.findOneUserByName(createUserDto?.username);
        if(user){
            throw new HttpException("User Exists!",400)
        }

        const hashedPass = await bcrypt.hash(createUserDto?.password, 11)

        const userData = this.usersRepository.create({
            ...createUserDto,
            password : hashedPass
        });
        return this.usersRepository.save(userData)
    }

    async findOneUserByName(username : string){
        const user = await this.usersRepository.findOne({
            where : {
                username : username
            }
        });

        return user ?? null;
    }

    async findOneUser(id : number){
        return await this.usersRepository.findOneBy({id});
    }

    async updateUser(id: number,updateUser : UpdateUserDto){
        console.log(id)
        const user = await this.usersRepository.preload({
            id: +id,
            ...updateUser
        });

        if(!user){
            throw new HttpException("not found",404)
        }

        return this.usersRepository.save(user)
    }

    async deleteOneUser (id: number){
        return await this.usersRepository.delete(id)
    }

}

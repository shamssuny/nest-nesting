import {IsEmpty, IsOptional, IsString, MinLength} from 'class-validator'
export class CreateUserDto {
    @IsString()
    @MinLength(3)
    readonly username! : string;

    @IsString()
    readonly password! : string;

    @IsString()
    readonly email! : string;

    @IsOptional() @IsString({each:true})
    readonly tasks? : string[];
} 

import { IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator"
import { Users } from "../../users/entities/user.entity"

export class CreateTaskDto {
    @IsString()
    @MinLength(4)
    readonly name! : string

    @IsString()
    @MaxLength(200)
    readonly details! : string

    @IsOptional()
    readonly user? : Users
}

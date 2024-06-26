import { IsNumber, IsPositive, IsString, MinLength,Min, IsStrongPassword } from "class-validator";
export class CreateUserDto {
    
    @IsString()
    email: string;

    @IsString()
    name: string;

    @IsString()
    lastName: string;

    @IsString(
        
    )
    password: string;
}

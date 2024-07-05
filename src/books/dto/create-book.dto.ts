import { IsInt, IsNumber, IsPositive, IsString, MinLength } from "class-validator";


export class CreateBookDto {

    @IsString()
    @MinLength(5)
    title:string;

    @IsString()
    author: string;

    @IsNumber()
    @IsPositive()
    @IsInt()
    number_pages:number;

    @IsString()
    @MinLength(3)
    genre: string;
}

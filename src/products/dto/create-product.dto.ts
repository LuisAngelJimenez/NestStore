import { IsNumber, IsPositive, IsString, MinLength,Min, } from "class-validator";
import { Category } from "src/categories/entities/category.entity";

export class CreateProductDto {


    @MinLength(4)
    @IsString()
    product_name: string;

    @MinLength(12)
    @IsString()
    description: string;

    @IsNumber()
    @IsPositive()
    @Min(1)
    price: number;

    @IsNumber()
    @IsPositive()
    @Min(2)
    stock: number;

    @IsNumber()
    @IsPositive()
    category: Category;
}
import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';


//partialType es una clase que hace que todos los campos sean opcionales
export class UpdateProductDto extends PartialType(CreateProductDto) {


}

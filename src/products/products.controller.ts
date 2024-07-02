import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileValidator } from './helpers/validatonFile';
import { identity } from 'rxjs';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  //agregar una funcion para que busque un producto mediante su nombre//


  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }
  @Get('/search')
  //el query "?" es cuando utilizamos la url con el signo//
  search(@Query('termino') termino: string) {
    return this.productsService.buscarProducto(termino);
  }

  @Get('/byFecha')
  buscarPorFecha(@Query('date') date: string) {
    const fechaTrans = new Date(date);
    return this.productsService.buscarPorFecha(fechaTrans);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }

  @Patch(':id/activar')
  activar(@Param('id') id: string) {
    this.productsService.active(+id);
  }

  //aqui usaremos el multer PARA SUBIR imagenes//


  @Post('withImage/:id')
  /*aqui se utilizan interceptors*/
  @UseInterceptors(FileInterceptor('img'/*nombre a darle*/, {
    //tamaño//
    fileFilter:fileValidator,
    limits: { fieldSize: 3000 },
    //aqui ponemos la ruta donde se va almacenar la imagen//
    storage: diskStorage({
      destination: 'static/uploads',
      //le pondra el nombre original que trae//
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      }
    })
  })
  )
  //aqui se recibe un uploadedFile para archivos
  uploadImage(@Param('id')id:number,@UploadedFile()
  //recibimos un file de tipo express multer file//
  file:Express.Multer.File) {
    if(file){
      new  BadRequestException('no hay file :(');
      this.productsService.addImage(id,file.originalname)
      return{
        message:'imagen subida correctamente',
        file: file.originalname
      };
    }
  }
}

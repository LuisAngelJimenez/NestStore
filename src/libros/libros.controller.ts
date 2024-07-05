import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreateLibroDto } from './dto/create-libro.dto';
import { BooksService } from './libros.service';
import { UpdateLibroDto } from './dto/update-libro.dto';

@Controller('libros')
export class BooksController {
  constructor(private readonly LibrosService: BooksService) {}

  
  @Post()
  create(@Body() createBookDto: CreateLibroDto) {
    return this.LibrosService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.LibrosService.findAll();
  }
  @Get('/searchByAuthor')
  //el query "?" es cuando utilizamos la url con el signo//
  search(@Query('termino') termino: string) {
    return this.LibrosService.buscarProducto(termino);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.LibrosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateLibroDto) {
    return this.LibrosService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.LibrosService.remove(+id);
  }


  
}

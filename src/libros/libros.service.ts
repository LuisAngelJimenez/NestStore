import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Libro } from './entities/libro.entity';
import { Repository,Like } from 'typeorm';

@Injectable()
export class BooksService {

  constructor(@InjectRepository(Libro)
private bookRepo: Repository<Libro>){

}

  async create(createBookDto: CreateLibroDto) {
    try{
      const book=this.bookRepo.create(createBookDto);
      await this.bookRepo.save(book);
      return book;
    }catch(error){
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try{
      const books= this.bookRepo.find();
      return books;
    }catch(error){
      throw new InternalServerErrorException(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateLibroDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }

  async buscarProducto(termino: string) {
    const buscados = await this.bookRepo.find({
      where: {
        author: Like(`%${termino}%`),
      }
    });
    if (buscados) {
      return buscados;
    } else {
      throw new InternalServerErrorException('Producto no localizado');
    }
  }

}

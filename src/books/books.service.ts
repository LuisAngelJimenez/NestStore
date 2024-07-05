import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository,Like } from 'typeorm';

@Injectable()
export class BooksService {

  constructor(@InjectRepository(Book)
private bookRepo: Repository<Book>){

}

  async create(createBookDto: CreateBookDto) {
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

  update(id: number, updateBookDto: UpdateBookDto) {
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
      throw new InternalServerErrorException('Producto no encontrado');
    }
  }

}

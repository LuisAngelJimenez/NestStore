import { Module } from '@nestjs/common';
import { BooksService } from './libros.service';
import { BooksController } from './libros.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Libro } from './entities/libro.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Libro])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class LibrosModule {}

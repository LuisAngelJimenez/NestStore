import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';


@Injectable()
export class CategoriesService {

  constructor(@InjectRepository(Category)
  private catRepo: Repository<Category>) {
  }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = this.catRepo.create(createCategoryDto);

      await this.catRepo.save(category);
      return category;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  findAll() {
    try {
      const category = this.catRepo.find();
      return category;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: number) {
    const category = await this.catRepo.findOne(
      {
        where: {
          id,
        }
      });
    if (!category) {
      throw new NotFoundException('Producto no encontrado');
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      //preload crea otra entidad y lo cargamos, usamos el findbyid
      const category = await this.catRepo.preload(
        {
          id,
          ...updateCategoryDto
        }
      )
      await this.catRepo.save(category);
      return category;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    const category = await this.catRepo.findOne(
      {
        where: {
          id,
        }
      });
    if (!category) {
      throw new NotFoundException('Producto no encontrado');
    }
    await this.catRepo.delete(id);
    return {
      Message: ` el producto : ${id} producto eliminado correctamente`
    }
  }
}

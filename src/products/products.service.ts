import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { LessThan, Like, Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  //en la clase constructror creamos la instancia del modelo//
  constructor(@InjectRepository(Product)
  //dentro de prodrepo estan todas las funciones del orm//
  private prodRepo: Repository<Product>) {
  }

  async create(createProductDto: CreateProductDto) {
    //buscamos errores con el try catch
    try {
      //se crea la instancia, aun no lo guarda en la base de datos//
      const product = this.prodRepo.create(createProductDto);
      //aqui se guarda en la base de datos//
      await this.prodRepo.save(product);
      //como si se crea, returnamos el product
      return product;
    } catch (error) {
      //si hay un error, se devuelve un mensaje interno//
      throw new InternalServerErrorException(error)
    }
  }

  async findAll() {
    try {
      const products = this.prodRepo.find();
      return products;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: number) {
    const product = await this.prodRepo.findOne(
      {
        where: {
          id,
        }
      });
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      //preload crea otra entidad y lo cargamos, usamos el findbyid
      const product = await this.prodRepo.preload(
        {
          id,
          ...updateProductDto
        }
      )
      await this.prodRepo.save(product);
      return product;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    const product = await this.prodRepo.findOne(
      {
        where: {
          id,
        }
      });
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }
    await this.prodRepo.delete(id);
    return {
      Message: ` el producto : ${id} producto eliminado correctamente`
    }
  }

  async buscarProducto(termino: string) {
    const buscados = await this.prodRepo.find({
      where: {
        product_name: Like(`%${termino}%`),
      }
    });
    if (buscados) {
      return buscados;
    } else {
      throw new InternalServerErrorException('Producto no encontrado');
    }
  }

  async active(id: number) {
    try {
      const product = await this.prodRepo.findOne({
        where: {
          id
        }
      });
      const productActive= await this.prodRepo.preload({
        id,
        //cambiamos el estado del producto//
        is_active:!product.is_active})  
        await this.prodRepo.save(productActive);
        return productActive;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async buscarPorFecha(fecha:Date){
    return this.prodRepo.find({
      where:{
        created_at:LessThan(fecha)
      }
    });
    
  }

}


import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User)
  private userRepo: Repository<User>) {
  } 

  async create(createUserDto: CreateUserDto) {
    try{
      const user= this.userRepo.create(createUserDto);
      await this.userRepo.save(user);
      return user;
    }catch(error){
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try{
      const users=this.userRepo.find();
      return users;
    }catch(error){
      throw new InternalServerErrorException(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

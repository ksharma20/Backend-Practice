import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    let user = await this.userRepo.findOne({ where: { id: createUserDto.id } });
    if (!user) {
      user = await this.userRepo.create(createUserDto);
      this.userRepo.save(user);
    }
    return user;
  }

  async findAll(isActive?: boolean) {
    if (isActive == null) {
      return await this.userRepo.find({});
    }
    const users = await this.userRepo.find({
      where: {
        isActive: isActive,
      },
    });
    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      return 'No User with this ID';
    }
    return user;
  }

  async update(id: number, updateUserDto: CreateUserDto) {
    const user = await this.userRepo.findOne({ where: { id } });
    user.fname = updateUserDto.fname;
    user.lname = updateUserDto.lname;
    user.isActive = updateUserDto.isActive;
    this.userRepo.save(user);
    return user;
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }
}

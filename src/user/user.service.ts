import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private readonly user: Model<User>){};

  async create(body: User): Promise<User> {
    const createTask = new this.user(body);
    return createTask.save();
  }

  async findOne(id: number): Promise<User> {
    return this.user.findById(id);
  }

  async update(id: number, user: User): Promise<boolean> {
    return this.user.findByIdAndUpdate(id, user, {new: true});
  }

  async remove(id: number): Promise<boolean> {
    return this.user.findByIdAndDelete(id);
  }
}

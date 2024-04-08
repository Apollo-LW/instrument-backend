import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private readonly user: Model<User>){};

  async create(body: User): Promise<User> {
    const createTask = new this.user(body);
    return createTask.save();
  }

  async findOne(id: string): Promise<User> {
    return this.user.findById(id);
  }

  async update(id: string, user: User): Promise<boolean> {
    return this.user.findByIdAndUpdate(id, user, {new: true});
  }

  async remove(id: string): Promise<boolean> {
    return this.user.findByIdAndDelete(id);
  }
}

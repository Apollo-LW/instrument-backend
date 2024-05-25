import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private readonly user: Model<User>){};

  async create(body: User): Promise<User> {
    body._id = new Types.ObjectId().toString();
    const user = await this.findUserAuth(body.username);
    if (user) {
      return Promise.reject('user exist');
    }
    const createTask = new this.user(body);
    return createTask.save();
  }

  async findOne(id: string): Promise<User> {
    return this.user.findById(id);
  }

  async findUserAuth(username: string): Promise<User> {
    return this.user.findOne({username: username});
  }

  async update(id: string, user: User): Promise<User> {
    try {
      const usertmp = await this.user.findByIdAndUpdate(id, user, {new: true});
      return usertmp;
    } catch (error) {
      if (error.codeName === 'DuplicateKey') {
        if (error.keyValue.username)
          throw new ConflictException("Username " + error.keyValue.username + " Already exist!!");
        else if (error.keyValue.email)
          throw new ConflictException("Email " + error.keyValue.email + " Already exist!!");
      } else {
        throw new ConflictException("Something went wrong  " + error.keyValue.toString());
      }
    }
  }

  async remove(id: string): Promise<boolean> {
    return this.user.findByIdAndDelete(id);
  }
}

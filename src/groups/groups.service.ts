import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Group } from './schema/groups.schema';
import { Model } from 'mongoose';

@Injectable()
export class GroupsService {

  constructor(@InjectModel(Group.name) private readonly group: Model<Group>){};
    
  async getAllGroups() {
    return this.group.find().exec();
  }

  async create(body: Group): Promise<Group> {
    const group = new this.group(body);
    return group.save();
  }

  async findOne(id: number): Promise<Group> {
    return this.group.findById(id);
  }

  async update(id: number, group: Group): Promise<boolean> {
    return this.group.findByIdAndUpdate(id, group, {new: true});
  }

  async remove(id: number): Promise<boolean> {
    return this.group.findByIdAndDelete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Group } from './schema/groups.schema';
import { Model } from 'mongoose';

@Injectable()
export class GroupsService {

  constructor(@InjectModel(Group.name) private readonly group: Model<Group>){};

  async cretaeGroup(body: Group): Promise<Group> {
    const group = new this.group(body);
    return group.save();
  }
    
  async getAllGroups() {
    return this.group.find().exec();
  }

  // create(createGroupDto: CreateGroupDto) {
  //   return 'This action adds a new group';
  // }

  // findAll() {
  //   return `This action returns all groups`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} group`;
  // }

  // update(id: number, updateGroupDto: UpdateGroupDto) {
  //   return `This action updates a #${id} group`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} group`;
  // }
}

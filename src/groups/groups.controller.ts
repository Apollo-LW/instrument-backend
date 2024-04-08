import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { Group } from './schema/groups.schema';

@Controller('group')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Body() group: Group) {
    return this.groupsService.create(group);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() group: Group) {
    return this.groupsService.update(id, group);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.remove(id);
  }
}

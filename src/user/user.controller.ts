import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() user: User) {
    return this.userService.create(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log(id);
    return this.userService.findOne(id);  
  }

  @Get('/username/:username')
  findOneByUsername(@Param('username') username: string) {
    return this.userService.findUserAuth(username);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() user: User) {
    console.log("Hello Hello patch user update: ")
    console.log(id);
    console.log(user);
    return this.userService.update(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}

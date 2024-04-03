import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { CoursesModule } from './courses/courses.module';
import { GroupsModule } from './groups/groups.module';
import { UserModule } from './user/user.module';
import { AssetModule } from './asset/asset.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017'), NotesModule, TasksModule, CoursesModule, GroupsModule, UserModule, AssetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

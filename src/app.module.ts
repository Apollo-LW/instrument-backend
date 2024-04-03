import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017'), NotesModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

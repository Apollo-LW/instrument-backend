import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './schema/notes.schema';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  postNote(@Body() body: Note) {
    return this.notesService.createNote(body);
  }

  @Get()
  getAllNotes() {
    return this.notesService.getAllNotes();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.notesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
  //   return this.notesService.update(+id, updateNoteDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.notesService.remove(+id);
  // }
}

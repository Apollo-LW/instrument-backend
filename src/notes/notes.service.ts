import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from './schema/notes.schema';

@Injectable()
export class NotesService {

  constructor(@InjectModel(Note.name) private readonly note: Model<Note>){};

  async createNote(body: Note): Promise<Note> {
    const createNote = new this.note(body);
    return createNote.save();
  }

  async getAllNotes() {
    return this.note.find().exec();
  }

  // create(createNoteDto: CreateNoteDto) {
  //   return 'This action adds a new note';
  // }

  // findAll() {
  //   return `This action returns all notes`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} note`;
  // }

  // update(id: number, updateNoteDto: UpdateNoteDto) {
  //   return `This action updates a #${id} note`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} note`;
  // }
}

import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from './schema/notes.schema';

@Injectable()
export class NotesService {

  constructor(@InjectModel(Note.name) private readonly note: Model<Note>){};

  async create(body: Note): Promise<Note> {
    const createNote = new this.note(body);
    return createNote.save();
  }

  async findOne(id: string): Promise<Note> {
    return this.note.findById(id);
  }

  async update(id: string, note: Note): Promise<boolean> {
    return this.note.findByIdAndUpdate(id, note, {new: true});
  }

  async remove(id: string): Promise<boolean> {
    return this.note.findByIdAndDelete(id);
  }
}

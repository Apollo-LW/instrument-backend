import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NoteDocument = HydratedDocument<Note>;

@Schema()
export class Note {
    @Prop()
    title: string;

    @Prop()
    content: string;

    @Prop()
    createdAt: string; // TODO: change it to date

    @Prop()
    lastUpdate: string; // TODO: change it to date

    @Prop({type: Array<string>})
    ownersIds: Array<string>;

    @Prop({type: Array<string>})
    viewersIds: Array<string>;

    @Prop()
    isPublic: boolean
}

export const NoteSchema = SchemaFactory.createForClass(Note);

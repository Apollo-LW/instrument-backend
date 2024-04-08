import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

export type NoteDocument = HydratedDocument<Task>;

@Schema()
export class Task {
    @Prop()
    title: string;

    @Prop({type: String})
    dueDate: Date;

    @Prop()
    createdAt: string; // TODO: change it to date

    @Prop()
    lastUpdate: string; // TODO: change it to date

    @Prop()
    type: string // TODO: change it to enum.

    @Prop() 
    content: string;

    @Prop({type: Array<string>})
    ownersIds: Array<string>;

    @Prop({type: Array<string>})
    viewersIds: Array<string>;

    @Prop()
    isPublic: boolean
}

export const TaskSchema = SchemaFactory.createForClass(Task);

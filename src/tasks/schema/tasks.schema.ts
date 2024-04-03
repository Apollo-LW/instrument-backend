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
    content: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

export type NoteDocument = HydratedDocument<Task>;

@Schema({ timestamps: true })
export class Task {
    @Prop()
    name: string;

    @Prop({type: String})
    dueDate: Date;

    @Prop()
    createdAt: string; // TODO: change it to date

    @Prop()
    status: string // TODO: change it to enum.

    @Prop() 
    desciption: string;

    @Prop()
    creatorID: string;

    @Prop()
    userRole: string;

    @Prop()
    isExam: boolean;

    @Prop({type: Date, auto: true})
    updatedAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CourseNoteDocument = HydratedDocument<CourseNote>;

@Schema()
export class CourseNote {
    @Prop({required: true})
    courseId: string;

    @Prop({required: true})
    noteId: string;
}

export const CourseNoteSchema = SchemaFactory.createForClass(CourseNote);



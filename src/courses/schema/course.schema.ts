import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

export type CourseDocument = HydratedDocument<Course>;

@Schema()
export class Course {
    @Prop()
    name: string;

    @Prop()
    creationDate: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true })
export class Course {
    @Prop()
    name: string;

    @Prop()
    courseDescription: string;

    @Prop()
    createdAt: string; // TODO: change it to date

    @Prop()
    isPublic: boolean;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

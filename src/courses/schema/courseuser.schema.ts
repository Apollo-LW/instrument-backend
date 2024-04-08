import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CourseUserDocument = HydratedDocument<CourseUser>;

@Schema()
export class CourseUser {
    @Prop({required: true})
    courseId: string;

    @Prop({required: true})
    userId: string;

    @Prop({required: true})
    role: string; // TODO: change to ENUM.
}

export const CourseUserSchema = SchemaFactory.createForClass(CourseUser);



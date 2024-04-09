import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CourseGraphDocument = HydratedDocument<CourseGraph>;

@Schema()
export class CourseGraph {
    @Prop({required: true})
    courseId: string;

    @Prop({required: true})
    parentCourseId: string;

    @Prop({required: true})
    childCourseId: string;
}

export const CourseGraphSchema = SchemaFactory.createForClass(CourseGraph);



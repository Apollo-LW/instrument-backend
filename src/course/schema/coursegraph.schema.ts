import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CourseGraphDocument = HydratedDocument<CourseGraph>;

@Schema()
export class CourseGraph {
    @Prop({type: String, index: true, unique: true})
    _id: string;

    @Prop({required: true})
    courseId: string;

    @Prop()
    parentCourseId: string;

    @Prop()
    childCourseId: string;
}

export const CourseGraphSchema = SchemaFactory.createForClass(CourseGraph);



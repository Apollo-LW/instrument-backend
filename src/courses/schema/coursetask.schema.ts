import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CourseTaskDocument = HydratedDocument<CourseTask>;

@Schema()
export class CourseTask {
    @Prop({required: true})
    courseId: string;

    @Prop({required: true})
    taskId: string;
}

export const CourseTaskSchema = SchemaFactory.createForClass(CourseTask);



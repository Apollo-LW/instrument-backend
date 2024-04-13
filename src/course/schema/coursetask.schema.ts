import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { HydratedDocument } from 'mongoose';

export type CourseTaskDocument = HydratedDocument<CourseTask>;

@Schema()
export class CourseTask {
    @ApiProperty()
    @Expose()
    @Prop({type: String, index: true, unique: true})
    _id: string;

    @ApiProperty()
    @Expose()
    @Prop({required: true})
    courseId: string;

    @ApiProperty()
    @Expose()
    @Prop({required: true})
    taskId: string;
}

export const CourseTaskSchema = SchemaFactory.createForClass(CourseTask);



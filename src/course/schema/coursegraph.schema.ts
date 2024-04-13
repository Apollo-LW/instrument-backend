import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { HydratedDocument } from 'mongoose';

export type CourseGraphDocument = HydratedDocument<CourseGraph>;

@Schema()
export class CourseGraph {
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
    @Prop()
    parentCourseId: string;

    @ApiProperty()
    @Expose()
    @Prop()
    childCourseId: string;
}

export const CourseGraphSchema = SchemaFactory.createForClass(CourseGraph);



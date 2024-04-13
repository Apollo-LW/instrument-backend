import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { HydratedDocument } from 'mongoose';

export type CourseUserDocument = HydratedDocument<CourseUser>;

@Schema()
export class CourseUser {
    @ApiProperty()
    @Expose()
    @Prop({required: true})
    courseId: string;

    @ApiProperty()
    @Expose()
    @Prop({required: true})
    userId: string;

    @ApiProperty()
    @Expose()
    @Prop({type: String, index: true, unique: true})
    _id: string;

    @ApiProperty()
    @Expose()
    @Prop({required: true})
    role: string; // TODO: change to ENUM.
}

export const CourseUserSchema = SchemaFactory.createForClass(CourseUser);



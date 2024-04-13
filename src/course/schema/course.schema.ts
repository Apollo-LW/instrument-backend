import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { HydratedDocument } from 'mongoose';

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true })
export class Course {
    @ApiProperty()
    @Expose()
    @Prop()
    name: string;

    @ApiProperty()
    @Expose()
    @Prop()
    courseDescription: string;

    @ApiProperty()
    @Expose()
    @Prop()
    createdAt: string; // TODO: change it to date

    @ApiProperty()
    @Expose()
    @Prop()
    isPublic: boolean;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

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
    creatorID: string;

    @ApiProperty()
    @Expose()
    @Prop()
    courseDescription: string;

    @ApiProperty()
    @Expose()
    @Prop()
    createdAt: string;

    @ApiProperty()
    @Expose()
    @Prop()
    startDate: string;

    @ApiProperty()
    @Expose()
    @Prop()
    endDate: string;

    @ApiProperty()
    @Expose()
    @Prop()
    startTime: string;

    @ApiProperty()
    @Expose()
    @Prop()
    endTime: string;

    @ApiProperty()
    @Expose()
    @Prop()
    repeatedDays: string[];

    @ApiProperty()
    @Expose()
    @Prop()
    isPublic: boolean;

    @ApiProperty()
    @Expose()
    @Prop()
    duration: number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

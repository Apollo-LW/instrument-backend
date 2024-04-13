import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { HydratedDocument } from 'mongoose';

export type CourseNoteDocument = HydratedDocument<CourseNote>;

@Schema()
export class CourseNote {
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
    noteId: string;
}

export const CourseNoteSchema = SchemaFactory.createForClass(CourseNote);



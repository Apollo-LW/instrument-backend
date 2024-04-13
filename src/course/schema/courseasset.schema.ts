import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { HydratedDocument } from 'mongoose';

export type CourseTaskDocument = HydratedDocument<CourseAsset>;

@Schema()
export class CourseAsset {
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
    assetId: string;
}

export const CourseAssetSchema = SchemaFactory.createForClass(CourseAsset);



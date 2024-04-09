import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CourseTaskDocument = HydratedDocument<CourseAsset>;

@Schema()
export class CourseAsset {
    @Prop({type: String, index: true, unique: true})
    _id: string;

    @Prop({required: true})
    courseId: string;

    @Prop({required: true})
    assetId: string;
}

export const CourseAssetSchema = SchemaFactory.createForClass(CourseAsset);



import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { URL, Url } from 'url';

export type AssetDocument = HydratedDocument<Asset>;

@Schema({ timestamps: true })
export class Asset {
    @Prop()
    name: string;

    @Prop()
    createdAt: string;

    @Prop()
    creatorId: string;

    @Prop()
    assetId: string;

    @Prop()
    isPublic: boolean;

    @Prop()
    size: number;

    @Prop()
    fileLastModified: Date;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);

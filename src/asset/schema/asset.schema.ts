import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

export type AssetDocument = HydratedDocument<Asset>;

@Schema()
export class Asset {
    @Prop()
    name: string;

    @Prop()
    content: string;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);

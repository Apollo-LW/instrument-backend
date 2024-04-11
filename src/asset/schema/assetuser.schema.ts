import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AssetUserDocument = HydratedDocument<AssetUser>;

@Schema()
export class AssetUser {
    @Prop({type: String, index: true, unique: true})
    _id: string;
    
    @Prop({required: true})
    assetId: string;

    @Prop({required: true})
    userId: string;

    @Prop({required: true})
    role: string; // TODO: change to ENUM
}

export const AssetUserSchema = SchemaFactory.createForClass(AssetUser);



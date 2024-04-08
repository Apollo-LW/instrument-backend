import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';
import { URL, Url } from 'url';

export type AssetDocument = HydratedDocument<Asset>;

@Schema()
export class Asset {
    @Prop()
    name: string;

    @Prop()
    createdAt: string; // TODO: change it to date

    @Prop()
    lastUpdate: string; // TODO: change it to date

    @Prop()
    type: string; // TODO: change it to enum

    @Prop({type: URL})
    url: Url;

    @Prop()
    size: number;

    @Prop({type: Array<string>})
    ownersIds: Array<string>;

    @Prop({type: Array<string>})
    viewersIds: Array<string>;

    @Prop()
    isPublic: boolean;
}

export const AssetSchema = SchemaFactory.createForClass(Asset);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

export type Groupdocument = HydratedDocument<Group>;

@Schema()
export class Group {
    @Prop()
    name: string;

    @Prop()
    createdAt: string; // TODO: change it to date

    @Prop()
    lastUpdate: string; // TODO: change it to date

    @Prop({type: Array<string>}) 
    ownersIds: Array<string>;

    @Prop({type: Array<string>})
    memebrsIds: Array<string>;

    @Prop({type: Array<string>})
    subGroupsIds: Array<string>;

    @Prop({type: Array<string>})
    parentGroupsIds: Array<string>;
}

export const GroupSchema = SchemaFactory.createForClass(Group);

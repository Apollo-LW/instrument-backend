import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

export type Groupdocument = HydratedDocument<Group>;

@Schema()
export class Group {
    @Prop()
    name: string;

    @Prop()
    creationDate: string;

    @Prop() 
    admin: string;

    @Prop()
    memebrs: string
}

export const GroupSchema = SchemaFactory.createForClass(Group);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

export type Userocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop() 
    email: string;

    @Prop()
    username: string
}

export const UserSchema = SchemaFactory.createForClass(User);

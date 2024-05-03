import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument, SchemaTypes } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop({ type: SchemaTypes.ObjectId})
    _id: string;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop() 
    email: string;

    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop()
    salt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

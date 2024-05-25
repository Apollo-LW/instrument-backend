import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument, SchemaTypes } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop({ auto: true})
    _id: string;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop({unique: true})
    email: string;

    @Prop({unique: true})
    username: string;

    @Prop()
    password: string;

    @Prop()
    salt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

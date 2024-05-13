import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { HydratedDocument } from 'mongoose';

export type TaskUserDocument = HydratedDocument<TaskUser>;

@Schema()
export class TaskUser {
    @ApiProperty()
    @Expose()
    @Prop({required: true})
    taskId: string;

    @ApiProperty()
    @Expose()
    @Prop({required: true})
    userId: string;

    @ApiProperty()
    @Expose()
    @Prop({type: String, index: true, unique: true})
    _id: string;

    @ApiProperty()
    @Expose()
    @Prop({required: true})
    role: string; // TODO: change to ENUM.
}

export const TaskUserSchema = SchemaFactory.createForClass(TaskUser);



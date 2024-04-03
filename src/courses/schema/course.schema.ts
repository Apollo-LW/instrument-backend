import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';
import { User } from 'src/user/schema/user.schema';

export type CourseDocument = HydratedDocument<Course>;

@Schema()
export class Course {
    @Prop()
    name: string;

    @Prop()
    courseDescription: string;

    @Prop()
    createdAt: string; // TODO: change it to date

    @Prop()
    lastUpdate: string; // TODO: change it to date

    @Prop({type: Array<string>})
    courseChapterIds: Array<string>;

    @Prop({type: Array<string>})
    courseParentIds: Array<string>;

    @Prop({type: Array<string>})
    courseAdminsIds: Array<string>;

    @Prop({type: Array<string>})
    courseStudentsIds: Array<string>;

    @Prop({type: Array<string>})
    courseTeachers: Array<string>;

}

export const CourseSchema = SchemaFactory.createForClass(Course);


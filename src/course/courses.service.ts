import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schema/course.schema';
import { Model, Types } from 'mongoose';
import { CourseUser } from './schema/courseuser.schema';
import { CourseTask } from './schema/coursetask.schema';
import { CourseNote } from './schema/coursenote.schema';
import { CourseGraph } from './schema/coursegraph.schema';
import { CourseAsset } from './schema/courseasset.schema';

@Injectable()
export class CourseService {

  constructor(
    @InjectModel(Course.name) private readonly course: Model<Course>, 
    @InjectModel(CourseUser.name) private readonly courseUser: Model<CourseUser>,
    @InjectModel(CourseTask.name) private readonly courseTask: Model<CourseTask>,
    @InjectModel(CourseNote.name) private readonly courseNote: Model<CourseNote>,
    @InjectModel(CourseGraph.name) private readonly courseGraph: Model<CourseGraph>,
    @InjectModel(CourseAsset.name) private readonly courseAsset: Model<CourseAsset>,
  ){};

  getCourseUserId(courseUser: CourseUser) : string {
    return courseUser.courseId + courseUser.userId;
  }

  getCourseTaskId(courseTask: CourseTask) : string {
    return courseTask.courseId + courseTask.taskId;
  }

  getCourseNoteId(courseNote: CourseNote) : string {
    return courseNote.courseId + courseNote.noteId;
  }

  getCourseAssetId(courseAsset: CourseAsset): string {
    return courseAsset.courseId + courseAsset.assetId;
  }

  async create(body: Course): Promise<Course> {
    const createdCourse = new this.course(body);
    // TODO: add user that created the course.
    return createdCourse.save();
  }

  async findOne(id: string): Promise<Course> {
    return this.course.findById(id);
  }

  async update(id: string, course: Course): Promise<boolean> {
    return this.course.findByIdAndUpdate(id, course, {new: true});
  }

  async remove(id: string): Promise<boolean> {
    return this.course.findByIdAndDelete(id);
  }

  async getCourseUsers(id: string): Promise<Array<string>> {
    return this.courseUser.find({courseId: id});
  }

  async addCourseUser(courseUser: CourseUser): Promise<CourseUser> {
    const addUser = new this.courseUser(courseUser);
    addUser._id = this.getCourseUserId(courseUser);
    return addUser.save();
  }

  async updateUserRole(courseUser: CourseUser): Promise<boolean> {
    return this.courseUser.findByIdAndUpdate(this.getCourseUserId(courseUser), courseUser, {new: true});
  }

  async removeUser(courseUserId: string): Promise<boolean> {
    return this.courseUser.findByIdAndDelete(courseUserId);
  }

  async countUserCourses(userId: string): Promise<number> {
    return this.courseUser.countDocuments({userId: userId});
  }

  async addCourseTask(courseTask: CourseTask): Promise<CourseTask> {
    const addTask = new this.courseTask(courseTask);
    addTask._id = this.getCourseTaskId(courseTask);
    return addTask.save();
  }

  async removeCourseTask(courseTaskId: string): Promise<boolean> {
    return this.courseTask.findByIdAndDelete(courseTaskId);
  }

  async addCourseNote(courseNote: CourseNote): Promise<CourseNote> {
    const addNote = new this.courseNote(courseNote);
    addNote._id = this.getCourseNoteId(courseNote);
    return addNote.save();
  }

  async removeCourseNote(courseNoteId: string): Promise<boolean> {
    return this.courseNote.findByIdAndDelete(courseNoteId);
  }

  async addCourseAsset(courseAsset: CourseAsset): Promise<CourseAsset> {
    const addAsset =  new this.courseAsset(courseAsset);
    addAsset._id = this.getCourseAssetId(courseAsset);
    return addAsset.save();
  }

  async removeAsset(courseAssetId: string): Promise<boolean> {
    return this.courseAsset.findByIdAndDelete(courseAssetId);
  }

  async addCourseChildren(currentCoureId: string, courseChildId: string): Promise<CourseGraph> {
    const addCourseChild = new this.courseGraph({courseId: courseChildId, parentCourseId: currentCoureId});
    addCourseChild._id = courseChildId + currentCoureId;

    const addCourseParent = new this.courseGraph({courseId: currentCoureId, childCourseId: courseChildId});
    addCourseParent._id = currentCoureId + courseChildId;

    addCourseChild.save();
    return addCourseParent.save();
  }

  async removeCourseChild(currentCoureId: string, courseChildId: string): Promise<boolean> {
    await this.courseGraph.findByIdAndDelete(currentCoureId + courseChildId);
    return this.courseGraph.findByIdAndDelete(courseChildId + currentCoureId);
  }
}

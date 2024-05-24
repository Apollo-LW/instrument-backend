import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schema/course.schema';
import { Model, Types } from 'mongoose';
import { CourseUser } from './schema/courseuser.schema';
import { CourseTask } from './schema/coursetask.schema';
import { CourseNote } from './schema/coursenote.schema';
import { CourseGraph } from './schema/coursegraph.schema';
import { CourseAsset } from './schema/courseasset.schema';
import { Task } from 'src/tasks/schema/tasks.schema';
import { User } from 'src/user/schema/user.schema';

class UserCourseRole {
  username: string;

  role: string;

  lastUpdated: string;
}

@Injectable()
export class CourseService {

  constructor(
    @InjectModel(Course.name) private readonly course: Model<Course>, 
    @InjectModel(CourseUser.name) private readonly courseUser: Model<CourseUser>,
    @InjectModel(CourseTask.name) private readonly courseTask: Model<CourseTask>,
    @InjectModel(CourseNote.name) private readonly courseNote: Model<CourseNote>,
    @InjectModel(CourseGraph.name) private readonly courseGraph: Model<CourseGraph>,
    @InjectModel(CourseAsset.name) private readonly courseAsset: Model<CourseAsset>,
    @InjectModel(Task.name) private readonly taskService: Model<Task>,
    @InjectModel(User.name) private readonly userService: Model<User>,
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
    body.createdAt = Date.now().toString();
    const createdCourse = new this.course(body);
    const data = await createdCourse.save();
    const courseUser = new CourseUser();
    courseUser.courseId = data._id.toString();
    courseUser.userId = data.creatorID;
    courseUser.role = "owner";
    const owener = await this.addCourseUser(courseUser);
    return data;
  }

  async findOne(id: string): Promise<Course> {
    return this.course.findById(id);
  }

  async getCourseName(courseId: string): Promise<String> {
    console.log(courseId);
    return (await this.course.findById(courseId)).name;
  }

  async update(id: string, course: Course): Promise<boolean> {
    return this.course.findByIdAndUpdate(id, course, {new: true});
  }

  async remove(id: string): Promise<boolean> {
    return this.course.findByIdAndDelete(id);
  }

  async getCourseUsers(courseId: string): Promise<UserCourseRole[]> {
    const data = await this.courseUser.find({courseId: courseId});
    console.log(data);
    const users = data.map(x => {
      return {id: x.userId, role: x.role, updatedAt: x.updatedAt};
    });
    return Promise.all(users.map(user => this.userService.findById(user.id).then(userInfo => {
      const courseUser = new UserCourseRole();
      courseUser.username = userInfo.username;
      courseUser.role = user.role;
      courseUser.lastUpdated = user.updatedAt
      return courseUser;
    })));
  }

  async addCourseUsername(courseUser: CourseUser, username: string): Promise<CourseUser> {
    const user = await this.userService.findOne({username: username});
    if (user == null) {
      throw new ConflictException('Username not found!!');
    }
    courseUser.userId = user._id;
    return this.addCourseUser(courseUser);
  }

  async addCourseUser(courseUser: CourseUser): Promise<CourseUser> {
    console.log(courseUser);
    const addUser = new this.courseUser(courseUser);
    addUser._id = this.getCourseUserId(courseUser);
    return this.courseUser.findByIdAndUpdate(this.getCourseUserId(addUser), addUser, {new: true, upsert: true, setDefaultsOnInsert: true});
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

  async getUserCourses(userId: string): Promise<Course[]> {
    console.log(userId);
    const data = await this.courseUser.find({userId: userId});
    const coursesIds = data.map(x => x.courseId);
    return Promise.all(coursesIds.map(courseId => this.findOne(courseId).then(course => course)));
  }

  async isAdmin(courseId: string, userId: string): Promise<boolean> {
    console.log(courseId, userId);
    const role = (await this.courseUser.findById(courseId + userId)).role;
    return role === "admin" || role === "owner";
  }

  async getUserCourseTasks(userId: string, courseId: string): Promise<Task[]> {
    const data = await this.courseTask.find({courseId: courseId});
    const tasksIds = data.map(x => x.taskId);
    console.log(tasksIds);
    return Promise.all(tasksIds.map(taskId => this.taskService.findById(taskId).then(task => task)));
  }

  async addCourseTask(courseTask: CourseTask): Promise<CourseTask> {
    const addTask = new this.courseTask(courseTask);
    console.log(addTask);
    addTask._id = this.getCourseTaskId(courseTask);
    const isAdmin = await this.isAdmin(courseTask.courseId, courseTask.userId);
    if (!isAdmin) {
      throw new ConflictException("You don't have permission to add tasks!!!");
    }
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

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Asset } from './schema/asset.schema';
import { Model } from 'mongoose';
import { AssetUser } from './schema/assetuser.schema';
import { Course } from 'src/course/schema/course.schema';
import { CourseSuggestion } from './schema/coursesuggestion.schema';

@Injectable()
export class AssetService {

  readonly days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  constructor(
    @InjectModel(Asset.name) private readonly asset: Model<Asset>,
    @InjectModel(AssetUser.name) private readonly assetUser: Model<AssetUser>,
    @InjectModel(Course.name) private readonly course: Model<Course>,
  ){};

  async create(body: Asset): Promise<{asset: Asset, courseSuggestion: CourseSuggestion}> {
    const dateStr = new Date(body.fileLastModified).toISOString().substring(0, 10);
    const date = new Date(body.fileLastModified);
    console.log(date.getHours(), date.getMinutes());
    const time = date.getHours() * 60 + date.getMinutes();
    
    console.log(body.fileLastModified);
    console.log(dateStr);
    console.log(time); 
    console.log(this.days[new Date(body.fileLastModified).getDay()])

    const createdAsset = new this.asset(body);
    const data = await createdAsset.save();
    const assetUser = new AssetUser();
    assetUser.assetId = data._id.toString();
    assetUser.role = "owner";
    assetUser.userId = data.creatorId;
    const owner = await this.share(assetUser);
    const suggestedCourses = await this.course.find({
      startDate: {
        $lte: dateStr
      },
      endDate: {
        $gte: dateStr
      }, 
      repeatedDays: this.days[new Date(body.fileLastModified).getDay()],
    });
    console.log(suggestedCourses);
    console.log('============');
    const filteredSuggestedCourses = suggestedCourses.filter(suggestedCourse => {
      const courseStartTime = suggestedCourse.startTime;
      const courseEndTime = suggestedCourse.endTime;
      const tmpStart = courseStartTime.split(":");
      console.log(tmpStart);
      const courseStartTimeInMin = parseInt(tmpStart[0]) * 60 + parseInt(tmpStart[1]);
      const tmpEnd = courseEndTime.split(":");
      console.log(tmpEnd);
      const courseEndTimeInMin = parseInt(tmpEnd[0]) * 60 + parseInt(tmpEnd[1]);
      console.log(courseStartTimeInMin, courseEndTimeInMin, time);
      return courseStartTimeInMin <= time && courseEndTimeInMin >= time;
    });

    console.log(filteredSuggestedCourses);
    return {asset: data, courseSuggestion: {
      assetId: data._id.toString(),
      courses:filteredSuggestedCourses
    }};
  }

  async getUserAssets(userId: string): Promise<Asset[]> {
    const data = await this.assetUser.find({userId: userId});
    return Promise.all(
      data.map(assetUser => this.findOne(assetUser.assetId).then(asset => asset))
    );
  }

  async getUserStorageUsage(userId: string): Promise<Number> {
    const data = await this.assetUser.find({userId: userId});
    const assetSizes = await Promise.all(
      data
      .map(assetUser => 
      this.findOne(assetUser.assetId).then(asset => asset.size)));
    return (assetSizes.reduce((usage, currentSize) => usage + currentSize, 0))*1e-9;
  }

  async findOne(id: string): Promise<Asset> {
    return this.asset.findById(id);
  }

  async update(id: string, updatedAsset: Asset): Promise<boolean> {
    return this.asset.findByIdAndUpdate(id, updatedAsset, {new: true});
  }

  async remove(id: string): Promise<boolean> {
    return this.asset.findByIdAndDelete(id);
  }

  async share(assetUser: AssetUser): Promise<AssetUser> {
    assetUser._id = assetUser.assetId + assetUser.userId;
    const sharedAsset = new this.assetUser(assetUser);
    return sharedAsset.save();
  }

  async unshare(assetId: string, userId: string): Promise<boolean> {
    return this.assetUser.findByIdAndDelete(assetId + userId);
  }
}

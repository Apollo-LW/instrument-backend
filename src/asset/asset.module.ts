import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Asset, AssetSchema } from './schema/asset.schema';
import { AssetUser, AssetUserSchema } from './schema/assetuser.schema';
import { Course, CourseSchema } from 'src/course/schema/course.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Asset.name, schema: AssetSchema },
    { name: AssetUser.name, schema: AssetUserSchema },
    { name: Course.name, schema: CourseSchema }
  ])],
  controllers: [AssetController],
  providers: [AssetService],
})
export class AssetModule {}

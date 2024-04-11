import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Asset, AssetSchema } from './schema/asset.schema';
import { AssetUser, AssetUserSchema } from './schema/assetuser.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Asset.name, schema: AssetSchema }]),
    MongooseModule.forFeature([{ name: AssetUser.name, schema: AssetUserSchema }]),
  ],
  controllers: [AssetController],
  providers: [AssetService],
})
export class AssetModule {}

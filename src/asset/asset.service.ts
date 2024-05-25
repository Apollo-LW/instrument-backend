import { Injectable } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Asset } from './schema/asset.schema';
import { Model } from 'mongoose';
import { AssetUser } from './schema/assetuser.schema';

@Injectable()
export class AssetService {
  constructor(
    @InjectModel(Asset.name) private readonly asset: Model<Asset>,
    @InjectModel(AssetUser.name) private readonly assetUser: Model<AssetUser>,
  ){};

  async create(body: Asset): Promise<Asset> {
    body.createdAt = Date.now().toString();
    const createdAsset = new this.asset(body);
    const data = await createdAsset.save();
    const assetUser = new AssetUser();
    assetUser.assetId = data._id.toString();
    assetUser.role = "owner";
    assetUser.userId = data.creatorId;
    const owner = await this.share(assetUser);
    return data;
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
    return (assetSizes.reduce((usage, currentSize) => usage + currentSize, 0))*1e-6;
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

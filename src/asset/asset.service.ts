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
    const createdAsset = new this.asset(body);
    return createdAsset.save();
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

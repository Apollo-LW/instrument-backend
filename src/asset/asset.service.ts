import { Injectable } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Asset } from './schema/asset.schema';
import { Model } from 'mongoose';

@Injectable()
export class AssetService {
  constructor(@InjectModel(Asset.name) private readonly asset: Model<Asset>){};

  async create(body: Asset): Promise<Asset> {
    const createdAsset = new this.asset(body);
    return createdAsset.save();
  }

  async findOne(id: number): Promise<Asset> {
    return this.asset.findById(id);
  }

  async update(id: number, updatedAsset: Asset): Promise<boolean> {
    return this.asset.findByIdAndUpdate(id, Asset, {new: true});
  }

  async remove(id: number): Promise<boolean> {
    return this.asset.findByIdAndDelete(id);
  }
}

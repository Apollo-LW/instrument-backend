import { Injectable } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Asset } from './schema/asset.schema';
import { Model } from 'mongoose';

@Injectable()
export class AssetService {
  constructor(@InjectModel(Asset.name) private readonly asset: Model<Asset>){};

  async createAsset(body: Asset): Promise<Asset> {
    const asset = new this.asset(body);
    return asset.save();
  }
    
  async getAllAssets() {
    return this.asset.find().exec();
  }

  // create(createAssetDto: CreateAssetDto) {
  //   return 'This action adds a new asset';
  // }

  // findAll() {
  //   return `This action returns all asset`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} asset`;
  // }

  // update(id: number, updateAssetDto: UpdateAssetDto) {
  //   return `This action updates a #${id} asset`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} asset`;
  // }
}

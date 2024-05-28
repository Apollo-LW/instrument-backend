import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AssetService } from './asset.service';
import { Asset } from './schema/asset.schema';
import { AssetUser } from './schema/assetuser.schema';

@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post()
  create(@Body() asset: Asset) {
    return this.assetService.create(asset);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assetService.findOne(id);
  }

  @Get('/list/:userId')
  getUserAssets(@Param('userId') userId: string) {
    return this.assetService.getUserAssets(userId);
  }

  @Get('/size/:userId')
  getUserStorageUsage(@Param('userId') userId: string) {
    return this.assetService.getUserStorageUsage(userId);
  }

  @Get('/count/:userId')
  getUserNumberOfAssets(@Param('userId') userId: string) {
    return this.assetService.countUserAssets(userId); 
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() asset: Asset) {
    return this.assetService.update(id, asset);
  }

  @Patch('/share')
  share(@Body() assetUser: AssetUser) {
    return this.assetService.share(assetUser);
  }

  @Delete("/share/:id/:userId")
  unshare(@Param('id') assetId: string, @Param('userId') userId: string) {
    return this.assetService.unshare(assetId, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assetService.remove(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AssetService } from './asset.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { Asset } from './schema/asset.schema';

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() asset: Asset) {
    return this.assetService.update(id, asset);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assetService.remove(id);
  }
}

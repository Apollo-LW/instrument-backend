import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AssetService } from './asset.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { Asset } from './schema/asset.schema';

@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post()
  postAsset(@Body() body: Asset) {
    return this.assetService.createAsset(body);
  }

  @Get()
  getAllAssets() {
    return this.assetService.getAllAssets();
  }

  // @Post()
  // create(@Body() createAssetDto: CreateAssetDto) {
  //   return this.assetService.create(createAssetDto);
  // }

  // @Get()
  // findAll() {
  //   return this.assetService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.assetService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAssetDto: UpdateAssetDto) {
  //   return this.assetService.update(+id, updateAssetDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.assetService.remove(+id);
  // }
}

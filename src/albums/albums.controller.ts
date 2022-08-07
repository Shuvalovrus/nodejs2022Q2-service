import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumEntity } from './entity/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsServices: AlbumsService) {}

  @Get()
  getArtists(): Promise<Array<AlbumEntity>> {
    return this.albumsServices.getAll();
  }

  @Get(':id')
  getAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<AlbumEntity> {
    return this.albumsServices.getOne(id);
  }

  @Post()
  createAlbum(@Body() createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
    return this.albumsServices.create(createAlbumDto);
  }

  @Put(':id')
  updateAlbum(
    @Body() updateAlbumDto: UpdateAlbumDto,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<AlbumEntity> {
    return this.albumsServices.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.albumsServices.delete(id);
  }
}

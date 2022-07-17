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
import { ArtistsService } from './artists.service';
import { ArtistEntity } from './entity/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsServices: ArtistsService) {}

  @Get()
  getArtists(): Array<ArtistEntity> {
    return this.artistsServices.getAll();
  }

  @Get(':id')
  getArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): ArtistEntity {
    return this.artistsServices.getOne(id);
  }

  @Post()
  createArtist(@Body() createUserDto: CreateArtistDto): ArtistEntity {
    return this.artistsServices.create(createUserDto);
  }

  @Put(':id')
  updateArtist(
    @Body() updateUserDto: UpdateArtistDto,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): ArtistEntity {
    return this.artistsServices.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.artistsServices.delete(id);
  }
}

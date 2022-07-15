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
import { TracksService } from './tracks.service';
import { TrackEntity } from './entity/track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('track')
export class TracksController {
  constructor(private readonly usersServices: TracksService) {}

  @Get()
  getTracks(): Array<TrackEntity> {
    return this.usersServices.getAll();
  }

  @Get(':id')
  getTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): TrackEntity {
    return this.usersServices.getOne(id);
  }

  @Post()
  createTrack(@Body() createUserDto: CreateTrackDto): TrackEntity {
    return this.usersServices.create(createUserDto);
  }

  @Put(':id')
  updateTrack(
    @Body() updateUserDto: UpdateTrackDto,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): TrackEntity {
    return this.usersServices.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.usersServices.delete(id);
  }
}

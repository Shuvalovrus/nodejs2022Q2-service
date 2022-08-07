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
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  getTracks(): Promise<Array<TrackEntity>> {
    return this.tracksService.getAll();
  }

  @Get(':id')
  getTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<TrackEntity> {
    return this.tracksService.getOne(id);
  }

  @Post()
  createTrack(@Body() createTrackDto: CreateTrackDto): Promise<TrackEntity> {
    return this.tracksService.create(createTrackDto);
  }

  @Put(':id')
  updateTrack(
    @Body() updateUserDto: UpdateTrackDto,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<TrackEntity> {
    return this.tracksService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.tracksService.delete(id);
  }
}

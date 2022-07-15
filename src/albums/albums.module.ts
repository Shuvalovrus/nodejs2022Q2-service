import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { TracksService } from '../tracks/tracks.service';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, TracksService],
})
export class AlbumsModule {}

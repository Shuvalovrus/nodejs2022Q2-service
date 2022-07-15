import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { TracksService } from '../tracks/tracks.service';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, TracksService],
})
export class ArtistsModule {}

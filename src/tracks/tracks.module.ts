import { forwardRef, Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { FavouritesModule } from '../favourites/favourites.module';

@Module({
  imports: [forwardRef(() => FavouritesModule)],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService],
})
export class TracksModule {}

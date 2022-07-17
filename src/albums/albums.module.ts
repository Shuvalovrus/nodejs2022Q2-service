import { forwardRef, Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';

import { FavouritesModule } from '../favourites/favourites.module';
import { TracksModule } from '../tracks/tracks.module';

@Module({
  imports: [forwardRef(() => FavouritesModule), forwardRef(() => TracksModule)],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}

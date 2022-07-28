import { Module } from '@nestjs/common';
import { FavouritesController } from './favourites.controller';
import { FavouritesService } from './favourites.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesEntity } from './entity/favourite.entity';
import { TracksService } from '../tracks/tracks.service';
import { TrackEntity } from '../tracks/entity/track.entity';
import { AlbumEntity } from '../albums/entity/album.entity';
import { ArtistEntity } from '../artists/entity/artist.entity';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoritesEntity]),
    TypeOrmModule.forFeature([TrackEntity]),
    TypeOrmModule.forFeature([AlbumEntity]),
    TypeOrmModule.forFeature([ArtistEntity]),
  ],
  controllers: [FavouritesController],
  providers: [FavouritesService, TracksService, ArtistsService, AlbumsService],
  exports: [FavouritesService],
})
export class FavouritesModule {}

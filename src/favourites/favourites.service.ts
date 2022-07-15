import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Favorites } from './dto/favourites.dto';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class FavouritesService {
  constructor(
    private albumsServices: AlbumsService,
    private artistsServices: ArtistsService,
    private tracksServices: TracksService,
  ) {}

  public static favourites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  getAll() {
    return {
      artists: FavouritesService.favourites.artists.map((id) =>
        this.artistsServices.getOne(id),
      ),
      albums: FavouritesService.favourites.albums.map((id) =>
        this.albumsServices.getOne(id),
      ),
      tracks: FavouritesService.favourites.tracks.map((id) =>
        this.tracksServices.getOne(id),
      ),
    };
  }

  addTrack(id) {
    const track = TracksService.tracks.find((item) => item.id === id);

    if (!track) throw new UnprocessableEntityException();

    FavouritesService.favourites.tracks.push(id);

    return track;
  }

  deleteTrack(id) {
    const index = FavouritesService.favourites.tracks.findIndex(
      (trackId) => trackId === id,
    );

    if (index === -1) throw new NotFoundException();

    return FavouritesService.favourites.tracks.splice(index, 1);
  }

  addAlbum(id) {
    const album = AlbumsService.albums.find((item) => item.id === id);

    if (!album) throw new UnprocessableEntityException();

    FavouritesService.favourites.albums.push(id);

    return album;
  }

  deleteAlbum(id) {
    const index = FavouritesService.favourites.albums.findIndex(
      (trackId) => trackId === id,
    );

    if (index === -1) throw new NotFoundException();

    return FavouritesService.favourites.albums.splice(index, 1)[0];
  }

  addArtist(id) {
    const artist = ArtistsService.artists.find((item) => item.id === id);

    if (!artist) throw new UnprocessableEntityException();

    FavouritesService.favourites.artists.push(id);

    return artist;
  }

  deleteArtist(id) {
    const index = FavouritesService.favourites.artists.findIndex(
      (trackId) => trackId === id,
    );
    if (index === -1) throw new NotFoundException();

    return FavouritesService.favourites.artists.splice(index, 1)[0];
  }
}

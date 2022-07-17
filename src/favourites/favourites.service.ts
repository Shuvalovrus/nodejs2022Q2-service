import {
  forwardRef,
  Inject,
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
    @Inject(forwardRef(() => AlbumsService))
    private albumsServices: AlbumsService,
    @Inject(forwardRef(() => ArtistsService))
    private artistsServices: ArtistsService,
    @Inject(forwardRef(() => TracksService))
    private tracksServices: TracksService,
  ) {}

  public favourites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  getAll() {
    return {
      artists: this.favourites.artists.map((id) => {
        if (this.artistsServices.artists.find((item) => item.id === id)) {
          return this.artistsServices.getOne(id);
        }
      }),
      albums: this.favourites.albums.map((id) => {
        if (this.albumsServices.albums.find((item) => item.id === id)) {
          return this.albumsServices.getOne(id);
        }
      }),
      tracks: this.favourites.tracks.map((id) => {
        if (this.tracksServices.tracks.find((item) => item.id === id)) {
          return this.tracksServices.getOne(id);
        }
      }),
    };
  }

  addTrack(id) {
    const track = this.tracksServices.tracks.find((item) => item.id === id);

    if (!track) throw new UnprocessableEntityException();

    this.favourites.tracks.push(id);

    return track;
  }

  deleteTrack(id) {
    const index = this.favourites.tracks.findIndex((trackId) => trackId === id);

    if (index === -1) throw new NotFoundException();

    return this.favourites.tracks.splice(index, 1);
  }

  addAlbum(id) {
    const album = this.albumsServices.albums.find((item) => item.id === id);

    if (!album) throw new UnprocessableEntityException();

    this.favourites.albums.push(id);

    return album;
  }

  deleteAlbum(id) {
    const index = this.favourites.albums.findIndex((trackId) => trackId === id);

    if (index === -1) throw new NotFoundException();

    return this.favourites.albums.splice(index, 1)[0];
  }

  addArtist(id) {
    const artist = this.artistsServices.artists.find((item) => item.id === id);

    if (!artist) throw new UnprocessableEntityException();

    this.favourites.artists.push(id);

    return artist;
  }

  deleteArtist(id) {
    const index = this.favourites.artists.findIndex(
      (trackId) => trackId === id,
    );
    if (index === -1) throw new NotFoundException();
    return this.favourites.artists.splice(index, 1)[0];
  }
}

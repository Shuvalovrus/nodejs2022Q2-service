import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { ArtistEntity } from './entity/artist.entity';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { TracksService } from '../tracks/tracks.service';
import { FavouritesService } from '../favourites/favourites.service';
import { AlbumsService } from '../albums/albums.service';

@Injectable()
export class ArtistsService {
  constructor(
    @Inject(forwardRef(() => FavouritesService))
    private favouritesService: FavouritesService,
    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
  ) {}

  public artists: ArtistEntity[] = [];

  getAll(): Array<ArtistEntity> {
    return this.artists;
  }

  getOne(id: string): ArtistEntity {
    const artist = this.artists.find((user) => user.id === id);
    if (!artist) throw new NotFoundException();
    return artist;
  }

  create(createUserDto: CreateArtistDto): ArtistEntity {
    const newArtist = new ArtistEntity({ id: uuidv4(), ...createUserDto });

    this.artists.push(newArtist);

    return newArtist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): ArtistEntity {
    let updatedArtist = this.artists.find((user) => user.id === id);

    if (!updatedArtist) throw new NotFoundException();

    updatedArtist = Object.assign(updatedArtist, updateArtistDto);

    return updatedArtist;
  }

  delete(id): ArtistEntity {
    const index = this.artists.findIndex((user) => user.id === id);
    const indexFavourites =
      this.favouritesService.favourites.artists.indexOf(id);
    const trackIndex = this.tracksService.tracks.findIndex(
      (track) => track.artistId === id,
    );

    if (indexFavourites !== -1)
      this.favouritesService.favourites.artists.splice(indexFavourites, 1);
    if (index === -1) throw new NotFoundException();
    if (trackIndex !== -1)
      this.tracksService.tracks[trackIndex].artistId = null;

    return this.artists.splice(index, 1)[0];
  }
}

import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoritesEntity } from './entity/favourite.entity';
import { TracksService } from '../tracks/tracks.service';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';

@Injectable()
export class FavouritesService {
  constructor(
    @InjectRepository(FavoritesEntity)
    private favouritesRepo: Repository<FavoritesEntity>,
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsService: AlbumsService,
  ) {}

  async getAll() {
    const favourites =
      (await this.getFavourites()) === null
        ? await this.favouritesRepo.save({
            id: 1,
            artists: [],
            albums: [],
            tracks: [],
          })
        : await this.getFavourites();

    return {
      artists: await Promise.all(
        favourites.artists.map(async (item) => {
          return await this.artistsService.getOne(item);
        }),
      ),
      albums: await Promise.all(
        favourites.albums.map(async (item) => {
          return await this.albumsService.getOne(item);
        }),
      ),
      tracks: await Promise.all(
        favourites.tracks.map(async (item) => {
          return await this.tracksService.getOne(item);
        }),
      ),
    };
  }

  async addTrack(id) {
    const favourites = await this.getFavourites();
    const tracks = await this.tracksService.getAll();
    const track = tracks.find((item) => item.id === id);

    if (!track) throw new UnprocessableEntityException();

    favourites.tracks.push(id);
    return this.favouritesRepo.save(favourites);
  }

  async deleteTrack(id) {
    const favourites = await this.getFavourites();
    const index = favourites.tracks.indexOf(id);

    if (index === -1) throw new NotFoundException();

    favourites.tracks.splice(index, 1);

    return this.favouritesRepo.save(favourites);
  }

  async addAlbum(id) {
    const favourites = await this.getFavourites();
    const albums = await this.albumsService.getAll();
    const album = albums.find((item) => item.id === id);

    if (!album) throw new UnprocessableEntityException();

    favourites.albums.push(id);
    return this.favouritesRepo.save(favourites);
  }

  async deleteAlbum(id) {
    const favourites = await this.getFavourites();
    const index = favourites.albums.indexOf(id);

    if (index === -1) throw new NotFoundException();

    favourites.albums.splice(index, 1);

    return this.favouritesRepo.save(favourites);
  }

  async addArtist(id) {
    const favourites = await this.getFavourites();
    const artists = await this.artistsService.getAll();
    const artist = artists.find((item) => item.id === id);

    if (!artist) throw new UnprocessableEntityException();

    favourites.artists.push(id);

    return this.favouritesRepo.save(favourites);
  }

  async deleteArtist(id) {
    const favourites = await this.getFavourites();
    const index = favourites.artists.indexOf(id);

    if (index === -1) throw new NotFoundException();

    favourites.artists.splice(index, 1);

    return this.favouritesRepo.save(favourites);
  }

  async getFavourites() {
    return await this.favouritesRepo.findOne({ where: { id: 1 } });
  }
}

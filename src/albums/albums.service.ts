import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { AlbumEntity } from './entity/album.entity';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { TracksService } from '../tracks/tracks.service';
import { FavouritesService } from '../favourites/favourites.service';

@Injectable()
export class AlbumsService {
  constructor(
    @Inject(forwardRef(() => FavouritesService))
    private favouritesService: FavouritesService,

    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
  ) {}

  public albums: AlbumEntity[] = [];

  getAll(): Array<AlbumEntity> {
    return this.albums;
  }

  getOne(id: string): AlbumEntity {
    const album = this.albums.find((album) => album.id === id);
    if (!album) throw new NotFoundException();
    return album;
  }

  create(createAlbumDto: CreateAlbumDto): AlbumEntity {
    const newAlbum = new AlbumEntity({ id: uuidv4(), ...createAlbumDto });

    this.albums.push(newAlbum);

    return newAlbum;
  }

  update(id, updateAlbumDto: UpdateAlbumDto): AlbumEntity {
    let updatedAlbum = this.albums.find((album) => album.id === id);

    if (!updatedAlbum) throw new NotFoundException();

    updatedAlbum = Object.assign(updatedAlbum, updateAlbumDto);

    return updatedAlbum;
  }

  delete(id: string): AlbumEntity {
    const index = this.albums.findIndex((user) => user.id === id);
    const favouriteIndex = this.favouritesService.favourites.albums.indexOf(id);
    const trackIndex = this.tracksService.tracks.findIndex(
      (track) => track.albumId === id,
    );

    if (favouriteIndex !== -1)
      this.favouritesService.favourites.albums.splice(favouriteIndex, 1);
    if (index === -1) throw new NotFoundException();
    if (trackIndex !== -1) this.tracksService.tracks[trackIndex].albumId = null;

    return this.albums.splice(index, 1)[0];
  }
}

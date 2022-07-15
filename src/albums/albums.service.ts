import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { AlbumEntity } from './entity/album.entity';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class AlbumsService {
  public static albums: AlbumEntity[] = [];

  getAll(): Array<AlbumEntity> {
    return AlbumsService.albums;
  }

  getOne(id: string): AlbumEntity {
    const album = AlbumsService.albums.find((album) => album.id === id);
    if (!album) throw new NotFoundException();
    return album;
  }

  create(createAlbumDto: CreateAlbumDto): AlbumEntity {
    const newAlbum = new AlbumEntity({ id: uuidv4(), ...createAlbumDto });

    AlbumsService.albums.push(newAlbum);

    return newAlbum;
  }

  update(id, updateAlbumDto: UpdateAlbumDto): AlbumEntity {
    let updatedAlbum = AlbumsService.albums.find((album) => album.id === id);

    if (!updatedAlbum) throw new NotFoundException();

    updatedAlbum = Object.assign(updatedAlbum, updateAlbumDto);

    return updatedAlbum;
  }

  delete(id: string): AlbumEntity {
    const index = AlbumsService.albums.findIndex((user) => user.id === id);

    const trackIndex = TracksService.tracks.findIndex(
      (track) => track.albumId === id,
    );

    if (index === -1) throw new NotFoundException();
    if (trackIndex !== -1) TracksService.tracks[trackIndex].albumId = null;

    return AlbumsService.albums.splice(index, 1)[0];
  }
}

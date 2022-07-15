import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { ArtistEntity } from './entity/artist.entity';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class ArtistsService {
  public static artists: ArtistEntity[] = [];

  getAll(): Array<ArtistEntity> {
    return ArtistsService.artists;
  }

  getOne(id: string): ArtistEntity {
    const artist = ArtistsService.artists.find((user) => user.id === id);
    if (!artist) throw new NotFoundException();
    return artist;
  }

  create(createUserDto: CreateArtistDto): ArtistEntity {
    const newArtist = new ArtistEntity({ id: uuidv4(), ...createUserDto });

    ArtistsService.artists.push(newArtist);

    return newArtist;
  }

  update(id, updateArtistDto: UpdateArtistDto): ArtistEntity {
    let updatedArtist = ArtistsService.artists.find((user) => user.id === id);

    if (!updatedArtist) throw new NotFoundException();

    updatedArtist = Object.assign(updatedArtist, updateArtistDto);

    return updatedArtist;
  }

  delete(id): ArtistEntity {
    const index = ArtistsService.artists.findIndex((user) => user.id === id);

    const trackIndex = TracksService.tracks.findIndex(
      (track) => track.artistId === id,
    );

    if (index === -1) throw new NotFoundException();
    if (trackIndex !== -1) TracksService.tracks[trackIndex].artistId = null;

    return ArtistsService.artists.splice(index, 1)[0];
  }
}

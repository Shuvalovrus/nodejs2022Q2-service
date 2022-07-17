import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { TrackEntity } from './entity/track.entity';
import { UpdateTrackDto } from './dto/update-track.dto';
import { FavouritesService } from '../favourites/favourites.service';

@Injectable()
export class TracksService {
  constructor(
    @Inject(forwardRef(() => FavouritesService))
    private favouritesService: FavouritesService,
  ) {}

  public tracks: TrackEntity[] = [];

  getAll(): Array<TrackEntity> {
    return this.tracks;
  }

  getOne(id: string): TrackEntity {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) throw new NotFoundException();
    return track;
  }

  create(createTrackDto: CreateTrackDto): TrackEntity {
    const newTrack = new TrackEntity({ id: uuidv4(), ...createTrackDto });

    this.tracks.push(newTrack);

    return newTrack;
  }

  update(id, updateTrackDto: UpdateTrackDto): TrackEntity {
    let updatedTrack = this.tracks.find((user) => user.id === id);

    if (!updatedTrack) throw new NotFoundException();

    updatedTrack = Object.assign(updatedTrack, updateTrackDto);

    return updatedTrack;
  }

  delete(id): TrackEntity {
    const index = this.tracks.findIndex((user) => user.id === id);
    const favouritesIndex =
      this.favouritesService.favourites.tracks.indexOf(id);

    if (favouritesIndex !== -1)
      this.favouritesService.favourites.tracks.splice(favouritesIndex, 1);

    if (index === -1) throw new NotFoundException();

    return this.tracks.splice(index, 1)[0];
  }
}

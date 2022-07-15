import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { TrackEntity } from './entity/track.entity';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  public static tracks: TrackEntity[] = [];

  getAll(): Array<TrackEntity> {
    return TracksService.tracks;
  }

  getOne(id: string): TrackEntity {
    const track = TracksService.tracks.find((track) => track.id === id);
    if (!track) throw new NotFoundException();
    return track;
  }

  create(createTrackDto: CreateTrackDto): TrackEntity {
    const newTrack = new TrackEntity({ id: uuidv4(), ...createTrackDto });

    TracksService.tracks.push(newTrack);

    return newTrack;
  }

  update(id, updateTrackDto: UpdateTrackDto): TrackEntity {
    let updatedTrack = TracksService.tracks.find((user) => user.id === id);

    if (!updatedTrack) throw new NotFoundException();

    updatedTrack = Object.assign(updatedTrack, updateTrackDto);

    return updatedTrack;
  }

  delete(id): TrackEntity {
    const index = TracksService.tracks.findIndex((user) => user.id === id);

    if (index === -1) throw new NotFoundException();

    return TracksService.tracks.splice(index, 1)[0];
  }
}

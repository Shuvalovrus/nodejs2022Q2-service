import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { TrackEntity } from './entity/track.entity';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  private tracks: TrackEntity[] = [];

  getAll(): Array<TrackEntity> {
    return this.tracks;
  }

  getOne(id: string): TrackEntity {
    const user = this.tracks.find((user) => user.id === id);
    if (!user) throw new NotFoundException();
    return user;
  }

  create(createTrackDto: CreateTrackDto): TrackEntity {
    const newUser = new TrackEntity({ id: uuidv4(), ...createTrackDto });

    this.tracks.push(newUser);

    return newUser;
  }

  update(id, updateTrackDto: UpdateTrackDto): TrackEntity {
    let updatedUser = this.tracks.find((user) => user.id === id);

    if (!updatedUser) throw new NotFoundException();

    updatedUser = Object.assign(updatedUser, updateTrackDto);

    return updatedUser;
  }

  delete(id): TrackEntity {
    const index = this.tracks.findIndex((user) => user.id === id);

    if (index) throw new NotFoundException();

    return this.tracks.splice(index, 1)[0];
  }
}

import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackEntity } from './entity/track.entity';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavouritesService } from '../favourites/favourites.service';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepo: Repository<TrackEntity>,
    @Inject(forwardRef(() => FavouritesService))
    private favouritesService: FavouritesService,
  ) {}

  async getAll(): Promise<Array<TrackEntity>> {
    return await this.trackRepo.find();
  }

  async getOne(trackId: string): Promise<TrackEntity> {
    const track = await this.trackRepo.findOne({ where: { id: trackId } });

    if (!track) throw new NotFoundException('Track not found');

    return track;
  }

  async create(createTrackDto: CreateTrackDto): Promise<TrackEntity> {
    const createdTrack = this.trackRepo.create(createTrackDto);

    return await this.trackRepo.save(createdTrack);
  }

  async update(trackId, updateTrackDto: UpdateTrackDto): Promise<TrackEntity> {
    const updatedTrack = await this.getOne(trackId);

    return await this.trackRepo.save(
      Object.assign(updatedTrack, updateTrackDto),
    );
  }

  async delete(trackId): Promise<TrackEntity> {
    const favourites = await this.favouritesService.getFavourites();
    const deletedTrack = await this.getOne(trackId);

    if (favourites.tracks.includes(trackId))
      await this.favouritesService.deleteTrack(trackId);

    await this.trackRepo.delete(trackId);

    return deletedTrack;
  }
}

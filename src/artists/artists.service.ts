import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ArtistEntity } from './entity/artist.entity';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavouritesService } from '../favourites/favourites.service';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepo: Repository<ArtistEntity>,
    @Inject(forwardRef(() => FavouritesService))
    private favouritesService: FavouritesService,
  ) {}

  async getAll(): Promise<Array<ArtistEntity>> {
    return await this.artistRepo.find();
  }

  async getOne(artistId: string): Promise<ArtistEntity> {
    const artist = await this.artistRepo.findOne({ where: { id: artistId } });

    if (!artist) throw new NotFoundException('Artist not found');

    return artist;
  }

  async create(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    const createdArtist = this.artistRepo.create(createArtistDto);

    return await this.artistRepo.save(createdArtist);
  }

  async update(
    artistId: string,
    updateArtist: UpdateArtistDto,
  ): Promise<ArtistEntity> {
    const updatedArtist = await this.getOne(artistId);

    return await this.artistRepo.save(
      Object.assign(updatedArtist, updateArtist),
    );
  }

  async delete(artistId): Promise<ArtistEntity> {
    const favourites = await this.favouritesService.getFavourites();
    const deletedArtist = await this.getOne(artistId);

    if (favourites.artists.includes(artistId))
      await this.favouritesService.deleteArtist(artistId);

    await this.artistRepo.delete(artistId);

    return deletedArtist;
  }
}

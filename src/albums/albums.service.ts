import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { AlbumEntity } from './entity/album.entity';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavouritesService } from '../favourites/favourites.service';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepo: Repository<AlbumEntity>,
    @Inject(forwardRef(() => FavouritesService))
    private favouritesService: FavouritesService,
  ) {}

  async getAll(): Promise<Array<AlbumEntity>> {
    return await this.albumRepo.find();
  }

  async getOne(albumId: string): Promise<AlbumEntity> {
    const album = await this.albumRepo.findOne({ where: { id: albumId } });

    if (!album) throw new NotFoundException('Album not found');

    return album;
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
    const createdAlbum = this.albumRepo.create(createAlbumDto);

    return await this.albumRepo.save(createdAlbum);
  }

  async update(albumId, updateAlbumDto: UpdateAlbumDto): Promise<AlbumEntity> {
    const updatedAlbum = await this.getOne(albumId);

    return await this.albumRepo.save(
      Object.assign(updatedAlbum, updateAlbumDto),
    );
  }

  async delete(albumId: string): Promise<AlbumEntity> {
    const favourites = await this.favouritesService.getFavourites();
    const deletedAlbum = await this.getOne(albumId);

    if (favourites.albums.includes(albumId))
      await this.favouritesService.deleteAlbum(albumId);

    await this.albumRepo.delete(albumId);

    return deletedAlbum;
  }
}

import { forwardRef, Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entity/artist.entity';
import { FavouritesModule } from 'src/favourites/favourites.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArtistEntity]),
    forwardRef(() => FavouritesModule),
  ],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}

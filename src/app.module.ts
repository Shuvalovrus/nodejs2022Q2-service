import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TracksModule } from './tracks/tracks.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { FavouritesModule } from './favourites/favourites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import configService from '../ormconfig';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    TracksModule,
    ArtistsModule,
    AlbumsModule,
    FavouritesModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    TypeOrmModule.forRoot(configService),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

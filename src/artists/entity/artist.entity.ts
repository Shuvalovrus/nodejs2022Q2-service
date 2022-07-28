import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TrackEntity as Track } from '../../tracks/entity/track.entity';
import { AlbumEntity as Album } from '../../albums/entity/album.entity';

@Entity('artist')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => Track, (track) => track.id)
  tracks: Track[];

  @OneToMany(() => Album, (album) => album.id)
  album: Album[];
}

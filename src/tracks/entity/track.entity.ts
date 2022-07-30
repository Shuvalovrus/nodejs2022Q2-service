import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArtistEntity as Artist } from '../../artists/entity/artist.entity';
import { AlbumEntity as Album } from '../../albums/entity/album.entity';

@Entity('track')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: String, nullable: true })
  artistId: string | null;

  @Column({ type: String, nullable: true })
  albumId: string | null;

  @Column()
  duration: number;

  @ManyToOne(() => Artist, (artist) => artist.tracks, { onDelete: 'SET NULL' })
  artist: Artist;

  @ManyToOne(() => Album, (album) => album.tracks, { onDelete: 'SET NULL' })
  album: Album;
}

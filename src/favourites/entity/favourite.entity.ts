import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('favourites')
export class FavoritesEntity {
  @PrimaryColumn('numeric')
  id: number;

  @Column('simple-array', { default: [] })
  artists: string[];

  @Column('simple-array', { default: [] })
  albums: string[];

  @Column('simple-array', { default: [] })
  tracks: string[];
}

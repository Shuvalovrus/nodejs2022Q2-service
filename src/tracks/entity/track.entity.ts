import { Exclude } from 'class-transformer';

export class TrackEntity {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;

  constructor(partial: Partial<TrackEntity>) {
    Object.assign(this, partial);
  }
}

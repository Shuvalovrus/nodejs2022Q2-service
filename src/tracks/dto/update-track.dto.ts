import { IsNotEmpty } from 'class-validator';

export class UpdateTrackDto {
  @IsNotEmpty()
  name: string;

  artistId: string | null;
  albumId: string | null;

  @IsNotEmpty()
  duration: number;
}

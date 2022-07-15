import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  year: number;

  @IsOptional()
  artistId: string | null;
}

import { ArtistEntity } from '../../artists/entity/artist.entity';
import { AlbumEntity } from '../../albums/entity/album.entity';
import { TrackEntity } from '../../tracks/entity/track.entity';

export class FavoritesResponse {
  artists: ArtistEntity[];
  albums: AlbumEntity[];
  tracks: TrackEntity[];
}

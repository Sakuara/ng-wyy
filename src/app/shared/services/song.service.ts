import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { Observable } from 'rxjs';
import { Song } from 'src/app/core/models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(
    private api: ApiService,
  ) { }

  getSongs(...ids): Observable<Song[]> {
    const param = (ids).join(',');
    return this.api.get('song/detail').pipe(
      map((res: { songs: Song[] }) => res.songs)
    );
  }
}

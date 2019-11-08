import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { Observable } from 'rxjs';
import { SongSheet, Song, Tracks } from 'src/app/core/models';
import { map, pluck, switchMap } from 'rxjs/operators';
import { SongService } from './song.service';

@Injectable({
  providedIn: 'root'
})
export class SongSheetService {

  constructor(
    private api: ApiService,
    private songService: SongService,
  ) { }

  // 获取歌单列表
  getSongSheetDetail(id): Observable<SongSheet> {
    return this.api.get('playlist/detail', { id: id.toString() }).pipe(
      map((res: { playlist: SongSheet }) => res.playlist)
    );
  }

  // i. according id can get sheetDetail
  // ii. by details tracks'id to call songsurl to get song url
  // iii. componse songsList and back.
  playSheet(id: number): Observable<Song[]> {
    return this.getSongSheetDetail(id).pipe(
      pluck('tracks'),
      switchMap(tracks => this.songService.getSongList(tracks))
    )
  }
}

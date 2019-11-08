import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { Observable } from 'rxjs';
import { SongUrl, Song } from 'src/app/core/models';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(
    private api: ApiService,
  ) { }

  // 获取歌曲地址
  getSongUrl(ids: string): Observable<SongUrl[]> {
    return this.api.get('song/url', { id: ids }).pipe(
      map((res: { data: SongUrl[] }) => res.data)
    )
  }

  // 获取歌曲列表
  getSongList(songs: Song | Song[]): Observable<Song[]> {
    const songArr = Array.isArray(songs) ? songs.slice() : [songs];
    const ids = songArr.map(item => item.id).join(',');
    return this.getSongUrl(ids).pipe(
      map(urls => this.composeSongsList(songArr, urls))
    );
  }

  private composeSongsList(songs: Song[], urls: SongUrl[]): Song[] {
    const result = [];
    songs.forEach(song => {
      const url = urls.find(songUrl => songUrl.id === song.id).url;
      if (url) {
        result.push({ ...song, url });
      }
    });
    return result;
  }
}

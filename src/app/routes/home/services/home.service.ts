import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/api.service';
import { Observable } from 'rxjs';
import { Banner, SongList, Tag } from '../models/index';
import { map, tap } from "rxjs/operators";
import { InSinger } from '../models/in-singer';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    public api: ApiService
  ) { }

  getBanner(): Observable<Banner[]> {
    return this.api.get('banner', { type: 0 }).pipe(
      map((res: { banners: Banner[] }) => res.banners)
    )
  }

  getRecomand(limit?): Observable<SongList[]> {
    return this.api.get('personalized', { limit: limit }).pipe(
      map((res: { result: SongList[] }) => res.result)
    );
  }

  getTags(): Observable<Tag[]> {
    return this.api.get('playlist/hot').pipe(
      map((res: { tags: Tag[] }) => res.tags.filter((val, i) => i < 5))
    )
  }

  getInSingers(): Observable<InSinger[]> {
    return this.api.get('/artist/list',{cat:5001,limit:5}).pipe(
      map((res: {artists: InSinger[]}) => res.artists)
    );
  }
}

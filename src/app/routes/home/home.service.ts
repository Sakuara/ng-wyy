import { Injectable } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { Observable } from 'rxjs';
import { Banner, SongList } from './models/index';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    public api: ApiService
  ) {}

  getBanner(): Observable<Banner[]> {
    return this.api.get('banner',{type: 0}).pipe(
      map((res: { banners: Banner[] }) => res.banners)
    )
  }

  getRecomand(limit?): Observable<SongList[]> {
    return this.api.get('personalized',{limit: limit}).pipe(
      map((res: {result: SongList[]}) => res.result)
    );
  }
}

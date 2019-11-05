import { Injectable } from '@angular/core';
import { Resolve } from "@angular/router";
import { Observable, forkJoin } from 'rxjs';
import { take, first } from "rxjs/operators";
import { HomeService } from './home.service';
import { Banner, SongList, Tag, InSinger } from '../models';

type RecomandData = [Banner[], SongList[], Tag[], InSinger[]];
@Injectable()
export class RecomandResolveService implements Resolve<RecomandData>{

  constructor(
    private homeService: HomeService,
  ) {

  }
  resolve(): Observable<RecomandData> {
    return forkJoin([
      this.homeService.getBanner(),
      this.homeService.getRecomand(8),
      this.homeService.getTags(),
      this.homeService.getInSingers()
    ]).pipe(
      first()
    )
  }

}

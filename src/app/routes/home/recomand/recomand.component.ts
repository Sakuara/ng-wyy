import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Banner, SongList, Tag, InSinger } from '../models';
import { HomeService } from '../services/home.service';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from "rxjs/operators";
import { SongSheetService } from 'src/app/shared/services/song-sheet.service';
import { MusicStoreModule } from 'src/app/music-store';
import { Store } from '@ngrx/store';
import { SetSongList, SetPlayList, SetCurrentIndex } from 'src/app/music-store/actions/player.actions';
import { Song } from 'src/app/core/models';

@Component({
  selector: 'app-recomand',
  templateUrl: './recomand.component.html',
  styleUrls: ['./recomand.component.scss']
})
export class RecomandComponent implements OnInit {

  bannerLists: Banner[];
  songLists: Song[];
  hotTags: Tag[];
  inSingers: InSinger[];
  @ViewChild('banner', { static: true }) banner: ElementRef;
  imgUrl = 'http://p1.music.126.net/Qo_Vcxiy7ZXM1uhIrxYjug==/109951164462307952.jpg?imageView&blur=40x20';

  constructor(
    private route: ActivatedRoute,
    private rd2: Renderer2,
    private homeService: HomeService,
    private songSheetService: SongSheetService,
    private store$: Store<MusicStoreModule>,
  ) { }

  beforeChange(activedIndex) {
    // 暂未找到调取banner 背景图接口
    this.setBackgroundImage();
  }

  private setBackgroundImage() {
    this.rd2.setStyle(this.banner.nativeElement, 'background-image', `url(${this.imgUrl})`);
  }

  play(id) {
    this.songSheetService.playSheet(id).subscribe(
      res => {
        // 分发数据给仓库
        this.store$.dispatch(SetSongList({ songList: res }));
        this.store$.dispatch(SetPlayList({ playList: res }));
        this.store$.dispatch(SetCurrentIndex({ currentIndex: 0 }));
      }
    )
  }

  ngOnInit() {
    this.route.data.pipe(
      map(res => res.recomandDatas)
    ).subscribe(
      ([bannerLists, songLists, hotTags, inSingers]) => {
        this.bannerLists = bannerLists;
        this.songLists = songLists;
        this.hotTags = hotTags;
        this.inSingers = inSingers;
      }
    )
  }

  ngAfterViewInit() {
    this.setBackgroundImage();
  }

}

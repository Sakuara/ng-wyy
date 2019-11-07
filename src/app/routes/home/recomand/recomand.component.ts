import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Banner, SongList, Tag, InSinger } from '../models';
import { HomeService } from '../services/home.service';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from "rxjs/operators";

@Component({
  selector: 'app-recomand',
  templateUrl: './recomand.component.html',
  styleUrls: ['./recomand.component.scss']
})
export class RecomandComponent implements OnInit {

  bannerLists: Banner[];
  songLists: SongList[];
  hotTags: Tag[];
  inSingers: InSinger[];
  @ViewChild('banner', { static: true }) banner: ElementRef;
  imgUrl = 'http://p1.music.126.net/Qo_Vcxiy7ZXM1uhIrxYjug==/109951164462307952.jpg?imageView&blur=40x20';

  constructor(
    private route: ActivatedRoute,
    private rd2: Renderer2,
    private homeService: HomeService,
  ) { }

  beforeChange(activedIndex) {
    // 暂未找到调取banner 背景图接口
    this.setBackgroundImage();
  }

  private setBackgroundImage() {
    this.rd2.setStyle(this.banner.nativeElement, 'background-image', `url(${this.imgUrl})`);
  }

  play(song){
    console.log(song);
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

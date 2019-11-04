import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Banner, SongList } from '../models';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-recomand',
  templateUrl: './recomand.component.html',
  styleUrls: ['./recomand.component.scss']
})
export class RecomandComponent implements OnInit {

  bannerLists: Banner[];
  songLists: SongList[];
  @ViewChild('banner', { static: true }) banner: ElementRef;
  imgUrl = 'http://p1.music.126.net/Qo_Vcxiy7ZXM1uhIrxYjug==/109951164462307952.jpg?imageView&blur=40x20';

  constructor(
    private rd2: Renderer2,
    private homeService: HomeService,
  ) { }

  getBanner() {
    this.homeService.getBanner().subscribe(
      res => {
        this.bannerLists = res;
      }
    );
  }

  getRecomand() {
    this.homeService.getRecomand(8).subscribe(
      res => {
        this.songLists = res;
      }
    )
  }

  beforeChange(activedIndex) {
    // 暂未找到调取banner 背景图接口
    this.setBackgroundImage();
  }

  private setBackgroundImage() {
    this.rd2.setStyle(this.banner.nativeElement, 'background-image', `url(${this.imgUrl})`);
  }

  ngOnInit() {
    this.getBanner();
    this.getRecomand();
  }

  ngAfterViewInit() {
    this.setBackgroundImage();
  }

}

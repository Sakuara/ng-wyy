import { Component, OnInit, Renderer2, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HomeService } from '../home.service';
import { Banner } from './models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  bannerLists: Banner[];
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

  beforeChange(activedIndex) {
    // 暂未找到调取banner 背景图接口
    this.setBackgroundImage();
  }

  private setBackgroundImage() {
    this.rd2.setStyle(this.banner.nativeElement, 'background-image', `url(${this.imgUrl})`);
  }

  ngOnInit() {
    this.getBanner();
  }

  ngAfterViewInit() {
    this.setBackgroundImage();
  }

}

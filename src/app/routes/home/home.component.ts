import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { Banner } from './models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  bannerLists: Banner[];
  constructor(
    private homeService: HomeService,
  ) { }

  ngOnInit() {
    this.homeService.getBanner().subscribe(
      res => {
        this.bannerLists = res;
      }
    )
  }

}

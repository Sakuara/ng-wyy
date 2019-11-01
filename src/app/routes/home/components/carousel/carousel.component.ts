import { Component, OnInit, Input } from '@angular/core';
import { Banner } from '../../models';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input() bannerLists: Banner[];
  constructor() { }

  ngOnInit() {
  }

}

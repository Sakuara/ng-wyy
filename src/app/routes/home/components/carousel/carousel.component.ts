import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Banner } from '../../models';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  currentBg: {};
  activedIndex = 0;
  @Input() bannerLists: Banner[];
  @Output() nzBeforeChange = new EventEmitter<number>();
  constructor() { }

  beforeChange({ from, to }) {
    this.activedIndex = to;
    this.nzBeforeChange.emit(to);
  }

  ngOnInit() {

  }

}

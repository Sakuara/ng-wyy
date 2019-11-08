import { Component, OnInit, Input, SimpleChanges, OnChanges, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-slider-track',
  templateUrl: './slider-track.component.html',
  styleUrls: ['./slider-track.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderTrackComponent implements OnInit, OnChanges {

  @Input() offset: number;
  style = {};
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['offset']) {
      this.style['width'] = `${this.offset}%`;
    }
  }

}

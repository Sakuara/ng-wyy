import { Component, OnInit, Input, SimpleChanges, OnChanges, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-slider-thumb',
  templateUrl: './slider-thumb.component.html',
  styleUrls: ['./slider-thumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderThumbComponent implements OnInit, OnChanges {

  @Input() offset: number;
  style = {};
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['offset']) {
      this.style['left'] = `${this.offset}%`;
    }
  }

}

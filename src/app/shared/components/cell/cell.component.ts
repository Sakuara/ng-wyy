import { Component, OnInit, Input, HostBinding, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellComponent implements OnInit {

  @Input() song;
  @Input() cardWidth;
  @Input() cardHeight;
  @Output() wyPlay = new EventEmitter<number>();
  @HostBinding('style.width') width = this.cardWidth + 'px';
  @HostBinding('style.height') height = this.cardHeight + 'px';

  constructor() { }

  playSong(id) {
    this.wyPlay.emit(id);
  }
  ngOnInit() {
  }

}

import { Component, OnInit, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';

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
  @HostBinding('style.width') width = this.cardWidth + 'px';
  @HostBinding('style.height') height = this.cardHeight + 'px';

  constructor() { }

  ngOnInit() {
  }

}
